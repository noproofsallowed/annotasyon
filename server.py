from PIL import Image
import os
import pytesseract
from flask import Flask, flash, request, redirect, url_for
from flask_cors import CORS
import base64
import mimetypes
import sys
from pdf2image import convert_from_path
from werkzeug.utils import secure_filename
import cv2

UPLOAD_FOLDER = './upload'
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def img_to_data(path):
    """Convert a file (specified by a path) into a data URI."""
    if not os.path.exists(path):
        raise FileNotFoundError
    mime, _ = mimetypes.guess_type(path)
    with open(path, 'rb') as fp:
        data = fp.read()
        data64 = b''.join(base64.encodestring(data).splitlines())
        return u'data:%s;base64,%s' % (mime, str(data64, encoding='utf-8'))

def binarisation(path):
    if not os.path.exists(path):
        raise FileNotFoundError
    head, tail = os.path.split(path)
    new_path = os.path.join(head, "binary_" + tail)
    img = cv2.imread(path, 0)
    denoised = cv2.medianBlur(img,3)
    th = cv2.adaptiveThreshold(denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, \
        cv2.THRESH_BINARY, 11, 7)
    cv2.imwrite(new_path, th)
    print(new_path)
    return new_path

@app.route('/converttohocr', methods=['POST', 'GET'])
def imagetohocr():
    if request.method == 'POST':
        print(request.headers)
        print(request.files)
        print(request.form)
        if 'fileData' not in request.files:
            return 'hatafile'
        file = request.files['fileData']
        if file.filename =='':
            return 'bos filename'
        filename = secure_filename(file.filename)
        fp = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(fp)
        if filename[-3:] == 'pdf':
            print('napcam ki ben')
            pages = convert_from_path(fp, 500)
            res = {
                'data': [],
                'name': file.filename,
                'id': 'dummy_id'
            }
            for page in pages:
                pagefp = os.path.join(app.config['UPLOAD_FOLDER'], 'deneme1.jpg')
                page.save(pagefp, 'JPEG')
                hocr_str = pytesseract.image_to_pdf_or_hocr(Image.open(pagefp), extension='hocr', lang='fas')
                res['data'].append({
                    'data_url': img_to_data(pagefp),
                    'hocr': str(hocr_str, encoding='utf-8')
                })
            return res
        else:
            ### FIX IMAGE GOKCE PLS (fp image path)
            np = binarisation(fp)
            hocr_str = pytesseract.image_to_pdf_or_hocr(Image.open(np), extension='hocr', lang='fas')
            return {
                'data': [
                    {
                        'data_url': img_to_data(np),
                        'hocr': str(hocr_str, encoding='utf-8')
                    }
                ],
                'name': file.filename,
                'id': 'dummy_id',
                }
    if request.method == 'GET':
        return '''
        <!doctype html>
        <title>Upload new File</title>
        <h1>Upload new File</h1>
        <form method=post enctype=multipart/form-data>
        <input type=file name=file>
        <input type=submit value=Upload>
        </form>
        '''


# def main():
#     fp = 'testdata/wiki_farsi_1.png'
#     hocr_str = pytesseract.image_to_pdf_or_hocr(Image.open(fp), extension='hocr', lang='fas')
#     print(hocr_str)

# if __name__ == '__main__':
#     main()
