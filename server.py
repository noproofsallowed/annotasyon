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
            page = pages[0]
            pagefp = os.path.join(app.config['UPLOAD_FOLDER'], 'deneme1.jpg')
            page.save(pagefp, 'JPEG')
            hocr_str = pytesseract.image_to_pdf_or_hocr(Image.open(pagefp), extension='hocr')
            return {
                'data': [
                    {
                        'data_url': img_to_data(pagefp),
                        'hocr': str(hocr_str, encoding='utf-8')
                    }
                ],
                'name': file.filename,
                'id': 'dummy_id',
            }
        else:
            ### FIX IMAGE GOKCE PLS (fp image path)
            hocr_str = pytesseract.image_to_pdf_or_hocr(Image.open(fp), extension='hocr', lang='fas')
            return {
                'data': [
                    {
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
