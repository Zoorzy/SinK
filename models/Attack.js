/**
 * https://www.tutorialspoint.com/http/http_requests.htm
 * 
 * HTTP REQ
 *  Request Method
 *  Request-URI
 *  Request Header Fields (Alcuni required, altri no)
 *  Request Body (? forse è troppo)
 * 
 * HTTP RES
 *  Message Status-Line
 *    HTTP Version
 *    Status Code
 *  Response Header Fields
 *  Response Body (? forse è troppo)
 * 
 * sinks
 * vulnerabilities
 * {
 *  linea: String
 *  tag: String
 *  tipo: DOM XSS
 *  payload: String (?)
 * }
 * 
 * data
 * 
 * other (?)
 */

const mongoose = require('mongoose');

const AttackSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Attack', AttackSchema);