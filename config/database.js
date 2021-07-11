import mongoose from 'mongoose';
import env from './env';

mongoose.connect(`mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`, {
    useNewUrlParser: true,
    auth: {
        authSource: "admin"
    },
    user: env.DB_USERNAME,
    pass: env.DB_PASSWORD 
})
.then(() => console.log("Connected to database"))
.catch(err => console.log(err));

export default mongoose;