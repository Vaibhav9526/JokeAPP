const apiurl = "https://v2.jokeapi.dev/joke/Any";

const nextbtn = document.querySelector('.nextmeme');
const setup = document.querySelector('.setup');
const delivery = document.querySelector('.delivery');

async function jokes() {
  const response = await fetch(apiurl);

  var data = await response.json();

  if (data.status == "error") {

  } 

  if(data.type == "single"){
    console.log("this is single part joke");
    setup.innerHTML = data.joke;
    delivery.style.display = "none";

  }else{
    delivery.style.display="block";
    setup.innerHTML = data.setup;
    delivery.innerHTML = data.delivery;

  }
  console.log(data);
  console.log("vaibhav");
}

nextbtn.addEventListener("click", () => {
  jokes();
});
window.addEventListener("load", () => {
    jokes();
  });
  
