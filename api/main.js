const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

async function api(nif) {
    // URL para fazer scraping
    const url = `https://portaldocontribuinte.minfin.gov.ao/consultar-nif-do-contribuinte?nif=${nif}`;

    try {
        // Fazendo a solicitação HTTP
        const response = await axios.get(url);

        // Verifica se a solicitação foi bem-sucedida
        if (response.status === 200) {
            // Analisa o conteúdo HTML da página
            const $ = cheerio.load(response.data);

            // Inicialize um objeto para armazenar os resultados
            const resultados = {};

            // Encontra todos os elementos com a classe 'form-group'
            $('.form-group').each((index, element) => {
                // Encontra a label dentro do form-group
                const label = $(element).find('.control-label');

                // Verifica se a label foi encontrada
                if (label.length > 0) {
                    // Encontra o próximo elemento irmão que contém o texto
                    const textoElemento = label.next().text().trim();

                    // Encontra o texto antes dos dois pontos (:)
                    const textoLabel = label.text().trim().split(':')[0];

                    // Verifica se o elemento irmão existe e contém texto
                    if (textoElemento) {
                        // Se a chave for "NIF", remove o texto indesejado e extrai apenas o número de identificação fiscal
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

app.use(express.json());

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

    console.log(resultados)
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
