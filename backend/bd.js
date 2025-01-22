let mysql = require("serverless-mysql");

let config = {
    host: "localhost",
    database: "bd_site",
    user: "root",
    password: ""
};

let bd = mysql({
    config: config
});

bd.runQuery = async (query, values) => {
    try {
        const results = await bd.query(query, values);
        return results;
    } catch (error) {
        throw error;
    } finally {
        await bd.end();
    }
};

module.exports = bd;
