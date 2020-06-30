const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userScheme = new Schema({
    first_name: {
        type: String,
        minlength: 2,
        maxlength: 20
    },
    last_name: {
        type: String,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    },
    password: {
        type: String,
        required: true
    }
}, { 
    versionKey: false 
})

const user = mongoose.model('users', userScheme);

class User {
    static get tableName() {
        return 'users';
    }

    getAllUsers() {
        return new Promise(async (resolve, reject) => {
            await user.find({}, (err, users) => {
                if (err) reject(err);
                resolve(users);
            })
        });
    }
    
    createUser(userData) {
        return new Promise(async (resolve, reject) => {
            userData.password = bcrypt.hashSync(userData.password, 10);
            await user.create(userData, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            })
        });
    }

    deleteUserById(id){
        return new Promise(async (resolve, reject) => {
            await user.findByIdAndDelete(id, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        });
    }

    updateUser(id, userData) {
        return new Promise(async (resolve, reject) => {
            userData.password = bcrypt.hashSync(userData.password, 10);
            await user.findByIdAndUpdate(id,userData, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        });
    }

    getByEmail(email) {
        return new Promise(async (resolve, reject) => {
            await user.findOne({email}, (err, res) => {
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    getOneUser(id) {
        return new Promise(async (resolve, reject) => {
            await user.findById(id, (err, res) => {
                if(err) reject(err);
                resolve(res);
            })
        })
    }

    checkPassword(first, second) {
        return bcrypt.compareSync(first, second);
    }
}

module.exports = User;