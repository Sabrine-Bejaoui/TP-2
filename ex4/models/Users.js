const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 3,
    },

    password:{
        type: String,
        required: true,
        minlength: 6,
    },
});


//Middleware pour hacher le mot de passe avant de sauvgarder l'utilisteur
userSchema.pre('save', async function (next){
    if(!this.isModified('password')) 
        return next();


    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Méthode pour comparer les mots passe
userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;