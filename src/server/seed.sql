INSERT INTO users (username, password) VALUES
('jon', 'password'),
('joy', 'password'),
('chinyee', 'password'),
('pierre', 'password'),
('joseph', 'password'),
('theodore', 'password');

INSERT INTO groups (groupname) VALUES
('tennis kakis kawaii'),
('dota night'),
('saturday night live football'),
('the oprah winfrey show'),
('kopitiam dinner'),
('the one where everyone got jioed');

INSERT INTO users_groups (userId, groupId) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(5, 1);

INSERT INTO users_friends (userId, friendId) VALUES
(1, 2),
(2, 1),
(1, 3),
(3, 1);