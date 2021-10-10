const express = require('express');
const router = express.Router();
const User = require('../schemas/users');
const File = require('../schemas/files');
const Folder = require('../schemas/folders');
const Post = require('../schemas/posts');
const Comment = require('../schemas/comments');
const mongoose = require("mongoose");

router.put('/user', async (req, res) => {
    await User.insertMany([
        {
            name: 'Test User 1',
            email: 'test1@email.com',
            mobile: '03108994313',
            password: 'new_password',
        },
        {
            name: 'Test User2',
            email: 'test2@email.com',
            mobile: '03108994313',
            password: 'new_password',
        },
    ]);

    res.sendStatus(200);
});

router.put('/folder', async (req, res) => {
    //Simple Create
    await Folder.create({
        _id: new mongoose.Types.ObjectId(),
        name: 'Folder 1',
        files: ['61614458b9d2891a292febb3', '61614458b9d2891a292febb4', '61614458b9d2891a292febb5'],
        user: '616140b675d124fb9058a14f'
    });

    let folderId = new mongoose.Types.ObjectId();
    //Insert & later on insert files
    await Folder.create({
        _id: folderId,
        name: 'Folder 2',
        user: '616140b675d124fb9058a14f'
    });

    let files = ['61614458b9d2891a292febb6', '61614458b9d2891a292febb7', '61614458b9d2891a292febb8']

    await Folder.updateOne(
        {
            _id: folderId
        },
        {
            $push: {
                files:
                {
                    $each: files
                }
            }
        }
    );

    res.sendStatus(200);
});

router.put('/file', async (req, res) => {
    await File.insertMany([
        {
            name: 'File 1',
            type: 'pdf',
            size: 1.01,
            user: '616140b675d124fb9058a14f'
        },
        {
            name: 'File 2',
            type: 'docx',
            size: 0.5,
            user: '616140b675d124fb9058a14f'
        },
        {
            name: 'File 3',
            type: 'xls',
            size: 0.2,
            user: '616140b675d124fb9058a14f'
        },
        {
            name: 'File 4',
            type: 'pdf',
            size: 1.01,
            user: '616140b675d124fb9058a150'
        },
        {
            name: 'File 5',
            type: 'docx',
            size: 0.5,
            user: '616140b675d124fb9058a150'
        },
        {
            name: 'File 6',
            type: 'xls',
            size: 0.2,
            user: '616140b675d124fb9058a150'
        },
    ]);

    res.sendStatus(200);
});

router.put('/post', async (req, res) => {
    await Post.insertMany([
        {
            title: 'Post 1',
            author: 'Jimmy',
            likes: 2
        },
        {
            title: 'Post 2',
            author: 'Sam',
            likes: 5
        }
    ]);


    await Comment.insertMany([
        {
            postTitle: 'Post 1',
            comment: 'Simple 1',
            likes: 2
        },
        {
            postTitle: 'Post 1',
            comment: 'Simple 2',
            likes: 0
        },
          {
            postTitle: 'Post 1',
            comment: 'Simple 3',
            likes: 0
        },
        {
            postTitle: 'Post 2',
            comment: 'Simple 1',
            likes: 2
        },
        {
            postTitle: 'Post 2',
            comment: 'Simple 2',
            likes: 0
        }
    ]);

    res.sendStatus(200);
});

module.exports = router;