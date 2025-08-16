require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const pool = require('./config/db');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

// Root endpoint
app.get('/', (req, res) => {
	res.send('Student and Course Management API');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
