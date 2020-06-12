from PIL import Image
import os
import pytesseract
from flask import Flask, flash, request, redirect, url_for
from flask_cors import CORS
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = './upload'
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/imagetohocr', methods=['POST', 'GET'])
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
        hocr_str = pytesseract.image_to_pdf_or_hocr(Image.open(fp), extension='hocr', lang='fas')
        return {'hocr': str(hocr_str)}
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
