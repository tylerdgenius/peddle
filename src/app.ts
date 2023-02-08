import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ProcessEnv } from './types';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { loadServices } from './services';
import { connectDB } from './config';
import { DBUrls } from './i18n';
import { logToConsole } from './utilities';

dotenv.config();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // credentials: true,
};

const app: Express = express();

app.use(cors(corsOptions));

const server = createServer(app);

const io = new Server(server, {
  cors: corsOptions,
});

loadServices(app, io);

const {
  BACKEND_LOCAL_PORT,
  PORT: ENV_PORT,
  NODE_ENV,
} = process.env as ProcessEnv;

const PORT = ENV_PORT || BACKEND_LOCAL_PORT || 7007;

connectDB(DBUrls[NODE_ENV]);

server.listen(PORT, () => {
  logToConsole(`Peddle api currently running on port ${PORT}`);
});
