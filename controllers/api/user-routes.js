const router = require('express').Router();
const { user, post, comment } = require('../../models/');
const sequelize = require('../../config/connection');

router.get('/', (req, res) => {
    user.findAll({
        attributes: { exclude: ['password'] }
    })
    .then((data) => res.json(data))
    .catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res) => {
    user.findOne({
        where: {id: req.params.id},
        attributes: { exclude: ['password'] },
        include: [
            {
                model: post,
                attributes: ['id', 'title', 'body', 'created_at']
            },
            {
                model: comment,
                attributes: ['id', 'body', 'created_at'],
                include: {
                    model: post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then((data) => {
        if(!data) {
            res.status(404).json({message: 'No user found with this id'});
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

router.post()

router.put()

router.delete()