module.exports = {
    "api": {
        "port": "8080",
        "hostname": "localhost",
        "pathname": "/",
        "protocol": "http"
    },
    "database": {
        "client": "mongodb",
        "connection": {
          "host" : "127.0.0.1",
          "port": "27017",
          "database" : "jwt_task"
        }
    },
    "jwt":{
        "secretKey":"secretKey"
    }
 }