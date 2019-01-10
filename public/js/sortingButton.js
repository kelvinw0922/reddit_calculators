import reddit from './displayResults.js';

$('#new').click(function () {
  // Retrieve Subreddit's name
  let subreddit = window.location.pathname.split('/').pop();
  // Check if the current display is the same sorting
  var resultDiv = document.getElementById(subreddit);
  // If the currenty display is not new, then query new in redditapi
  if (!resultDiv.classList.contains('new')) {
    reddit.queryReddit('new');
  }
  // Change the button to top
  let sortingButton = document.getElementById('sort-btn');
  sortingButton.innerHTML = 'fiber_new';
})

$('#top').click(function () {
  // Retrieve Subreddit's name
  let subreddit = window.location.pathname.split('/').pop();
  // Check if the current display is the same sorting
  var resultDiv = document.getElementById(subreddit);
  // If the currenty display is not top, then query top in redditapi
  if (!resultDiv.classList.contains('top')) {
    reddit.queryReddit('top');
  }
  // Change the button to new
  let sortingButton = document.getElementById('sort-btn');
  sortingButton.innerHTML = 'favorite';
})