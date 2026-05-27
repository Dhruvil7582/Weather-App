let weather = {
  apiKey: "67b92f0af5416edbfe58458f502b0a31",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        encodeURIComponent(city) +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          this.toggleError(true);
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        this.toggleError(false);
        this.displayWeather(data);
      })
      .catch((err) => console.log(err));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.round(temp) + "°C";
    document.querySelector(".humidity").innerText = humidity + "%";
    document.querySelector(".wind").innerText = speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    
    document.body.style.backgroundImage =
      "url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1600&q=80')";
  },
  search: function () {
    const query = document.querySelector(".search-bar").value.trim();
    if (query) {
      this.fetchWeather(query);
    }
  },
  toggleError: function (show) {
    const banner = document.getElementById("error-banner");
    if (show) {
      banner.classList.remove("d-none");
      setTimeout(() => {
        banner.classList.add("d-none");
      }, 4000);
    } else {
      banner.classList.add("d-none");
    }
  }
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Patna");