let lat;
let long;

const weatherImage = {
  spring:
    "https://images.unsplash.com/photo-1518943701174-17e4aff936d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3ByaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
  summer:
    "https://images.unsplash.com/photo-1527661591475-527312dd65f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1bW1lcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
  autumn:
    "https://images.unsplash.com/photo-1567584032175-e3605e93b056?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF1dHVtbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
  windter:
    "https://images.unsplash.com/photo-1567584032175-e3605e93b056?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGF1dHVtbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
};

const getCoords = function () {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    console.log(lat, long);
  });
};

const getJSON = async () => {
  getCoords();
  const response = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=f1e25dfd4a577596b8baad7c9b470acb`,
    { mode: "cors" }
  );
  console.log(response);
};

getJSON();
