import sys
from upload_s3 import set_metadata
from faces import generate_json
from flask import Flask, render_template
from flask_frozen import Freezer

app = Flask(__name__)
freezer = Freezer(app)

app.config['FREEZER_DEFAULT_MIMETYPE'] = 'text/html'
app.config['FREEZER_IGNORE_MIMETYPE_WARNINGS'] = True
app.config['FREEZER_BASE_URL'] = 'http://www.vpr.net/apps/faces'

# If project doesn't have it's own domain/subdomain, use BASE_URL
#app.config['FREEZER_BASE_URL'] = 'http://www.example.com/not_base'

social = {
    'title': "VPR's Faces Made For Radio",
    'img': 'static/img/faces_social_share.png',
    'description': 'How well do you know your favorite VPR personalities? Take this quiz matching the voices you always hear to the faces you seldom see!'
}


@app.route('/')
def index():
    data = generate_json()
    return render_template('content.html', data=data, social=social)


@app.route('/play')
def play():
    data = generate_json()
    return render_template('content.html', data=data, social=social)

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'build':
        freezer.freeze()
        set_metadata()
    else:
        app.run(debug=True)
