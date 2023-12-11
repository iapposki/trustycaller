require('dotenv').config();
import express from 'express';
import {Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { signup, login } from './controllers/user.controller';
import { authenticate } from './middleware/auth';
import { spamReport } from './controllers/report.controller';
import { searchSpamByName, searchSpamByNumber } from './controllers/search.controller';

const app: Express = express();
const port: number = 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.post('/auth/signup', signup);
app.post('/auth/login', login);

app.post('/spamreport', authenticate, spamReport);

app.get('/search/byname', authenticate, searchSpamByName)
app.get('/search/bynumber', authenticate, searchSpamByNumber)


if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

export default app;