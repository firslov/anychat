import json
from flask import Flask, request
from flask_cors import CORS
import time
from func import getUrl, subUrl

app = Flask(__name__)
CORS(app, supports_credentials=True)

try:
    with open('data.json', 'r') as f:
        json.load(f)
except:
    with open('data.json', 'w') as f:
        json.dump([{"id": 9999999999, "topic": "这个主题不会被删除！", "life": 9999999999}], f)

@app.route('/getchatlist')
def getchatlist():
    list = json.dumps(clean_list())
    return list


@app.route('/submittopic', methods=["POST"])
def submittopic():
    topic = request.form['topic']
    clock = round(time.time())
    item = {"id": clock, "topic": topic, "life": clock}
    with open('data.json', 'r') as f:
        data = json.load(f)
        data.insert(0, item)
    with open('data.json', 'w') as f:
        json.dump(data, f)
    return "ok"

@app.route('/refreshchat/')
def refreshchat():
    id = request.args.get('id')
    print(id)
    id = int(id)
    with open('data.json', 'r') as f:
        list = json.load(f)
    time_now = round(time.time())
    for item in list:
        if (item["id"] == id) and (time_now > item["life"]):
            item["life"] = time_now
    with open('data.json', 'w') as f:
        json.dump(list, f)
    return "ok"

@app.route('/getfilelist')
def getfilelist():
    data = json.dumps(getUrl())
    return data

@app.route('/getsublist', methods=["POST"])
def getsublist():
    url = request.form["url"]
    data = json.dumps(subUrl(url))
    return data

def clean_list():
    with open('data.json', 'r') as f:
        list = json.load(f)
    time_now = round(time.time())
    for item in list:
        if (time_now - item["life"]) > 1800:
            list.remove(item)
    with open('data.json', 'w') as f:
        json.dump(list, f)
    return list

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
