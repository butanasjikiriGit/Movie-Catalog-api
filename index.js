const express = require('express');
const mongoose = require('mongoose');

// Routes
const userRoutes = require('./routes/userRoutes.js');
const movieRoutes = require('./routes/movieRoutes.js');

const PORT = 4000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended:true }));


mongoose.connect("mongodb+srv://admin:admin1234@b645-butanas.kz5ezgh.mongodb.net/MovieCatalogSystem?appName=B645-Butanas");

let db = mongoose.connection;

db.on("err", () => console.error('Failed to establish connection from database'));
db.once("open", () => console.log('successfully connected to database!'));





// Routes
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);






app.listen(PORT, () => {
	console.log(`Server is now running at port: ${PORT}`);
})