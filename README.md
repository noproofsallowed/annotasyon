# Annotasyon Tool

Annotasyon tool yuklenen resim veya pdfi tesseract-ocr araciligiyla HOCR formatina cevirip, sonucu
gorsel bir sekilde inceleme ve degistirmeye olanak saglar.

Ana ozellikler:

-   HOCR bboxlarini gosteren bir kanvas
-   HOCR editlemek icin Codemirror
-   Edit icin tree view [TODO]
-   Latin mapping [TODO]
-   Internal data format(\_anno.json), resim, hocr ve latin mapping datasini iceriyor. [TODO]
-   PDF, JPEG, PNG destegi [TODO]

# Yapilacaklar

-   TODO olan featurelar
-   PDF support [BITTI]
-   Multi page support [BITTI]
-   UI Revamp
    -   Animation on loading etc.
-   Latin mapping
-   Tree View, web sayfalari
-   Auto folded editor and good folding support

# Image Preprocess

Tesseract siyah beyaz olmayan ortamlarda baya kotu calisiyor.

-   https://docs.opencv.org/3.4.0/d7/d4d/tutorial_py_thresholding.html => guzel ornek

# Development Environment

Yuklenmesi Gereken Toollar:

-   Homebrew (macos): https://brew.sh
-   Angular: https://www.zeolearn.com/magazine/setup-angular-mac
-   Python 3: https://docs.python-guide.org/starting/install3/osx/
-   Venv: https://sourabhbajaj.com/mac-setup/Python/virtualenv.html

Referans:

-   Angular: https://angular.io
-   Flask: https://flask.palletsprojects.com/en/1.1.x/
-   Pytesseract: https://pypi.org/project/pytesseract/
-   Tesseract: https://tesseract-ocr.github.io
-   Python 3:https://docs.python.org/3/
-   Venv: https://docs.python.org/3/library/venv.html

Yuklenmesi gerekenler yuklendikten sonra setup icin(git klasorunde bulunmak gerekiyor):

1. venv olustur.
2. venv baslat
3. python dep'lerini yukle.
4. typescript dep'lerini yukle
5. angular dev env calistir.
6. python server calistir. (yeni terminal)
7. development, debug, test...
8. venv durdur.
9. kar ?!

# Yararli komutlar

-   `virtualenv venv`: Venv olusturma
-   `source venv/usr/local/bin/activate`: Venv baslatma
-   `deactivate`: venv durdurma
-   `pip3 install -r requirements.txt`: Python dependencylerini yukleme
-   `npm install`: Typescript dependencyleri yukleme
-   `ng serve`: Angular development env calistirma. Adres = http://localhost:4200
-   `export FLASK_APP=server.py; flask run`: Server calistirma. Adres = http://localhost:5000
-   `tesseract wiki_farsi_1.png wiki_farsi_1 -l fas hocr get.images` ile manuel hocr uretilebiliyor.
-   https://solarianprogrammer.com/2019/10/21/install-opencv-python-macos/
    Installing Opencv (4.1.2) on Virtual Environment (macOS Catalina)
-   `pip3 install -r requirements.txt`: Library Requirements
-   `merge_requirements requirements.txt new_req.txt` Merging requirements.txt documents (example)
-   `brew install tesseract-lang` Installing Tesseract Languages

# \_anno.json format

-   {
    [
    {
    'data_url': str|null,
    'hocr': str
    }
    ],
    'name': str,
    'id': str,
    }
