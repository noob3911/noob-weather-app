
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const geoCode = require('./weather/geoCode.js');
const forecast =require('./weather/forecast.js');

const publicPath = path.join(__dirname,'./public');
const viewsPath = path.join(__dirname,'./template');
const partialPath = path.join(__dirname,'./template/partials');

//this is when the folder name was "views"
app.set('views engine', 'hbs');

//this is when the folder views renamed to template
app.set('views',viewsPath);

//this is to serve static files
app.use(express.static(publicPath));

//this is to serve partials 

hbs.registerPartials(partialPath);

app.get('',(req,res)=>{
	res.render('index.hbs',{
		title:"Weather App"
		

	})
})


app.get('/weather',(req,res)=>{
	if(!req.query.address){
		return res.send({
			error:"Enter the search term"
		})
	}
	geoCode(req.query.address,(error,{long,lati,place_name}={})=>{
		//here in the parameter for object destructuring providing the default parameter to avoid the empty query for, to avoid server crash as well.
		if(error){
			return res.send(error);
		}
		forecast(long,lati,(error,forecastData)=>{
			if(error){
				return res.send(error);
			}
			res.send({
				forecast:forecastData,
				location: place_name,
				address: req.query.address
			});
		});
	});
});


//

// geoCode("delhi",(error, data)=>{
//     if(error){
//         return console.log(error);
//     }
//     forecast(data.long,data.lati,(error,forecastData)=>{
//         if(error){
//             return console.log(error);
//         }
//         console.log(data.place_name);
//         console.log(forecastData);
//     })
// });


// app.get('*',(req,res)=>{
// 	res.end('404 Error')
// })

app.listen(port,()=>{
	console.log("Server is up..."+port)
})