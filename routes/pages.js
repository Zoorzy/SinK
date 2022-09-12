const express = require('express')
const router = express.Router()
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
router.get('/ping.ejs', (req, res) => {
  try{
    res.render('../views/pages/ping.ejs', {url: [example]})
  } catch (err){
    res.end(err)
  }
})
router.post('/ping.ejs', (req, res) => {
  try{
    res.render('../views/pages/ping.ejs', {url: req.body.url})
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


module.exports = router;