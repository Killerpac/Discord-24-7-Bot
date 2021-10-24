require('dotenv').config();

module.exports = {
secret:{
    "TOKEN":process.env['TOKEN'],
    "CHANNEL": process.env['CHANNEL'],
    "STATUS":process.env['STATUS'],
    "TOPIC":process.env["TOPIC"],
    "LINKS":process.env['LINKS']
  }
}
