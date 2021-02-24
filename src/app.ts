import express from "express"
import petRoutes from "./routes/petRoutes"
import ownerRoutes from "./routes/userRoutes"

const app = express()

app.use(express.json())

app.get("/", (_, res) => res.send("hey"))
app.use("/pets", petRoutes)
app.use("/owners", ownerRoutes)

export default app
