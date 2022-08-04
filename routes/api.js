const express = require('express')
const router = express.Router()
const Attack = require('../models/Attack')
const bodyParser = require('body-parser')

// GET THE LAST 10 ATTACK REPORT
router.get('/attacks', async (req, res) => {
  try {
    let limit = 10
    const attacks = await Attack.find().limit(limit)
    res.json(attacks)
  } catch (err) {
    res.json(err)
  }
})

// SPECIFIC ATTACK
router.get('/:attackId', async (req, res) => {
  try {
    const attack = await Attack.findById(req.params.attackId)
    res.json(attack)
  } catch (err) {
    res.json(err)
  }
})

// SUBMTS AN ATTACK
router.post('/new', bodyParser.json(), async (req, res) => {
  const attack = new Attack({
    title: req.body.title,
    description: req.body.description,
    url: req.body.url
  })

  try {
    const savedAttack = await attack.save();
    //console.log(req.body.title)
    //console.log(req.body.description)
    res.json(savedAttack);
  } catch (err) {
    res.json(err);
  }
})

module.exports = router;