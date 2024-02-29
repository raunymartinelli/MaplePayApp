# Maple Pay App

## FRONT-END

### Description
This folder contains the front-end components of the Maple-Pay project. It is built using React and requires npm to install dependencies.

### Installation
To set up the front-end, navigate to the `front-end` directory and run the following commands:
```bash
cd front-end
npm install
```

### Run Front-End
```bash
start-frontend
```

Alterative
```bash
cd front-end
npm start
```

### File Explanation
public/: This directory contains the static files served by your application, like the index.html which is the entry point of your React application in the browser.

src/: This is where the source code of your application lives.

app/: This may contain the main component or script of your React app, such as App.js.
components/: This directory holds all the reusable React components like forms, buttons, inputs, etc.
graphql/: Contains GraphQL operation definitions, typically divided into mutations.js for write operations and queries.js for read operations.
pages/: This usually contains the components or scripts for entire pages in your application, like LoginPage.js, RegisterPage.js, and WalletPage.js.
index.js: The entry point of your React app's source code that renders the app component to the DOM.

## BACK-END

### Description
This folder contains the back-end components of the Maple-Pay project. It requires a .env file in the root of the backend directory for configuration.

### Installation
```bash
npm install
echo "MONGODB_URI=mongodb://localhost:27017/maplepay" > .env
echo "JWT_SECRET=W65>g)z<~%tQ8327Sb&64L42^!@nD3r+5kWpGfZabc#" >> .env
echo "REACT_APP_API_URL=http://localhost:4000/api" >> .env
```
Alternatively simply make a .env file in root with properties similar to this:
echo "MONGODB_URI=mongodb://localhost:27017/maplepay" > .env
echo "JWT_SECRET=W65>g)z<~%tQ8327Sb&64L42^!@nD3r+5kWpGfZabc#" >> .env
echo "REACT_APP_API_URL=http://localhost:4000/api" >> .env

### Run Front-End
```bash
start-backend
```

Alterative
```bash
node back-end/server.js
```
