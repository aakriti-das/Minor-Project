from json.tool import main
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


from database import *

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class BookModel(BaseModel):
    isbn: str
    name: str
    published_date: str
    author_name: str
    category: str
    description: str
    image_url: str
    rating: int = 0
    price:int


class BookRatingReqest(BaseModel):
    isbn: str
    rating: int = 0

class AddBookReview(BaseModel):
    isbn: str
    comment: str


@app.get("/test")
async def say_hello():
    return "hello"

#Newly Arrived

@app.get("/book/newly_arrived")
async def get_newly_arrived_book(limit=10):
    books = list(book_collection.find({}, {'_id': False}).sort('published_date', -1).limit(int(limit)))
    return books

#Most Popular

@app.get("/book/most_popular")
async def get_most_popular_book(limit=10):
    books = list(book_collection.find({},{'_id': False}).sort('rating', -1).limit(int(limit)))
    return books

#Book Details

@app.get("/book/details")
async def get_book_details(isbn):
    book = book_collection.find_one({'isbn': isbn}, {'_id': False})
    if book:
        return book
    else:
        return {
            'status': False,
            'msg': f'Could not find book with ISBN {isbn}'
        }

#Adding Book

@app.post("/book/add_book")
async def add_book(req: BookModel):
    exist_book = book_collection.find_one({'isbn': req.isbn})
    if exist_book:
        return {
            'status': False,
            'msg': f'Book with ISBN {req.isbn} is already exist'
        }
    book = book_collection.insert_one(req.dict())
    response = {
        'status': True,
        'msg': 'Data Inserted'
    }
    return response

#Deleting Book

@app.post("/book/delete")
async def delete_book(isbn):
    book = book_collection.delete_one({"isbn": isbn})
    response = {
        'status': True,
        'msg': "Book Deleted..."
    }
    return response

#Book Rating
@app.post("/book/rating")
async def book_rating(req:BookRatingReqest):
    filter = {"isbn": req.isbn}
    update = {"$set": {"rating": req.rating}}
    # this must be update query
    # find by isbn
    # update rating col
    book = book_collection.update_one(filter, update)
    response = {
        'status': True,
        'msg': "Rating updated to {req.rating}"
    }
    return response

#Adding Review
@app.post("/book/add_review")
async def add_book_review(req: AddBookReview):
    book = reviews_collection.insert_one(req.dict())
    response = {
        'status': True,
        'msg': "Review Added"
    }
    return response


#Deleting Review

@app.post("/book/delete_review")
async def delete_book_review(isbn):
    book = reviews_collection.delete_one({"isbn": isbn})
    response = {
        'status': True,
        'msg': "Review Deleted.."
    }
    return response

#Get Review

@app.get("/book/get_review")
async def get_book_review(isbn):
    book = reviews_collection.find_one({"isbn": isbn}, {'_id': False})
    response = book if book else {
        "status": False,
        "msg": "Cannot find the review."
    }
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)