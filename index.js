const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
var router1 = require('./apiRouter.js');






app.get('/', (req, res) => {
  res.send('alo World!')
})

app.use('/user', router1);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})