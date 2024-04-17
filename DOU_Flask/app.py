from flask import Flask
import json

app = Flask(__name__)

@app.route('/')
def hello():
  return "This is home!"

@app.route('/sentiment')
def sentiment():
  result = {
    "test": "test"
  }
  return json.dumps(result)

if __name__ == '__main__':
  app.run('localhost', port=5000, debug=True)