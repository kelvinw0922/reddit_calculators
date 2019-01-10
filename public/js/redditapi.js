require("isomorphic-fetch");

module.exports = {
  // Searching calculator's subreddits
  search: function (subreddit, sortBy) {
    if (sortBy === 'top') {
      return fetch(
        `https://www.reddit.com/r/${subreddit}/top/.json?sort=top&t=week&limit=50`
      )
        .then(res => res.json())
        .then(data => data.data.children.map(post_thread => post_thread.data))
        .catch(err => console.log(err));
    }
    else if (sortBy === 'new') {
      return fetch(
        `https://www.reddit.com/r/${subreddit}/new/.json?sort=new&t=week&limit=50`
      )
        .then(res => res.json())
        .then(data => data.data.children.map(post_thread => post_thread.data))
        .catch(err => console.log(err));
    }
    else {
      return status(404).json({ error: "Wrong sorting keyword" });
    }
  },
  // Searching non-calculator's subreddits (such as Math-related)
  calculator_search: function (subreddit, sortBy) {
    if (sortBy === 'top') {
      return fetch(
        `https://www.reddit.com/r/${subreddit}/search.json?q=calculator&sort=top&restrict_sr=on&limit=50&t=month`
      )
        .then(res => res.json())
        .then(data => data.data.children.map(post_thread => post_thread.data))
        .catch(err => console.log(err));
    }
    else if (sortBy === 'new') {
      return fetch(
        `https://www.reddit.com/r/${subreddit}/search.json?q=calculator&sort=new&restrict_sr=on&limit=50&t=month`
      )
        .then(res => res.json())
        .then(data => data.data.children.map(post_thread => post_thread.data))
        .catch(err => console.log(err));
    }
    else {
      return status(404).json({ error: "Wrong sorting keyword" });
    }
  },
  // Searching all subreddits in our defaultlist
  all_search: function (list, sortBy) {
    if (sortBy === 'new') {
      let urls = [];
      for (let i = 0; i < list.length; i++) {
        urls.push(`https://www.reddit.com/r/${list[i]}/new/.json?sort=new&t=week&limit=20`);
      }
      return Promise.all(urls.map(fetch)).then(responses =>
        Promise.all(responses.map(res => res.json())
        ).then(data => data))
        .catch(err => console.log(err));
    }
    else if (sortBy === 'top') {
      let data = {}
      data = topAllSubs(list);
      return data;
    }
    else {
      return status(404).json({ error: "all_search function cannot use the current sorting keywork" });
    }
  }
};

// Combined all subreddits query with the TOP sortBy
function topAllSubs(list) {

}