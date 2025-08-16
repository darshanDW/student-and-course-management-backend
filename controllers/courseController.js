const pool = require('../config/db');

// Add Course
exports.addCourse = async (req, res) => {
	const { course_name, course_code, course_duration } = req.body;
	if (!course_name || !course_code || !course_duration) {
		return res.status(400).json({ message: 'All fields are required.' });
	}
	try {
		const result = await pool.query(
			'INSERT INTO courses (course_name, course_code, course_duration) VALUES ($1, $2, $3) RETURNING *',
			[course_name, course_code, course_duration]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ message: 'Error adding course', error: err.message });
	}
};

// Get all courses
exports.getAllCourses = async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM courses');
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ message: 'Error fetching courses', error: err.message });
	}
};

// Get course by ID
exports.getCourseById = async (req, res) => {
	const { course_id } = req.params;
	try {
		const result = await pool.query('SELECT * FROM courses WHERE course_id = $1', [course_id]);
		if (result.rows.length === 0) {
			return res.status(404).json({ message: 'Course not found.' });
		}
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ message: 'Error fetching course', error: err.message });
	}
};

// Update course
exports.updateCourse = async (req, res) => {
	const { course_id } = req.params;
	const { course_name, course_code, course_duration } = req.body;
	try {
		const result = await pool.query(
			'UPDATE courses SET course_name = $1, course_code = $2, course_duration = $3 WHERE course_id = $4 RETURNING *',
			[course_name, course_code, course_duration, course_id]
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ message: 'Error updating course', error: err.message });
	}
};

// Delete course
exports.deleteCourse = async (req, res) => {
	const { course_id } = req.params;
	try {
		await pool.query('DELETE FROM courses WHERE course_id = $1', [course_id]);
		res.json({ message: 'Course deleted.' });
	} catch (err) {
		res.status(500).json({ message: 'Error deleting course', error: err.message });
	}
};
