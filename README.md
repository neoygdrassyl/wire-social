<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

BACKEND APP MADE IN NEST JS

## Features

- Nest JS
- TypeScript
- Mongoose ORM (MongoDB)
- Salt inpementation for passwords
  - Once a new user is signed up, the controller generates a code to salt the password with, and then saves an encripted version of it, therefore, the app does not save any password in plain text.

## Instalation

- clone the repository
- Install MOngoDB
- set the .env file with JWT_KEY variable
- npm i
- nest build
- nest start or npm start


