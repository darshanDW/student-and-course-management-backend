const pool = require('../config/db');

// Add Student with Course Assignment
exports.addStudent = async (req, res) => {
	const { student_name, email, course_id } = req.body;
	if (!student_name || !email || !course_id) {
		return res.status(400).json({ message: 'All fields are required.' });
	}
		try {
			await pool.query(
				'CALL insert_student_with_course($1, $2, $3)',
				[student_name, email, course_id]
			);
			const result = await pool.query(
				'SELECT * FROM students WHERE email = $1',
				[email]
			);
			res.status(201).json(result.rows[0]);
		} catch (err) {
			res.status(500).json({ message: 'Error adding student', error: err.message });
		}
};

// Get all students with course info
exports.getAllStudents = async (req, res) => {
	try {
		const result = await pool.query(
			'SELECT s.*, c.course_name, c.course_code, c.course_duration FROM students s JOIN courses c ON s.course_id = c.course_id'
		);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ message: 'Error fetching students', error: err.message });
	}
};

// Get students by course
exports.getStudentsByCourse = async (req, res) => {
	const { course_id } = req.params;
	try {
		const result = await pool.query(
			'SELECT s.*, c.course_name, c.course_code FROM students s JOIN courses c ON s.course_id = c.course_id WHERE s.course_id = $1',
			[course_id]
		);
		res.json(result.rows);
	} catch (err) {
		res.status(500).json({ message: 'Error fetching students', error: err.message });
	}
};

// Update student details and course using stored procedure
exports.updateStudent = async (req, res) => {
	const { student_id } = req.params;
	const { student_name, email, course_id } = req.body;
	try {
		await pool.query(
			'CALL update_student_with_course($1, $2, $3, $4)',
			[student_id, student_name, email, course_id]
		);
		// Fetch the updated student for response
		const result = await pool.query(
			'SELECT * FROM students WHERE student_id = $1',
			[student_id]
		);
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ message: 'Error updating student', error: err.message });
	}
};

// Delete student using stored procedure
exports.deleteStudent = async (req, res) => {
	const { student_id } = req.params;
	try {
		await pool.query(
			'CALL delete_student_with_course($1)',
			[student_id]
		);
		res.json({ message: 'Student deleted.' });
	} catch (err) {
		res.status(500).json({ message: 'Error deleting student', error: err.message });
	}
};
