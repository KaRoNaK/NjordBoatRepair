# NjordBoatRepair

## Setup

You need to run `<npm install>` on both the client and server, with this the client is ready to go, but the server needs further configuration. As I have used `dotenv` to extract some of the configuration variables from the source code, you need to set these up. You need the `PORT`(App.js/40) to tell the server which port should be used, `DB_NAME`, `DB_USER`, `DB_PASSWORD` and `HOST` to configure the connection to the database(in database.js), and `SECRET_OR_KEY` that is used to sign the JWT tokens(auth.js/29 and isAuth.js/13). With this you should be able to start both(`npm start`).
<br /><br /><br />

## Server structure

This structure is my go-to in Node.js applications, this way the routes, controllers, models and additional middlewares are separated, and makes it easier to manage on the long run.
<br /><br /><br />

## Server file notes/documentation

### App.js

I tried to keep it clean, so it only contains the `CORS` setup, route setups, a general error handling middleware.
<br /><br />

### Models

I used `Sequelize` to interact with the database.
<br /><br />

### Controllers

These are pretty simple controllers containing one function each, as it was limited how much of the system should be implemented. The auth.js only contain logic for the login functionality. I used `bcrypt` and `jsonwebtoken` for some general security and client management. In job.js it is only possible to fetch all the jobs with the relevant information.
<br /><br />

### Additional middlewares

These are used to protect some of the routes. The isAuth.js checks if the user has a valid token. If not, the user won't be able to reach the protected routes. AuthRole.js handles the authorization part, only users with the required roles can reach certain routes.
<br /><br />

### Routes

Here the requests are directed to the appropriate controllers. The login routes can be accesed by anybody, but to reach the job routes the user needs to be authenticated and have the necessary role.
<br /><br />

### database.js

It just defines the connection to the database.
<br /><br />

### initDb.js

This defines the connections between the models and populates them with some dummy data.
<br /><br /><br /><br />

## Client file notes/documentation
<br /><br />

### App.js

I used `react-router-dom` to render the aprropriate page for the user and protect the routes that (s)he should not be able to reach. If the user is not authenticated, the login page will load, otherwise the dashboard page. When the user tries to log in, the app will check if it got back the correct response from the server. If everything is correct then the state is updated and some information is stored in `localStorage`, so even after the user reloads the page, (s)he is still loged in. The user will be automaticly logged out in one hour and the `localStorage` will be cleared.
<br /><br />

### Login

There is only a login page, so new users cannot be registered. Elements like Remember me and forgot password are just placeholders, there is no functionality behind them.
<br /><br />

### After login

The app has a basic navigation, used with `react-router-dom`. Most of the pages are just placeholders, the only usable page is the Job Ads.
<br /><br />

### JobAds.js

While there is data to be shown to the user, a simple loading is render. After the page is loaded `componentDidMount` will make a call to the server and retrive all the availabel jobs. The user token will be attached to the call, so server can verify the user. Before displaying the data, some modifications are performed so it looks presentable to the user. `material-ui` has been used to display the data in a table-like format. If the user clicks on one of the rows, the page navigates to a detailed job add page.
<br /><br />

### JobAd.js

This page gets the data from JobAds with use of `react-router-dom`. If the user is navigated to this page manually(by URL and not by clicking on a job ad row) then there could be a call to the server to retrieve a single job ad, but that functionality is currently not implemented. With some modifications, the detailed data is displayed to the user. The other elements on the page are just placeholders, they have no implemented functionality.
<br /><br /><br /><br />

## Usage

The user is greeted with the login page. As the users are auto generated and there is no way to register, the following users can be used:<br /><br />

Username: James Doe, password: asdqwe123, role: company<br /><br />

Username: Jane Doe, password: ultraPassword456, role: user<br /><br />

As only compnay users have access to the page, only James Doe will be logged in. Jane Doe will have an unauthorized error, but errors are displayed on the UI currently.<br />
Currently there is no log out button, so if the user wants to log out, the `localStorage` needs to be cleared. For that, open the `developer tools` -> `Application` -> `localStorage`.<br /><br />

After log in, navigate to the Job Ads page, click on one of the rows, and the detailed job page will be displayed.
