import { config } from 'dotenv';
import routesList from './routes.list';

if (process.env.NODE_ENV !== "production") {
    config();
}

const PORT = process.env.PORT;
const CUSTOM_PORT = process.env.CUSTOM_PORT;
const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI_UM = process.env.MONGO_URI_UM;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;


export {
    PORT,
    CUSTOM_PORT,
    MONGO_URI,
    MONGO_URI_UM,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    routesList
};