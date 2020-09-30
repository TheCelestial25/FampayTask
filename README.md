# FAMPAY YOUTUBE TASK

### Requirements
* Node and NPM
* MongoDB
* A Google Account

### Instructions
1. Clone this repository, cd to the root folder
2. Follow the steps [here](https://github.com/googleapis/google-api-nodejs-client#oauth2-client) to get a 'secret_key' for OAuth to access Youtube's API. Rename the file as 'oauth2.keys.json' and place it in the root directory.
3. Open terminal and run the following command :
```sh
$ npm install
```
4. Change the variables in the file 'config.js' as per your requirements.
5. Run the server from the same directory using :
```sh
$ npm run
```
6. Authenticate through the browser when redirected.

### Testing
* You can test the paginated GET response using Postman or your browser. Eg -
```sh
$ localhost:8000/?page=1&limit=5
```
* You can see the results being stored in database using MongoDB Compass or in the mongo shell itself.