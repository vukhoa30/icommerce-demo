module.exports = {
  apps : [{
    name: "main-app",
    script: "./main-app/dist/index.js",
    env: {
      NODE_ENV: "production",
      DB_USERNAME: "postgres",
      DB_PASSWORD: "f661f95eb0624e2b9d924b9065a4f83e"
    }
  }, {
    name: "product-service",
    script: "./product-service/dist/index.js",
    env: {
      NODE_ENV: "production",
      DB_USERNAME: "postgres",
      DB_PASSWORD: "f661f95eb0624e2b9d924b9065a4f83e"
    }
  }, {
    name: "statistic-service",
    script: "./statistic-service/dist/index.js",
    env: {
      NODE_ENV: "production",
      DB_USERNAME: "postgres",
      DB_PASSWORD: "f661f95eb0624e2b9d924b9065a4f83e"
    }
  }]
}