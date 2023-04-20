const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

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

app.post('/api/articles', (req, res) => {
    const { titre, contenu, lien } = req.body;

    if (!titre || !contenu || !lien) {
        res.status(400).json({ error: 'Tous les champs sont obligatoires' });
        return;
    }

    const query = 'INSERT INTO articles (titre, contenu, lien) VALUES (?, ?, ?)';
    const data = [titre, contenu, lien];

    connection.query(query, data, (error, results) => {
        if (error) {
            res.status(500).json({ error });
            return;
        }
        res.status(201).json({ message: 'Article ajouté avec succès' });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}.`);
});
