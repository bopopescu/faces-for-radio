import json
import glob
import os

male_answers = ['testA', 'testB', 'testC', 'testD']
female_answers = ['test1', 'test2', 'test3', 'test4']


def generate_json():
    face_list = glob.glob('static/img/faces/*.jpg')
    json_list = []
    for face in face_list:
        json_dict = {}
        filename = os.path.split(face)[1]
        name = os.path.splitext(filename)[0][:-2]
        sex = os.path.splitext(filename)[0][-1].lower()
        json_dict['name'] = name.replace('_', ' ')
        json_dict['img'] = face
        json_dict['mp3'] = ('static/mp3/' + name + '.mp3')
        json_dict['sex'] = sex
        if sex == 'm':
            json_dict['answers'] = male_answers
        elif sex == 'f':
            json_dict['answers'] = female_answers
        else:
            json_dict['answers'] = ['FAIL', 'FAIL', 'FAIL']

        if name == 'click_clack':
            json_dict['name'] = 'Click & Clack'
            json_dict['answers'] = ['Bert & Ernie', 'Harold & Kumar',
                'Simon & Garfunkle']

        json_list.append(json_dict)
    json_faces = json.dumps(json_list)
    return json_faces

generate_json()
