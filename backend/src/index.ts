import express, {Application} from 'express';
import {config} from 'dotenv';
import connection from './config/dbConnection';
import cors from 'cors';
import helmet from  'helmet';
import authRouter from './routes/auth.route';
import { credentials } from './middlewares/credentials';
import { corsOptions } from './helpers/corsOptions';




// Inititializing express app
const app:Application = express();

// Configuring our environmental variables
config()
const PORT = process.env.PORT

// Db connection configuration
connection()

// middlewares
app.use(helmet());
app.use(credentials)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions))

// Routes
app.use('/api/v1', authRouter)

app.listen(PORT || 8080, () => {
    console.log(`Server listening on port ${PORT}`);
    
})