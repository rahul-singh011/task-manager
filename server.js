const app = require('./src/app')
const connectDB = require('./src/config/db')
const {config} = require('./src/config/env')

const startServer = async ()=>{
    await connectDB();

    app.listen(config.port, ()=>{
        console.log(`Server is running on port: ${config.port} `)
    });
};

startServer();


