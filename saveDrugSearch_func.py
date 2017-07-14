from flask import (Flask, request, render_template, session, jsonify)
from model import *

def saveDrugSearchTerm(drugName):
    """ 
        Add drugName to Database 
        Return Boolean if successful

        Note: At this time there is not a phsycian nor patient table so these values are substituted

    """

    addItem = DrugSearch(physcian_id=1, patient_id=12, drugName=drugName)

    db.session.add(addItem)
    db.session.commit()

    return True