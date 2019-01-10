require("isomorphic-fetch");

module.exports = {
  // Searching calculator's subreddits
  search: function (subreddit) {
    return fetch(
      `https://www.reddit.com/r/${subreddit}/top/.json?sort=top&t=week&limit=50`
    )
      .then(res => res.json())
      .then(data => data.data.children.map(post_thread => post_thread.data))
      .catch(err => console.log(err));
  },
  // Searching non-calculator's subreddits (such as Math-related)
  calculator_search: function (subreddit) {
    return fetch(
      `https://www.reddit.com/r/${subreddit}/search.json?q=calculator&sort=new&restrict_sr=on&limit=50&t=month`
    )
      .then(res => res.json())
      .then(data => data.data.children.map(post_thread => post_thread.data))
      .catch(err => console.log(err));
  }
};
