const intro = document.querySelector(".intro");
const video = intro.querySelector("video");
const text = intro.querySelector("h1");
//END SECTION
const section = document.querySelector("video");
const end = section.querySelector("h1");

//SCROLLMAGIC
const controller = new ScrollMagic.Controller();

//Scenes
let scene = new ScrollMagic.Scene({
  duration: 2500,
  triggerElement: intro,
  triggerHook: 0
})
  .addIndicators()
  .setPin(intro)
  .addTo(controller);

//Text Animation
const textAnim = TweenMax.fromTo(text, 3, { opacity: 1 }, { opacity: 1 });

let scene2 = new ScrollMagic.Scene({
  duration: 3000,
  triggerElement: intro,
  triggerHook: 0
})
  .setTween(textAnim)
  .addTo(controller);

//Video Animation
let accelamount = 0.1;
let scrollpos = 0;
let delay = 0;

scene.on("update", e => {
  scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  console.log(scrollpos, delay);

  video.currentTime = delay;
}, 33.3);

// Assuming the rest of your JS setup remains the same

// Update or create a dedicated scene for the overlay text
let textScene = new ScrollMagic.Scene({
  triggerElement: intro, // Or another element as your trigger
  duration: 2500, // Duration over which the fade effect should complete
  triggerHook: 0.05 // Adjust this to control when the text starts to fade in
})
.setClassToggle(".overlay-text", "visible") // Optional, if you want to toggle a class
.addTo(controller);

// Listen to the scene's progress and adjust the opacity of the overlay text accordingly
textScene.on("enter", function(event) {
  TweenMax.to(".overlay-text", 0, {autoAlpha: 0}); // Fade in effect
}).on("leave", function(event) {
  TweenMax.to(".overlay-text", 0, {autoAlpha: 1}); // Optional: Fade out if scrolling back up
});

