from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello_www():
    return "Hello World Wide Web!"

@app.route("/api/list")
def show_list():
    myList = ["apple", "banana", "carrot"]
    return myList[1]