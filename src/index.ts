import express, { ErrorRequestHandler } from 'express';
import userRoutes from './routes/user.routes';
import todoRoutes from './routes/todo.routes';
import categoryRoutes from './routes/category.routes';
import postRoutes from './routes/post.routes';
import postCategoryRoutes from "./routes/postcategry.routes";
import dotenv from 'dotenv';
import cors from 'cors';
import path  from 'path';


dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());



// Parsing URL-encoded body
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));



app.use('/api', userRoutes);
app.use('/api', todoRoutes);
app.use('/api', categoryRoutes);
app.use('/api', postRoutes);
app.use('/api', postCategoryRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
