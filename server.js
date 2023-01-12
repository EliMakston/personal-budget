const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,'public')));

const PORT = process.env.PORT || 3000;

const envelopeArray = [];
let totalBudget = 5000;
let budgetLeft = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
})

app.get('/', (req, res, next) => {
    res.sendFile('index.html', {root: __dirname});
})

app.get('/envelopes', (req, res, next) => {
    res.sendFile('envelopes.html', {root: __dirname});
})

function checkParams (req, res, next) {
    let categoryParam;
    let budgetParam;
    let isBody = false;
    if (!req.query.hasOwnProperty('category') || !req.query.hasOwnProperty('budget')) {
        if (!req.body.hasOwnProperty('category') || !req.body.hasOwnProperty('budget')) {
            res.status(400).send('Missing parameter');
        } else {
            isBody = true;
        }
    }
    if (!isBody) {
        categoryParam = req.query.category;
        budgetParam = Number(req.query.budget);
    } else {
        categoryParam = req.body.category;
        budgetParam = Number(req.body.budget);
    }
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

function checkIndex(req, res, next) {
    const currentId = Number(req.params.id);
    if (req.params.hasOwnProperty('id2')) {
        const currentId2 = Number(req.params.id2);
        const envelopeIndex2 = envelopeArray.findIndex((envelope) => {return Number(envelope.id) === currentId2});
        if (envelopeIndex2 === -1) {
            res.status(404).send('Envelope not found');
        } else {
            req.index2 = envelopeIndex2;
        }
    }
    const envelopeIndex = envelopeArray.findIndex((envelope) => {return Number(envelope.id) === currentId});
    if (envelopeIndex === -1) {
        res.status(404).send('Envelope not found');
    } else {
        req.index = envelopeIndex;
        next();
    }
}

app.post('/envelope', checkParams, (req, res, next) => {
    const newEnvelope = {
        id: envelopeArray.length + 1,
        category: req.category,
        budget: req.budget
    }
    envelopeArray.push(newEnvelope);
    res.status(201).send(newEnvelope);
});

app.get('/envelope', (req, res, next) => {
    res.status(200).send(envelopeArray);
})

app.get('/envelope/:id', checkIndex, (req, res, next) => {
    res.status(200).send(envelopeArray[req.index]);
});

app.put('/envelope/:id', checkIndex, (req, res, next) => {
    const updateEnvelope = envelopeArray[req.index];
    if (!req.query.hasOwnProperty('budget') && !req.query.hasOwnProperty('category')) {
        res.status(400).send('Missing budget or category');
    }
    if (req.query.hasOwnProperty('budget')) {
        const newBudget = req.query.budget;
        if (newBudget >= 0) {
            updateEnvelope.budget = Number(newBudget);
        }
    }
    if (req.query.hasOwnProperty('category')) {
        const newCategory = req.query.category;
        if (newCategory.length > 0) {
            updateEnvelope.category = newCategory;
        }
    }
    envelopeArray[req.index] = updateEnvelope;
    res.status(200).send(envelopeArray[req.index]);
});

app.delete('/envelope/:id', checkIndex, (req, res, next) => {
    envelopeArray.splice(req.index, 1);
    res.status(204).send(envelopeArray);
});

app.put('/envelope/:id/:id2', checkIndex, (req, res, next) => {
    const budgetToMove = envelopeArray[req.index].budget;
    const newEnvelope1 = envelopeArray[req.index];
    newEnvelope1.budget -= budgetToMove;
    const newEnvelope2 = envelopeArray[req.index2];
    newEnvelope2.budget += budgetToMove;
    envelopeArray[req.index] = newEnvelope1;
    envelopeArray[req.index2] = newEnvelope2;
    res.status(200).send(envelopeArray[req.index2]);
});