import json
import glob
import os
from PIL import Image
from PIL import ImageOps

male_answers = ['Anthony Bourdain', 'Pierce Brosnan', 'Wolf Blitzer',
    'Jose Canseco', 'Matt Parrilla', 'Richard Phillips', 'Peter Jackson',
    'James Kumarasamy', 'Al Michaels', 'Frank Deford', 'Edward R. Murrow',
    'Peter Shumlin', 'Shap Smith', 'Jim Douglas', 'John Boehner', 'Harry Reid',
    'Jon Stewart', 'Brian Williams', 'Andy Rooney', 'Mike Wallace', 'Dan Rather',
    'Stephen Colbert', 'Patrick Leahy', 'Peter Welch', 'Bernard Sanders',
    'Sean Hannity']

female_answers = ['Barbera Walters', 'Nina Keck', 'Charlotte Albright',
    'Dina Temple Raston', 'Audie Cornish', 'Robin Young', 'Sylvia Poggioli',
    'Soraya Sarhaddi Nelson', 'Nancy Pelosi', 'Hillary Clinton',
    'Rachel Maddow', 'Megyn Kelly', 'Samantha Bee']


def generate_json():
    face_list = glob.glob('static/img/faces/thumbnails/*.jpg')
    json_list = []
    for face in face_list:
        json_dict = {}
        filename = os.path.split(face)[1]
        f = os.path.splitext(filename)[0]
        name = f[:-4]
        meta = f[-3:].lower()
        sex = meta[0]
        local = meta[1]
        difficulty = meta[2]

        json_dict['name'] = name.replace('_', ' ')
        json_dict['img'] = face
        json_dict['mp3'] = ('static/mp3/' + name + '.mp3')
        json_dict['sex'] = sex

        if name == 'click_clack':
            json_dict['name'] = 'Click & Clack'
            json_dict['answers'] = ['Bert & Ernie', 'Harold & Kumar',
                'Simon & Garfunkle']

        if local == 'l':
            json_dict['local'] = 'True'
        else:
            json_dict['local'] = 'False'

        if difficulty == 'e':
            json_dict['difficulty'] = 'easy'
        else:
            json_dict['difficulty'] = 'hard'

        json_list.append(json_dict)

    faces_dict = [{'faces': json_list, 'maleAnswers': male_answers,
        'femaleAnswers': female_answers}]
    json_faces = json.dumps(faces_dict)
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
