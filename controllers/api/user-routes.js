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

router.post('/', (req, res) => {

    user.create({
        username: req.body.username,
        password: req.body.password
    })
    .then((data) => {
        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;

            res.json(data);
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post('/login', (req, res) => {
    user.findOne({
            where: {
                username: req.body.username
            }
        }).then((data) => {
            if (!data) {
                res.status(400).json({ message: 'No user with that username' });
                return;
            }
            const validPassword = data.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password! Try Again' });
                return;
            }
            req.session.save(() => {

                req.session.user_id = data.id;
                req.session.username = data.username;
                req.session.loggedIn = true;

                res.json({ user: data, message: 'Successfully logged in!' });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {

    user.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then((data) => {
            if (!data) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.delete('/:id', (req, res) => {
    user.destroy({
            where: {
                id: req.params.id
            }
        })
        .then((data) => {
            if (!data) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;