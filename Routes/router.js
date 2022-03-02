const express = require("express");
const {mechanic} = require("../controller/issue")
const {Issues} = require("../controller/issue")
const router = express.Router();


router.post("/mechanic",mechanic)
router.post("/issues",Issues)

module.exports = router;