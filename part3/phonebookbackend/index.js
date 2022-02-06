require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

const Person = require('./models/person');

app.use(express.static('build'));

app.use(express.json());

morgan.token('body', (req, res) => { return JSON.stringify(req.body); });

app.use(morgan((tokens, req, res) => {
  if (tokens.method(req, res) === 'POST') {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['body'](req, res)
    ].join(' ')
  } else {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
    ].join(' ')
  }
}));


///////////////////////////////////////////////////////////

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    res.send(`<p>Phonebook has info for ${persons.length} peopele</p><p>${new Date()}</p>`);
  });
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons);
  });
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: 'content missing'
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    });
  }
  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  Person.find({}).then(persons => {

    if (persons.find(person => person.name === body.name)) {

      Person.findByIdAndUpdate(body.id, newPerson, {new: true})
        .then(updatedPerson => {
          res.json(updatedPerson);
        })
        .catch(error => next(error));

    } else {

      newPerson.save().then(savedPerson => {
        res.json(savedPerson);
      }).catch(error => next(error));;
    }
  })
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

////////////////////////////////////////////////////////////

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  if (error.name === 'CastError' && error.king === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  next(error);
}

app.use(errorHandler);



//////////////////////////////////

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})