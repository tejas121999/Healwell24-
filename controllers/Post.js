const { Post } = require('../models')
const model = require('../models');

exports.getAllPost = async (req, res) => {
    try {
        var getPost = await Post.findAndCountAll({
            where: {
                isDelete: false,
                isPublish: true
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.User,
                    as: 'Author_data',
                    subQuery: false,
                    attributes: [
                        'user_name',
                        "email"
                    ]
                }
            ]
        })
        if (!getPost) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                getPost
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.getAuthorsPost = async (req, res) => {
    try {
        var getPost = await Post.findAndCountAll({
            where: {
                isDelete: req.body.isDelete,
                Author: req.body.Author,
                isPublish: req.body.isPublish
            },
            limit: req.body.limit,
            offset: req.body.offset,
            include: [
                {
                    model: model.User,
                    as: 'Author_data',
                    subQuery: false,
                    attributes: [
                        'user_name',
                        "email"
                    ]
                }
            ]
        })
        if (!getPost) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                getPost
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}


exports.addPost = async (req, res) => {
    try {
        const { post } = req.body
        var create_post = await Post.create(post)
        if (!create_post) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                create_post
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.updatePost = async (req, res) => {
    try {
        const { post } = req.body
        var updatePost = await Post.update(
            post,
            {
                where: {
                    id: post.id
                }
            }
        )
        return res.status(200).send({
            message: "update post",
            updatePost
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { post_id } = req.body
        const data = await Post.findOne({ where: { id: post_id } })
        if (!data) {
            return res.status(404).json({
                message: "post not found"
            })
        } else {
            Post.update({
                isDelete: true
            }, {
                where: {
                    id: post_id
                }
            }).then((_) => {
                res.status(200).send({
                    message: "Delete",
                    // data
                })
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.getPostById = async (req, res) => {
    try {
        const { post_id } = req.body
        const data = await Post.findOne(
            {
                where: {
                    id: post_id
                },
                include: [
                    {
                        model: model.User,
                        as: 'Author_data',
                        subQuery: false,
                        attributes: [
                            'user_name',
                            "email"
                        ]
                    }
                ]
            }
        )
        if (!data) {
            return res.status(404).json({
                message: "post not found"
            })
        } else {
            return res.status(200).json({
                message: "post",
                data
            })
        }
    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

exports.publishPost = async (req, res) => {
    try {
        const { post_id, isPublish } = req.body
        const data = await Post.findOne({ where: { id: post_id } })
        if (!data) {
            return res.status(404).json({
                message: "post not found"
            })
        } else {
            Post.update({
                isPublish: isPublish
            }, {
                where: {
                    id: post_id
                }
            }).then((_) => {
                if (isPublish === true) {
                    res.status(200).send({
                        message: "Published",
                        // data
                    })
                } else {
                    res.status(200).send({
                        message: "Un Published",
                        // data
                    })
                }

            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

