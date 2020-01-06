import express from 'express';
import dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from 'morgan';
import cors from 'cors';
// eslint-disable-next-line no-unused-vars
import colors from 'colors';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportConfig from './src/middleware/passport';
import connectDB from './src/config/db';
import errorHandler from './src/middleware/error';
import profileRoutes from './src/routes/profile';
import authRoutes from './src/routes/auth';
import ignoreFavicon from './src/middleware/ignoreFavicon';

// Load env
dotenv.config({ path: './src/config/config.env' });

const NODE_ENV = process.env.NODE_ENV || 'production';

// Connect to DB
connectDB();

// Loading Passport Config
passportConfig(passport);

const app = express();
app.use(passport.initialize());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dev logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());
app.use(ignoreFavicon);
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Server Up and Running' });
});
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/auth', authRoutes);

// No Route found
app.use(function(req, res) {
  return res
    .status(404)
    .send({ success: false, message: `Route${req.url} Not found.` });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow)
);
