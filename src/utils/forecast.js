const request = require("request")



const forecast = (latitude,longitude, callback)=>{
    const url = "https://api.darksky.net/forecast/5a5fc3306b6325242a095ca3bff1a6a2/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude)

request({url, json : true}, (error,{body}) =>{
    if(error){
        callback("Unable to connect to forecast service!")

    }else if(body.error){
        callback("Unable to find location!")

    }
    else{
        callback(undefined, 
        body.daily.data[0].summary  +
         " It is currently " + body.currently.temperature + " degrees out. " +
         " There is a " + body.currently.precipProbability + "% chance of rain" +
         " The high for today is " + body.daily.data[0].temperatureHigh + ". " +
         " The low for today is " + body.daily.data[0].temperatureLow + "."
         
        
        )}
    
    
})

}

module.exports = forecast