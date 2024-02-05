
// Web API URL & KEY
let urlbase = "https://api.openweathermap.org/data/2.5/weather?zip=";
const APIkey = "&appid=cbd98d69c130d71eae74997d2f58d35b&units=metric";

//date 
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// weather data with api 
const performAction = () => {
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    
    if (zip == '' || content == ''){
      alert("There is a missing info in ZIP or FEELINGS please fill and retry");
    }else{
    getData(urlbase , zip , APIkey)
        .then(function(data){

            console.log(data)
            const cloudsDescription = data.weather[0].description;
            postData('/weatherData' , {temp : data.main.temp , date:newDate , content : content, clouds:cloudsDescription});
        
        })
        .then(()=>{

          updateUI();
            
        })
        .catch(error => {
            console.log("Error fetching data:", error);
          });
}}

//event listener calling
document.getElementById('generate').addEventListener('click', performAction);

// get web api
const getData = async (urlbase, zip, APIkey) => {
    const url = urlbase + zip + APIkey;
    const res = await fetch(url);
    try {   
      const data = await res.json();
      return data;
    } catch (error) {  
      console.log("error", error);
    }   
  };


// POST data
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

     try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error);
    }
};



// Update UI
const updateUI = async () => {
    const res = await fetch("/all");
    try {
        const alldata = await res.json();

        document.getElementById("date").innerHTML = `Today is : ${alldata.date}`;
        document.getElementById("temp").innerHTML = `Temprature now is: ${alldata.temp} °c`;
        document.getElementById("content").innerHTML = alldata.content;
        document.getElementById("clouds").innerHTML = alldata.clouds;


    } catch (error) {
        console.log("Error:", error);
    }
};