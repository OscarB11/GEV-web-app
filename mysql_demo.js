// Import the mysql2 module
const mysql = require('mysql2');

// Create a connection object
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Techuser@19",
    database: "co3102_cw2_2023",
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }

    console.log('Connected to MySQL server');

    // Retrieve all tables from the database
    connection.query('SHOW TABLES', (err, results, fields) => {
        if (err) {
            console.error('Error retrieving tables:', err.message);
        } else {
            console.log('Tables in the database:');
            results.forEach((table) => {
                console.log(table[fields[0].name]);
            });
        }

        // Query to retrieve all candidates from the candidate table
        connection.query('SELECT * FROM candidate', (err, candidateResults, candidateFields) => {
            if (err) {
                console.error('Error retrieving candidates:', err.message);
            } else {
                console.log('\nCandidates in the candidate table:');
                candidateResults.forEach((candidate) => {
                    console.log(candidate);
                });
            }

            // Close the connection
            connection.end((err) => {
                if (err) {
                    console.error('Error closing connection:', err.message);
                } else {
                    console.log('Connection closed');
                }
            });
        });
    });
});
