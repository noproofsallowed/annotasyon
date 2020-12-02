from html.parser import HTMLParser
import urllib.request as urllib2

class MyHTMLParser(HTMLParser):

    #Init
    lsStartTags = list()
    lsEndTags = list()
    lsStartEndTags = list()
    lsComments = list()

    #HTML Parser Methods
    def handle_starttag(self, startTag, attrs):
        self.lsStartTags.append(startTag)

    def handle_endtag(self, endTag):
        self.lsEndTags.append(endTag)

    def handle_startendtag(self,  startendTag, attrs):
        self.lsStartEndTags.append(startendTag)

    def handle_comment(self, data):
        self.lsComments.append(data)

#Creating obj of the overriden class
parser = MyHTMLParser()

#Opening NYTimes
html_page = urllib2.urlopen("https://www.nytimes.com/")

#Feed
parser.feed(str(html_page.read()))

#printing the extracted values
# print("Start tags", parser.lsStartTags)
# print("End tags", parser.lsEndTags)
# print("Start End tags", parser.lsStartEndTags)
print("Comments", parser.lsComments)
