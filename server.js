require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');

const SERVER_CONFIG = require('./utils/env');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    next();
});

app.get('/', (req, res) => {
    return res.send('Welcome to Stackivy User Authentication Service');
});


//app.use('/api/auth', authRoutes);

// app.use((req, res, next) => {
//     throw new NotFoundError(`${req.originalUrl} is not defined`);
// });

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Something went wrong, please try again';
    logger.error(
      `Request failed with status code: ${statusCode} and message: ${message} at path: ${req.originalUrl}`
    );
    return res.status(statusCode).json({
      message,
      status: false,
      data: null,
    });
});

app.listen(SERVER_CONFIG.port, () => {
    console.log(`Server listening on ${ SERVER_CONFIG.port}`);
})

process.on('SIGINT', async () => {
    process.exit(0);
});
  