$(function () {

  $.get(`results`, function (data) {
    let result = data;
    console.log(result);
    displayResult(data);
  });

  function displayResult(data) {
    var resultDiv = document.getElementById('result');

    // Remove the Spinner
    $(".spinner").remove();

    for (let i = 0; i < data.length; i++) {

      // Write Each Post in HTML Format as a String
      var newPost = `
    <div class="col s12 m12 l12 xl12">
        <div class="card horizontal">
            <div class="card-image">
                <a href="${data[i].url}" target="_blank">${data[i].thumbnail}</a>
            </div>
            <div class="card-stacked">
                <div class="card-content">
                <h5><a href="${directToReadMore(
        data[i]
      )}" target="_blank">${data[i].title}</a></h5>
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

  function directToReadMore(post) {
    let newURL = "http://www.reddit.com" + post.permalink;
    return newURL;
  }

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
})