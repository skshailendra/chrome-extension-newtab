"use strict";
const userName = "Shailendra";
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

const setMessage = () => {
  const welcomeContainer = document.querySelector(".welcome-container");

  const name = document.getElementById("name");
  const quote = document.querySelector(".quote");

  welcomeContainer.style.backgroundImage = `url("bg${getRandomNumber(
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
      : datetime.getHours() > 4 && datetime.getHours() < 12
      ? `${greetings[0]}, `
      : datetime.getHours() > 12 && datetime.getHours() < 16
      ? `${greetings[1]}, `
      : `${greetings[2]}, `;

  time.innerHTML = new Intl.DateTimeFormat(locale, timeOptions).format(
    datetime
  );
  localedate.textContent = new Intl.DateTimeFormat(locale, options).format(
    datetime
  );
};
setMessage();
updateTime();
setInterval(updateTime, 1000);
