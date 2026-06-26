
const errorHandler = (err,req,res,next)=>{
    console.error(err.stack);

    if(err.code === 11000 || err.message?.includes('must be unique')){
        return res.status(400).json({
            success: false,
            message: 'Email already registered'
        });
    }

    if(err.name === 'ValidationError'){
        const messages = Object.values(err.errors).map((e)=> e.message);
        return res.status(400).json({
            success: false,
            message: messages.join(', '),
        });
    }

    if(err.name === 'JsonWebTokenError'){
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }

    if(err.name === 'TokenExpiredError'){
        return res.status(401).json({
            success: false,
            message: 'Token Expired',
        });
    }

    res.status(500).json({
        success: false,
        message: 'Internal server error',
    });
};

module.exports = errorHandler;