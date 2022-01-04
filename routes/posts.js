const express = require('express');

const router = express.Router();

router.get('/test', (req,res)  => res.json({
  msg : "posts route",
}))

module.exports = router; 
