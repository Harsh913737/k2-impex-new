const passport = require("passport");
const Constants = require("../common/constants");
const Business = require("../models/business");

module.exports = function (req, res, next) {
  passport.authenticate("Bearer", function (err, admin, info) {
    if (err) return res.status(500).send(err);

    if (admin && admin.enable) {
      if (admin.role === Constants.Role.Manager) {
        Business.findOne({ _id: admin.business, enable: true }, (err, item) => {
          if (err) return next(err);
          if (item) {
            req.business = admin.business;
            req.adminId = admin._id;
            req.adminInfo = admin;
            next();
          } else {
            res.status(401).json({ message: __("No Permission") });
          }
        });
      } else {
        res.status(401).json({ message: __("No Permission") });
      }
    } else {
      res.status(401).json({ message: __("Invalid credentials") });
    }
  })(req, res, next);
};
