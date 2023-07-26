from pymongo import MongoClient
from config import *
 
client = MongoClient(MONGO_HOST)
book_db = client['library_db']
book_collection =book_db["books"]
reviews_collection =book_db["reviews"]