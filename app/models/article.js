const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const articleScheme = new Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 20
    },
    about: {
        type: String,
        default: '',
        maxlength: 300
    },

    user_id: {
        type: Schema.ObjectId,
        ref: 'User',
      },
}, { 
    versionKey: false 
})

const article = mongoose.model('article', articleScheme);

class Article {
    static get tableName() {
        return 'article';
    }

    getAllArticle(page,limit) {
        return new Promise(async (resolve, reject) => {
            await article.find({}, (err, users) => {
                if (err) return reject(err);
                resolve(users);
            })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        });
    }
    findwithoutPagination() {
        return new Promise(async (resolve, reject) => {
            await article.find({}, (err, users) => {
                if (err) return reject(err);
                resolve(users);
            })
        });
    }

    createArticle(articleData) {
        return new Promise(async (resolve, reject) => {
            await article.create(articleData, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            })
        });
    }
    deleteArticleById(id){
        return new Promise(async (resolve, reject) => {
            await article.findByIdAndDelete(id, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        });
    }

    updateArticle(id,articleData) {
        return new Promise(async (resolve, reject) => {
            await article.findByIdAndUpdate(id,articleData, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        });
    }

    getOneArticle(id) {
        return new Promise(async (resolve, reject) => {
            await article.findById(id, (err, res) => {
                if(err) reject(err);
                resolve(res);
            })
        })
    }
}

module.exports = Article;