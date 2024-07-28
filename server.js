const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dataFilePath =  'db.json';

// Read data from the file
const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data file:', err);
    return { users: [], boatData: [], bookings: [] }; // return empty data if there's an error
  }
};

// Write data to the file
const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing data file:', err);
  }
};

// Routes for boat data
app.get('/boatData', (req, res) => {
  const data = readData();
  res.json(data.boatData);
});

app.post('/boatData', (req, res) => {
  const data = readData();
  const newBoat = { id: Date.now(), ...req.body };
  data.boatData.push(newBoat);
  writeData(data);
  res.json(newBoat);
});

app.put('/boatData/:id', (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const index = data.boatData.findIndex(boat => boat.id === id);
  if (index !== -1) {
    data.boatData[index] = { ...data.boatData[index], ...req.body };
    writeData(data);
    res.json(data.boatData[index]);
  } else {
    res.status(404).send('Boat not found');
  }
});

app.delete('/boatData/:id', (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  data.boatData = data.boatData.filter(boat => boat.id !== id);
  writeData(data);
  res.sendStatus(204);
});

// Routes for users
app.get('/users', (req, res) => {
  const data = readData();
  res.json(data.users);
});

app.post('/users', (req, res) => {
  const data = readData();
  const newUser = { id: Date.now(), ...req.body };
  data.users.push(newUser);
  writeData(data);
  res.json(newUser);
});

app.put('/users/:id', (req, res) => {
  const data = readData();
  const id = req.params.id;
  const index = data.users.findIndex(user => user.id === id);
  if (index !== -1) {
    data.users[index] = { ...data.users[index], ...req.body };
    writeData(data);
    res.json(data.users[index]);
  } else {
    res.status(404).send('User not found');
  }
});

app.delete('/users/:id', (req, res) => {
  const data = readData();
  const id = req.params.id;
  data.users = data.users.filter(user => user.id !== id);
  writeData(data);
  res.sendStatus(204);
});

// Routes for bookings
app.get('/bookings', (req, res) => {
  const data = readData();
  res.json(data.bookings);
});

app.post('/bookings', (req, res) => {
  const data = readData();
  const newBooking = { id: Date.now(), ...req.body };
  data.bookings.push(newBooking);
  writeData(data);
  res.json(newBooking);
});

app.put('/bookings/:id', (req, res) => {
  const data = readData();
  const id = req.params.id;
  const index = data.bookings.findIndex(booking => booking.id === id);
  if (index !== -1) {
    data.bookings[index] = { ...data.bookings[index], ...req.body };
    writeData(data);
    res.json(data.bookings[index]);
  } else {
    res.status(404).send('Booking not found');
  }
});

app.delete('/bookings/:id', (req, res) => {
  const data = readData();
  const id = req.params.id;
  data.bookings = data.bookings.filter(booking => booking.id !== id);
  writeData(data);
  res.sendStatus(204);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
