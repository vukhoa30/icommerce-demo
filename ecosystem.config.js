module.exports = {
  apps : [{
    name: "main-app",
    script: "./main-app/dist/index.js",
    env: {
      NODE_ENV: "production"
    }
  }, {
    name: "product-service",
    script: "./product-service/dist/index.js",
    env: {
      NODE_ENV: "production",
      DB_USERNAME: "",
      DB_PASSWORD: ""
    }
  }, {
    name: "statistic-service",
    script: "./statistic-service/dist/index.js",
    env: {
      NODE_ENV: "production",
      DB_USERNAME: "",
      DB_PASSWORD: ""
    }
  }]
}