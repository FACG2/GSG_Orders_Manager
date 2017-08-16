BEGIN;


DROP TABLE IF EXISTS members, order_pp, order_list CASCADE;

CREATE TABLE members (
  id  SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(30) NOT NULL,
  sex char(1) NOT NULL
);

CREATE TABLE order_list (
  id SERIAL PRIMARY KEY NOT NULL,
  state BOOLEAN NOT NULL,
  total INTEGER NOT NULL,
  Dman_id INTEGER NOT NULL,
  startTime VARCHAR(20),
  endTime VARCHAR(20),
  DateOrder VARCHAR(20)
);

CREATE TABLE order_pp (
  id SERIAL PRIMARY KEY NOT NULL,
  foodtype TEXT NOT NULL,
  price INTEGER NOT NULL,
  user_id INTEGER REFERENCES members(id),
  orderlist INTEGER REFERENCES order_list(id)
);


INSERT INTO members (name, email, sex) VALUES
('Abdallah Al-Halees', 'abdallah.halees@gmail.com', 'M'),
('Ahmed Ajour', 'ahmed.ajourr@gmail.com', 'M'),
('Eslam Hugair', 'iah-93@hotmail.com', 'M'),
('Mahmoud Aldahdouh', 'mahmod_mne@hotmail.com', 'M'),
('Mahmoud Almadhoun', 'mrm7moud@hotmail.com', 'M'),
('Mahmoud Alwadia', 'mahmoud.alwadia@gmail.com', 'M'),
('Moath Alnajjar', 'moaalnajjar@gmail.com', 'M'),
('Samer El-Aila', 'samer-elaila@live.com', 'M'),
('Walid Almeshwakhi', 'waleedmash2@gmail.com', 'M'),
('Hana Jebril', 'hanahana.2000@hotmail.com', 'F'),
('Qamar Alfalojy', 'qmff23@gmail.com', 'F'),
('Ghadeer Abdel-Nabi', 'eng.ghadeer93@gmail.com', 'F'),
('Aia Abu Laila', 'aaa_2008azhar@hotmail.com', 'F'),
('Sohad Dader', 'sohadwd9@gmail.com', 'F'),
('kefah elhelou', 'kelhelouwork@gmail.com', 'F'),
('Salwa Alnazly', 'salwanazly95@gmail.com', 'F');

COMMIT;
