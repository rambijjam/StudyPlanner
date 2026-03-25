import numpy as np
import pickle 
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = pickle.load(open('../src/study_optimizer.pkl', 'rb'))

@app.route('/predict', methods = ['POST'])
def calculate_hours():
    
    data = request.get_json()

    subjects = data.get('subjects', [])
    total_hours = data.get('total_hours', 0)

    if not subjects or total_hours <=0 :
        return jsonify({"error":"Invalid input data"}), 400
    
    for subject in subjects:
        features = np.array([[
            subject['difficulty'],
            subject['previous_score'],
            subject['days'],
            subject['topics']
        ]])

        initial_weight = model.predict(features)[0]

        if subject.get('is_urgent', False):
            subject['priority_weight'] = float(initial_weight*2.0)

        else : 
            subject['priority_weight'] = float(initial_weight)

    total_weight = sum(s['priority_weight'] for s in subjects)
    
    if total_weight == 0:
        return jsonify({"error":"Total weight is zero"}), 500


    for subject in subjects:
        share = subject['priority_weight']/total_weight
        subject['recommended_hours'] = round(share*total_hours, 4)

    return jsonify(subjects)

if __name__ == '__main__' : 
    app.run(debug=True)