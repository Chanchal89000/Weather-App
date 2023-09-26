let input = document.querySelector("#inp1");
let form = document.querySelector("#form1");
let buton = document.querySelector("#btn1");
let locat = document.querySelector("#location");
let image = document.querySelector("#image");
let tempreture = document.querySelector("#temp");
let situation = document.querySelector("#situation");
let humd = document.querySelector("#percent");
let speed = document.querySelector("#air");
let sunr = document.querySelector("#sunrise");
let suns = document.querySelector("#sunset");

const fetchWeather = async (e) => {
  e.preventDefault();
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e66aed9241fb4caa936111721232209&q=${input.value}&days=1&aqi=yes&alerts=yes`
  );
  const data = await response.json();
  locat.innerText = data.location.name;
  tempreture.innerText = `${data.current.temp_c}°C`;
  situation.innerText = data.current.condition.text;
  image.setAttribute("src", data.current.condition.icon);
  humd.innerText = `${data.current.humidity}%`;
  speed.innerText = `${data.current.vis_km}Km/per hour`;
  console.log(data);
  const astro = data.forecast.forecastday.map((item) => {
    return item.astro.sunrise;
  });
  sunr.innerText = astro;
  const astro2 = data.forecast.forecastday.map((item) => {
    return item.astro.sunset;
  });
  suns.innerText = astro2;

  const next15DaysData = async () => {
    const daysContainer = document.querySelector("#daysContainer");

    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e66aed9241fb4caa936111721232209&q=${input.value}&days=10&aqi=no&alerts=no`
    );

    const data2 = await response.json();
    console.log(data2, "????");
    const forecastdayArray = data2.forecast.forecastday;

    await forecastdayArray.forEach((forecast) => {
      const day1Container = document.createElement("div");
      day1Container.className = "day1Container";
      day1Container.innerHTML = `
            <div id="sp1">
                <img class="img2" src="${forecast.day.condition.icon}" alt="">
                <h4 class="date">${forecast.date}</h4>
            </div>
            <div id="sp2">
                <h4 class="date">${forecast.day.condition.text}</h4>
                <h4 class="date">${forecast.day.maxtemp_c}°C</h4>
            </div>
        `;

      daysContainer.appendChild(day1Container);
    });
  };
  next15DaysData();
  form.reset();
};

form.addEventListener("submit", fetchWeather);
