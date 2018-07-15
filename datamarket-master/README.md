# DataMarket

## Table of Contents
1. [Description](#description)
2. [Front-end](#frontend)
3. [Back-end](#backend)
4. [Machine Learning](#machinelearning)
5. [](#)

## Description

**The Basic Goal** : Create an API for a task management / todo list.

## Fontend

## Backend

 Implement an API with the following end-points (they would be preceded by something like http://localhost:4000/api/). Your implementation should use Node, Express and Mongoose.


| Endpoints| Actions | Intended Outcome                                          |
|----------|---------|-----------------------------------------------------------|
| users    | GET     | Respond with a List of users                              |
|          | POST    | Create a new user. Respond with details of new user       |
| users/:id| GET     | Respond with details of specified user or 404 error       |
|          | PUT     | Replace entire user with supplied user or 404 error       |
|          | DELETE  | Delete specified user or 404 error                        |
| data     | GET     | Respond with a List of datasets                           |
|          | POST    | Create a dataset. Respond with details of new dataset     |
| data/:id | GET     | Respond with details of specified dataset or 404 error    |
|          | PUT     | Replace entire dataset with supplied dataset or 404 error |
|          | DELETE  | Delete a specified dataset or 404 error                   |
| trans    | GET     | Respond with a List of transactions                       |
|          | POST    | Create a transaction. Respond with details of transaction |
| trans/:id| GET     | Respond with details of specified transaction or 404 error|
|          | PUT     | Replace entire transaction with supplied or 404 error     |

**NOTE**: In addition, the API has the following JSON encoded query string parameters for the GET requests to the `users` and `tasks` endpoints:

| Parameter | Description                                                                                  |
|----------|----------------------------------------------------------------------------------------------|
| where    | filter results based on JSON query                                                           |
| sort     | specify the order in which to sort each specified field  (1- ascending; -1 - descending)     |
| select   | specify the set of fields to include or exclude in each document  (1 - include; 0 - exclude) |
| skip     | specify the number of results to skip in the result set; useful for pagination               |
| limit    | specify the number of results to return (default should be 100 for tasks and unlimited for users)                    |
| count    | if set to true, return the count of documents that match the query (instead of the documents themselves)                    |

Here are some example queries and what they would return:

| Query                                                                                | Description                                             |
|-----------------------------------------------------------------------------------------|---------------------------------------------------------|
| `http://www.datamarktet.com:4000/api/users?where={"_id": "55099652e5993a350458b7b7"}`     | Returns a list with a single user with the specified ID |
| `http://www.datamarket.com:4000/api/tasks?where={"completed": true}`                      | Returns a list of completed tasks                       |
| `http://www.uiucwp.com:4000/api/tasks?where={"_id": {"$in": ["235263523","3872138723"]}}` | Returns a set of tasks                                  |
| `http://www.uiucwp.com:4000/api/users?sort={"name": 1}`                                  | Returns a list of users sorted by name                  |
| `http://www.uiucwp.com:4000/api/users?select={"_id": 0}`                                  | Returns a list of users without the _id field           |
| `http://www.uiucwp.com:4000/api/users?skip=60&limit=20`                                   | Returns user number 61 to 80                            |

**The API should be able to handle any combination of those parameters in a single request**. For example, the following is a valid GET request:

```javascript
http://www.uiucwp.com:4000/api/users?sort={"name": 1}&skip=60&limit=20
```

Here is the User Schema:

1. "name" - String
2. "email" - String
3. "pendingTasks" - [String] - The \_id fields of the *pending* tasks that this user has
4. "dateCreated" - Date - should be set automatically by server

Here is the Data Schema:

1. "name" - String
2. "description" - String
3. "deadline" - Date
4. "completed" - Boolean
5. "assignedUser" - String - The \_id field of the user this task is assigned to - default ""
6. "assignedUserName" - String - The name field of the user this task is assigned to - default "unassigned"
7. "dateCreated" - Date - should be set automatically by server to present date

**We assume that each task can be assigned only to one user.**

