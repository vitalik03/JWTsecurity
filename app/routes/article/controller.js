const Article = require('../../models/article');
const constants = require('../../../constants/index');


const getAllArticle = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
  try {
    const articles = await new Article().getAllArticle(page,limit)
    const count = await new Article().findwithoutPagination();


    res.status(constants.STATUS.Ok).json({
      articles,
      totalPages: Math.ceil(count.length / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }
}

const createArticle = async (req, res) => {
        const articleData = req.body;
        const article = await new Article().createArticle(articleData);
        return res.status(constants.STATUS.Ok).json(article);
}

const deleteArticle = async (req, res) => {
    const id = req.params.id;
    const userFromToken = req.user;
        if (!id) return res.status(constants.STATUS.BadValidation).json(constants.BAD_REQUEST);
        const findDeleteArticle = await new Article().getOneArticle(id);
        if (findDeleteArticle.user_id.toString() === userFromToken.userData.id){
            if (findDeleteArticle){
                const deleteArticle = await new Article().deleteArticleById(id);
                return res.status(constants.STATUS.Ok).json(deleteArticle); 
            }
            return res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND);
        }else return res.status(constants.STATUS.Forbidden).json(constants.NOT_ALLOW);

}

const getOneArticle = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(constants.STATUS.BadValidation).json(constants.BAD_REQUEST);
    const findOne = await new Article().getOneArticle(id);
    if (findOne) return res.status(constants.STATUS.Ok).json(findOne); 
    return res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND);
    
}

const updateArticle = async (req, res) => {
    const articleData = req.body;
    const id = req.params.id;
    const userFromToken = req.user;
        if (!id) return res.status(constants.STATUS.BadValidation).json(constants.BAD_REQUEST);
        const findUpdateArticle = await new Article().getOneArticle(id);

        if (findUpdateArticle.user_id.toString() === userFromToken.userData.id){
            if (findUpdateArticle){
                const updateArticle = await new Article().updateArticle(id, articleData);
                return res.status(constants.STATUS.Ok).json(updateArticle); 
            }
            return res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND);
        }else return res.status(constants.STATUS.Forbidden).json(constants.NOT_ALLOW);

}

module.exports = {
    getAllArticle,
    createArticle,
    getOneArticle,
    deleteArticle,
    updateArticle
}