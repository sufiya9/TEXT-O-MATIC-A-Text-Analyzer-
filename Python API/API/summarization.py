from nltk.sentiment.vader import SentimentIntensityAnalyzer
import numpy as np
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import networkx as nx
import re
import nltk



def clean_punctuation(text):
    """Remove punctuation from text"""
    import string
    return text.translate(str.maketrans('', '', string.punctuation))

def read_article(file_name):
    file = open(file_name, "r")
    filedata = file.readlines()
    filedata = [clean_punctuation(data.strip()) for data in filedata if len(data) > 1]
    if len(filedata) == 1:
        # print("filedata ->", filedata)
        article = filedata[0].split(". ")
        # print("article ->", article)
    else:
        article = filedata

    sentences = []
    for sentence in article:
        # print(sentence)
        sentences.append(sentence.replace("[^a-zA-Z]", " ").split(" "))
    # sentences.pop() 
    # sentences = [s.strip().replace('.','') for s in sentences]
    
    return sentences

def sentence_similarity(sent1, sent2, stopwords=None):
    if stopwords is None:
        stopwords = []
 
    sent1 = [w.lower() for w in sent1]
    sent2 = [w.lower() for w in sent2]
 
    all_words = list(set(sent1 + sent2))
 
    vector1 = [0] * len(all_words)
    vector2 = [0] * len(all_words)
 
    # build the vector for the first sentence
    for w in sent1:
        if w in stopwords:
            continue
        vector1[all_words.index(w)] += 1
 
    # build the vector for the second sentence
    for w in sent2:
        if w in stopwords:
            continue
        vector2[all_words.index(w)] += 1
 
    return 1 - cosine_distance(vector1, vector2)
 
def build_similarity_matrix(sentences, stop_words):
    # Create an empty similarity matrix
    similarity_matrix = np.zeros((len(sentences), len(sentences)))
 
    for idx1 in range(len(sentences)):
        for idx2 in range(len(sentences)):
            if idx1 == idx2: #ignore if both are same sentences
                continue 
            similarity_matrix[idx1][idx2] = sentence_similarity(sentences[idx1], sentences[idx2], stop_words)

    return similarity_matrix

def generate_summary(file_name, top_n=5):

    stop_words = stopwords.words('english')
    summarize_text = []

    # Step 1 - Read text anc split it
    sentences =  read_article(file_name)
  # print(sentences)
    # Step 2 - Generate Similary Martix across sentences
    sentence_similarity_martix = build_similarity_matrix(sentences, stop_words)

    # Step 3 - Rank sentences in similarity martix
    sentence_similarity_graph = nx.from_numpy_array(sentence_similarity_martix)
    scores = nx.pagerank(sentence_similarity_graph, alpha=.6)

    # Step 4 - Sort the rank and pick top sentences
    ranked_sentence = sorted(((scores[i],s) for i,s in enumerate(sentences)), reverse=True)  
    

    print(ranked_sentence)
  # print("Indexes of top ranked_sentence order are ", ranked_sentence) 
    if top_n > len(ranked_sentence):
        for i in range(top_n):
            try:
                if len(ranked_sentence) > 1:
                    datalist= ranked_sentence[i][1]
                    print("data",datalist)
                    summarize_text.append(" ".join(datalist))
            except:
                print(ranked_sentence[i])
                print('skip')
    else:
        for i in range(len(ranked_sentence)):
            summarize_text.append(" ".join(ranked_sentence[i][1]))

    # Step 5 - Offcourse, output the summarize text
    if len(summarize_text) == 0:
        truncated_text = ranked_sentence[0][-1][:35]
        return " ".join(truncated_text)
    return ". ".join(summarize_text)

def get_para_sentiment(text):
    nltk.download('vader_lexicon')
    sid = SentimentIntensityAnalyzer()
    paragraphs  = [t.strip() for t in text.split(".")]
    result = []
    for paragraph in paragraphs:
        ss = sid.polarity_scores(paragraph)
        result.append(ss)
    return result
    
# let's begin
if __name__ == "__main__":
    out = generate_summary( r"C:\Users\PC\Desktop\Text-O-Matic\data.txt", 2)
    print(out)
    print(get_para_sentiment(out))


# from textblob import TextBlob
# def get_sentiment(text):
#     blob = TextBlob(text)
#     return blob.sentiment.polarity

# def get_subjectivity(text):
#     blob = TextBlob(text)
#     return blob.sentiment.subjectivity