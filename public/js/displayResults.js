import helperFn from './parseThumbnail.js';
import truncate from './truncate.js';

$(function () {

  // Retrieve Subreddit's name
  let subreddit = window.location.pathname.split('/').pop();

  // Check if subreddit is within the range of subreddits we actively look for
  if (subreddit === 'calculators' || subreddit === 'GraphingCalculator' || subreddit === 'learnmath' || subreddit === 'math' || subreddit === 'matheducation') {
    // Send an AJAX request to the backend, redditapi, to query data
    $.get(`result/${subreddit}`, function (data) {
      console.log(data);
      // Initialize a variable for storing the JSON data from AJAX
      let subreddit_data = data;
      // Display the result to the frontend
      displayResult(subreddit_data, subreddit);
    });
  }
})

function displayResult(data, subreddit) {
  var resultDiv = document.getElementById(subreddit);

  // Remove the Spinner
  $(".spinner").remove();

  // Check if there is any data
  if (data.length === 0) {
    let errorNotFound = `
      <div class="notFound">
        <img src="/img/oops-nothing-found-here.jpg" style="display: block; margin: 0 auto;">
      </div>
    `
    resultDiv.insertAdjacentHTML("beforeend", errorNotFound);
  }
  else {
    for (let i = 0; i < data.length; i++) {

      let thumbnail = null; let selftext = null;

      // Check if thumbnail is available. If yes, display it. If no, parse the title to see if there's any major brand or calculator. If yes, display the icon. If no, display          default picture.
      thumbnail = helperFn.parseThumbnail(data[i].title, data[i].thumbnail);

      // Truncate the selftext if it is too long
      if (data[i].selftext) {
        selftext = truncate.truncate(data[i].selftext, 450);
      }

      // Write Each Post in HTML Format as a String
      var newPost = `
    <div class="col s12 m12 l12 xl12">
        <div class="card horizontal">
            <div class="card-image">
                <a href="${data[i].url}" target="_blank">${thumbnail}</a>
            </div>
            <div class="card-stacked">
                <div class="card-content">
                <h5><a href="${directToReadMore(
        data[i]
      )}" target="_blank" class="default-title">${data[i].title}</a></h5>
    <p>${selftext ? selftext : ""}</p>
                </div>
                <div class="card-action">
                  <span class="badge">Score: ${data[i].score}</span>
                  <span class="left badge">${getSubmissionTime(
        data[i].created_utc
      )} by ${data[i].author}</span>
                </div>
            </div>
        </div>
    </div>
  `;

      // Append each post to the result class's div
      resultDiv.insertAdjacentHTML("beforeend", newPost);
    }
  }

}

// Redirecting the correct URL to the thread
function directToReadMore(post) {
  let newURL = "http://www.reddit.com" + post.permalink;
  return newURL;
}

// Check thread published time
function diff_hours(dt1) {
  var now_date = new Date(Date.now());
  var post_date = new Date(dt1 * 1000);
  var diff = (now_date.getTime() - post_date.getTime()) / 1000;
  diff /= 60 * 60;
  var result = Math.abs(Math.floor(diff));
  if (diff < 1) {
    return `Submitted ${(diff * 60).toFixed(0)} minutes ago`;
  } else if (diff < 24) {
    return `Submitted ${result} hours ago`;
  } else {
    if (Math.abs(Math.floor(result / 24)) === 1) {
      return "Submitted 1 day ago";
    } else {
      return `Submitted ${Math.abs(Math.floor(result / 24))} days ago`;
    }
  }
}

// Retrieve Each Post's Submission Time and Convert it to (x hours ago)
function getSubmissionTime(post_utc) {
  // Calculate time difference in hours from the submission time to current time
  return diff_hours(post_utc);
}