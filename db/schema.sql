USE em52j8si8szjratn;

CREATE TABLE burgers (
id INT auto_increment not null,
burger_name VARCHAR(100) NOT NULL,
devoured boolean,
createdAt TIMESTAMP default current_timestamp NOT NULL,
primary key(id)
);

SELECT * FROM em52j8si8szjratn.burgers;