DROP TABLE IF EXISTS cards;

CREATE TABLE cards (
    id_card INTEGER PRIMARY KEY AUTOINCREMENT,
    word_jp text NOT NULL,
    word_br text NOT NULL
);
