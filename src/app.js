const express = require("express")
const path = require("path")
const hbs = require("hbs")
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const directoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

const app = express()
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(directoryPath))

app.get("", (req, res)=>{
    res.render("index", {
        title: 'Weather',
        name: 'Jason Archer'
    })

})

app.get("/about",(req, res)=>{

  res.render("about", {
    title: 'About Me',
    name: 'Jason Archer'  
  })
})

app.get("/products", (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help",(req, res)=>{

    res.render("help", {
      helpText: "This is some helpful text"  ,
      title: 'Help',
      name: 'Jason Archer'  
    })
  })

  app.get("/help/*", (req,res)=> {
      res.render("404",{
          title: 'Help',
          name: 'Jason Archer',
          errorMessage: 'Help Article Not Found'

      })
  })

app.get("/weather",(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    } geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})




app.get("*", (req,res)=>{
    res.render("404",{
        title: "404",
        name: "Jason Archer",
        errorMessage: "Page not found"
    })


})

app.listen(3000, ()=>{
    console.log("Server is up for port 3000")
})

