const router = require('express').Router();
const sequelize = require('../config/connection');
const { post, user, comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    post.findAll({
        where: {user_id: req.session.user_id},
        attributes: ['id', 'title', 'body', 'created_at'],
        include: [
            {
                model: comment,
                attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: user,
                    attributes: ['username']
                }
            },
            {
                model: user,
                attributes: ['username']
            }
        ]
    })
    .then((data) => {
        // Serializing the data so templates can read it
        const posts = data.map(post.get({ plain: true }));
        // Rendering the dashboard page
        res.render('dashboard', { posts, logged_in: true });
    })
    .catch((err) => {
        console.log(err);
        res.send(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    post.findOne({
        where: {id: req.params.id},
        attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
        include: [
            {
                model: user,
                attributes: ['username']
            },
            {
                model: comment,
                attributes: ['id', 'body', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: user,
                    attributes: ['username']
                }
            }
        ]
                
    })
    .then((data) => {
        if (!data) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        } else {
            const post = data.get({ plain: true });
            res.render('edit', { post, logged_in: true });
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/new-post', (req, res) => {
    res.render('new-post')
})

module.exports = router;