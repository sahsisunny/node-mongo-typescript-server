import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import http from 'http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router  from './routes';

dotenv.config()
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

const app = express();

app.use(cors({
    origin: /https?:\/\/([a-z0-9]+[.])*netlify[.]app|https?:\/\/([a-z0-9]+[.])*netlify[.]com|https?:\/\/localhost(:[0-9]+)?/,
    credentials: true 
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});

app.use('/', router());