import express from "express";
//import bodyParser from "body-parser";

const app = express();
const port = 3000;

//Kino frontend
app.get('/', (req, res) => res.send('frontend will be here'))

app.get('/api/hello', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Kino API running on ${port}.`))