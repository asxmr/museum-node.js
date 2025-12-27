const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Albums route works (placeholder)" });
});

module.exports = router;
