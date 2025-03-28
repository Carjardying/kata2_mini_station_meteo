//Pardon d'avance ça ressemble à rien du tout parce que j'ai testé des trucs

const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("city");
const buttonInput = document.querySelector("button");
const coordonates = document.getElementById("gps");

let cityTocall = "";//récupère la valeur de l'input plus tard. Ici pour pouvoir l'appeler ailleurs



/*****************COORDONNEES************/

const urlLyon =
  "https://nominatim.openstreetmap.org/search?q=Lyon&format=json&addressdetails=1&limit=1";
const urlParis =
  "https://nominatim.openstreetmap.org/search?q=Paris&format=json&addressdetails=1&limit=1";

//relier l'input à l'appel api
// const urlInput = `https://nominatim.openstreetmap.org/search?q=${cityTocall}&format=json&addressdetails=1&limit=1`; //Ne fonctionne pas pour le moment


async function fetchCoordinates(url) {
  try {
    cityTocall = cityInput.value;

    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${cityTocall}&format=json&addressdetails=1&limit=1`);
    const townInput = await response.json();

    cityName.innerHTML = townInput[0].name; //pas obligatoire mais là pour le moment
    coordonates.innerHTML = `coordonnées GPS : ${townInput[0].lat} , ${townInput[0].lon}`;

    console.log(townInput); //verifier que l'appel ok
    console.log("Ville : ", townInput[0].name);
    console.log("Latitude : ", townInput[0].lat); // verifier navigation dans le tableau
    console.log(coordonates); //fonctionne aussi (moche)
  } catch (error) {
    console.error("Failed to catch data: ", error);
  }
}

fetchCoordinates(urlLyon); //là pour faire un vrai appel api pendant que je tente de lier l'input à l'appel

/*****************METEO************/
async function fetchWeather(latitude, longitude) {
    try {
        const response = await fetch(url);
        const meteo = await response.json();
    
    } catch (error) {
        console.error("Failed to catch weather data: ", error);
      }
}

/*****************EVENTLISTENER************/
buttonInput.addEventListener("click", () => {
//   cityName.innerHTML = cityTocall; //la ville change de nom au clic
    console.log("City to call : ", cityTocall);
    fetchCoordinates();
});
