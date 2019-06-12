const request = require("request")


const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json/?access_token=pk.eyJ1IjoiamF5Zm9ybm9kZWpzIiwiYSI6ImNqdXg3aGp2ODBrYmo0MHBiaTR1OWtxa3QifQ.dfEhZ5Ls6_vcMWRHiF9VEQ&limit=1"

    request({url, json : true}, (error, {body})=>{
        if(error){
           callback("Unable to connect to location services", undefined)
        }
        else if(body.features.length ==0){
            callback("Unable to find location", undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
           
        }

    })
}

module.exports = geocode