const router = require('express').Router();
const { post, user, comment } = require('../../models/');
const sequelize = require('../../config/connection');

// Authorization required
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
    post.findAll({
        attributes: ['id', 'title', 'body', 'created_at'],
        include: [
            {
                model: user,
                attributes: ['username']
            },
            {
                model: comment,
                attributes: ['body', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: user,
                    attributes: ['username']
                }
            }
        ]
    })
    .then((data) => res.json(data))
    .catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/:id', withAuth, (req, res) => {
    post.findOne({
        where: {id: req.params.id},
        attributes: ['id', 'title', 'body', 'created_at'],
        include: [
            {
                model: user,
                attributes: ['username']
            },
            {
                model: comment,
                attributes: ['body', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: user,
                    attributes: ['username']
                }
            }
        ]
    })
    .then((data) => res.json(data))
    .catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/', withAuth, (req, res) => {
    post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.body.user_id
    })
    .then((data) => res.json(data))
    .catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.put('/:id', withAuth, (req, res) => {
    post.update(
        {
        where: {id: req.params.id},
        },
        {
            title: req.body.title,
            body: req.body.body
        }
    )
    .then((data) => {
        if(!data) {
            res.status(404).json({message: 'No post found with this ID!'})
            return;
        } else {
            res.json(data)
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.delete('/:id', withAuth, (req, res) => {
    post.destroy({
        where: {id: req.params.id}
    })
    .then((data) => {
        if(!data) {
            res.status(404).json({message: 'No post found with this ID!'})
            return;
        } else {
            res.json(data)
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
})