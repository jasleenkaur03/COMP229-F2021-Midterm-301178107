// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
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
router.get('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  res.render('books/details', { books: {}, title: "add", actionstring : "add" });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  const Title = req.body.title,
    Price = req.body.price,
    Author = req.body.author,
    Genre = req.body.genre;

  const Book = new book({
    Title,
    Price,
    Author,
    Genre
  });
  Book.save()
    .catch(error => {
      console.log(error);
    });
  res.redirect('/books');

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  book.findById(req.params.id, (error, book) => {
    res.render('books/details', { books: book, title: "Update book details", actionstring: req.params.id });
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  book.findByIdAndUpdate(req.params.id, {
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  })
  .catch(e => {
    res.send(500, e);
  });
  res.redirect('/books');


});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  book.findByIdAndRemove(req.params.id)
    .catch(error => { res.send(500, error) });
  res.redirect('/books');
});


module.exports = router;
