const EnglishApiUrl = "https://v2.jokeapi.dev/joke/Any";
const HindiApiUrl =
  "https://hindi-jokes-api.onrender.com/jokes/?api_key=ab2c6905fdabed98a0b0da63c0c9";
const EnglishBtn = document.querySelector(".EngJokeBtn");
const HindiBtn = document.querySelector(".HindiJokeBtn");
const nextbtn = document.querySelector(".nextmeme");
const setup = document.querySelector(".setup");
const delivery = document.querySelector(".delivery");
const Copybtn = document.querySelector(".Copy-btn");
const progressBar = document.querySelector(".progress");
const Loadingpreloader = document.querySelector(".Loading-preloader");
const ListenBtn = document.querySelector(".Listen-btn");
const API_KEY = '89fd50f915d44f03bfc3c2b5f4ab51c5';
var ApiUrl = EnglishApiUrl;
let isPlaying = false;

const text = "VAIBHAV SHARMA";
let index = 0;
let audio = null;

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

async function jokes(ApiUrl) {
  progressBar.style.display = "block";
  Loadingpreloader.style.display = "block";
  const Response = await fetch(ApiUrl);
  var Data = await Response.json();

  if (Data.status == "error") {
    console.log("Joke not found");
  }

  if (ApiUrl == EnglishApiUrl) {
    if (Data.type == "single") {
      setup.innerHTML = Data.joke;
      delivery.style.display = "none";
    } else {
      delivery.style.display = "block";
      setup.innerHTML = Data.setup;
      delivery.innerHTML = Data.delivery;
    }
  }
  if (ApiUrl == HindiApiUrl) {
    setup.innerHTML = Data.jokeContent;
    delivery.style.display = "none";
  }
  progressBar.style.display = "none";
  Loadingpreloader.style.display = "none";
}


async function playJoke() {
  if (isPlaying && audio) {
    audio.pause();
    isPlaying = false;
    ListenBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    ListenBtn.classList.remove('bg-blue-700/50');
    return;
  }

  const jokeText = delivery.style.display === "none" 
      ? setup.innerHTML 
      : `${setup.innerHTML} ${delivery.innerHTML}`;

  // Clean the text by removing HTML tags and emojis using Unicode ranges
  const cleanText = jokeText
  .replace(/<[^>]*>/g, '')
    .replace(/[\u{1F000}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

  // Build API URL with proper parameters
  if(ApiUrl == EnglishApiUrl){
      const VoiceUrl = `https://api.voicerss.org/?key=${API_KEY}`
      + `&hl=en-us`
      + `&v=Mary` // Voice name
      + `&r=0` // Reading speed
      + `&c=MP3` // Audio format
      + `&f=44khz_16bit_stereo` // Sample rate
      + `&src=${encodeURIComponent(cleanText)}`;
      audio = new Audio(VoiceUrl);
  }
  else if(ApiUrl == HindiApiUrl){
      const VoiceUrl = `https://api.voicerss.org/?key=${API_KEY}`
      + `&hl=hi-in`
      + `&v=Puja` // Voice name
      + `&r=0` // Reading speed
      + `&c=MP3` // Audio format
      + `&f=44khz_16bit_stereo` // Sample rate
      + `&src=${encodeURIComponent(cleanText)}`;
      audio = new Audio(VoiceUrl);
    }
    
    // Create and play audio
  
  audio.onplay = () => {
      isPlaying = true;
      ListenBtn.innerHTML = '<i class="fas fa-stop"></i>';
      ListenBtn.classList.add('bg-blue-700/50');
  };

  audio.onended = () => {
      isPlaying = false;
      ListenBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      ListenBtn.classList.remove('bg-blue-700/50');
  };

  audio.onerror = (error) => {
      console.error('Audio error:', error);
      isPlaying = false;
      ListenBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      ListenBtn.classList.remove('bg-blue-700/50');
  };

  audio.play().catch(error => {
      console.error('Error playing audio:', error);
      ListenBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      ListenBtn.classList.remove('bg-blue-700/50');
  });
}


HindiBtn.addEventListener("click", () => {
  ApiUrl = HindiApiUrl;
  jokes(ApiUrl);
  isPlaying = false;
  if (audio) {
    audio.pause();
    ListenBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    ListenBtn.classList.remove('bg-blue-700/50');
  }
});
EnglishBtn.addEventListener("click", () => {
  ApiUrl = EnglishApiUrl;
  jokes(ApiUrl);
  isPlaying = false;
  if (audio) {
    audio.pause();
    ListenBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    ListenBtn.classList.remove('bg-blue-700/50');
  }
});
nextbtn.addEventListener("click", () => {
  jokes(ApiUrl);
  isPlaying = false;
  if (audio) {
    audio.pause();
    ListenBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    ListenBtn.classList.remove('bg-blue-700/50');
  }else{
    ListenBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    ListenBtn.classList.remove('bg-blue-700/50');
  }
});
window.addEventListener("load", () => {
  jokes(ApiUrl);
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 2000); // Hide after 2 seconds
  Loadingpreloader.style.display = "none";
});
ListenBtn.addEventListener("click", playJoke);


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
