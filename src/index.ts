import dotenv from "dotenv"
dotenv.config()
import app from "./app"
import { createConnection } from "typeorm"
import { __port__ } from "./utils/contants"

createConnection()
  .then(async (conn) => {
    console.log("Connected to DB")
    app.listen(__port__, () => console.log(`Running on port ${__port__}`))
  })
  .catch((err) => console.log("Err connecting to db: ", err))
