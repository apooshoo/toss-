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

INSERT INTO users_groups (userId, groupId, entry) VALUES
(1, 1, 'fatcow'),
(1, 2, 'macs'),
(1, 3, 'burger king'),
(1, 4, 'mos burger'),
(2, 1, 'rubicon'),
(2, 2, 'jumbo'),
(3, 1, 'high tea');

INSERT INTO users_groups (userId, groupId) VALUES
(3, 2),
(4, 1),
(4, 2),
(5, 1);

INSERT INTO users_friends (userId, friendId, confirmed) VALUES
(1, 2, true),
(2, 1, true),
(1, 3, true),
(3, 1, true),
(2, 3, true),
(3, 2, true);