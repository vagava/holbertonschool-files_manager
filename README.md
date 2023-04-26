# Files Manager

This project is a compilation of back-end concepts: authentication, NodeJS, MongoDB, Redis, pagination and background processing.

The objective was to build a simple platform to upload and view files with:

- User authentication via a token
- List all files
- Upload a new file
- Change permission of a file
- View a file
- Generate thumbnails for images

|                                                                                                         |                                                                                      |                                                                                              |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| ![Redis](https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Redis_Logo.svg/1000px-Redis_Logo.svg.png) | ![mongo](https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png) | ![nodejs](https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/full/nodejslogo.png) |

## Testing and Jobs

The project includes a queueing job system for generating thumbnails of images uploaded to the application. It also uses this feature to generate a welcome message when a new user is created. For all of this, Bull is used.
![bull nodejs](https://raw.githubusercontent.com/OptimalBits/bull/master/support/logo%402x.png)

For testing of the application, Mocha is used in combination with Chai.

![mocha chai](https://miro.medium.com/max/499/0*WpXBkrfgR2g9dw2T.png)

## Endpoints

The project performs all of its features through endpoints running in Express.

User endpoints are hosted in Redis, while files and user data is hosted in MongoDB.

    GET /status
    Returns if Redis is alive and if the DB is alive

    GET /stat
    Return the number of users and files in DB

    POST /users
    Creates a new user in DB. Also starts a background process for generating a welcome message to the user in the console

    Users
    Every authenticated endpoint of the API will look at a token inside the header `X-Token`

    GET /connect
    Signs-in the user by generating a new authentication token, reading the users credentials in an Authorization header coded in Base64

    GET /disconnect
    Signs-out the user based on the token

    GET /users/me
    Retrieve the user base on the token used

    Files

    POST /files
    Create a new file in DB and in disk. Also starts a background process for generating thumbnails for files of type `image`

    GET /files/:id
    Retrieves the file document based on the ID

    GET /files
    Retrieves all users file documents for a specific `parentId` and with pagination

    PUT /files/:id/publish
    Set a file document to public based on the ID

    PUT /files/:id/unpublish
    Set a file document to private based on the ID

    GET /files/:id/data
    Return the content of the file document based on the ID

## Challenges in Development and Future Features

Developing this project was quite interesting and an incredible learning experience. It had some interesting challenges concerning the use of several different technologies. On of its toughest parts had to do with the correct codification of images in order to allowing for a correct transmission of data through the HTTP protocol.

In regards to future features, it would be interesting to change the authentication system. Right now, the application keeps track of user's session by saving the authentication token in Redis, but a system such as JWT would be more appropriate for having a RESTful API, and decoupling its operations completely from the client.