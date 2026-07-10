const express = require('express')
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/error.middleware')
const authorize = require('./middlewares/authorize.middleware');
const {authenticate} = require('./middlewares/auth.middleware')
const taskRoutes = require('./routes/task.routes');
const {globalLimiter , authLimiter} = require('./middlewares/rateLimiter.middleware');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(globalLimiter);

app.use('/api/v1/auth', authLimiter, authRoutes );
app.use('/api/v1/tasks', taskRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/health', (req,res)=>{
    res.status(200).json({status: "ok"})
});

app.use(errorHandler);

module.exports = app;