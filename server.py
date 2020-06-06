from PIL import Image
import os
import pytesseract
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = './upload'
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/imagetohocr', methods=['POST'])
def imagetohocr():
    if 'file' not in request.files:
        return 'hatafile'
    file = request.files['file']
    if file.filename =='':
        return 'bos filename'
    filename = secure_filename(file.filename)
    fp = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(fp)
    hocr_str = pytesseract.image_to_pdf_or_hocr(Image.open(fp), extension='hocr', lang='fas')
    return hocr_str

# def main():
#     fp = 'testdata/wiki_farsi_1.png'
#     hocr_str = pytesseract.image_to_pdf_or_hocr(Image.open(fp), extension='hocr', lang='fas')
#     print(hocr_str)

# if __name__ == '__main__':
#     main()