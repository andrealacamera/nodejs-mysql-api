# REST API with NodeJS and MySql

Based on [this video](https://www.youtube.com/watch?v=F1RwUI3p4bI&list=PLG3j59vX4yLHA-wCw7KDP-i0r10ZrckqG&index=4).


## Packages:
- (dev) nodemon
- express
- sequelize
- sequelize-cli
- mysql2
- body-parser
- fastest-validator
- bcryptjs
- jsonwebtoken  
- dotenv



## DB Tables:
```
users: id, name, email, password
posts: id, title, content, image_url, categoryId, userId
categories: id, name
comments: id, content, postId, userId
```


### Details on Authentication
- [Authentication server](https://auth0.com/blog/what-is-an-authentication-server/)
- [JWT](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)
- [bcrypt](https://codahale.com/how-to-safely-store-a-password/)

### Notes: 
- You must add /config/config.json (or similar) in order to configure the DB [see here](https://sequelize.org/master/manual/migrations.html#configuration) and [here](https://stackoverflow.com/questions/38757728/using-an-enviroment-variable-for-local-sequelize-configuration). 

#### Updated: 2020-12-28