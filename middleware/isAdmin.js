// Will check if the user is Admin or not
module.exports = (req, res, next) => {
  if (req.user.role === 2) {
    next();
  } else {
    res.redirect("/adminlogin");
  }
};
