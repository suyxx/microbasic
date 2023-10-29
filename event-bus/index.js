const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const events = [];
const eventQueue = []; // Store events in a queue

// Function to process the event queue
const processEventQueue = () => {
  while (eventQueue.length > 0) {
    const event = eventQueue.shift();
    axios.post('http://posts-srv:4000/events', event)
      .catch((error) => {
        console.error('Error connecting to server 4000:', error.message);
        eventQueue.unshift(event); // Put the event back in the queue
      });
    axios.post('http://comments-srv:4001/events', event)
      .catch((error) => {
        console.error('Error connecting to server 4001:', error.message);
        eventQueue.unshift(event); // Put the event back in the queue
      });
    axios.post('http://query-srv:4002/events', event)
      .catch((error) => {
        console.error('Error connecting to server 4002:', error.message);
        eventQueue.unshift(event); // Put the event back in the queue
      });
    axios.post('http://moderation-srv:4003/events', event)
      .catch((error) => {
        console.error('Error connecting to server 4003:', error.message);
        eventQueue.unshift(event); // Put the event back in the queue
      });
  }
};

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);
  eventQueue.push(event); // Store events in the queue
  console.log(event);

  // Process the event queue
  processEventQueue();

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('listening on http://localhost:4005');
});
