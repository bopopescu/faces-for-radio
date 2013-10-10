import json
import glob
import os


def generate_json():
    face_list = glob.glob('static/img/faces/*.jpg')
    json_list = []
    for face in face_list:
        json_dict = {}
        filename = os.path.split(face)[1]
        name = os.path.splitext(filename)[0][:-2]
        sex = os.path.splitext(filename)[0][-1]
        json_dict['name'] = name.replace('_', ' ')
        json_dict['img'] = face
        json_dict['mp3'] = ('static/mp3/' + name + '.mp3')
        json_dict['sex'] = sex
        json_dict['answers'] = ['TestA', 'TestB', 'TestC']

        if name == 'click_clack':
            json_dict['name'] = 'Click &amp; Clack'
            json_dict['answers'] = ['Bert &amp; Ernie', 'Harold &amp; Kumar',
                'Simon &amp; Garfunkle']

        json_list.append(json_dict)
    json_faces = json.dumps(json_list)
    for i in json_list:
        print i
    return json_faces

generate_json()
