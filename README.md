# Web_Assignment_8
Create an API using NodeJs, ExpressJs and Mongodb.

Used bcrypt to hash the passwords.
## Endpoint URLs
```javascript
// 1. GET route to get all the users
GET /user/getAll
// 2. POST route to create a new user
POST /user/create
// 3. PUT route to update a user
PUT /user/edit
// 4. DELTE route to delete the user
DELETE /user/delete
```
## Sample JSON Request for POST and PUT Calls
```javascript
{
    "email": "nagendra@gmail.com",
    "full_name": "Nagendra",
    "password": "yoyoY12345"
}
```
## Sample JSON Request for DELETE Call
```javascript
{
    "email": "nagendra@gmail.com"
}
```
### No JSON Request body needed for the GET call
