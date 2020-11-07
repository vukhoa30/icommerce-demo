# App features
- Search products with filters and sorts
- Store product searching statistics

## App structure
![App structure](https://i.ibb.co/P9BQw8S/service-communication-and-data-flow.png)
## DB Diagram
![DB Diagram](https://i.ibb.co/n0xrmBL/db.png)
### Sequence diagram for communication with RPC pattern and Direct Reply-to feature of RabbitMQ, describing the flow main-app request product-service for product data:
![Sequence Diagram](https://i.ibb.co/tY70BdJ/sequence.png)
  
# Demo instructions
- Reprequisite: NodeJS, RabbitMQ server, PostgreSQL server, ts-node globally installed
- Configure database settings:
  + Create these databases manually if they don't exist:
    * For development: 'serviceproduct', 'servicestatistic'
    * For unit testing: 'testserviceproduct', 'testservicestatistic'
  + Go to product-service, create file named ".env", input the database username and password:
    * If you follow the method 1 bellow (recommended), input the 4 fields of DB username and password in "./ecosystem.config.js"
    * If you follow the method 2 bellow, Go to product-service, create file named ".env", input the database username and password and do the same for statistic-service:
```
DB_PASSWORD=<enter DB_PASSWORD here>
DB_USERNAME=<enter DB_USERNAME here>
```
- Install all dependencies: `npm run ins`
- Compile all typescript services: `npm run compile`
- Start app:
  + Method 1: run `npm run startDev` which using pm2
  + Method 2: run `ts-node index.ts` in 3 folders main-app, product-service, statistic-service (need to cd to the folder first)
- Run unit tests:
  + Go to product-service or statistic-service on terminal and run `npm test`
  
# Testing:
- Service unit tests: */services/*.test.ts . Follow the steps in "Demo instructions" section to setup project and test.
- Using cURL (integration test):
  + Get products that are blue and ordered by descending ID (will add statistic to statistic-service):
  `curl --request GET 'http://localhost:3000/products?filter=%7B%22color%22:%22Blue%22%7D&sort=%7B%22id%22:%22desc%22%7D'`
  + Get product detail that has ID of 5 (will add statistic to statistic-service):
  `curl --request GET 'http://localhost:3000/products/5'`
  + Get products query statistics that are filtered by color:
  `curl --request GET 'http://localhost:3000/statistic/products/query?filter=%5B%22color%22%5D'`
  + Get product detail view statistics that has ID of 1:
  `curl --request GET 'http://localhost:3000/statistic/products/detail-view?ids=%5B1%5D'`

# Source code description
### Lib/frameworks
Express, RabbitMQ, knex, objectionjs, Jest, typescript, postgresql
### Services:
- Names and descriptions:
  + main-app: Is a REST API server, handle HTTP requests from client
  + product-service: Provide product operations including store and query for other services (only main-app at this point)
  + statistic-service: Provide statistic operations for other services, currently handling statistic for product querying for the main-app
- Service communications:
  + Using RabbitMQ with RPC pattern and Direct Reply-to feature, to main-app to request functions from product-service and statistic-service
  + Using RabbitMQ with publish/subscribe pattern to make main-app publish the events of product querying to statistic-service to store the data for marketing
- Service code structure example: main-app
  + configs: provide environment variables handling and constants
  + lib: provide main functions for the service including setting up HTTP server and RabbitMQ functions for service communication
  + routes: describe the REST server routing and it handling
  + index.ts: App start file
  + .env.example: environment variables template