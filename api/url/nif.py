import requests
from bs4 import BeautifulSoup

def api(nif):
    # URL para fazer scraping
    url = f"https://portaldocontribuinte.minfin.gov.ao/consultar-nif-do-contribuinte?nif={nif}"
    # Fazendo a solicitação HTTP
    response = requests.get(url)

    # Verifica se a solicitação foi bem-sucedida
    if response.status_code == 200:
        # Analisa o conteúdo HTML da página
        soup = BeautifulSoup(response.content, 'html.parser')

        # Encontra todos os elementos com a classe 'form-group'
        form_groups = soup.find_all("div", attrs={'class': 'form-group'})

        # Inicialize um dicionário para armazenar os resultados
        resultados = {}

        # Itera sobre cada form-group para extrair os dados
        for form_group in form_groups:
            # Encontra a label dentro do form-group
            label = form_group.find('label', class_='control-label')

            # Verifica se a label foi encontrada
            if label:
                # Encontra o próximo elemento irmão que contém o texto
                texto_elemento = label.find_next_sibling()

                # Verifica se o elemento irmão existe e contém texto
                if texto_elemento and texto_elemento.get_text(strip=True):
                    # Adiciona o resultado ao dicionário
                    resultados[label.get_text(strip=True)] = texto_elemento.get_text(strip=True)

        return resultados
    else:
        return {"error": response.status_code}
