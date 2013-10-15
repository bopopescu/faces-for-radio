import json
import glob
import os
import Image
import ImageOps

male_answers = ['Bill Clinton', 'Pierce Brosnan', 'Ira Glass', 'Jose Canseco']
female_answers = ['Barbera Walters', 'Nina Keck', 'Charlotte Albright', 'Dina Temple Whoever']


def generate_json():
    face_list = glob.glob('static/img/faces/thumbnails/*.jpg')
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


def create_thumbnails():
    photo_list = glob.glob('static/img/faces/*.jpg')
    size = 600, 480

    for picture in photo_list:
        f = os.path.split(picture)[1]
        thumbnail_path = 'static/img/faces/thumbnails/'
        filename, ext = os.path.splitext(f)
        image = Image.open(picture)
        im = ImageOps.fit(image, size, Image.ANTIALIAS)
        im.save(thumbnail_path + filename + ext, optimize=True, quality=75)
        print filename

generate_json()
