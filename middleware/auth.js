const jwt = require('jsonwebtoken');

function authenticateRole(role) {
	return (req, res, next) => {
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		console.log(token)
		if (!token) return res.status(401).json({ message: 'No token provided' });
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) return res.status(403).json({ message: 'Invalid token' });
			if (role && user.role !== role) {
				return res.status(403).json({ message: 'Forbidden: insufficient role' });
			}
			req.user = user;
			next();
		});
	};
}

module.exports = { authenticateRole };
