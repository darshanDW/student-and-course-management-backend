const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateRole } = require('../middleware/auth');

// Add Student (admin only)
router.post('/', authenticateRole('admin'), studentController.addStudent);
// Get all students with course info (admin only)
router.get('/', authenticateRole('admin'), studentController.getAllStudents);
// Get students by course (admin only)
router.get('/course/:course_id', authenticateRole('admin'), studentController.getStudentsByCourse);
// Update student (admin only)
router.put('/:student_id', authenticateRole('admin'), studentController.updateStudent);
// Delete student (admin only)
router.delete('/:student_id', authenticateRole('admin'), studentController.deleteStudent);

module.exports = router;
