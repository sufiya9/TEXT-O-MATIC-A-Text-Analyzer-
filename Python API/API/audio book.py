from multiprocessing.spawn import import_main_path
from io import StringIO
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser
import pyttsx3
from string import punctuation

# a function to extract all text data from pdf page wise and store in a list of dictionary
def clean_punctuation(text):
    return text.translate(str.maketrans('', '', punctuation))

def clean_whitespace(text):
    return ' '.join(text.split())

def extract_text_from_pdf(path):
    with open(path, 'rb') as fh:
        parser = PDFParser(fh)
        doc = PDFDocument(parser)
        rsrcmgr = PDFResourceManager()
        retstr = StringIO()
        laparams = LAParams()
        device = TextConverter(rsrcmgr, retstr, laparams=laparams)
        interpreter = PDFPageInterpreter(rsrcmgr, device)
        extracted_text = []
        for page in PDFPage.create_pages(doc):
            interpreter.process_page(page)
            extracted_text.append({
                'page_number': page.pageid,
                'text': clean_whitespace(clean_punctuation(retstr.getvalue()))
            })
        return extracted_text

def text_to_speech(text):
    engine = pyttsx3.init()
    engine.setProperty('rate',150)
    engine.say(text)
    engine.runAndWait()

def convert_pdf_to_audio(pdf_path):
    text = extract_text_from_pdf(pdf_path)
    for page in text: 
        text_to_speech(page['text'])

    
def save_as_audio_file(path, file_name):
    text = extract_text_from_pdf(path)
    engine = pyttsx3.init()
    engine.save_to_file(text, file_name)
    engine.runAndWait()

if __name__ == '__main__':
    book= r"C:/Users/ansar/Downloads/newtontext.pdf"
    save_as_audio_file(book, 'book.mp3')