const express = require("express");
const router = express.Router();
const descriptionController = require('../controllers/descriptionControllers');

router.get('/:id', descriptionController.getDescById);
router.post('/:userId', descriptionController.createDescription);

module.exports = router;