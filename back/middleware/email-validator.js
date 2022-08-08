const emailValidator = require("email-validator");

module.exports = (req, res, next) => {
  const email = req.body.email;
  if (emailValidator.validate("test@email.com")) {
    console.log(`l'email ${email} est valide`);
    next();
  } else {
    return res.status(400).json({ error: `l'email ${email} n'est pas valide` });
  }
};
