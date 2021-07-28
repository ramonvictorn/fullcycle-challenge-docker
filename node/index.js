const express = require('express');
const mysql = require('mysql');
const { uniqueNamesGenerator, names } = require('unique-names-generator');

const server = express();
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
};
const connection = mysql.createConnection(config);
connection.connect();

const promisedQuery = (queryToRun) => {
    return new Promise((res) => {
        connection.query(queryToRun, (err, results, fields) => {
            res(results);
        });
    });
}

server.get('/', async (req, res) => {
    const newStudent = uniqueNamesGenerator({ dictionaries: [names] })
    const sqlNewPerson = `INSERT INTO people (name) values ('${newStudent}')`;
    await promisedQuery(sqlNewPerson);

    const people = await promisedQuery('SELECT * FROM people');
    const peopleList = people.map((person) => (`<li>Name: ${person.name}</li>`));

    res.send(`
        <h1>Full Cycle Rocks!</h1 
        <div>
            <ul>
                ${peopleList.join('')}
            </ul>
        </div>
    `)
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening ${PORT}`)
})