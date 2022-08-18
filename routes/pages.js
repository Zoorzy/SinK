const express = require('express')
const router = express.Router()
//const path = require('path')
//const pages = path.join(__dirname, '..', 'views', 'pages')
const example = 'https://www.example.com/'

router.use(express.urlencoded({ extended: true }))
router.use(express.json());

// dashboard
router.get('/index.ejs', (req, res) => {
  try{
    res.render('../views/pages/index.ejs')
  } catch (err){
    res.end(err)
  }
})
router.get(['/index.html', '/'], (req, res) => {
  try{
    res.redirect('/index.ejs')
  } catch (err){
    res.end(err)
  }
})
// input.ejs
router.get('/input.ejs', (req, res) => {
  try{
    res.render('../views/pages/input.ejs')
  } catch (err){
    res.end(err)
  }
})
// scan.ejs
router.get('/scan.ejs', (req, res) => {
  try{
    res.render('../views/pages/scan.ejs', {url: [example]})
  } catch (err){
    res.end(err)
  }
})
router.post('/scan.ejs', (req, res) => {
  try{
    res.render('../views/pages/scan.ejs', {url: req.body.url})
  } catch (err){
    res.end(err)
  }
})

// newreport.ejs
router.get('/newreport.ejs', (req, res) => {
  try{
    res.render('../views/pages/newreport.ejs', {url: [example]})
  } catch (err){
    res.end(err)
  }
})
router.post('/newreport.ejs', (req, res) => {
  try{
    res.render('../views/pages/newreport.ejs', {url: req.body.hiddenUrls})
  } catch (err){
    res.end(err)
  }
})

router.get('/reports.ejs', (req, res) => {
  try{
    res.render('../views/pages/reports.ejs')
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