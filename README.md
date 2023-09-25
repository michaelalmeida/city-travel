# City-travel

<p align="center">
<img src="https://i.ibb.co/N7fpbZH/Screenshot-2023-09-25-at-23-32-31.png" >
</p>

A toast component that can be integrated with web applications

## Summary

- [Main Stack](#main-stack)
- [Env](#env)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Comments](#comments)

## Main Stack

| Package          | Description                                       |
| ---------------- | ------------------------------------------------- |
| React            | A JavaScript library for building user interfaces |
| Typescript       | A superset of the JavaScript language             |
| styled-component | CSS as Components                                 |
| RTL              | JavaScript Testing utility for React              |
| Jest             | JavaScript Testing Framework                      |

## Env

Node version: v18.12.1
Npm version: 8.19.2

## Installation

Clone the repository

```bash
$ git clone https://github.com/michaelalmeida/city-travel.git
$ cd toast
```

When that's done, install the project dependencies, go to the server folder and run:

```bash
$ npm install
```

## Running the Project

After finish the previous step ([installation](#installation)) , you can start the project:

Starting running the server, inside the /server folder execute:

```bash
$ npm start
```

Then you can execute the same command in the /client folder to run the app in the development mode. Open http://localhost:3000 to view it in the browser.

| `npm <script>` | Description                         |
| -------------- | ----------------------------------- |
| `start`        | Serves your app at `localhost:3000` |
| `build`        | Builds the application              |
| `test`         | Runs unit tests                     |

## Comments

- Unfortunately, I could only write tests for NumberInput.test.tsx;
- The result pages have not style;
- I only used library for the date component.
