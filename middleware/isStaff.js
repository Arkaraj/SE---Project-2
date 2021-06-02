// Will check if the user is Staff or not, there is no possible way to check it unless we modify the schema
module.exports = (req, res, next) => {
  if (req.user.role === 1) {
    next();
  } else {
    res.redirect("/user");
  }
};
