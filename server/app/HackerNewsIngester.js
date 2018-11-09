import config from '../../config/config';
import ContentIngester from './ContentIngester';
import hn from 'hacker-news-api';

class HackerNewsIngester extends ContentIngester {
  constructor() {
    super();
  }

  getContent() {
    // Get recent ask_hn posts, polls, and comments
    return new Promise((resolve, reject) => {
      hn.ask_hn().poll().comment().recent(function (error, data) {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    })
  }
}

export default HackerNewsIngester;
