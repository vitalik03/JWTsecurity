const express = require('express');

const articleController = require('./controller');
const middleware = require('../../middleware/index');

const router = express.Router();

router
    .get('/' , articleController.getAllArticle)

    .post('/', middleware.check, articleController.createArticle)
    .get('/:id', articleController.getOneArticle)
    .delete('/:id', middleware.check,articleController.deleteArticle)
    .put('/:id', middleware.check, articleController.updateArticle)

module.exports = router;