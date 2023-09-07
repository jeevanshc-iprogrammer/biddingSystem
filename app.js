const express = require('express');
require('dotenv').config();
const port = process.env.PORT;
const authRoutes = require('./routes/authRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const bidderRoutes = require('./routes/bidderRoutes');

const {User} = require('./model/user');


const app = express();

app.use(express.json());

app.use('/v1/auth',authRoutes);
app.use('/v1/owner',ownerRoutes);
app.use('/v1/bidder',bidderRoutes);

// User.sync()
//   .then(() => {
//     console.log('User table created successfully.');
//   })
//   .catch((error) => {
//     console.error('Error creating User table:', error);
//   });

app.listen(port, ()=> {
    console.log(`App is running on ${port}`);
})