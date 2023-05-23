const express = require('express');
const ninjaController = require('../controllers/ninjaController');

const router = express.Router();

router.get('/ninjas', ninjaController.get_ninjas);

router.post('/ninjas', ninjaController.create_ninja);

router.get('/ninjas/:id', ninjaController.get_ninja);

router.put('/ninjas/:id', ninjaController.update_ninja);

router.patch('/ninjas/:id', ninjaController.update_ninja);

router.delete('/ninjas/:id', ninjaController.delete_ninja);

module.exports = router