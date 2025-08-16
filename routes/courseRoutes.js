const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateRole } = require('../middleware/auth');

// Add Course (admin only)
router.post('/', authenticateRole('admin'), courseController.addCourse);
// Get all courses (student or admin)
router.get('/', authenticateRole(), courseController.getAllCourses);
// Get course by ID (student or admin)
router.get('/:course_id', authenticateRole(), courseController.getCourseById);
// Update course (admin only)
router.put('/:course_id', authenticateRole('admin'), courseController.updateCourse);
// Delete course (admin only)
router.delete('/:course_id', authenticateRole('admin'), courseController.deleteCourse);

module.exports = router;
