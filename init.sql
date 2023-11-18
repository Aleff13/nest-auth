CREATE DATABASE if not exists auth;

insert into auth.user (name, email, password, role) values 
('admin', 'admin@email.com', '$2b$10$vF6NSRJueu00q72mI6LgB.cBw/U8vwqQQgJQImUSoinhW0iYpYUHG', 1),
('employer', 'employer@email.com', '$2b$10$vF6NSRJueu00q72mI6LgB.cBw/U8vwqQQgJQImUSoinhW0iYpYUHG', 2),
('customer', 'customer@email.com', '$2b$10$vF6NSRJueu00q72mI6LgB.cBw/U8vwqQQgJQImUSoinhW0iYpYUHG', 3);

