const body = document.querySelector("body")
const content = document.querySelector(".content");
const userInput = document.querySelector("#country");
const submit = document.querySelector("#submit");
const viewport = document.querySelector(".viewport");


async function weatherAPI(string) {
  try {
    const dataRaw = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=048c9aaf296a4c03abe72143243006&q=${string}`,
      { mode: "cors" }
    );
    return dataRaw;
  } catch (error) {
    console.error(error);
  }
}

async function parseWeather(raw) {
  try {
    const data = await raw.json();
    const feelsLike = await data.current.feelslike_c;
    const temp = await data.current.temp_c;
    const humidity = await data.current.humidity;
    const condition = await data.current.condition.text;
    const country = await data.location.country;
    const city = await data.location.name;

    console.log(data);
    return { feelsLike, temp, condition, country, city, humidity };
  } catch (error) {
    console.error(error);
  }
}

async function callFunc(string) {
  const raw = await weatherAPI(string);
  const weather = await parseWeather(raw);
  return weather;
}

submit.addEventListener("click", async (event) => {
  event.preventDefault();
  const output = await callFunc(userInput.value);
  console.log(output);
  while (viewport.lastChild) {
    viewport.removeChild(viewport.lastChild);
  }

  temp_div = document.createElement("div");
  temp_div.className = "temp";
  temp_div.textContent = `The temperature in ${output.city}, ${output.country} is ${output.temp}°C`;
  viewport.appendChild(temp_div);

  feelsLike_div = document.createElement("div");
  feelsLike_div.className = "temp";
  feelsLike_div.textContent = `It currently feels like ${output.feelsLike}°C`;
  viewport.appendChild(feelsLike_div);

  condition_div = document.createElement("div");
  condition_div.className = "condition";
  condition_div.textContent = `Expect ${output.condition.toLowerCase()} conditons outside. Woohoo!`;
  viewport.appendChild(condition_div);
});
