const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Custom middleware for time verification
const isWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue if it's a workday between 9 AM and 5 PM
  } else {
    res.send('The website is only available during working hours (Monday to Friday, 9 AM - 5 PM).');
  }
};

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Apply the time verification middleware to all routes
app.use(isWorkingHours);

// Define routes and render pages
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});