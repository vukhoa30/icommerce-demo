module.exports = {
  apps : [{
    name: "main-app",
    script: "./main-app/index.js",
    env: {
      NODE_ENV: "production"
    }
  }, {
    name: "product-service",
    script: "./product-service/index.js",
    env: {
      NODE_ENV: "production",
      DB_USERNAME: process.env.DB_USERNAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      MB_HOST: process.env.MB_HOST
    }
  }, {
    name: "statistic-service",
    script: "./statistic-service/index.js",
    env: {
      NODE_ENV: "production",
      DB_USERNAME: process.env.DB_USERNAME,
      DB_PASSWORD: process.env.DB_PASSWORD,
      MB_HOST: process.env.MB_HOST
    }
  }]
}