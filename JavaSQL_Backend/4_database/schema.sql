drop table if exists user_login_data; -- if there's existing table (data), then remove it

create table user_login_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL, -- attribute name || attribute datatype
    pass_hash TEXT NOT NULL
);

DROP TABLE IF EXISTS user_transactions;

/*Master Doc Schema, must be sorted into different financial statements (IS, BS, RE, and Cash FLows)*/
create table user_transactions(
    id INTEGER PRIMARY KEY AUTOINCREMENT ,
    user_id INTEGER,
    transaction_date TEXT,
    Transaction_desc TEXT,
    transaction_type TEXT,
    is_credit INTEGER,
    amount REAL NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_login_data(id)
);

SELECT * FROM user_transactions;

INSERT INTO user_login_data(id, username, pass_hash) VALUES(1, 'amononce', '123internetstreet');