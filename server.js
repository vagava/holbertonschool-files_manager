import express from 'express';
import controllerRouting from './routes/index';

/**
 * This project is a summary of back-end concepts:
 * authentication, NodeJS, MongoDB, Redis,
 * pagination and background processing.
 *
 * The objective was to build a simple platform to upload and view files:
 *
 * User authentication via a token
 * List all files
 * Upload a new file
 * Change permission of a file
 * View a file
 * Generate thumbnails for images
 */

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

controllerRouting(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
