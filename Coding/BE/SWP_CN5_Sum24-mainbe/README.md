# SWP_CN5_Sum24

This is the repo for backend modules in the project SWP

### #Watchout for frontend team:

At the scratch of this project please make sure when you test API or fetch API
1/ you download eclipse and intelij (ides can run spring boot project) + MySQL serverdownload default
link download MySQL server:
https://dev.mysql.com/downloads/mysql
2/ you use postman api document as an obligation reference
3/ you start spring boot then start to test/fetch api in your local

=> whenever you start spring boot: the schema will be created. Therefore, you need some tool for managing database so
that you can observe the schema.
whenever you stop the spring boot module: the schema will be dropped



##Backend team: maybe you will get troubles with database || hibernate ...
maybe because of direction of relationship in database, please have a look through this article:

https://docs.oracle.com/cd/E19798-01/821-1841/bnbqi/index.html#:~:text=The%20direction%20of%20a%20relationship,has%20only%20an%20owning%20side.