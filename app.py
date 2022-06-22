from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/instructions')
def instructions():
    return render_template('instructions.html')

'''-----------------------
ROUTES FOR EACH GAME MODE'''

@app.route('/classic/easy')
def classic_easy():
    return render_template('classicEasy.html')

@app.route('/classic/medium')
def classic_medium():
    return render_template('classicMedium.html')

@app.route('/classic/hard')
def classic_hard():
    return render_template('classicHard.html')

@app.route('/button-mash/easy')
def button_mash_easy():
    return render_template('buttonMashEasy.html')

@app.route('/button-mash/medium')
def button_mash_medium():
    return render_template('buttonMashMedium.html')

@app.route('/button-mash/hard')
def button_mash_hard():
    return render_template('buttonMashHard.html')

'''--------------------------
RUNS LOCAL SERVER'''

if __name__ == '__main__':
    app.run(debug=True)