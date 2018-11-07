import HackerNewsIngester from '../feed/HackerNewsIngester';

const hackerNewsIngester = new HackerNewsIngester();

function hackerNews(req, res, next) {
  hackerNewsIngester.getContent().then(data => {
    res.json(data);
  })
  .catch(err => {
    next(err)
  })
}

export default { hackerNews };
