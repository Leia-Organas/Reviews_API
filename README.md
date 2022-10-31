# Reviews_API

# Overview
> Backend system redesign of legacy e-commerce microservice to improve user experience and system effiencies.

# Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Team](#team)

# Description
> The redesigned Atelier user interface will allow customers to browse and search products, add desired products to their cart, and finally checkout the products in the cart. The interface consists of a ‘Product Details’ page, which contains three main features:
> * Overview
> * Ratings & reviews
> * Related items & comparison section
> 
> Maintenance of the product catalog and inventory is not under the scope of the current application version. Product information is obtained through the [Atelier API](https://app-hrsei-api.herokuapp.com/api/fec2/:CAMPUS_CODE/).

# Installation
**Requirements**
* [Node >=16.16.x](https://nodejs.org/en/)

**Dependencies**
* [React + ReactDOM](https://reactjs.org/)
* [MaterialUI](https://mui.com/)
* [Axios](https://axios-http.com/)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [ExpressJS](https://expressjs.com/)
* [react-img-zoom](https://www.npmjs.com/package/react-img-zoom)
* [react-material-ui-carousel](https://www.npmjs.com/package/react-material-ui-carousel)
* [react-multi-carousel](https://www.npmjs.com/package/react-multi-carousel)
* [reactjs-popup](https://www.npmjs.com/package/reactjs-popup)

**Dev Dependencies**
* [Jest](https://jestjs.io/)
* [jest-environment-jsdom](https://www.npmjs.com/package/jest-environment-jsdom)
* [Supertest](https://www.npmjs.com/package/supertest)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
* [Webpack](https://webpack.js.org/)
* [Babel](https://babeljs.io/)
* [ESLint](https://eslint.org/)

# Usage
## Production
1. Run `npm install` from the root directory to install dependencies
2. Copy `example.env`, rename copied file to `.env` and fill out accordingly
3. Run `npm build` from the root directory to generate `bundle.js`
4. Run `npm start` from the root directory to launch server
5. In browser, open localhost:`env.SV_PORT` (default: 3000) to view client

## Development
1. Run `npm install` from the root directory to install dependencies
2. Copy `example.env`, rename copied file to `.env` and fill out accordingly
3. Run `npm run dev` from the root directory
4. In browser, open localhost:`env.SV_PORT` (default: 3000) to view client
5. Refresh browser on file changes to update client output

## Environment File (`.env`) Configuration
* `SV_PORT`: Server port (default: 3000)
* `CL_PORT`: Webpack client dev server port (default: 3001)
* `API_URL`: URL to fetch Atelier API calls from, replace `:CAMPUS_CODE` with your Hack Reactor campus code (default: https://app-hrsei-api.herokuapp.com/api/fec2/:CAMPUS_CODE/)
* `GITHUB_AUTH`: GitHub authentication token, required for Atelier API calls


## Scripts
**Production**
* `npm start`: [node] Starts Express server on port `env.SV_PORT`
* `npm build`: [webpack] Generates bundle.js for production

**Development**
* `npm run client-dev`: [webpack] Compiles client files in webpack development mode to bundle.js, reloads on file save
* `npm run client-dev-serverless`: [webpack] Serves client files to dev server on port `env.CL_PORT`, for use when developing client features where no server connection is required
* `npm run server-dev`: [nodemon] Starts Express server on port `env.SV_PORT`, reloads on file save
* `npm run dev`: [webpack / nodemon] Runs client-dev and server-dev scripts in parallel, for use when developing both client and server features

**Testing**
* `npm run test`: [jest] Runs test files
