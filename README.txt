1. initialize the MariaDB(mySQL) database (e.g. using XAMPP). Database (name: appwhats) has 2 connected tables (users, messages);
2. terminal > "npm install" > "npm start";
3. in browser go to "localhost:3000/api/users";

Routing = %server%/api


URL                 Method        Action

api/users           POST	    add new user
api/users           GET 	    get all users

api/message   POST	    post message