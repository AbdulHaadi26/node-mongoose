const express = require('express');
const router = express.Router();
const File = require('../schemas/files');
const folders = require('../schemas/folders');
const Post = require('../schemas/posts');


router.get('/find/all', async (req, res) => {
    let file = await File.aggregate([
        {
            $match: {
                size: {
                    $gte: 0.5
                }
            }
        }
    ])

    res.send(file);
});

router.get('/find/fields', async (req, res) => {
    let file = await File.aggregate([
        {
            $match: {
                size: {
                    $gte: 0.5
                }
            }
        },
        {
            $project: {
                name: 1, size: 1
            }
        },
    ])

    res.send(file);
});

router.get('/sum/all', async (req, res) => {
    let file = await File.aggregate([
        {
            $match: {
                size: {
                    $gte: 0.5
                }
            }
        },
        {
            $project: {
                name: 1, size: 1
            }
        },
        {
            $group: {
                _id: null,
                sum: {
                    $sum: "$size"
                }
            }
        }
    ])

    res.send(file);
});


router.get('/sum/user', async (req, res) => {
    let file = await File.aggregate([
        {
            $match: {
                size: {
                    $gte: 0.5
                }
            }
        },
        {
            $project: {
                name: 1, size: 1, user: 1
            }
        },
        {
            $group: {
                _id: "$user",
                sum: {
                    $sum: "$size"
                }
            }
        }
    ])

    res.send(file);
});

router.get('/sum/user', async (req, res) => {
    let file = await File.aggregate([
        {
            $match: {
                size: {
                    $gte: 0.5
                }
            }
        },
        {
            $project: {
                name: 1, size: 1, user: 1
            }
        },
        {
            $group: {
                _id: "$user",
                sum: {
                    $sum: "$size"
                }
            }
        }
    ])

    res.send(file);
});

router.get('/lookup', async (req, res) => {
    let data = await Post.aggregate([
        {
            $lookup: {
                from: 'comments',
                localField: "title",
                foreignField: "postTitle",
                as: 'comment'
            }
        },
    
    ])

    res.send(data);
});

router.get('/pipeline', async (req, res) => {
    let data = await Post.aggregate([
        {
            $lookup: {
                from: 'comments',
                let: { post_likes: "$likes", post_title: "$title"},
                pipeline: [
                    { $match:
                        { $expr:
                            { $and:
                                [
                                   { $lt: [ "$likes", "$$post_likes"] },
                                   { $eq: ["$$post_title", "$postTitle" ] }
                                ]
                            }
                        }
                    }
                ],
                as: 'comment'
            }
        },
    
    ])

    res.send(data);
});

router.get('/unwind', async (req, res) => {
    let data = await folders.aggregate([
        {
            $unwind : "$files"
        }
    ])

    res.send(data);
});
module.exports = router;