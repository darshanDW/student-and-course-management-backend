//for making jwt token to test the postman api
const jwt = require('jsonwebtoken');
require('dotenv').config();
const token = jwt.sign({ role: 'admin', username: 'testadmin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log(token);