CREATE TABLE Nacionalidade (
	id BIGINT AUTO_INCREMENT,
    codigo VARCHAR(2) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Poder (
	id BIGINT AUTO_INCREMENT,
    titulo VARCHAR(50),
    PRIMARY KEY(id)
);

CREATE TABLE Heroi (
	id BIGINT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    nacionalidade INT NOT NULL,
    data_nasc DATE,
    PRIMARY KEY(id),
    FOREIGN KEY(nacionalidade) REFERENCES Nacionalidade(id)
);

CREATE TABLE Lista_Poder (
	id INT AUTO_INCREMENT,
    id_heroi BIGINT,
    id_poder BIGINT,
    PRIMARY KEY (id),
    FOREIGN KEY (id_heroi) REFERENCES Heroi(id),
    FOREIGN KEY (id_poder) REFERENCES Poder(id)
);

INSERT INTO Nacionalidade (codigo) VALUES ("US"),
										  ("KR"),
                                          ("MR"),
                                          ("TM"),
                                          ("AS");

INSERT INTO Poder (titulo) VALUES ("Voar"),
								  ("Super Força"),
								  ("Telepatia"),
								  ("Metamorfose"),
								  ("Invisibilidade"),
								  ("Supervelocidade"),
                                  ("Resistência"),
                                  ("Imunidade");

INSERT INTO Heroi (nome, nacionalidade, data_nasc) VALUES ("Superman", 2, "1938-4-18"),
														  ("Wonder Woman", 4, "1941-10-2"),
														  ("The Flash", 1, "1956-10-00"),
                                                          ("J'onn J'onzz", 3, "1955-11-00"),
                                                          ("Batman", 1, "1939-3-30"),
                                                          ("Captain America", 1, "1918-7-4"),
                                                          ("Drax", 1, "1973-2-10"),
                                                          ("Daredevil", 1, "1964-4-10"),
                                                          ("Thor", 5, "1951-2-00");

INSERT INTO Lista_Poder (id_heroi, id_poder) VALUES (1, 1), (1, 2), (1, 6), (1, 7), (1, 8),
												    (2, 2), (2, 6), (2, 7), (2, 8),
                                                    (3, 2), (3, 5), (3, 6), (3, 7), (3, 8),
                                                    (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8),
                                                    (5, 7), (5, 8),
                                                    (6, 2), (6, 6), (6, 7), (6, 8),
                                                    (7, 2), (7, 5), (7, 7), (7, 8),
                                                    (8, 7), (8, 8),
                                                    (9, 1), (9, 2), (9, 7), (9, 8);
