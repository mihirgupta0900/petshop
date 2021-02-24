require("dotenv").config()
const { DATABASE_URL } = process.env
const parse = require("pg-connection-string").parse

const config = parse(DATABASE_URL)
const { host, password, database, port, user } = config

const isTsNode = !!process.argv.find((val) => val.includes("ts-node"))

module.exports = {
  type: "postgres",
  host: host,
  port: port || 5432,
  username: user,
  password: password,
  database: database,
  synchronize: false,
  entities: [isTsNode ? "src/entity/*.ts" : "dist/entity/*.js"],
  migrations: [isTsNode ? "src/migrations/*.ts" : "dist/migrations/*.js"],
  cli: {
    migrationsDir: "./src/migrations",
  },
}
