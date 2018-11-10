// config should be imported before importing any other file
import config from './config/config';
import app from './config/express';
import SEDTranscriptIngester from './server/app/SEDTranscriptIngester';

function initServer() {
	// module.parent check is required to support mocha watch
	// src: https://github.com/mochajs/mocha/issues/1912
	if (!module.parent) {
	  // listen on port config.port
	  app.listen(config.port, () => {
	    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
	  });
	}
}

function ingest() {
	const sedTranscriptIngester = new SEDTranscriptIngester();
	sedTranscriptIngester.getContent()
}

switch(process.argv[2]) {
	case '--ingest':
		ingest();
		break;
	default:
		initServer();
		break;
}
