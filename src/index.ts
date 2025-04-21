import express from 'express';
import userRoutes from './routes/user.routes';
import todoRoutes from './routes/todo.routes';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());



// Parsing URL-encoded body
app.use(express.urlencoded({ extended: true }));


app.use('/api', userRoutes);
app.use('/api', todoRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
