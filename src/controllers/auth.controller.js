const {registerUser , loginUser} = require('../services/auth.service')
const asyncHandler = require('../utils/asyncHandler')

const register = async (req,res)=>{
   
        const {name,email, password} = req.body;
        const user = await registerUser({name,email,password});

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user,
        });
};

const login = async (req,res)=>{

    const {email, password} = req.body;
    const data = await loginUser({email, password});
    res.status(200).json({
        success: true, 
        message: "Login Successfully",
        data
    });

}

module.exports = {register, login};