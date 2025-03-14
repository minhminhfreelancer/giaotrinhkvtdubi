-- Add trainee_district_leader role if it doesn't exist yet
INSERT INTO roles (name)
SELECT 'trainee_district_leader'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE name = 'trainee_district_leader');
