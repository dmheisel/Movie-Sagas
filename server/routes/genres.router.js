const express = require('express');
const pool = require('../modules/pool');
//set up router
const router = express.Router();

//route to get all genres from database
router.get('/', (req, res) => {
  let sqlText = `
      SELECT * FROM "genres"
      ORDER BY "id" ASC;`

  pool
    .query(sqlText)
    .then(result => {
      console.log(`successful GET from genres database`)
      res.send(result.rows)
    })
    .catch(error => {
      console.log(`error in GET from genres database: ${error}`)
      res.sendStatus(500)
    })
})

//delete genre from movie by removing from junction table
router.delete('/:id', (req, res) => {
  let id = req.params.id
  let sqlText = `
      DELETE FROM "movies_genres"
      WHERE "id" = $1;`
  pool
    .query(sqlText, [id])
    .then(result => {
      console.log(`successful DELETE route to database`)
      res.sendStatus(204)
    })
    .catch(error => {
      console.log(`error on DELETE route to database: ${error}`)
    })
})

//add genre to movie by inserting into junction table
router.post(`/`, (req, res) => {
  let sqlText = `
      INSERT
        INTO "movies_genres"
          ("movies_id", "genres_id")
        VALUES
          ($1, $2);`
  let values = [req.body.movieId, req.body.genreId]
  pool
    .query(sqlText, values)
    .then(result => {
      console.log(`successful POST route to database`)
      res.sendStatus(201)
    })
    .catch(error => {
      console.log(`error on POST route to database: ${error}`)
      res.sendStatus(500)
    })
})
module.exports = router
