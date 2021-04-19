# Smarkio IBM Watson Challenge

# Steps to run this project:
 - Make shure that you have installed and setup the NPM in your machine (you can download from here: https://nodejs.org/pt-br/)
 - Clone this project runnin the follow command:
    $mkdir matheus_smarkio_challenge && cd matheus_smarkio_challenge && git clone git@github.com:wwwMendex/smarkio_challenge.git && cd smarkio_challenge && npm i

    this command will execute this steps:
    - Create a new directory named matheus_smarkio_challenge
    - Change to this folder
    - Clone the challenge repo into this new directory
    - Change to the project directory
    - Install node and all package dependencies

 - Before run project, you need to setup the environment file. So, copy and paste /public/assets/environment.example.js to  environment.js in the same directory. In this file is possible to change the database credentials, ibm api_key, url and voices. Is required to you have a previously database created to run this project. You can change the 'database_name' in environment to a new  empty database, ou create a new one by running this:
      $mysql -u your_user -p
      $create database matheus_smarkio_watson;

  - After the succefully database create and the environment setup, we will start the application running the following command in the root directory of our project:
    $node server.js

 - In your console will appears:
  "Database connected" 
      [...]
  "Running into: localhost:{PORT}"

   you could click or copy and paste this link in your browser search bar and see the results.
    