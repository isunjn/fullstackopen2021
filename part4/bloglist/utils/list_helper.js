const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((acc, cur) => acc + cur, 0);
};

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  const favoriteBlogs = blogs.filter((blog) => blog.likes === maxLikes);
  if (favoriteBlogs.length === 0) return null;
  return {
    title: favoriteBlogs[0].title,
    author: favoriteBlogs[0].author,
    likes: favoriteBlogs[0].likes,
  };
};

const mostBlogs = (blogs) => {
  let mostAuthor = {
    author: null,
    blogs: 0,
  };

  const authorGroup = _.groupBy(blogs, "author");

  for (const author in authorGroup) {
    if (Object.hasOwnProperty.call(authorGroup, author)) {
      const authorBlogs = authorGroup[author];
      if (authorBlogs.length > mostAuthor.blogs) {
        mostAuthor.author = author;
        mostAuthor.blogs = authorBlogs.length;
      }
    }
  }

  return mostAuthor;
};

const mostLikes = (blogs) => {
  let mostAuthor = {
    author: null,
    likes: 0,
  };

  const authorGroup = _.groupBy(blogs, "author");

  for (const author in authorGroup) {
    if (Object.hasOwnProperty.call(authorGroup, author)) {
      const allLikes = authorGroup[author].reduce(
        (acc, cur) => acc + cur.likes,
        0
      );
      if (allLikes > mostAuthor.likes) {
        mostAuthor.author = author;
        mostAuthor.likes = allLikes;
      }
    }
  }

  return mostAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
