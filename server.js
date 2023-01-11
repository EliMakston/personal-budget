const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 3000;

const envelopeArray = [];
let totalBudget = 5000;
let budgetLeft = 5000;

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
})

app.get('/', (req, res, next) => {
    res.status(200).send('Hello, World')
})

function checkParams (req, res, next) {
    if (!req.query.hasOwnProperty('category') || !req.query.hasOwnProperty('budget')) {
        res.status(400).send('Missing parameter');
    }
    const categoryParam = req.query.category;
    const budgetParam = Number(req.query.budget);
    if (categoryParam.length === 0 || budgetParam.length === 0) {
        res.status(400).send('Missing parameter');
    } else {
        if (budgetLeft >= budgetParam) {
            req.category = categoryParam;
            req.budget = budgetParam;
            budgetLeft -= budgetParam;
            next();
        } else {
            res.status(400).send('Budget overflow');
        }
    }
}

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