module.exports = (req, res, next) => {
  if (req.user.id) {
    next();
  } else {
    res.redirect("/staff");
  }
};
