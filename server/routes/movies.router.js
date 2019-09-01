const express = require('express');
const pool = require('../modules/pool');
//set up router
const router = express.Router();

//get all movies from database
router.get('/', (req, res) => {
	let sqlText = `
    SELECT movies.id, title, poster, array_agg(genres.name)as genres
      FROM
		    movies
    	JOIN
		    movies_genres
    	ON
	     	movies.id = movies_genres.movies_id
    	JOIN
	    	genres
	    ON
        genres.id = movies_genres.genres_id
      GROUP BY
        movies.id;`;

	pool
		.query(sqlText)
		.then(result => {
			console.log('GET request from database successful');
			res.send(result.rows);
		})
		.catch(error => {
			console.log('Error on GET route from database: ', error);
			res.sendStatus(500);
		});
});

//get specific movie and details
router.get('/details/:id', (req, res) => {
	let id = req.params.id;
	let sqlText = `
    SELECT movies.id, title, poster, array_agg(genres.name)as genres, description
	FROM
		movies
	JOIN
		movies_genres
	ON
		movies.id = movies_genres.movies_id
	JOIN
		genres
	ON
    genres.id = movies_genres.genres_id
  WHERE movies.id = $1
	GROUP BY
    movies.id;`;

	pool
		.query(sqlText, [id])
		.then(result => {
			console.log(`successful GET route for selecting movie`);
			//result.rows will be an array with one object -- sending [0] just sends the object
			res.send(result.rows[0]);
		})
		.catch(error => {
			console.log(`error on GET route for selecting movie: `, error);
			res.sendStatus(500);
		});
});

//edit description and title of movie
router.put('/:id', (req, res) => {
	let sqlText = `
    UPDATE "movies"
    SET
      "title" = $1,
      "description" = $2
    WHERE
      "id" = $3;`;

	let values = [req.body.title, req.body.description, req.params.id];
	pool
		.query(sqlText, values)
		.then(result => {
			console.log('PUT route to database successful');
			res.sendStatus(201);
		})
		.catch(error => {
			console.log('Error on PUT route to database: ', error);
			res.sendStatus(500);
		});
});

module.exports = router;
