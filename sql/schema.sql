-- Courses Table
CREATE TABLE courses (
  course_id SERIAL PRIMARY KEY,
  course_name VARCHAR(255) NOT NULL,
  course_code VARCHAR(50) UNIQUE NOT NULL,
  course_duration INTEGER NOT NULL
);
DROP TABLE students;

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    course_id INTEGER REFERENCES courses(course_id) ON DELETE CASCADE
);

-- Sample Stored Procedure: Insert Student with Course Association (PostgreSQL)
CREATE OR REPLACE PROCEDURE insert_student_with_course(
    p_student_name VARCHAR,
    p_email VARCHAR,
    p_course_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if course exists
    IF NOT EXISTS (
        SELECT 1 FROM courses WHERE course_id = p_course_id
    ) THEN
        RAISE EXCEPTION 'Course does not exist';
    END IF;

    -- Optional: Check for duplicate email
    IF EXISTS (
        SELECT 1 FROM students WHERE email = p_email
    ) THEN
        RAISE EXCEPTION 'Email already exists';
    END IF;


    -- Insert student
    INSERT INTO students (student_name, email, course_id)
    VALUES (p_student_name, p_email, p_course_id);
END;
$$;

-- Stored Procedure: Update Student Details (including course reassignment)
CREATE OR REPLACE PROCEDURE update_student_with_course(
    p_student_id INTEGER,
    p_student_name VARCHAR,
    p_email VARCHAR,
    p_course_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM students WHERE student_id = p_student_id) THEN
        RAISE EXCEPTION 'Student does not exist';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM courses WHERE course_id = p_course_id) THEN
        RAISE EXCEPTION 'Course does not exist';
    END IF;
    UPDATE students SET student_name = p_student_name, email = p_email, course_id = p_course_id
    WHERE student_id = p_student_id;
END;
$$;

-- Stored Procedure: Delete Student Record (handles course association)
CREATE OR REPLACE PROCEDURE delete_student_with_course(
    p_student_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM students WHERE student_id = p_student_id) THEN
        RAISE EXCEPTION 'Student does not exist';
    END IF;
    DELETE FROM students WHERE student_id = p_student_id;
END;
$$;

