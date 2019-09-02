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

module.exports = router
