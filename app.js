body = document.querySelector("body");
input = document.querySelector("input");
button = document.querySelector("button");
container = document.querySelector(".container");
displayCard = document.querySelector(".display-card");


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
// const getCoords = function () {
//   let lon;
//   let lat;
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       lon = position.coords.longitude;
//       lat = position.coords.latitude;

//       return { lon, lat };
//     });
//     console.log(lon, lat);
//   }
// };
// getCoords();

const displayBackground = () => {
  const currentMonth = new Date().getMonth();
  Object.entries(season).forEach((entry) => {
    const [key, value] = entry;
    if (value.includes(currentMonth)) {
      body.style.backgroundImage = `url(${weatherImage[key]})`;
      body.classList.add("body");
    }
  });
};

displayBackground();

const getDefaultLocation = async () => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=lyndhurst&units=imperial&APPID=b0c26b7fcaa3307b8e38791942b5159b`,
    { mode: "cors" }
  );
  const data = await response.json();
  console.log(data);
  const div = document.createElement("div");
  div.classList.add("default-location");

  div.textContent = `${data.name} ${data.main.temp}°F`;
  container.appendChild(div);
};

getDefaultLocation();

const getAnotherLocation = async () => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=imperial&APPID=b0c26b7fcaa3307b8e38791942b5159b`,
    { mode: "cors" }
  );
  const data = await response.json();
  console.log(data);
  const div = document.createElement("div");
  div.classList.add("another-location");
  //   div.innerHTML = `<p>${data.main.temp}</p>`;
  div.textContent = data.main.temp;
  container.appendChild(div);
};

button.addEventListener("click", () => {
  const defaultLocation = document.querySelector(".default-location");
  defaultLocation.style.opacity = 0;
  getAnotherLocation();
  input.value = "";
});

// function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);

//     }
// }

//   geoLocation()
