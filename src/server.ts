import express from "express"
import authRouter from "./routers/auth.router"
import PointDeVenteRouter from './routers/PointDeVente.router'
import UserRouter from './routers/User.router'
import RDVRouter from './routers/RDV.router'
import { connect } from "./database/db"
import morgan from "morgan"

const app = express()
const PORT = process.env.PORT 

connect().catch((error) => {
  console.error("failed to connect to database:", error.message)
  process.exit(1)
})

app.use(express.json())
app.use(morgan("dev"))

app.use("/api/auth", authRouter) 
app.use('/api/center', PointDeVenteRouter )
app.use('/api/user', UserRouter)
app.use('/api/rdv', RDVRouter)

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running!" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`auth API available at http://localhost:${PORT}/api/auth`);
  console.log(`distribution centers API available at http://localhost:${PORT}/api/center`);
  console.log(`users API available at http://localhost:${PORT}/api/users`);
  console.log(`appointements API available at http://localhost:${PORT}/api/rdv`);
})