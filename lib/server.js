import express from 'express';
import path    from 'path';

process.env.PORT = 8090;

express()

	// Setting dist folder to serve static content
	.use('/dist', express.static(path.join(__dirname, '../dist')))

	.get('*', (req, res) => {
		return res.sendFile(path.join(__dirname, '../index.html'));
	})

	.listen(8090, () => {
		console.log('Running on port ', process.env.PORT);
	});