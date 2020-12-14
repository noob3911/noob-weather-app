const request = require('request');
const forecast =(long,lati, callback)=>{
    const url = `https://api.weatherbit.io/v2.0/current?&lat=${lati}&lon=${long}&key=a84b70c7baff42509803563167ef19da`;
    request({url:url, json:true},(error,res)=>{
        if(error){
            callback("Unable to connect..",undefined);
        }else if(res.body.error){
            callback('Unable to find location, Try another search',undefined);
        }else{
            callback(undefined,{temp :res.body.data[0].temp, 
                desc:res.body.data[0].weather.description,
                icon:res.body.data[0].weather.icon

            }
                )
        }
    })
}

module.exports =forecast;