import dotenv from 'dotenv';
dotenv.config();
const env = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,

    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,

    JWT_SECRET: process.env.JWT_SECRET,
    JWT_TTL: process.env.JWT_TTL,

    ADMIN_SERVICE_URL: process.env.ADMIN_SERVICE_URL,
    USER_SERVICE_URL: process.env.USER_SERVICE_URL,
    AJK_SERVICE_URL: process.env.AJK_SERVICE_URL,
    PAYMENT_GATEWAY_URL: process.env.PAYMENT_GATEWAY_URL,

    PAYMENT_SERVICE_SECRET_KEY: process.env.PAYMENT_SERVICE_SECRET_KEY,

    DEFAULT_INVOICE_EXPIRED: process.env.DEFAULT_INVOICE_EXPIRED,
    APPS_PAYMENT_CALLBACK_DEEPLINK: process.env.APPS_PAYMENT_CALLBACK_DEEPLINK
}

export default env;