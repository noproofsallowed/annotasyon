from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):

    def handle_data(self, data):
        print("Encountered some data  :", data)

parser = MyHTMLParser()
parser.feed('