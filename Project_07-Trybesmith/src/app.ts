import express from 'express';
import productsRouter from './routers/products.router';
import ordersRouter from './routers/orders.router';
import loginRouter from './routers/login.routers';

const app = express();

app.use(express.json());
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/login', loginRouter);

export default app;
