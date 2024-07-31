// here we will create controller for orders to handle all the request related to orders

const Order = require("../models/orders");
const Customer = require("../models/customer");
const Products = require("../models/products");
const Account = require("../models/accounts");
const PriceList = require("../models/pricelist");
const admin = require("../models/admin");
const accounts = require("../models/accounts");
const accountController = require("./accounts");

// here we will create order for customer
module.exports = {
  createOrder: async (req, res) => {
    try {
      const {
        products,
        customerId,
        totalAmount,
        orderedByName,
        orderedByPhone,
        transportationCharges,
      } = req.body;
      console.log(req.body, "req");
      let customer = await Customer.findOne({ _id: customerId });
      let account = await accounts.findOne({ customerId: customerId });
      if (customer) {
        let priceList = await PriceList.findOne({ customerId: customerId });
        console.log("priceList", priceList);

        const productIds = products.map((product) => product.productId);
        // Find the products based on the productIds
        const productsList = await Products.find({
          _id: { $in: productIds },
        });
        console.log("productsList", productsList);
        if ( productsList?.length > 0) {
          // Check if customer credit limit is sufficient
          const outstandingAmount = customer?.outstandingAmount
            ? customer?.outstandingAmount
            : 0;
          console.log(products, "pp");
          if (customer.creditLimit >= outstandingAmount + Number(totalAmount)) {
            let newOrder = new Order({
              customerId: customerId,
              products: products,
              totalAmount: totalAmount,
              status: "pending",
              paymentStatus: "pending",
              orderedByName: orderedByName,
              orderedByPhone: orderedByPhone,
              transportationCharges: transportationCharges,
            });
            await newOrder.save();

            if (customer) {
              customer.outstandingAmount += Number(totalAmount);
              await customer.save();
            }

            // Prepare the data to be passed to the createAccount function
            const accountData = {
              body: {
                customerId: customerId,
                orders: [
                  {
                    orderId: newOrder._id, // Pass the ID of the newly created order
                  },
                ],
              },
            };

            // Call createAccount function from accountController
            await accountController.createAccount(accountData, res, true);

            return res.status(200).json({
              message: "Order created successfully",
              success: true,
              data: newOrder,
            });
          } else {
            return res.status(200).json({
              result: {
                message: "Insufficient credit limit. Please contact Office",
                success: false,
              },
            });
          }
        } else {
          return res.status(400).json({
            message: "Price list not found",
          });
        }
      } else {
        return res.status(400).json({
          message: "Customer not found",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  // here we will get all the orders
  getAllOrders: async (req, res) => {
    try {
      let orders = await Order.find()
        .populate({
          path: "customerId",
          options: { strictPopulate: false },
          model: "customer",
        })
        .populate({
          path: "products.productId",
          options: { strictPopulate: false },
          model: "product",
        });
      return res.status(200).json({
        message: "All orders",
        data: orders,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  getOrderByCustomerId: async (req, res) => {
    try {
      const { customerId } = req.params; // Assuming customerId is passed as a route parameter

      let orders = await Order.find({ customerId })
        .populate({
          path: "customerId",
          options: { strictPopulate: false },
          model: "customer",
        })
        .populate({
          path: "products.productId",
          options: { strictPopulate: false },
          model: "product",
        });

      return res.status(200).json({
        message: "Orders found",
        data: orders,
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },

  // here we will get order by id
  getOrderById: async (req, res) => {
    try {
      const { orderId } = req.params;
      let order = await Order.findOne({ _id: orderId });
      if (order) {
        return res.status(200).json({
          message: "Order",
          data: order,
        });
      } else {
        return res.status(400).json({
          message: "Order not found",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  // here we will update order by id
  updateOrderById: async (req, res) => {
    // here we will update order by id
    //where only status and paymentStatus can be updated can be changed
    // status and paymentStatus are both different things
    // status is for order status like pending, delivered, cancelled
    // paymentStatus is for payment status like pending, paid, cancelled
    try {
      const {
        orderId,
        status,
        paymentStatus,
        rejectionMessage,
        totalAmount,
        transportationCharges,
      } = req.body;

      let order = await Order.findOne({ _id: orderId });

      if (order) {
        let customer = await Customer.findOne({ _id: order.customerId });

        let updatedOrder = await Order.findOneAndUpdate(
          { _id: orderId },
          {
            $set: {
              status: status,
              paymentStatus: paymentStatus,
              rejectionMessage: rejectionMessage,
              totalAmount: totalAmount,
              transportationCharges: transportationCharges,
            },
          },
          { new: true }
        );
        if (updatedOrder.paymentStatus == "paid") {
          customer.outstandingAmount -= order.totalAmount;
        }
        return res.status(200).json({
          message: "Order updated successfully",
          data: updatedOrder,
        });
      } else {
        return res.status(400).json({
          message: "Order not found",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },

  // here we will cancel order by id
  cancelOrderById: async (req, res) => {
    // here we will update order by id
    //where only status and paymentStatus can be updated can be changed
    // status and paymentStatus are both different things
    // status is for order status like pending, delivered, cancelled
    // paymentStatus is for payment status like pending, paid, cancelled
    try {
      const { orderId, status, paymentStatus } = req.body;
      let order = await Order.findOne({ _id: orderId });
      if (order) {
        let updatedOrder = await Order.findOneAndUpdate(
          { _id: orderId },
          { $set: { status: "cancelled", paymentStatus: "cancelled" } },
          { new: true }
        );
        return res.status(200).json({
          message: "Order updated successfully",
          data: updatedOrder,
        });
      } else {
        return res.status(400).json({
          message: "Order not found",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },

  // get order of a customer
  getOrderOfCustomer: async (req, res) => {
    try {
      const { userId } = req.params;
      let orders = await Order.find({ userId: userId });
      if (orders) {
        return res.status(200).json({
          message: "Orders",
          data: orders,
        });
      } else {
        return res.status(400).json({
          message: "Orders not found",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  },
  generateInvoice: async (orderId, callback) => {
    try {
      const order = await Order.findOne({ _id: orderId })
        .populate({
          path: "customerId",
          options: { strictPopulate: false },
          model: "customer",
        })
        .populate({
          path: "products.productId",
          options: { strictPopulate: false },
          model: "product",
        });

      if (!order) {
        throw new Error("Order not found");
      }

      const templatePath = "../common/invoice_templates/order.html";
      const template = fs.readFileSync(templatePath, "utf-8");

      // Prepare the data to be passed into the template
      const data = {
        orderId: order._id,
        paymentStatus: order.paymentStatus,
        status: order.status,
        totalAmount: order.totalAmount,
        products: order.products.map((product) => ({
          name: product.productId.name,
          quantity: product.quantity,
          defaultprice: product.productId.defaultprice,
          total: product.productId.defaultprice * product.quantity,
        })),
        totalPrice: order.products.reduce(
          (total, product) =>
            total + product.productId.defaultprice * product.quantity,
          0
        ),
      };

      // Compile the HTML template using Handlebars
      const compiledTemplate = handlebars.compile(template);

      // Render the compiled template with the data
      const renderedTemplate = compiledTemplate(data);

      // Generate a unique filename for the invoice
      const invoicePath = `./invoices/invoice_${orderId}.pdf`;

      // Launch a headless Chromium browser using Puppeteer
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Set the HTML content of the page
      await page.setContent(renderedTemplate);

      // Generate a PDF of the page
      await page.pdf({ path: invoicePath, format: "A4" });

      // Close the browser
      await browser.close();

      console.log("Invoice generated successfully!");

      callback(null, invoicePath);
    } catch (error) {
      console.error("Error generating invoice:", error);
      callback(error);
    }
  },
};
