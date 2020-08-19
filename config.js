require('dotenv').config()
const config = {
  auth: {
    username: process.env.AUTH_USERNAME,
    password: process.env.AUTH_PASSWORD
  }
}
module.exports = config
