const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlWorkouts = require('../controllers/workouts');
const ctrlExercises = require('../controllers/exercises');

router.route('/users')
    .get(ctrlUsers.listAll)
    .post(ctrlUsers.create);

router.route('/user/:userId')
    .delete(ctrlUsers.remove);

router.route('/user/:userId/workouts')
    .get(ctrlWorkouts.getByUserId);

router.route('/user/:userId/workout/:workoutId/exercises')
    .get(ctrlExercises.getByWorkoutId);

module.exports = router;
