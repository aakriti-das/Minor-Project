from telnetlib import TLS
from pymongo import MongoClient

MONGO_uri="mongodb+srv://aakriti:aakriti@cluster0.5aa28n0.mongodb.net/?retryWrites=true&w=majority"
try:
    client = MongoClient(MONGO_uri,tlsAllowInvalidCertificates=True)
    info=client.server_info()
    print("db connected")
    
    book_db = client['library_db']
    book_collection =book_db["books"]
    reviews_collection =book_db["reviews"]
    print (info)

except Exception as err:
    print(f"err {err}")



