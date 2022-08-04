const express = require('express')
const router = express.Router()
const path = require('path')
const pages = path.join(__dirname, '..', 'views', 'pages')

router.get(['/', '/index.ejs', '/index.html'], (req, res) => {
  try{
    res.render('../views/pages/index.ejs')
  } catch (err){
    res.end(err)
  }
})
router.get('/widget.ejs', (req, res) => {
  try{
    res.render('../views/pages/widget.ejs')
  } catch (err){
    res.end(err)
  }
})
router.get('/blank.ejs', (req, res) => {
  try{
    res.render('../views/pages/blank.ejs')
  } catch (err){
    res.end(err)
  }
})
router.get('/button.ejs', (req, res) => {
  try{
    res.render('../views/pages/button.ejs')
  } catch (err){
    res.end(err)
  }
})
router.get('/chart.ejs', (req, res) => {
  try{
    res.render('../views/pages/chart.ejs')
  } catch (err){
    res.end(err)
  }
})
router.get('/element.ejs', (req, res) => {
  try{
    res.render('../views/pages/element.ejs')
  } catch (err){
    res.end(err)
  }
})
router.get('/form.ejs', (req, res) => {
  try{
    res.render('../views/pages/form.ejs')
  } catch (err){
    res.end(err)
  }
})
router.get('/signin.ejs', (req, res) => {
  try{
    res.render('../views/pages/signin.ejs')
  } catch (err){
    res.end(err)
  }
})
router.get('/signup.ejs', (req, res) => {
  try{
    res.render('../views/pages/signup.ejs')
  } catch (err){
    res.end(err)
  }
})
router.get('/table.ejs', (req, res) => {
  try{
    res.render('../views/pages/table.ejs')
  } catch (err){
    res.end(err)
  }
})
router.get('/typography.ejs', (req, res) => {
  try{
    res.render('../views/pages/typography.ejs')
  } catch (err){
    res.end(err)
  }
})


module.exports = router;