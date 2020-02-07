import express from 'express';
// import data from './data';
import addNewVisitors from './data';

const app = express();
const PORT = 5050;

app.get('/', (req, res) => {
  res.send(
    `To get database info...type in URL: http:localhost:${PORT}/api/todos`
  );
});

app.get('/api/visitor/:id', (req, res) => {
console.log("inside function")
  const id = parseInt(req.params.id);
  console.log(id);

  addNewVisitors.map(visit => {
    console.log(visit.id)
    if (visit.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'todo retrieved successfully',
        addNewVisitors,
      });
    }
  });
});

app.delete('/api/visitor/:id', (req, res) => {
  const id = parseInt(req.params.id);

  addNewVisitors.map((visitor, index) => {
    if (visitor.id === id) {
      addNewVisitors.splice(index, 1);
      return res.status(200).send({
        success: 'true',
        message: 'visitor deleted successfully',
      });
    }
  });
});

app.put('/api/visitor/:id', (req, res) => {
  const id = req.params.id;

  var visitorFound;
  var itemIndex;

  addNewVisitors.map((visitor, index) => {
    if (visitor.id === id) {
      visitorFound = visit;
      itemIndex = index;
    }
  });

  if (!visitorFound) {
    return res.status(404).send({
      success: 'false',
      message: 'visitor not found',
    });
  }

  if (!req.body.name) {
    return res.status(400).send({
      success: 'false',
      message: 'name is required',
    });
  } else if (!req.body.age) {
    return res.status(400).send({
      success: 'false',
      messsage: 'age is required',
    });
  }

  const updatedInfo = {
    id: visitorFound.id,
    name: req.body.name || visitorFound.name,
    age: req.body.name || visitorFound.age,
    date: req.body.date,
    time: req.body.time,
    assistor: req.body.assistor,
    comments: req.body.comments,
  };

  data.splice(itemIndex, 1, updatedInfo);

  return res.status(201).send({
    success: 'true',
    message: 'visitor added successdully',
    updatedInfo,
  });
});

app.listen(PORT, () => {
  console.log(`connected to ${PORT}`);
});
