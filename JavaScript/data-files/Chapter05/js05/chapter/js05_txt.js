"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: 
      Date:   

      Filename: js05.js
*/

window.addEventListener("load", setupGallery);
window.addEventListener("load",createLightbox);

function setupGallery() {
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("gallery");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
   
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);
   
   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);
   
   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox);
   
   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);
   
   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);
   
   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);
   
   
   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      slideBox.appendChild(image);
   }
   

   
   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
   }  
   
   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }
   
   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "activeModal";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);
      
      let closeBox = document.createElement("div");
      closeBox.id = "modalClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(modalWindow);
      }
      
      modalWindow.appendChild(closeBox);
      
      document.body.appendChild(modalWindow);
   }
   
}



   function createLightbox(){
      //lightbox container
      let lightbox = document.getElementById("lightbox");


      //parts of lightbox
      let lbTitle = document.createElement("h1");
      let lbCounter = document.createElement("div");
      let lbPrev = document.createElement("div");
      let lbNext = document.createElement("div");
      let lbImages = document.createElement("div");
      let lbPlay = document.createElement("div");


      //Design the lightbox title
      lightbox.appendChild(lbTitle);
      lbTitle.id = "lbTitle";
      lbTitle.textContent = lightboxTitle;

      //Design the lightbox counter
      lightbox.appendChild(lbCounter);
      lbCounter.id = "lbCounter";
      let currentImg = 1;
      lbCounter.textContent = currentImg + " / " + imgCount;

      //Design the lightbox previous button
      lightbox.appendChild(lbPrev);
      lbPrev.id = "lbPrev";
      lbPrev.innerHTML = "&#9664";
      lbPrev.onclick = showPrev;


      //Design the lightbox next button
      lightbox.appendChild(lbNext);
      lbNext.id = "lbNext";
      lbNext.innerHTML = "&#9654";
      lbNext.onclick = showNext;


      //Design the lightbox play button
      lightbox.appendChild(lbPlay);
      lbPlay.id = "lbPlay";
      lbPlay.innerHTML = "&#9199";
      let timeID;
      lbPlay.onclick = function(){
         
         if (timeID) {
            //stop the slideshow
            window.clearInterval(timeID);
            timeID = undefined;
         }
         else{
            //start the slideshow
             showNext();
             timeID = window.setInterval(showNext , 1500);
         }
        
      }


      //Design the lightbox images
      lightbox.appendChild(lbImages);
      lbImages.id = "lbImages";


      //Add images from the imgfiles Array to the container
      for (let i = 0; i < imgCount; i++) {
         let image = document.createElement("img");
         image.src = imgFiles[i];
         image.alt = imgCaptions[i];
         lbImages.appendChild(image);
         
      }


      
     //function to move forward through the image list
      function showNext(){
      lbImages.appendChild(lbImages.firstElementChild);
      (currentImg < imgCount) ? currentImg++ : currentImg = 1;
      lbCounter.textContent = currentImg + " / " + imgCount;
      }
      
      //function to move backward through the image list
      function showPrev(){
         lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
         (currentImg > imgCount) ? currentImg-- : currentImg = imgCount;
         lbCounter.textContent = currentImg + " / " + imgCount;


      }
   }


