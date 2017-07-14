from flask import (Flask, request, render_template, session, jsonify)

from model import *
from saveDrugSearch_func import *

from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__, template_folder='./public/')

app.secret_key = "lovely thursday"

@app.route('/')
def index():
    """ Render index.html"""

    return render_template("index.html")

@app.route('/save/drugSearch', methods=['POST'])
def saveDrugSearch():
    """ 
        Save Drug Options Selected To DataBase
        Return Json: {status: 'ok' or 'error'}
    """

    drugName = request.form.get("drugName")
    print("drugName", drugName)

    returnVal = saveDrugSearchTerm(drugName)
    response = {}

if __name__ == "__main__":
    import sys

    app.debug = True 

    connect_to_db(app)

    DebugToolbarExtension(app)

    app.run()

    DEBUG = "No_DEBUG" not in os.environ
    port='5000'
    if len(sys.argv) > 1:
        port = sys.argv[1]
    app.run(host="0.0.0.0", port=int(port), debug=DEBUG)