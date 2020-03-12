import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/posts`)
			.then(res => {
				console.log(res.data);
				setPosts(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	return (
		<>
			{posts.map(post => {
				return (
					<div key={post.id}>
						<h2>{post.title}</h2>
						<p>{post.contents}</p>
						<p>{post.comments}</p>
					</div>
				);
			})}
		</>
	);
}

export default App;
