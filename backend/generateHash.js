const bcrypt = require("bcrypt");

const password = "admin123";
bcrypt.hash(password, 10).then((hash) => {
  console.log("Your hashed password is:");
  console.log(hash);
});
