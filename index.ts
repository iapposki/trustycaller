require('dotenv').config();
import express from 'express';
import { Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { signup, login } from './controllers/user.controller';

const app: Express = express();
const port: number = 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.post('/auth/signup', signup)
app.post('/auth/login', login)

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

export default app;