const express = require("express");
const router = express.Router();
const barangController = require("../controller/BarangController");

router.get("/getbarang", barangController.index);
router.post("/postbarang", barangController.store);
router.patch("/updatebarang/:uuid", barangController.update);
router.get("/getidbarang/:uuid", barangController.show);
router.delete("/deletebarang/:uuid", barangController.destroy);

module.exports = router;
