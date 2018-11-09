import config from '../../config/config';
import ContentIngester from './ContentIngester';

class SEDTranscriptIngester extends ContentIngester {
  constructor() {
    super();
  }

  getContent() {
    return new Promise((resolve, reject) => {
      resolve({content: {}})
    })
  }
}

export default SEDTranscriptIngester;
