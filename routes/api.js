const express = require('express')
const router = express.Router()
//const Vulnerability = require('../models/Vulnerability')
const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;

// RETURN AST
router.post('/ASTScanner', async (req, res) => {
  var sources = [
    'document.location.href',
    'document.location',
    'document.cookie',
    'window.location.href',
    'window.location'
  ],
    sinks = [
      'write',
      'writeln',
      'insertAdjacentHTML',
      'innerHTML'
    ];
  try {
    const AST = parse(req.body.data);

    //console.log(AST.program.body);

    //var txt = '';
    traverse(AST, {
      /*
      VariableDeclaration(path) {
        //txt += path.node.kind + ', ';
        console.log('VariableDeclaration: ' + path.node.kind);
      },
      NumericLiteral(path) {
        //txt += path.node.value + ', ';
        console.log('NumericLiteral: ' + path.node.value);
      },
      StringLiteral(path) {
        //txt += path.node.value + ', ';
        console.log('StringLiteral: ' + path.node.value);
      },
      Identifier(path) {
        //txt += path.node.name + ', ';
        for (elem of sinks) {
          if (path.node.name == elem) {
            console.log('Identifier: ' + path.node.name);
          }
        }
      },
      VariableDeclarator(path) {
        //console.log('VariableDeclarator: ' + path.node.id.name);
      },
      BinaryExpression(path) {
        //txt += path.node.operator + ', ';
        console.log(path.node.operator);
      },
      FunctionDeclaration(path) {
        console.log(path.node.body.body)
      },
      AssignmentExpression(path) {
        console.log(path.node.right)
      },
      */

      enter(path) {
        sinks.forEach(element => {
          if (path.isIdentifier({ name: element })) {
            console.log('trovato ' + element + '!');
            console.log(path.node);
          }
        });
      }

    });

    //console.log('This is txt content: ' + txt);

    res.status(200).send(AST)
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