import json
import glob
import os


def generate_json():
    face_list = glob.glob('static/img/faces/*.jpg')
    json_list = []
    for face in face_list:
        json_dict = {}
        filename = os.path.split(face)[1]
        json_dict['name'] = os.path.splitext(filename)[0].replace('_', ' ')
        json_dict['img'] = face
        json_dict['mp3'] = face
        json_dict['answers'] = ['TestA', 'TestB', 'TestC']
        json_list.append(json_dict)
    json_object = json.dumps(json_list)
    print json_object

generate_json()
