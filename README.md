# API - Consulta de NIF

## Introdução

O MySQL Operator para Kubernetes é um operador para gerenciar setups do MySQL InnoDB Cluster dentro de um Kubernetes Cluster. Ele gerencia o ciclo completo com configuração e manutenção, incluindo atualizações e backup automatizados.

O MySQL Operator para Kubernetes é trazido para você pela equipe MySQL da Oracle.

- **Repositório:** [NIF API](https://github.com/mr-body/NIF_API)
- **Autor:** Walter Alexandre Santana (mr-body)

### Usando Helm

Alternativamente, você pode usar [Helm](https://helm.sh/docs/intro/quickstart/); que é um gerenciador de pacotes para Kubernetes.

Instale o repositório do Helm:

```sh
$> https://github.com/mr-body/NIF_API.git
$> pip install requetiment.txt
$> cd NIF_API
$> cd api
$> python app.py

```

```yaml
<script>

            var nif = // seu nif
            fetch('/https://meunif.vercel.app/api/consulta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nif: nif }),
            })
            .then(response => response.json())
            .then(data => {
                var resultadoDiv = document.getElementById('resultado');
                resultadoDiv.innerHTML = '';

                if (data.error) {
                    resultadoDiv.textContent = data.error;
                } else {
                    for (var key in data) {
                        resultadoDiv.innerHTML += `<p><strong>${key}:</strong> ${data[key]}</p>`;
                    }
                }
            })
            .catch(error => {
                console.error('Erro:', error);
            });
            </script>
            
```