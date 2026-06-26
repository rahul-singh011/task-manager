const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: [true, "Email must be unique"],
        lowercase: true,
    },

    password: {
        type: String,
        rquire: [true, "Password is required"],
        trim: true,
        minlength: [6, "Password must be atleast 6 characters"],
    },

    role:{
        type: String,
        enum : ['user', 'admin'],
        default: 'user',
    },
}, {
    timestamps : true,
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password , 10);
    
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword , this.password);
};

const User  = mongoose.model('User', userSchema);

module.exports = User;