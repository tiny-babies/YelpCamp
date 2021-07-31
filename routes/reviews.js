const express = require('express');
const router = express.Router({mergeParams: true});
//need merge params so that you have access to req.params.id for the campgrounds id (thats in app.js)
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, validateReview, isReviewAuthor} = require('../middleware');

//Controllers:
const reviews = require('../controllers/reviews');

router.get('/', reviews.index);

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor,  catchAsync(reviews.destroy));

module.exports = router;