const express = require('express');
const { Client } = require('pg');
const Dados = require('./models/dados');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'meuBanco',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

client.connect()
    .then(() => {
        console.log("Conectado ao PostgreSQL");
        return client.query(`
            CREATE TABLE IF NOT EXISTS dados (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(100),
                sobrenome VARCHAR(100),
                endereco VARCHAR(255),
                cidade VARCHAR(100),
                host VARCHAR(100)
            )
        `);
    })
    .then(() => console.log("Tabela verificada/criada com sucesso"))
    .catch(err => console.error("Erro ao conectar ou criar tabela no PostgreSQL", err));

app.post('/dados', async (req, res) => {
    const { nome, sobrenome, endereco, cidade, host } = req.body;
    const query = `INSERT INTO dados (nome, sobrenome, endereco, cidade, host) 
                   VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    try {
        const result = await client.query(query, [nome, sobrenome, endereco, cidade, host]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).send('Erro ao criar registro: ' + error);
    }
});

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
