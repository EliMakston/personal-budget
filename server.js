const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 3000;

const envelopeArray = [];
let totalBudget;

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
})

app.get('/', (req, res, next) => {
    res.status(200).send('Hello, World')
})

function checkParams (req, res, next) {
    const categoryParam = req.query.category;
    next();
}

//TO DO check for valid inputs and make sure no over budget
app.post('/envelope', checkParams, (req, res, next) => {
    const newEnvelope = {
        id: envelopeArray.length + 1,
        category: req.query.category,
        budget: req.query.budget
    }
    envelopeArray.push(newEnvelope);
    res.status(201).send(newEnvelope);
});

app.get('/envelope', (req, res, next) => {
    res.status(200).send(envelopeArray);
})