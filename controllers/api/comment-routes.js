const router = require('express').Router();
const { comment } = require('../../models/');

// Authorization required
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await comment.create({
            ...req.body,
            userId: req.session.user_id,
        });
        res.json(newComment)
    } 
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;