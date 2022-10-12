const router = require('express').Router();
const { user, post } = require('../models');

// Authorization required
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try{
        const userData = await user.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']]
        });

        const users = userData.map((project) => project.get({ plain: true }));

        res.render('dashboard', {users, logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    } else {
        res.render('login');
    }
});

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/post/:id', (req, res) => {
    post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'content', 'title', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
            if (!data) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = data.get({ plain: true });
            console.log(post);
            res.render('single-post', { post, logged_in: req.session.logged_in });


        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/posts-comments', (req, res) => {
    post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'content', 'title', 'created_at' ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
            if (!data) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = data.get({ plain: true });

            res.render('posts-comments', { post, logged_in: req.session.logged_in });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;


