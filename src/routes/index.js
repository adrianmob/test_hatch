var router = require("express").Router();
const { bestOptionsPerYear, quoteCar } = require("../controllers/apis");

//Declaracion de Endpoints

router.get("/", () => {
  res.send("API Test");
});

router.get("/bestOptionsPerYear", bestOptionsPerYear);
router.get("/quoteCar", quoteCar);

module.exports = router;
