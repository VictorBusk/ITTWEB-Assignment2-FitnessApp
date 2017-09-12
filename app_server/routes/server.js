const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlWorkouts = require('../controllers/workouts');
const ctrlExercises = require('../controllers/exercises');

router.get('/', ctrlUsers.listAll);
router.get('/users', ctrlUsers.listAll);
router.post('/users/create', ctrlUsers.create);
router.get('/user/:id/remove/', ctrlUsers.remove);

router.get('/user/:userId/workouts', ctrlWorkouts.getByUserId);
router.post('/user/:userId/workouts/create', ctrlWorkouts.create);
router.get('/user/:userId/workout/:id/remove/', ctrlWorkouts.remove);

router.get('/user/:userId/workout/:workoutId/exercises', ctrlExercises.getByWorkoutId);
router.post('/user/:userId/workout/:workoutId/exercises/create', ctrlExercises.create);
router.get('/user/:userId/workout/:workoutId/exercise/:id/remove', ctrlExercises.remove);

module.exports = router;
