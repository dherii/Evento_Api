const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const eventRoutes = require('./eventRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Registra as rotas
app.use('/', eventRoutes);

// Sincroniza o banco de dados e inicia o servidor na porta 3000
sequelize.sync().then(() => {
    console.log('Banco de dados SQLite sincronizado com sucesso.');
    app.listen(3000, () => {
        console.log('Servidor Express rodando na porta 3000.');
    });
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
});