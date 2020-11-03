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
  + Same modules or separated?
    . Same: quick install
    . Separated: quick deploy on different machine -> this pls
- Logging: Winston
- Others:
  + express: best compatibility (over fastify)
  + postgres: best supported (over mongoDB, MySQL)
  + sequelize: best usability (over Objection, TypeORM (complex builder))
