let wordIndex = 0;
const words = ["playful", "reliable", "resourceful", "rational"];

function changeText() {
  const paragraphElement = document.getElementById("swapText");

  paragraphElement.classList.remove('animate-swap');
  void paragraphElement.offsetWidth; 
  paragraphElement.classList.add('animate-swap');

  const animationDuration = 500;

setTimeout(() => {
  wordIndex = (wordIndex + 1) % words.length;
  paragraphElement.textContent = words[wordIndex];
}, animationDuration / 2);
}

setInterval(changeText, 1800); 

function updateTime() {
  const timeElement = document.querySelector('.time');
  const options = { 
    timeZone: 'America/Vancouver', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  };
  const formatter = new Intl.DateTimeFormat('en-CA', options); 
  const currentTime = formatter.format(new Date());
  
  timeElement.textContent = currentTime;
}
updateTime(); 
setInterval(updateTime, 1000);