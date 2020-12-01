const express = require('express');
const router = express.Router();

const remindersController = require('../controllers/RemindersController.js');

router.get('/users/:id/reminders', remindersController.findAllReminders)
router.get('/reminders/:id', remindersController.findReminder);
router.post('/users/:id/reminders', remindersController.createReminder);
router.put('/reminders/:id', remindersController.updateReminder);
router.delete('/reminders/:id', remindersController.deleteReminder);

module.exports = router