const models = require("../models");
const Validator = require("fastest-validator");

// function index(req,res) {
//     const posts = "Posts list";
//     res.send(posts);
// }


function save(req, res) {
    console.log(req.body);
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: 1 //to be changed later...
    }

    //validation schema
    const schema = {
        title: {
            type: "string",
            optional: false,
            max: "100" 
        },
        content: {
            type: "string", 
            optional: false,
            max: "500"
        },
        categoryId: {
            type: "number",
            optional: false
        }
    }

    //validate the data 
    const v = new Validator();
    const validation = v.validate(post, schema);

    //set error response
    if (validation !== true) {
        return res.status(400).json({
            message: "data validation failed, check again",
            errors: validation
        });
    }

    models.Post.create(post)
        .then(result => {
            res.status(201).json({
                message: "ok",
                post: result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "error",
                error: error
            })
        })
}

function show(req,res) {
    const id = req.params.id;
    models.Post.findByPk(id)
        .then(result => {
            // check the result
            if (result) {
                res.status(200).json({
                    result
                });
            } else {
                res.status(404).json({
                    message: "post not found!"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "error - not found!",
                error
            })
        });
}

function showAll(req,res) {
    models.Post.findAll({raw:true})
        .then(result => {
            //to console!
            console.log(result);
            res.status(200).json({
                result 
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "not found!",
                error
            });
        })
}

function update(req,res) {
    const id = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id
    }
    const userId = 1;
    //validation schema
    const schema = {
        title: {
            type: "string",
            optional: false,
            max: "100" 
        },
        content: {
            type: "string", 
            optional: false,
            max: "500"
        },
        categoryId: {
            type: "number",
            optional: true
        }
    }

    //validate the data 
    const v = new Validator();
    const validation = v.validate(updatedPost, schema);

    //set error response
    if (validation !== true) {
        return res.status(400).json({
            message: "data validation failed, check again",
            errors: validation
        });
    }

    models.Post.update(updatedPost, {where: {id:id, userId:userId}})
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "ok, updated",
                    post: result //boolean: whether updated or not
                });
            } else {
                res.status(404).json({
                    message: "error while updating",
                    post: result //boolean: whether updated or not
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "error while updating",
                error: error
            })
        });
}

function destroy(req,res) {
    const id = req.params.id;
    const userId = 1;

    models.Post.destroy({where: {id:id, userId:userId}})
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "ok, deleted",
                    post: result 
                });
            } else {
                res.status(404).json({
                    message: "error on deleting - not found",
                    post: result 
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "error while deleting",
                error: error
            })
        });
}

module.exports = {
    save,
    show,
    showAll,
    update,
    destroy
}