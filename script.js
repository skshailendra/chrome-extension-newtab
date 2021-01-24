"use strict";
const greetings = {
  0: "Good Morning",
  1: "Good Afternoon",
  2: "Good Evening",
  3: "Midnight",
};
const quoteMessage = "What is your main focus for today?";

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const next = document.querySelector(".next");
const setMessage = () => {
  const welcomeContainer = document.querySelector(".welcome-container");

  const name = document.getElementById("name");
  const quote = document.querySelector(".quote");

  welcomeContainer.style.backgroundImage = `url("./images/bg${getRandomNumber(
    1,
    11
  )}.jpg")`;
  name.innerText = userName;
  quote.innerHTML = quoteMessage;
};

const updateTime = () => {
  const time = document.querySelector(".time");
  const localedate = document.getElementById("date");
  const greetingtime = document.getElementById("greetingtime");
  const datetime = new Date();
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  const locale = navigator.locale;
  greetingtime.innerText =
    datetime.getHours() > 0 && datetime.getHours() < 4
      ? `${greetings[3]}, `
      : datetime.getHours() > 3 && datetime.getHours() < 12
      ? `${greetings[0]}, `
      : datetime.getHours() > 11 && datetime.getHours() < 16
      ? `${greetings[1]}, `
      : `${greetings[2]}, `;

  time.innerHTML = new Intl.DateTimeFormat(locale, timeOptions).format(
    datetime
  );
  localedate.textContent = new Intl.DateTimeFormat(locale, options).format(
    datetime
  );
};
const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const myLocation = async function () {
  const cityText = document.querySelector(".city");
  const countryText = document.querySelector(".country");
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos?.coords;
  const locateMe = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const locateMyLocation = await locateMe.json();
  const { country, city } = locateMyLocation;
  cityText.innerHTML = `${city}, `;
  countryText.innerHTML = country;
};

setMessage();
updateTime();
myLocation();
setInterval(updateTime, 1000);
next.addEventListener("click", setMessage);
