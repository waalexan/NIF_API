const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para analisar o corpo das solicitações como JSON
app.use(bodyParser.json());

// Configuração do proxy reverso
app.post('/api/consulta', async (req, res) => {
    try {
        // Extrair o NIF do corpo da solicitação
        const { nif } = req.body;

        // Verificar se o NIF foi fornecido
        if (!nif) {
            return res.status(400).json({ error: "NIF não fornecido" });
        }

        // Fazer solicitação ao servidor externo
        const response = await axios.post('https://meuserverexterno.com/api/consulta', { nif });

        // Enviar resposta do servidor externo de volta ao cliente
        res.json(response.data);
    } catch (error) {
        console.error('Erro:', error.message);
        res.status(500).json({ error: 'Erro ao consultar o NIF no servidor externo' });
    }
});

// Rota para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/try_api.html');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
