const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {

};

app.get('/posts/:id/comments', (req, res) => {
    console.log(req.params.id);
    console.log(commentsByPostId[req.params.id])
    res.send(commentsByPostId[req.params.id] || []);
});


app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId,  content});
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    });

    res.status(201).send(comments);
});

app.post('/events',  async (req, res) => {
    console.log('Received events', req.body.type);
    const {type, data} = req.body;
    if (type === 'CommentModerated'){
        const {postId, id, status, content} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id;
        });

        comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        });
    }
    res.send({})
});

app.listen(4001, (err, res) => {
    console.log("listening on port 4001");
});