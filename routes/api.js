const express = require('express')
const router = express.Router()
//const Vulnerability = require('../models/Vulnerability')
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

// RETURN AST
router.post('/ASTScanner', async (req, res) => {
  var sinks = [
    'write',
    'writeln',
    'insertAdjacentHTML',
    'innerHTML'
  ], vulns = [];
  try {
    const AST = parse(req.body.data);
    traverse(AST, {
      enter(path) {
        sinks.forEach(element => {
          if (path.isIdentifier({ name: element })) {
            // Ho trovato un sinks, non importa che sia davvero manipolabile a mio piacere
            vulns.push(path.node);
          }
        });
      }
    });

    res.status(200).send(vulns)
  } catch (err) {
    res.status(500).send(err);
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