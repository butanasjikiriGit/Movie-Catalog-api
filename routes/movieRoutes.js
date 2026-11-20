const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieControllers.js');
const { verify, verifyAdmin } = require('../auth.js');


router.post('/addMovie', verify, verifyAdmin, movieController.addMovie);

router.get('/getMovies', verify, movieController.getMovies);

router.get('/getMovie/:movie_Id', verify, movieController.getMovie);

router.patch('/updateMovie/:movie_Id', verify, verifyAdmin, movieController.updateMovie);

router.delete('/deleteMovie/:movie_Id', verify, verifyAdmin, movieController.deleteMovie);

router.patch('/addComment/:movie_Id', verify, movieController.addComment);

router.get('/getComments/:movie_Id', verify, movieController.getComments);





module.exports = router;