const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'automatest',
    port: '8889',
});

connection.connect((error) => {
    if (error) {
        console.error('Erreur de connexion à la base de données : ', error);
        return;
    }
    console.log('Connecté à la base de données');
});

app.get('/api/articles', (req, res) => {
    connection.query('SELECT * FROM articles', (error, results) => {
        if (error) {
            res.status(500).json({ error });
            return;
        }
        res.json(results);
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}.`);
});
