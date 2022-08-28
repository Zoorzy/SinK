const express = require('express')
var bodyParser = require('body-parser')
const router = express.Router()
//const Vulnerability = require('../models/Vulnerability')
const acorn = require("acorn")
const jsx = require("acorn-jsx")

// create application/json parser
//var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// RETURN AST
router.post('/ASTParser', urlencodedParser, async (req, res) => {
  try {
    const JSXParser = acorn.Parser.extend(jsx())
    const AST = JSXParser.parse(req.body.data, { ecmaVersion: 2020 })
    //console.log(AST)
    res.json(AST)
  } catch (e) {
    res.send(e)
  }
})

/*
// GET THE LAST 10 VULNERABILITIES REPORT
router.get('/vuln', async (req, res) => {
  try {
    let limit = 10
    const vulnerabilities = await Vulnerability.find().limit(limit)
    res.json(vulnerabilities)
  } catch (err) {
    res.json(err)
  }
})

// SPECIFIC VULNERABILITY
router.get('/:vulnId', async (req, res) => {
  try {
    const vulnerability = await Vulnerability.findById(req.params.vulnId)
    res.json(vulnerability)
  } catch (err) {
    res.json(err)
  }
})
/*
// SUBMTS A VULNERABILITY
router.post('/new', bodyParser.json(), async (req, res) => {
  const vulnerability = new Vulnerability({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url
  })

  try {
    const saved = await vulnerability.save();
    res.json(saved);
  } catch (err) {
    res.json(err);
  }
})
*/

module.exports = router;