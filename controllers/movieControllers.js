const Movie = require('../models/Movies.js');




// Add new movie (Admin only)
module.exports.addMovie = (req, res) => {

	const { title, director, year, description, genre } = req.body;
	const yearRegex = /^\d+$/;

	if (!title || !director || !year || !description || !genre){
		return res.status(400).send({
			message: 'fields should not be empty'
		});
	} else if (!yearRegex.test(year)){
		return res.status(400).send({
			message: 'Year should only contain numbers'
		});
	} else if (year.length !== 4){
		return res.status(400).send({
			message: 'Invalid year format'
		})
	} else {

		return Movie.findOne({ title: title})
		.then((existing) => {
			if (existing){
				return res.status(409).send({
					message: 'Movie already existed'
				})
			} else {

				const newMovie = new Movie({
					title: title,
					director: director,
					year: year,
					description: description,
					genre: genre
				})

				return newMovie.save()
				.then((result) => {
					if (!result){
						return res.status(400).send({
							message: 'Failed to add movie'
						})
					} else {
						return res.status(200).send(result);
					}
				})
				.catch((err) => {
					return res.status(500).send({
						error: 'Internal Server Error'
					})
				})

			}
		})

	}

}





// Get movies 
module.exports.getMovies = (req, res) => {

	return Movie.find({})
	.then((result) => {
		if (result.length > 0){
			return res.status(200).send({
				movies: result
			})
		} else {
			return res.status(200).send({
				message: 'No movies available'
			})
		}
	})
	.catch((err) => {
		return res.status(500).send({
			error: 'Internal Server Error'
		})
	})

}





// Get specific movie
module.exports.getMovie = (req, res) => {

	const movieId = req.params.movie_Id;

	return Movie.findById(movieId)
	.then((result) => {
		if (!result){
			return res.status(200).send({
				message: 'Movie not available'
			})
		} else {
			return res.status(200).send(result);
		}
	})
	.catch((err) => {
		return res.status(500).send({
			error: 'Internal Server Error'
		})
	})

}





// Update movie details (Admin only)
module.exports.updateMovie = (req, res) => {

	const movieId = req.params.movie_Id;
	const { title, director, year, description, genre } = req.body;
	const yearRegex = /^\d+$/;

	if (!title || !director || !year || !description || !genre){
		return res.status(400).send({
			message: 'fields should not be empty'
		})
	} else if (!yearRegex.test(year)){
		return res.status(400).send({
			message: 'Year should contain numbers only'
		})
	} else if (year.length !== 4){
		return res.status(400).send({
			message: 'Invalid year format'
		})
	} else {

		const updateMovieDetails = {
			title: title,
			director: director,
			year: year,
			description: description,
			genre: genre
		}

		return Movie.findByIdAndUpdate(movieId, updateMovieDetails, { new:true })
		.then((result) => {
			if (!result){
				return res.status(400).send({
					message: 'Failed to update movie'
				})
			} else {
				return res.status(200).send({
					message: 'Movie updated successfully',
					updatedMovie: result
				})
			}
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Internal Server Error'
			})
		})

	}
}






// Delete movie (admin only)
module.exports.deleteMovie = (req, res) => {

	const movieId = req.params.movie_Id;

	return Movie.findByIdAndDelete(movieId)
	.then((result) => {
		if (!result){
			return res.status(400).send({
				message: 'Failed to delete movie'
			})
		} else {
			return res.status(200).send({
				message: 'Movie deleted successfully'
			})
		}
	})
	.catch((err) => {
		return res.status(500).send({
			error: 'Internal Server Error'
		})
	})

}






// Add comment in the specific movie
module.exports.addComment = (req, res) => {

	const movieId = req.params.movie_Id;
	const userId = req.user.id;
	const { comment } = req.body;

	if (!comment){
		return res.status(400).send({
			message: 'Comment should not be empty'
		})
	} else {

		return Movie.findByIdAndUpdate(movieId, {
			$push: {
				comments: {
					userId: userId,
					comment: comment
				}
			}
		}, { new:true })
		.then((result) => {
			if (!result){
				return res.status(400).send({
					message: 'Failed to add a comment'
				})
			} else {
				return res.status(200).send({
					message: 'Comment added successfully',
					updatedMovie: result
				})
			}
		})
		.catch((err) => {
			return res.status(500).send({
				error: 'Internal Server Error'
			})
		})

	}

}







// Get comments
module.exports.getComments = (req, res) => {

	const movieId = req.params.movie_Id;

	return Movie.findById(movieId)
	.then((result) => {
		if (!result){
			return res.status(400).send({
				message: 'No movies found'
			})
		} else {
			return res.status(200).send({
				comments: result.comments
			})
		}
	})
	.catch((err) => {
		return res.status(500).send({
			error: 'Internal Server Error'
		})
	})

}