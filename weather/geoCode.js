const request = require('request');
const geoCode =(address, callback)=>{
    const geoURl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=2&access_token=pk.eyJ1IjoiYWFyeWEzOTExIiwiYSI6ImNraWl4NTI5NDBtOHMyeW1senMwaHZvYTkifQ.BwFwQANAmbbWYAXM0wAQ2A`;
    request({url:geoURl, json:true},(error,res)=>{
        //  const long = res.body.features[0].center[0];
        //  const lati = res.body.features[0].center[1];
        if(error){
            callback("Unable to connect..",undefined);
        }else if(res.body.features.length===0){
            callback('Unable to find location, Try another search',undefined);
        }else{
            callback(undefined,{
                long : res.body.features[0].center[0],
                lati : res.body.features[0].center[1],
                place_name : res.body.features[0].place_name
            })
        }
    })
}

module.exports =geoCode;