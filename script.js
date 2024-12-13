const Englishapiurl = "https://v2.jokeapi.dev/joke/Any";
const Hindiapiurl =
  "https://hindi-jokes-api.onrender.com/jokes/?api_key=ab2c6905fdabed98a0b0da63c0c9";
const EnglishBtn = document.querySelector(".EngJokeBtn");
const HindiBtn = document.querySelector(".HindiJokeBtn");
const nextbtn = document.querySelector(".nextmeme");
const setup = document.querySelector(".setup");
const delivery = document.querySelector(".delivery");
const Copybtn = document.querySelector(".Copy-btn");
const progressBar = document.querySelector(".progress");
const Loadingpreloader = document.querySelector(".Loading-preloader");
var apiurl = Englishapiurl;

const text = "VAIBHAV SHARMA";
let index = 0;

function typeWriter() {
  if (index < text.length) {
    document.getElementById("text").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  } else {
    // Reset and start again after a pause
    setTimeout(() => {
      document.getElementById("text").innerHTML = "";
      index = 0;
      typeWriter();
    }, 2000);
  }
}

typeWriter();

async function jokes(apiurl) {
  progressBar.style.display = "block";
  Loadingpreloader.style.display = "block";
  const Response = await fetch(apiurl);
  var Data = await Response.json();

  if (Data.status == "error") {
    console.log("Joke not found");
  }

  if (apiurl == Englishapiurl) {
    if (Data.type == "single") {
      setup.innerHTML = Data.joke;
      delivery.style.display = "none";
    } else {
      delivery.style.display = "block";
      setup.innerHTML = Data.setup;
      delivery.innerHTML = Data.delivery;
    }
  }
  if (apiurl == Hindiapiurl) {
    setup.innerHTML = Data.jokeContent;
    delivery.style.display = "none";
  }
  progressBar.style.display = "none";
  Loadingpreloader.style.display = "none";
}

HindiBtn.addEventListener("click", () => {
  apiurl = Hindiapiurl;
  jokes(apiurl);
});
EnglishBtn.addEventListener("click", () => {
  apiurl = Englishapiurl;
  jokes(apiurl);
});
nextbtn.addEventListener("click", () => {
  jokes(apiurl);
});
window.addEventListener("load", () => {
  jokes(apiurl);
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 2000); // Hide after 2 seconds
  Loadingpreloader.style.display = "none";
});
Copybtn.addEventListener("click", () => {
  const textToCopy =
    delivery.style.display == "none"
      ? setup.innerHTML
      : `SETUP: ${setup.innerHTML}\n${
          delivery.style.display !== "none"
            ? `DELIVERY: ${delivery.innerHTML}`
            : ""
        }`;

  if (navigator.clipboard && window.isSecureContext) {
    // For modern browsers in secure context
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        Copybtn.style.color = "white";
        Copybtn.style.backgroundColor = "green";
        setTimeout(() => {
          Copybtn.style.backgroundColor = "";
          Copybtn.style.color = "white";
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  } else {
    // Fallback for older browsers/mobile
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      // document.execCommand('copy');
      Copybtn.style.color = "white";
      Copybtn.style.backgroundColor = "green";
      setTimeout(() => {
        Copybtn.style.backgroundColor = "";
        Copybtn.style.color = "white";
      }, 1000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
    document.body.removeChild(textarea);
  }
});
