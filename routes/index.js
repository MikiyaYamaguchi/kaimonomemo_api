const express = require("express");
const router = express.Router();

const pool = require("../db/pool");

router.get("/test/", function (req, res, next) {
  pool.query("SELECT * FROM share_urls", function (error, result) {
    if (error) {
      throw error;
    }
    res.status(200).json({
      data: result.rows,
    });
  });
});

router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  pool.query(
    "SELECT * FROM share_urls WHERE id = $1",
    [id],
    function (error, result) {
      if (error) {
        throw error;
      }
      res.status(200).json({
        data: result.rows,
      });
    }
  );
});

router.post("/:id", function (req, res, next) {
  const id = req.params.id;
  const kaimono_data = JSON.stringify(req.body);
  console.log(kaimono_data);
  pool.query(
    "INSERT INTO share_urls VALUES ($1, $2, current_timestamp)",
    [id, kaimono_data],
    function (error, results) {
      if (error) {
        res.status(500).json({
          status: "500 Internal Server Error",
          error: error,
        });
      }
      res.status(201).json({
        status: "success",
      });
    }
  );
});

module.exports = router;
