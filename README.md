# API - Consulta de NIF

## Introdução

No mundo digitalizado e interconectado de hoje, a eficiência e a acessibilidade da informação são essenciais. Uma área crucial onde isso se aplica é a validação de números de identificação fiscal (NIF), também conhecidos como CPF (Cadastro de Pessoas Físicas) no Brasil ou NIF em Portugal. Estes números desempenham um papel fundamental em uma variedade de transações financeiras e administrativas, desde a emissão de faturas até a realização de transações bancárias.

Neste contexto, o desenvolvimento de uma API robusta e fácil de usar para a consulta de números de identificação fiscal torna-se uma necessidade crescente. A API que apresentamos neste artigo preenche essa lacuna, oferecendo uma solução eficiente e confiável para a validação de NIF em projetos desenvolvidos em Python e Javascript.

- **Repositório:** [NIF API](https://github.com/syshard/NIF_API)
- **Autor:** Walter Alexandre Santana (mr-body)


### ANGOLA CONECTADA
  * https://meunif.vercel.app

Este artigo apresentará em detalhes o processo de desenvolvimento e implementação desta API, discutindo sua arquitetura, funcionamento e casos de uso práticos. Além disso, exploraremos as vantagens e benefícios de incorporar esta API em diferentes aplicações, destacando sua flexibilidade, escalabilidade e precisão na verificação de números de identificação fiscal.

Instale o repositório do API :

```sh
git clone https://github.com/syshard/NIF_API.git
cd NIF_API/api
npm install
npm start

```
### COMO USAR A NOSSA API

Alternativamente, você pode usar o site [meunif](https://meunif.vercel.app); para ver a documentação e fazer teste de consultas

Instale o repositório do Helm:

```yaml
// Função para enviar uma solicitação POST para a rota '/consulta' da API
async function consultarNIF() {
    const nif = document.getElementById('nifInput').value; // Obtém o número de identificação fiscal (NIF) do usuário

    // Verifica se o NIF foi fornecido
    if (!nif) {
        alert('Por favor, forneça um número de identificação fiscal (NIF).');
        return;
    }

    try {
        const response = await fetch('https://meunif.vercel.app/api/consulta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nif }) // Envia o NIF como JSON no corpo da solicitação
        });

        // Verifica se a resposta da API foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao consultar o NIF. Por favor, tente novamente mais tarde.');
        }

        const data = await response.json(); // Converte a resposta da API em JSON
        console.log(data); // Exibe os resultados da consulta na console

        // Aqui você pode manipular os resultados da consulta, como exibi-los em uma página HTML
    } catch (error) {
        console.error('Erro:', error.message);
    }
}            
```