from flask import Flask, request, jsonify, render_template
import requests
from bs4 import BeautifulSoup
from url.nif import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('try_api.html')

@app.route('/consulta-nif', methods=['POST'])
def consulta_nif():
    data = request.get_json()
    nif = data.get('nif')

    if not nif:
        return jsonify({"error": "NIF não fornecido"}), 400

    resultados = api(nif)
    return jsonify(resultados)

if __name__ == '__main__':
    app.run(debug=True)