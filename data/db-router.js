const express = require('express');
const router = express.Router();

const Hub = require('./db');

// *********************************** GET REQUESTS

// Get All Posts
router.get('/', (req, res) => {
	Hub.find(req.query)
		.then(hub => {
			res.status(200).json(hub);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error retrieving data'
			});
		});
});

// Get Post By ID
router.get('/:id', (req, res) => {
	Hub.findById(req.params.id)
		.then(id => {
			res.status(201).json(id);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Could not get by id'
			});
		});
});

// Get All Comments Related To Post
router.get('/:id/comments', (req, res) => {
	Hub.findPostComments(req.params.id)
		.then(comments => {
			res.status(201).json(comments);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Cannot get comments'
			});
		});
});

// *********************************** POST REQUESTS

// Create New Post
router.post('/', (req, res) => {
	Hub.insert(req.body)
		.then(post => {
			res.status(201).json(post);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Could not complete new post'
			});
		});
});

// Create New Post Comment
router.post('/:id/comments', (req, res) => {
	if (Hub.findById(req.params.id)) {
		Hub.insertComment(req.body)
			.then(comment => {
				res.status(201).json(comment);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					message: 'Could not post comment'
				});
			});
	} else {
		res.status(404).json({
			message: 'ID not found'
		});
	}
});

// *********************************** DELETE REQUESTS

router.delete('/:id', (req, res) => {
	Hub.remove(req.params.id)
		.then(removed => {
			console.log(removed);
			res.status(201).json(removed);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Could not delete post'
			});
		});
});

// *********************************** PUT REQUESTS

router.put('/:id', (req, res) => {
	Hub.update(req.params.id, req.body)
		.then(post => {
			console.log(post);
			res.status(201).json(post);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Could not edit post'
			});
		});
});

module.exports = router;
