// src/utils/sortingUtils.js
const calculateHotScore = (post) => {
  const score = post.upvotes - post.downvotes;
  const order = Math.log10(Math.max(Math.abs(score), 1));
  const sign = score > 0 ? 1 : score < 0 ? -1 : 0;
  const seconds = post.timestamp / 1000 - 1134028003;
  return sign * order + seconds / 45000;
};

const sortPosts = (posts, sortBy) => {
  return [...posts].sort((a, b) => {
      switch (sortBy) {
          case 'popular':
              return (b.upvotes) - (a.upvotes);
          case 'hot':
              return calculateHotScore(b) - calculateHotScore(a);
          case 'new':
              return b.timestamp - a.timestamp;
          default:
              return 0;
      }
  });
};

export { sortPosts, calculateHotScore };