const express = require('express');
const router = express.Router();
const File = require('../schemas/files');
const Folder = require('../schemas/folders');


router.get('/single/object', async (req, res) => {
    let file = await File.findOne(
        {
            _id: '61614458b9d2891a292febb6'
        }
    ).populate({
        path: 'user', model: 'users', select: {
            '_id': 1, 'name': 1,
        }
    });

    res.send(file);
});

router.get('/multiple/object', async (req, res) => {
    let folder = await Folder.findOne(
        {
            _id: '616147b0f8126060b5785935'
        }
    ).populate([
        {
            path: 'user', model: 'users', select: {
                '_id': 1, 'name': 1,
            }
        },
        {
            path: 'files', model: 'files', select: {
                '_id': 1, 'name': 1
            }
        }
    ]);

    res.send(folder);
});

router.get('/nested/object', async (req, res) => {
    let folder = await Folder.findOne(
        {
            _id: '616147b0f8126060b5785935'
        }
    ).populate([
        {
            path: 'user', model: 'users', select: {
                '_id': 1, 'name': 1,
            }
        },
        {
            path: 'files', model: 'files', select: {
                '_id': 1, 'name': 1, 'user': 1
            }, populate: {
                path: 'user', model: 'users', select: {
                    '_id': 1, 'name': 1,
                }
            }
        }
    ]);

    res.send(folder);
});

router.get('/conditional/object', async (req, res) => {
    let folder = await Folder.findOne(
        {
            _id: '616147b0f8126060b5785935'
        }
    ).populate([
        {
            path: 'user', model: 'users', select: {
                '_id': 1, 'name': 1,
            }
        },
        {
            path: 'files', model: 'files',
            match: { size: { $gt: 0.5 } }, select: {
                '_id': 1, 'name': 1, 'user': 1, 'size': 1
            }, populate: {
                path: 'user', model: 'users', select: {
                    '_id': 1, 'name': 1,
                }
            }
        }
    ]);

    res.send(folder);
});


module.exports = router;