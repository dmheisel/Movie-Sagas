const express = require('express');
const pool = require('../modules/pool');
//set up router
const router = express.Router();

//get all movies from database
router.get('/', (req, res) => {
	let sqlText = `
    SELECT movies.id, title, poster, array_agg(name)as genres, description
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
      console.log('GET request from database successful')
      res.send(result.rows)
    })
    .catch(error => {
      console.log('Error on GET route from database: ', error)
      res.sendStatus(500)
    })
});

//get specific movie and details
router.get('/:id', (req, res) => {
  let id = req.params.id
  let sqlText = `
    SELECT movies.id, title, poster, array_agg(name)as genres, description
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
      console.log(`successful GET route for selecting movie`)
      res.send(result.rows[0])
    })
    .catch(error => {
      console.log(`error on GET route for selecting movie: `, error)
      res.sendStatus(500)
    })
})

//edit description of movie
router.put('/:id', (req, res) => {
  let id = req.params.id;
  let text = req.body.description

  let sqlText = `
    UPDATE "movies"
      SET "description" = $1
      WHERE "id" = $2;`

  pool
    .query(sqlText, [text, id])
    .then(result => {
      console.log('PUT route to database successful')
      res.sendStatus(204)
    })
    .catch(error => {
      console.log('Error on PUT route to database: ', error);
      res.sendStatus(500)
    })
})


module.exports = router;
