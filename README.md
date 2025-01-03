# Express.js/JavaScript: Starter API Code Sample

This JavaScript code sample demonstrates how to build an API server using Express.js that is secure by design.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
  - [Function](#function)
- [My process](#my-process)
  - [Built with](#built-with)
  - [How to install and run](#how-to-install-and-run)
- [Author](#author)

## Overview

### The challenge

"This JavaScript guide will help you learn how to secure an Express.js API using token-based authorization."

### Links

- Code URL: [Github](https://github.com/cekstedt/api_express_javascript_hello-world.git)
- Live Site URL: Not Hosted (yet)
- Challenge URL: [Auth0](https://developer.auth0.com/resources/guides/api/express/basic-authorization)

### Function

This server exposes four main routes:
- `{root}/api/messages/public`
    - The `/public` route returns a `200: Success` response whether it is called with authentication or not.
- `{root}/api/messages/protected`
- `{root}/api/messages/admin`
    - The `/protected` and `/admin` routes will only return a `200: Success` response if a header with a valid bearer token is provided. Otherwise they will return an `401: Unauthorized` response.
- `{root}/api/messages/error`
    - The `/error` route will always return a `500: Internal Server Error` response. This is only used for testing.  

And one last route for OpenAPI documentation:
- `{root}/api/docs`
All other routes will return a `404: Not Found` response.

## My process

### Built with

- NodeJS
- Express
- Auth0
- Jest
- Swagger

### How to install and run

#### Fork and reset the original repo

The setup instructions online appear to have decayed. Therefore, follow the following instructions to get to the `starter` branch as originally intended, if you want to start the follow-along instructions from scratch:  

- Fork the [original repo](https://github.com/auth0-developer-hub/web-app_express_javascript_hello-world).
- Clone into this forked repo, then cd into its home directory.
- Find the commit you want to go back to. In `git log` the commit message will be "create starter application".
- Reset to that commit's SHA: `git reset {git-hash-code}`
- Push removal of changes to your fork's repo: `git push --force`

#### Install the project dependencies:

```bash
npm install
```

Create a `.env` file under the root project directory and populate it with the following environment variables:

```bash
PORT=6060
CLIENT_ORIGIN_URL=http://localhost:4040
AUTH0_AUDIENCE={get-from-auth0-account}
AUTH0_DOMAIN={get-from-auth0-account}
BEARER_TOKEN={get-from-auth0-account} # This is for tests. NOTE: Tokens are only valid for 24 hours.
```

#### Commands

- `npm run dev ` will start your development server at http://localhost:3000/.
- `npm run test` will run tests.
- `npm run start` is the production command to run the server.

## Author

- [@cekstedt](https://github.com/cekstedt)
