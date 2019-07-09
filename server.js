const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')


app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  });

app.get('/hello', (req, res) => res.send('Hello World!'))

const port = 8080
app.listen(process.env.PORT || port, () => console.log(`listening on ${port}`))


