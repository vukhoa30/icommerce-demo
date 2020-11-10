module.exports = {
  apps : [{
    name: "main-app",
    script: "./main-app/index.js",
    env: {
      NODE_ENV: "production",
      MB_HOST: ''
    }
  }, {
    name: "product-service",
    script: "./product-service/index.js",
    env: {
      NODE_ENV: "production",
      DB_USERNAME: '',
      DB_PASSWORD: '',
      MB_HOST: ''
    }
  }, {
    name: "statistic-service",
    script: "./statistic-service/index.js",
    env: {
      NODE_ENV: "production",
      DB_USERNAME: '',
      DB_PASSWORD: '',
      MB_HOST: ''
    }
  }]
}