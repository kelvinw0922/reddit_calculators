require("isomorphic-fetch");

module.exports = {
  search: function (subreddit) {
    return fetch(
      `https://www.reddit.com/r/calculators/hot/.json?limit=50`
    )
      .then(res => res.json())
      .then(data => data.data.children.map(post_thread => post_thread.data))
      .catch(err => console.log(err));
  }
};
