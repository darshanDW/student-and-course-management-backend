# Student and Course Management Backend

## Objective
A backend system for managing students and their associated courses, showcasing backend development and SQL skills using Node.js and PostgreSQL.

## Features
- Course and Student tables with proper keys and constraints
- CRUD operations for students and courses
- Student-course association and validation
- Retrieve students with course info, and students by course
- Update student details and course assignment
- Delete students with course relationship handling
- JWT-based authentication and role-based access (admin/student)
- SQL scripts for schema and sample stored procedures
- Transaction management for data consistency
- Postman collection for API testing

## Tech Stack
- Node.js (Express)
- PostgreSQL
- JWT for authentication

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up PostgreSQL and run the SQL scripts in `sql/schema.sql`
4. Create a `.env` file with:
   ```env
   DATABASE_URL=your_postgres_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```
5. Start the server: `node index.js`

## API Endpoints
- `/students` (POST, GET, PUT, DELETE)
- `/courses` (POST, GET, PUT, DELETE)
- `/students/course/:course_id` (GET)

## Authentication
- Admin: Can perform all operations
- Student: Can only view their details and course info

## SQL Scripts
- See `sql/schema.sql` for table creation
- Stored procedures and transaction examples included

## Testing
- Import the provided Postman collection for API testing

## Best Practices
- Validations and secure endpoints
- Clean, readable, maintainable code

---
