const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const auth = require('../auth.js');




// user registration
module.exports.registerUser = (req, res) => {

	const { email, password } = req.body;

	if (!email || !email.includes('@')){
		return res.status(400).send({
			message: 'Invalid email format'
		})
	} else if (!password || password.length <= 8){
		return res.status(400).send({
			message: 'Password should contain greater than 8 characters'
		})
	} else {

		return User.findOne({ email: email })
		.then((existing) => {
			if (existing){
				return res.status(409).send({
					message: 'Email already registered'
				})
			} else {

				const newUser = new User({
					email: email,
					password: bcrypt.hashSync(password, 10)
				})

				return newUser.save()
				.then((result) => {
					if (!result){
						return res.status(400).send({
							message: 'Failed to register'
						})
					} else {

						return res.status(200).send({
							message: 'Registered successfully'
						})

					}
				})
				.catch((err) => {
					return res.status(500).send({
						message: 'Internal Server Erorr'
					})
				})
			}
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Internal Server Erorr'
			})
		})

	}

}







// User login
module.exports.loginUser = (req, res) => {

	const { email, password } = req.body;

	if (!email || !email.includes('@')){
		return res.status(400).send({
			message: 'Invalid email format'
		})
	} else {

		return User.findOne({ email: email })
		.then((result) => {
			if (!result){
				return res.status(400).send({
					message: 'User does not exist'
				})
			} else {

				const isPasswordCorrect = bcrypt.compareSync(password, result.password);

				if (!isPasswordCorrect){
					return res.status(400).send({
						message: 'Invalid email and password'
					})
				} else {
					return res.status(200).send({
						access: auth.createAccessToken(result)
					})
				}

			}
		})
		.catch((err) => {
			return res.status(500).send({
				message: 'Internal Server Erorr'
			})
		})

	}

}