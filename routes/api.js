const express = require('express')
const router = express.Router()
//const Vulnerability = require('../models/Vulnerability')
const acorn = require("acorn")
const JSX = require('acorn-jsx')

// RETURN AST
router.post('/ASTParser', async (req, res) => {
  try {
    //console.log('Server received:\n' + req.body.data)
    const AST = acorn.parse(req.body.data, { ecmaVersion: 'latest' }).body
    //console.log('and produced AST: ')
    //console.log(AST)
    res.send(AST)
  } catch (err) {
    res.status(500).send(err)
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