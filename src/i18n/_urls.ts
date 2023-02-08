import dotenv from 'dotenv';
import { ProcessEnv } from '../types';
import { namespaceCreator, routeCreator } from '../utilities';

dotenv.config();

const BackendUrlGetter = (urlFilter: string, port = 7000) => ({
  production: `https://peddle.ng/api/${urlFilter}`,
  development: `http://localhost:${port}/api/${urlFilter}`,
  staging: `https://staging.peddle.ng/api/${urlFilter}`,
});

const FrontendUrlGetter = (port = 8100) => ({
  production: 'http://peddle.ng',
  development: `http://localhost:${port}`,
  staging: 'http://staging.peddle.ng',
});

const { BACKEND_LOCAL_PORT, NODE_ENV, DB_PROD, DB_DEV, DB_STAGING } =
  process.env as ProcessEnv;

export const AppUrls = {
  backendPort: BACKEND_LOCAL_PORT,
  frontendUrl: FrontendUrlGetter(Number.parseInt(BACKEND_LOCAL_PORT, 10))[
    NODE_ENV
  ],
  backendUrl: BackendUrlGetter('', Number.parseInt(BACKEND_LOCAL_PORT, 10))[
    NODE_ENV
  ],
};

export const DBUrls = {
  production: DB_PROD,
  development: DB_DEV,
  staging: DB_STAGING,
};

export const Routes = {
  entry: routeCreator({ path: '/' }),
  user: {
    entry: routeCreator({ path: '/user' }),
    register: routeCreator({ path: '/register', method: 'post' }),
    login: routeCreator({ path: '/login', method: 'post' }),
  },
  product: {
    entry: routeCreator({ path: '/products' }),
    addProduct: routeCreator({ path: '/add', method: 'post' }),
    editProduct: routeCreator({ path: '/edit', method: 'put' }),
    deleteProduct: routeCreator({ path: '/edit', method: 'put' }),
    getProducts: routeCreator({ path: '/view' }),
  },
};

export const Namespaces = {
  entry: namespaceCreator({ path: '/' }),
};
