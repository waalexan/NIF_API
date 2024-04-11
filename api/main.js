const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.use(express.json());

async function api(nif) {
    const url = `https://portaldocontribuinte.minfin.gov.ao/consultar-nif-do-contribuinte?nif=${nif}`;

    try {
        const response = await axios.get(url);

        if (response.status === 200) {
            const $ = cheerio.load(response.data);
            const resultados = {};

            $('.form-group').each((index, element) => {
                const label = $(element).find('.control-label');

                if (label.length > 0) {
                    const textoElemento = label.next().text().trim();
                    const textoLabel = label.text().trim().split(':')[0];

                    if (textoElemento) {
                        if (textoLabel === 'NIF') {
                            resultados['NIF'] = nif
                        } else {
                            resultados[textoLabel] = textoElemento;
                        }
                    }
                }
            });

            return resultados;
        } else {
            return { "error": response.status };
        }
    } catch (error) {
        console.error("Erro ao fazer solicitação HTTP:", error);
        return { "error": error.message };
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/try_api.html');
});

app.post('/api/consulta', async (req, res) => {
    const { nif } = req.body;

    if (!nif) {
        return res.status(400).json({ "error": "NIF não fornecido" });
    }

    const resultados = await api(nif);
    res.json(resultados);

    console.log(resultados);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
