import express from 'express';
import cors from 'cors';
import router from './route';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {});
