1. initialize the MariaDB(mySQL) database (e.g. using XAMPP). Check appwhats.sql file;
2. terminal > "npm install" > "npm start";
3. in browser go to "localhost:4000/api/users";

Routing = %server%/api

Use Git Bash (or code editor with Git Bash terminal) and run following commands:

    to save (register) new user: curl -d '{"login":"test", "password":"test", "confirmPassword":"test", "email":"test@mail.org"}' -H "Content-Type: application/json" -X POST http://localhost:4000/api/users

    to send message: curl -d '{"user_id":"123", "text":"message text"}' -H "Content-Type: application/json" -X POST http://localhost:4000/api/messages