const PriceList = require("../models/pricelist");
const Admin = require("../models/admin");

module.exports = {
  addPriceList: async (req, res) => {
    try {
      const { adminId, customerId } = req.body;
      let products = req.body.products;
      // let products = [
      //     {
      //         "productId": "5f9e1b0b9d3b9e2b7c7d3b1e",
      //         "price": 100,
      //         "_id": "6475be08cd263d103cdd9837"
      //     },
      //     {
      //         "productId": "5f9e1b0b9d3b9e2b7c7d3b1f",
      //         "price": 2000,
      //         "_id": "6475be08cd263d103cdd9838"
      //     },
      //     {
      //         "productId": "5f9e1b0b9d3b9e2b7c7d3b1e",
      //         "price": 100,
      //         "_id": "6475bf89cd263d103cdd9840"
      //     },
      //     {
      //         "productId": "5f9e1b0b9d3b9e2b7c7d3b1f",
      //         "price": 2000,
      //         "_id": "6475bf89cd263d103cdd9841"
      //     }
      // ]
      let admin = await Admin.findOne({ _id: adminId });
      if (!admin) {
        return res.status(400).json({
          message: "Admin not found",
        });
      } else {
        let priceList = await PriceList.findOne({ customerId: customerId });

        if (priceList) {
          console.log(priceList, "list");

          let newProducts = [];
          newProducts.push(...priceList.products, ...products);
          let updatedPriceList = await PriceList.findOneAndUpdate(
            { customerId: customerId },
            { $set: { products: newProducts } },
            { new: true }
          );
          return res.status(200).json({
            message: "Price list updated successfully",
            data: updatedPriceList,
          });
        } else {
          console.log("here");
          let newPriceList = new PriceList({
            adminId: adminId,
            customerId: customerId,
            products: products,
          });
          await newPriceList.save();
          return res.status(200).json({
            message: "Price list added successfully",
            data: newPriceList,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
  editPriceList: async (req, res) => {
    try {
      const { userId, products, productId } = req.body;
      // let products = [
      //     {
      //         "productId": "5f9e1b0b9d3b9e2b7c7d3b1e",
      //         "price": 100,
      //         "_id": "6475be08cd263d103cdd9837"
      //     },
      //     {
      //         "productId": "5f9e1b0b9d3b9e2b7c7d3b1f",
      //         "price": 2000,
      //         "_id": "6475be08cd263d103cdd9838"
      //     },
      //     {
      //         "productId": "5f9e1b0b9d3b9e2b7c7d3b1e",
      //         "price": 100,
      //         "_id": "6475bf89cd263d103cdd9840"
      //     },
      //     {
      //         "productId": "5f9e1b0b9d3b9e2b7c7d3b1f",
      //         "price": 2000,
      //         "_id": "6475bf89cd263d103cdd9841"
      //     }
      // ]

      // let productId = ["5f9e1b0b9d3b9e2b7c7d3b1f","5f9e1b0b9d3b9e2b7c7d3b1f" ]
      let priceList = await PriceList.findOne({ userId: userId });
      if (priceList) {
        let newProducts = priceList.products;
        newProducts.forEach((product, index) => {
          if (productId.includes(product.productId.toString())) {
            newProducts[index].price = products[index].price;
          }
        });
        let updatedPriceList = await PriceList.findOneAndUpdate(
          { userId: userId },
          { $set: { products: newProducts } },
          { new: true }
        );
        return res.status(200).json({
          message: "Price list updated successfully",
          data: updatedPriceList,
        });
      } else {
        return res.status(400).json({
          message: "Price list not found",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getPriceList: async (req, res) => {
    try {
      console.log(adminId);
      const { adminId } = req.params;
      let priceList = await PriceList.find({ adminId: adminId })
        .populate({
          path: "customerId",
          options: { strictPopulate: false },
          model: "customer",
        })
        .populate({
          path: "products.productId",
          options: { strictPopulate: false },
          model: "product",
        }).lean()
        console.log(priceList,"list")
      if (priceList) {
        return res.status(200).json({
          message: "Price list found",
          data: priceList,
        });
      } else {
        return res.status(400).json({
          message: "Price list not found",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },

  getPriceByCustomerId: async (req, res) => {
    try {
      const { customerId } = req.params;
      console.log(customerId);
      let priceList = await PriceList.findOne({ customerId: customerId })
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
      if (priceList) {
        return res.status(200).json({
          message: "Price list found",
          data: priceList,
        });
      } else {
        return res.status(400).json({
          message: "Price list not found",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
