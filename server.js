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

//TO DO check for valid inputs and make sure no over budget
app.post('/envelope', (req, res, next) => {
    const newEnvelope = {
        id: envelopeArray.length + 1,
        category: req.params.category,
        budget: req.params.budget
    }
    envelopeArray.push(newEnvelope);
    res.status(201).send(newEnvelope);
});

app.get('/envelope', (req, res, next) => {
    res.status(200).send(envelopeArray);
})