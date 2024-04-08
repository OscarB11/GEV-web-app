//src/server.js
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const { promisify } = require('util');


const app = express();
const port = process.env.PORT || 3001;
const crypto = require('crypto');  // Add this line to include the crypto module


// Enable CORS
app.use(cors());

// Setup session middleware
app.use(session({
    secret: '64147912bb13504a200824e10aa055313fa34fe6c3827f49de2ad4ab2423c3dd', // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true if using HTTPS
}));

// Create a MySQL pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Techuser@19',
    database: 'co3102_cw2_2023',
    connectionLimit: 10,

});


const sha256 = async (data) => {
    const encoder = new TextEncoder();
    const buffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
};

// Middleware to parse JSON requests
app.use(bodyParser.json());

// API endpoint for UVC validation
app.post('/validate-uvc', async (req, res) => {
    const { uvc } = req.body;

    try {
        const [result] = await pool.promise().query('SELECT * FROM uvc_code WHERE UVC = ? AND used = 0', [uvc]);

        if (result.length === 1) {
            // UVC is valid
            res.json({ success: true });
        } else {
            // UVC is invalid
            res.json({ success: false, error: 'Invalid UVC' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// API endpoint to retrieve all tables
app.get('/show-tables', async (req, res) => {
    try {
        const [result] = await pool.promise().query('SHOW TABLES');

        // Console log the result for testing
        console.log('Tables in the database:', result);

        res.json(result);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// API endpoint to retrieve all candidates
app.get('/show-candidates', async (req, res) => {
    try {
        const [result] = await pool.promise().query('SELECT * FROM candidate');

        // Console log the result for testing
        console.log('Candidates in the candidate table:', result);

        res.json(result);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});




// API endpoint for UVC validation
app.post('/validate-uvc', async (req, res) => {
    const { uvc } = req.body;

    try {
        // Check if UVC exists and is not used
        const [result] = await pool.promise().query('SELECT * FROM uvc_code WHERE UVC = ? AND used = 0', [uvc]);

        if (result.length === 1) {
            // UVC is valid
            res.json({ success: true });
        } else {
            // UVC is invalid
            res.json({ success: false, error: 'Invalid UVC' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


app.get('/get-constituency-id', async (req, res) => {
    const { name } = req.query;

    try {
        const [result] = await pool.promise().query('SELECT constituency_id FROM constituency WHERE constituency_name = ?', [name]);

        if (result.length === 1) {
            res.json({ success: true, constituencyId: result[0].constituency_id });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false });
    }
});

// API endpoint for voter registration
app.post('/register-voter', async (req, res) => {
    const { voterId, fullName, dob, password, constituency, uvc } = req.body;

    try {
        // Check if UVC is valid (similar to the UVC validation endpoint)
        const [uvcResult] = await pool.promise().query('SELECT * FROM uvc_code WHERE UVC = ? AND used = 0', [uvc]);

        if (uvcResult.length !== 1) {
            res.status(400).json({ success: false, error: 'Invalid UVC' });
            return;
        }

        // Check if email is already linked to another registered voter
        const [emailResult] = await pool.promise().query('SELECT * FROM voter WHERE voter_id = ?', [voterId]);

        if (emailResult.length > 0) {
            res.status(400).json({ success: false, error: 'Email is already linked to another registered voter' });
            return;
        }


        // Hash the password using SHA-256
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        // Insert voter data into the database
        await pool.promise().query('INSERT INTO voter (voter_id, full_Name, DOB, password, UVC, constituency_id) VALUES (?, ?, ?, ?, ?, ?)',
            [voterId, fullName, dob, hashedPassword, uvc, constituency]);

        // Update UVC to mark it as used
        await pool.promise().query('UPDATE uvc_code SET used = 1 WHERE UVC = ?', [uvc]);

        res.json({ success: true });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



// Function to get SHA-256 hash
const getSHA256 = (data) => {
    const hash = crypto.createHash('sha256').update(data).digest('hex');

    return hash;
};

// Endpoint for getting SHA-256 hash
app.post('/get-sha256', async (req, res) => {
    const { data } = req.body;

    try {
        const hashedData = getSHA256(data);
        res.json({ success: true, hashedData });
    } catch (error) {
        console.error('Error during SHA-256 hash:', error);
        res.json({ success: false, error: 'Error during SHA-256 hash' });
    }
});

// Endpoint for login authentication
app.post('/login', async (req, res) => {
    const { voterId, password } = req.body;

    try {
        // Use the same function to hash the password
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        // Retrieve the stored hashed password and additional user data from the database
        const [result] = await pool.promise().query('SELECT * FROM voter WHERE voter_id = ?', [voterId]);

        if (result.length === 1) {
            const storedPassword = result[0].password;

            // Debugging logs
            console.log(' Password (Entered):', password);
            console.log('Hashed Password (Entered):', hashedPassword);
            console.log('Hashed Password (Stored):', storedPassword);
            console.log('Do Hashes Match?', hashedPassword === storedPassword);

            // Compare the hashed passwords
            if (hashedPassword === storedPassword) {
                // Store user data in session
                req.session.userData = {
                    voter_id: result[0].voter_id,
                    constituency: result[0].constituency,
                    full_name: result[0].full_name,
                    // Add other user data fields as needed
                };

                res.json({ success: true, message: 'Login successful' });
            } else {
                res.json({ success: false, error: 'Invalid username or password' });
            }
        } else {
            res.json({ success: false, error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


app.get('/get-user-data', (req, res) => {
    const voterId = req.query.voterId;



    const userData = {
        voter_id: voterId,
        // other user data
    };

    res.json({ success: true, userData });
});



// API endpoint to retrieve real-time election results for each constituency

app.get('/get-real-time-results', async (req, res) => {
    try {
        const [result] = await pool.promise().query(`
            SELECT 
                constituency.constituency_name,
                candidate.candidate,
                candidate.vote_count,
                party.party
            FROM candidate
            JOIN constituency ON candidate.constituency_id = constituency.constituency_id
            JOIN party ON candidate.party_id = party.party_id
        `);

        // Console log the result for testing
        console.log('Real-time Election Results:', result);

        res.json(result);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});






// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

