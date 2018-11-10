import config from '../../config/config';
import ContentIngester from './ContentIngester';
import request from 'request';
import fs from 'fs';
import http from 'http';
import url from 'url';
import pdf from 'pdf-parse';

function pdfToText(filename) {
  let dataBuffer = fs.readFileSync(filename);
  return pdf(dataBuffer)
}

class SEDTranscriptIngester extends ContentIngester {
  constructor() {
    super();
  }

  getContent() {
    var file_url = "https://softwareengineeringdaily.com/wp-content/uploads/2018/10/SED702-BloxRoute-Scaling-Bitcoin.pdf"
    var DOWNLOAD_DIR = './downloads/';
    var options = {
      host: url.parse(file_url).host,
      port: 80,
      path: url.parse(file_url).pathname
    };
    
    var file_name = url.parse(file_url).pathname.split('/').pop();
    var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

    return new Promise((resolve, reject) => {
      http.get(options, function(res) {
        res.on('data', function(data) {
          file.write(data);
        }).on('end', function() {
          file.end();
          resolve()
        });
      });  
    }).then(() => {
      return pdfToText(DOWNLOAD_DIR + file_name)
    }).then(function(data) {
      console.log(data.text);
    });
  }
}

export default SEDTranscriptIngester;

