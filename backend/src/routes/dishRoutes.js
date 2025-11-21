const express = require('express');
const { getAllDishes, togglePublished } = require('../controllers/dishController');
const router = express.Router();

router.get('/', getAllDishes);
router.patch('/:id/toggle', togglePublished);

module.exports = router;
