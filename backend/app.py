from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/tasks*": {"origins": ["http://localhost:5500", "http://127.0.0.1:5500"]}})
TASKS_FILE = "tasks.json"

def load_tasks():
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, 'r') as file:
            return json.load(file)
    return []


def save_tasks(tasks):
    with open(TASKS_FILE, 'w') as file:
        json.dump(tasks, file, indent=4)


@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = load_tasks()
    return jsonify([{"text": task["text"], "completed": task.get("completed", False)} for task in tasks])

@app.route('/tasks', methods=['POST'])
def add_task():
    tasks = load_tasks()
    new_task = {
        "text": request.json.get("text", ""),
        "completed": request.json.get("completed", False)
    }
    if new_task["text"]:
        tasks.append(new_task)
        save_tasks(tasks)
    return jsonify(tasks)

@app.route('/tasks/<int:index>', methods=['DELETE'])
def delete_task(index):
    tasks = load_tasks()
    if 0 <= index < len(tasks):
        del tasks[index]
        save_tasks(tasks)
    return jsonify(tasks)

@app.route('/tasks/<int:index>', methods=['PUT'])
def update_task(index):
    tasks = load_tasks()
    if 0 <= index < len(tasks):
        tasks[index]["completed"] = request.json.get('completed', False)
        save_tasks(tasks)
    return jsonify(tasks)

if __name__ == "__main__":
    app.run(debug=True, port=5001)
