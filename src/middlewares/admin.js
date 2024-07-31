const passport = require("passport");
const Constants = require("../common/constants");

module.exports = function (req, res, next) {
  passport.authenticate("Bearer", function (err, admin, info) {
    if (err) return res.status(500).send(err);

    if (admin && admin.enable) {
      if (admin.role === Constants.Role.Admin) {
        req.adminId = admin._id;
        req.adminInfo = admin;
        next();
      } else {
        res.status(401).json({ message: __("No Permission") });
      }
    } else {
      res.status(401).json({ message: __("Invalid credentials") });
    }
  })(req, res, next);
};
