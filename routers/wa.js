const express = require("express")
const api = require("../controllers/WaController")
const router = express.Router();

router.get("/waapi", api)
router.post("/waapi", api)

module.exports = router;
