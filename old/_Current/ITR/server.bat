:: --watch ______ designates which file/s to watch and reset the server when it changes.
:: Only watching server.js is the best because we don't want the server to restart on client changes. It's super annoying.
:: Last argument is what file to keep alive, the server.

nodemon --watch server.js server.js