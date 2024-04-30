from flask import Flask, request, jsonify
from instance.predict import evaluation_predict

app = Flask(__name__)

@app.route('/')
def rootFlask():
  return "This is ROOT of Flask"

@app.route('/health-check')
def healthCheck():
  return "Flask is Healthy."

@app.route('/sentiment', methods=['POST'])
def sentiment():
  req = request.get_json()

  result = []

  for sentence in req['sentence']:
    sent_result = evaluation_predict(sentence)
    result.append(sent_result)

  return jsonify(data=result)

if __name__ == '__main__':
  app.run('localhost', port=5000, debug=True)