TRUNCATE users, days RESTART IDENTITY CASCADE;

INSERT INTO users
    (username, password)
    VALUES
    ('testuser1', 'password');


INSERT INTO days
    (id, user_id, date_created, text1, text2, text3)
    VALUES
    (1,1,'2021-03-05 00:00:00','A roof over my head and a warm home.','Warm water to drink','A warm vacation with my family'),
    (2,1,'2021-03-05 00:00:00','A roof over my head and a cold home.','Cold water to drink','A cold vacation with my family'),
    (3,1,'2021-03-05 00:00:00','A roof over my head and a hot home.','Hot water to drink','A hot vacation with my family'),
    (4,1,'2021-03-06 00:00:00','A roof over my head and a windy home.','Windy water to drink','A windy vacation with my family'),
    (5,1,'2021-03-06 00:00:00','A roof over my head and a chilly home.','Chilly water to drink','A chilly vacation with my family'),
    (6,1,'2021-03-06 00:00:00','A roof over my head and a sunny home.','Sunny water to drink','A sunny vacation with my family');
ALTER SEQUENCE "days_id_seq" RESTART WITH 7;