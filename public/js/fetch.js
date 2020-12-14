
const search = document.getElementById('form');
const inputVal = document.querySelector('input');
const messageOne = document.querySelector('.messageOne');
const messageTwo = document.querySelector('.messageTwo');
const messageThree = document.querySelector('.messageThree');
const icons = document.querySelector('.icon');

search.addEventListener('submit',(e) => {
	e.preventDefault()
	const location = inputVal.value;
	console.log(location)
	messageOne.textContent ='Loading...';
	messageTwo.textContent='';
	const url = `/weather?address=${location}`;
	fetch(url).then((res)=>{
		res.json().then((data)=>{
			if(data.error){
				messageOne.textContent=data.error;
			}
			else{
				messageOne.textContent=data.location;
				messageTwo.textContent=data.forecast.temp+"°C";
				messageThree.textContent=data.forecast.desc;
				icons.src ="https://www.weatherbit.io/static/img/icons/" + data.forecast.icon + ".png";
				document.body.style.backgroundImage =
				"url('https://source.unsplash.com/1600x900/?" + data.location + "')";
				console.log(data.forecast.temp);
				console.log(data);
			}
			
		})
	})

});