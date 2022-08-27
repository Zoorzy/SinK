const express = require('express')
const router = express.Router()
const Vulnerability = require('../models/Vulnerability')
const acorn = require("acorn")
const jsx = require("acorn-jsx")

// RETURN AST FROM STRING
router.post('/ASTParser', async (req, res) => {
  try {
    // Non funziona che ridere
    const string = req.body.code
    var JSXParser = acorn.Parser.extend(jsx())
    res.json(JSXParser.parse(string, { ecmaVersion: 2020 }))
  } catch (e) {
    res.send(e)
  }
})

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