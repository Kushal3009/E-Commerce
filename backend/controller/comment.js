const Comment = require('../models/Comment.js');

const addComment = async (req, res) => {
    const productId = req.params.id;
    const userId = req.userId;
    console.log(userId)
    // Check if content and rating are provided
    const { content, rating } = req.body;

    if (!content || typeof rating === 'number') {
        return res.status(400).json({ error: "Content and rating are required." });
    }

    try {
        const comment = new Comment({
            user: userId,
            product: productId,
            content,
            rating
        });
        await comment.save();
        res.status(201).json({ msg: "Comment Added Successfully." });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "An error occurred while adding the comment." });
    }
};

const getComments = async (req, res) => {
    const productId = req.params.id;

    try {
        const comments = await Comment.find({ product: productId }).populate('user', 'username');
        res.json(comments);
    } catch (error) {
        console.error("Error retrieving comments:", error);
        res.status(500).json({ error: "An error occurred while retrieving comments." });
    }
};

module.exports = {
    addComment,
    getComments
};
