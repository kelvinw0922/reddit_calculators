import helperFn from './parseThumbnail.js';
import truncate from './truncate.js';

export default {
  queryReddit: function(sortBy) {
    // Retrieve Subreddit's name
    let subreddit = window.location.pathname.split('/').pop();

    // Check if subreddit is within the range of subreddits we actively look for
    if (
      subreddit === 'all' ||
      subreddit === 'calculators' ||
      subreddit === 'GraphingCalculator' ||
      subreddit === 'learnmath' ||
      subreddit === 'math' ||
      subreddit === 'matheducation'
    ) {
      // Send an AJAX request to the backend, redditapi, to query data
      $.get(`result/${subreddit}/${sortBy}`, function(data) {
        // Organize data if it's all subreddit
        let subreddit_data = [];
        if (subreddit === 'all') {
          for (let i = 0; i < data.length; i++) {
            var temp = data[i].data.children.map(post_thread => post_thread.data);
            subreddit_data = subreddit_data.concat(temp);
          }
          // Sort the array
          if (sortBy === 'new') {
            subreddit_data = subreddit_data.sort(function(a, b) {
              return new Date(b.created_utc * 1000) - new Date(a.created_utc * 1000);
            });
          } else if (sortBy === 'top') {
            subreddit_data = subreddit_data.sort(function(a, b) {
              return b.score - a.score;
            });
          }
        } else {
          // Initialize a variable for storing the JSON data from AJAX
          subreddit_data = data;
        }
        console.log(subreddit_data);
        // Display the result to the frontend
        displayResult(subreddit_data, subreddit, sortBy);
      });
    }
  },
};

function displayResult(data, subreddit, sortBy) {
  var resultDiv = document.getElementById(subreddit);
  resultDiv.className = '';
  resultDiv.className += sortBy;
  resultDiv.innerHTML = '';

  // Remove the Spinner
  $('.spinner').remove();

  // Check if there is any data
  if (data.length === 0) {
    let errorNotFound = `
      <div class="notFound">
        <img src="/img/oops-nothing-found-here.jpg" style="display: block; margin: 0 auto;">
      </div>
    `;
    resultDiv.insertAdjacentHTML('beforeend', errorNotFound);
  } else {
    // Initial Loading
    let initLoad = false;
    let theEnd = false;
    const limit = 3;
    let offset = 0;
    let array_length = data.length;
    // Check if the length of the array is fewer than the limit
    if (limit >= array_length) {
      for (let i = 0; i < data.length; i++) {
        console.log('1.a');
        displayCard(data[i], resultDiv);
      }
      initLoad = true;
      theEnd = true;
    }
    // The length of the array is more than the limit (async)
    else {
      // Create card from the beginning to the limit
      for (let i = 0; i < limit; i++) {
        console.log('1.b');
        displayCard(data[i], resultDiv);
      }
      // Set offset to the limit
      offset += limit;
      // Set initLoad = true
      initLoad = true;

      // Checking Scrolling
      if (!theEnd) {
        $(window).scroll(function() {
          let position = $(window).scrollTop();
          let bottom = $(document).height() - $(window).height() - 50;
          if (position >= bottom && !theEnd && initLoad) {
            // Check if the length of the array is fewer than the limit
            if (offset + limit >= data.length) {
              // Create card from offset to the end of the array
              for (let i = offset; i < data.length; i++) {
                console.log('2');
                displayCard(data[i], resultDiv);
              }
              // Set theEnd = true
              theEnd = true;
            }
            // The length of the array is more than the offset+limit
            else {
              // Create card from offset index to offset+limit
              for (let i = offset; i < offset + limit; i++) {
                console.log('3');
                displayCard(data[i], resultDiv);
              }
              // Set offset to offset+limit
              offset += limit;
            }
          }
        });
      }
    }
  }
}

// Redirecting the correct URL to the thread
function directToReadMore(post) {
  let newURL = 'http://www.reddit.com' + post.permalink;
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
      return 'Submitted 1 day ago';
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

// Creating one card object for one post, then add it to its corresponding div
function displayCard(data, resultDiv) {
  let thumbnail = null;
  let selftext = null;

  // Check if thumbnail is available. If yes, display it. If no, parse the title to see if there's any major brand or calculator. If yes, display the icon. If no, display          default picture.
  thumbnail = helperFn.parseThumbnail(data.title, data.thumbnail);

  // Truncate the selftext if it is too long
  if (data.selftext) {
    selftext = truncate.truncate(data.selftext, 450);
  }

  // Write Each Post in HTML Format as a String
  var newPost = `
    <div class="col s12 m12 l12 xl12">
        <div class="card horizontal">
            <div class="card-image">
                <a href="${data.url}" target="_blank">${thumbnail}</a>
            </div>
            <div class="card-stacked">
                <div class="card-content">
                <h5><a href="${directToReadMore(
                  data,
                )}" target="_blank" class="default-title"><span style='font-style: italic'>${
    resultDiv.id === 'all' ? '[' + data.subreddit + '] ' : ''
  }</span>${data.title}</a></h5>
    <p>${selftext ? selftext : ''}</p>
                </div>
                <div class="card-action">
                  <span class="badge">Score: ${data.score}</span>
                  <span class="left badge">${getSubmissionTime(data.created_utc)} by ${
    data.author
  }</span>
                </div>
            </div>
        </div>
    </div>
  `;

  // Append each post to the result class's div
  resultDiv.insertAdjacentHTML('beforeend', newPost);
}
