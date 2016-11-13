# import Flask class
from flask import Flask, g, session, render_template, redirect, url_for, request, jsonify, abort

import utils.py

app = Flask(__name__) 

@app.route('/')
def home():
	"""
	Only ever is called once in page's life. Sends over the map and scripts.
	"""
	return render_template('index.html')

# start the flask server when the script is run directly (and not imported)
if __name__ == '__main__':
	# debug mode allows server to automatically reload when script changes
	app.debug = True

	# begin development server (running as port 80 requires sudo)
	app.run(host="127.0.0.1")#, port=8080)
