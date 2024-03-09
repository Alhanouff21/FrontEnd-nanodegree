// VARIABLES
const result = document.querySelector("#result");
const planner = document.querySelector("#planner");
const addTripButton = document.querySelector(".trip_link");
const exportButton = document.querySelector("#export");
const deleteButton = document.querySelector("#delete");
const form = document.querySelector("#form");
const leavingFrom = document.querySelector('input[name="from"]');
const goingTo = document.querySelector('input[name="to"]');
const depDate = document.querySelector('input[name="date"]');
const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const username = "hannankl660";
const timestampNow = Date.now() / 1000;
const weatherbitAPIURL = "https://api.weatherbit.io/v2.0/current";
const weatherbitAPIkey = "0e72c87c93a0401d9425c22bee330d59";
const pixabayAPIURL = "https://pixabay.com/api/?key=";
const pixabayAPIkey = "42631100-ef579906a45ea5e4abf797ea8";
// Event listener for addTripButton
addTripButton.addEventListener('click', function(e) {
  e.preventDefault();
  planner.scrollIntoView({ behavior: 'smooth' });
});

// Event listener for form submit
form.addEventListener('submit', addTrip);

// Event listener for printButton
exportButton.addEventListener('click', function(e) {
  window.print();
  location.reload();
});

// Event listener for deleteButton
deleteButton.addEventListener('click', function(e) {
  form.reset();
  result.classList.add("invisible");
  location.reload();
});

// Function called when form is submitted
function addTrip(e) {
  e.preventDefault();
  const leavingFromText = leavingFrom.value;
  const goingToText = goingTo.value;
  const depDateText = depDate.value;
  const timestamp = new Date(depDateText).getTime() / 1000;

  async function processCityInfo(geoNamesURL, goingToText, username) {
    try {
      const cityData = await getCityInfo(geoNamesURL, goingToText, username);
      const cityLat = cityData.geonames[0].lat;
      const cityLong = cityData.geonames[0].lng;
      const country = cityData.geonames[0].countryName;
      const countryData = await getCountryInfo(country);
      const weatherData = await getWeather(cityLat, cityLong, country);
      const daysLeft = Math.round((timestamp - timestampNow) / 86400);
      const userData = await postData('http://localhost:5500/add', {
        leavingFromText,
        goingToText,
        depDateText,
        weather: weatherData.weatherData.data[0].temp,
        summary: weatherData.weatherData.data[0].weather.description,
        daysLeft,
      }, countryData);
      updateUI(userData);
    } catch (error) {
      console.log('error', error);
    }
  }
  
  processCityInfo(geoNamesURL, goingToText, username);
// Function getCityInfo to get city information from Geonames (latitude, longitude, country)
async function getCityInfo(geoNamesURL, goingToText, username) {
  const res = await fetch(geoNamesURL + goingToText + "&maxRows=10&" + "username=" + username);
  try {
    const cityData = await res.json();
    return cityData;
  } catch (error) {
    console.log("error", error);
  }
}

// Function getWeather to get weather information from Weatherbit API
async function getWeather(cityLat, cityLong, country) {
  const url = `${weatherbitAPIURL}?lat=${cityLat}&lon=${cityLong}&country=${country}&key=${weatherbitAPIkey}&units=M`;
  const req = await fetch(url);
  try {
    const weatherData = await req.json();
    return { weatherData };
  } catch (error) {
    console.log("error", error);
  }
}
// Function to get country information from Rest Countries API
async function getCountryInfo(country) {
  const url = `https://restcountries.com/v3/name/${country}`;
  const res = await fetch(url);
  
  try {
    const countryData = await res.json();
    return countryData[0];
  } catch (error) {
    console.log("error", error);
  }
}
function postData(url = '', data = {}, countryData) {
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      depCity: data.leavingFromText,
      arrCity: data.goingToText,
      depDate: data.depDateText,
      weather: data.weather,
      summary: data.summary,
      country: countryData.name.common,
      capital: countryData.capital,
      population: countryData.population,
      daysLeft: data.daysLeft,
    }),
  })
    .then(response => response.json())
    .catch(error => {
      console.log('error', error);
    });
}
async function updateUI(userData) {
  try {
    constresult = document.getElementById('result');
    result.classList.remove('invisible');
    result.scrollIntoView({ behavior: 'smooth' });

    const res = await fetch(`${pixabayAPIURL}${pixabayAPIkey}&q=${userData.arrCity}+city&image_type=photo`);
    const imageLink = await res.json();

    const dateParts = userData.depDate.split('-');
    const dateSplit = dateParts.reverse().join('-');
    document.getElementById('city').textContent = userData.arrCity;
    document.getElementById('date').textContent = dateSplit;
    document.getElementById('days').textContent = userData.daysLeft;
    document.getElementById('temp').textContent = `${userData.weather}°C`;
    document.querySelector("#country").innerHTML = userData.country;
    document.querySelector("#capital").innerHTML = userData.capital;
    document.querySelector("#population").innerHTML = userData.population;
    document.getElementById('fromPixabay').setAttribute('src', imageLink.hits[0].webformatURL);
  } catch (error) {
    console.log('error', error);
  }
}}


module.exports = {
  addTrip, 
};