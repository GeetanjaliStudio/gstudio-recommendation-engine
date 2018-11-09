import { MethodNotImplemented } from '../APIError';

class ContentIngester {
  getContent(type) {
    throw MethodNotImplemented();
  }
}

export default ContentIngester;
