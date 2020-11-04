- Choose one communication method: REST, RabbitMQ, TCP, gRPC
  -> RabbitMQ + RPC
  + Reasons:
    . RabbitMQ replaces Service Registry
    . One to many
    . Request in queue if callee is down
- Choose testing framework: Jest
- Design architecture:
  + Services: MainApp (REST API), Products, Marketting
  + Deployment: Kubernetes or PM2
    . Depends on the time left
  + API Gateway needed? -> Nah, using main app
  + Service registry needed? -> Nah, using RabbitMQ
  + Develop on same modules or separated?
    . Same: quick install
    . Separated: quick deploy on different machine -> this pls
  + Test on same modules or separated?
    . Same: Easy
    . Separated: to deploy on different module -> this pls
- Logging: Winston
- Others:
  + express: best compatibility (over fastify)
  + postgres: best supported (over mongoDB, MySQL)
  + sequelize: best usability (over Objection, TypeORM (complex builder))
- Considering:
  + Elasticsearch integration with DB: not needed yet (when the product data is large)
  + Redis: not needed yet (when the dashboard is visited very frequently)
  + Dockerization: for best setting up UX
