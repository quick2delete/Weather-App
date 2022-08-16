const body = document.querySelector("body");
const input = document.querySelector("input");
const button = document.querySelector("button");
const container = document.querySelector(".container");
const displayCard = document.querySelector(".display-card");
const town = document.querySelector(".town");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const description = document.querySelector(".description");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const p = document.querySelectorAll("p");

const weatherImage = {
  spring:
    "https://images.unsplash.com/photo-1518943701174-17e4aff936d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3ByaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
  summer:
    "https://images.unsplash.com/photo-1527661591475-527312dd65f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1bW1lcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
  autumn:
    "https://images.unsplash.com/photo-1567584032175-e3605e93b056?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF1dHVtbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
  winter:
    "https://images.unsplash.com/photo-1489674267075-cee793167910?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2ludGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
};

const season = {
  spring: [3, 4, 5, 6],
  summer: [7, 8, 9],
  autumn: [10, 11],
  winter: [12, 1, 2],
};

const displayBackground = () => {
  const currentMonth = new Date().getMonth();
  Object.entries(season).forEach((entry) => {
    const [key, value] = entry;
    if (value.includes(currentMonth)) {
      //currentMonth
      body.style.backgroundImage = `url(${weatherImage[key]})`;
      body.classList.add("body");
    }
  });
};

displayBackground();

const getDefaultLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = await position.coords.latitude;
      let lon = await position.coords.longitude;
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=b0c26b7fcaa3307b8e38791942b5159b`,
        { mode: "cors" }
      );
      const data = await response.json();
      console.log(data);
      town.textContent = `${data.name}`;
      temperature.textContent = `Temp: ${data.main.temp}°F`;
      humidity.textContent = `Humidity: ${data.main.humidity}`;
      description.textContent = `${data.weather[0].description}`;
      for (let item of p) {
        item.classList.toggle("font-bg-1");
      }
    });
  }
};

getDefaultLocation();

const getAnotherLocation = async () => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=imperial&APPID=b0c26b7fcaa3307b8e38791942b5159b`,
    { mode: "cors" }
  );
  const data = await response.json();
  console.log(data);
  town.textContent = `${data.name}`;
  temperature.textContent = `Temp: ${data.main.temp}°F`;
  humidity.textContent = `Humidity: ${data.main.humidity}`;
  description.textContent = `${data.weather[0].description}`;
  for (let item of p) {
    item.classList.toggle("font-bg-1");
  }
};

button.addEventListener("click", () => {
  for (let item of p) {
    item.classList.toggle("font-bg-1");
  }
  town.textContent = "";
  temperature.textContent = "";
  humidity.textContent = "";
  description.textContent = "";
  getAnotherLocation();
  input.value = "";
});
