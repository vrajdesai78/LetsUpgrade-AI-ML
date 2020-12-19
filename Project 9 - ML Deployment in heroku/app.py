from flask import Flask, render_template, request, url_for, redirect
import pickle
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
    

@app.route('/predict', methods=['GET','POST'])
def predict():
    model = pickle.load(open('loan_model.pkl','rb'))
    if request.method == "POST":
        name = request.form['Name']
        gender = int(request.form["gender"])
        m_status = int(request.form["m_status"])
        dependents = int(request.form["no_dependents"])
        education = int(request.form["education"])
        self_employed = int(request.form["self_employed"])
        applicantIncome = int(request.form["applicant_income"])
        coapplicant_income = int(request.form["coapplicant_income"])
        loanAmount = int(request.form["loanAmount"])
        tenure = int(request.form["tenure"])
        credit_history = int(request.form["credit_history"])
        property_area = int(request.form["property_area"])

        features = np.array([gender, m_status, dependents, education,
                                    self_employed, applicantIncome, coapplicant_income,
                                    loanAmount, tenure, credit_history, property_area])
        loan_status = model.predict([features])
        msg = ""
        print(type(loan_status))
        return render_template('index.html', loan_status = loan_status, f_name=name)
    else: 
        return render_template('index.html')


if __name__ == "__main__":
    app.run(debug=True)