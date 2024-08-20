// bd.js
let mysql = require("serverless-mysql");

let config = {
    host: "localhost",
    database: "bd_site",
    user: "root",
    password: ""
}

let bd = mysql({
    config: config
});
module.exports = bd;