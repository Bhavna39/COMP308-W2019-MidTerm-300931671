// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
/* display add page */
router.get('/add', (req, res, next) => {

  res.render("books/details", {
    title: "Add New Book",
    books: book
  });

});

// POST process the Book Details page and create a new Book - CREATE/ADD
router.post('/add', (req, res, next) => {

  let newBook = book({
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  })

  book.create(newBook, (err, book)=>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else{
      // refresh book list
      res.redirect('/books');
    }

});

});

// GET the Book Details page in order to edit an existing Book - EDIT functionality 
router.get('/edit/:id', (req, res, next) => {

  let id = req.params.id;
  
  book.findById(id, (err, bookObject)=>{
      if(err){
        console.log(err);
        res.end(err);
      }
      else{
        // shows the view of the edit
        res.render('books/details', {
          title: 'Edit Book Details',
          books: bookObject
        })
      }
  });
   
});

// POST - process the information passed from the details form and update the document - EDIT/UPDATE - submit button
router.post('/edit/:id', (req, res, next) => {

  let id = req.params.id;

  let updatedBook = book({
    "_id": id,
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  })

  book.update({_id: id}, updatedBook, (err)=>{
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      //refresh the book list
      res.redirect('/books');
    }
  })
   

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
});


module.exports = router;
