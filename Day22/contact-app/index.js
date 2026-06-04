import express from "express"
const app = express()
import ContactRoutes from "./routes/contacts.routes.js"
import { connectDB } from "./config/database.js"

const PORT = process.env.PORT

// Database Connection
connectDB()

// Middleware
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))

// Routes
app.use("/",ContactRoutes)

app.post('/',(req,res)=>{res.render('home')})
app.post('/show contact',(req,res)=>{res.render('home')})
app.post('/add contact',(req,res)=>{})
app.post('/add contact',(req,res)=>{})
app.post('/update contact',(req,res)=>{})
app.post('/update contact',(req,res)=>{})
app.post('/delete contact',(req,res)=>{})

app.listen(PORT, () => {
  console.log(`Server started Successfully on port ${PORT}.`)
})