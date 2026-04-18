/* SCROLL FUNCTION */
function scrollToSection(id){
document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

/* CONTACT FORM */
function sendMessage(e){
e.preventDefault();
alert("Message sent successfully! (Frontend demo)");
}

/* ========================= */
/* 🎤 MEMBER MODAL SYSTEM */
/* ========================= */

function openModal(type){

let content = "";

/* VOCALISTS */
if(type === "vocalist"){
content = `
<h2>🎤 Vocalists</h2>

<h3>Satyam Srivastava</h3>
<p>Lead Vocalist | Sufi & Classical Singer</p>
<a href="https://www.instagram.com/__._satyammm_?igsh=MTdwcng5amVmZDRxdA==" target="_blank" class="insta-btn">
📸 Instagram
</a>

<br><br>

<h3>Utkarsh Ojha</h3>
<p>Bollywood Vocalist | Fusion Performer</p>
<a href="https://www.instagram.com/utkarsh_lyrics?igsh=bzFqbnEzbDd4MW9p" target="_blank" class="insta-btn">
📸 Instagram
</a>
`;
}

/* GUITARISTS */
if(type === "guitar"){
content = `
<h2>🎸 Guitarists</h2>

<h3>Sanidhya Goswami</h3>
<p>Acoustic Lead Guitarist</p>
<a href="https://www.instagram.com/__sanidhy001__?igsh=bzZxOW9qZ3lhOXA4" target="_blank" class="insta-btn">
📸 Instagram
</a>

<br><br>

<h3>Sutej Bir Rana</h3>
<p>Electric Lead Guitarist</p>
<a href="https://www.instagram.com/sutz__riffs?igsh=MWV2YWdoNmRjbXczNg==" target="_blank" class="insta-btn">
📸 Instagram
</a>
`;
}

/* PERCUSSION */
if(type === "percussion"){
content = `
<h2>🥁 Percussion</h2>

<h3>Priyam Dutta</h3>
<p>Cajon and Drums</p>

<a href="https://www.instagram.com/_.priyamm0?igsh=MTZhenRjZzZ0MmhkeQ==" target="_blank" class="insta-btn">
📸 Instagram
</a>
`;
}

/* KEYBOARD */
if(type === "keyboard"){
content = `
<h2>🎹 Keyboard</h2>

<h3>Samarth Sharma</h3>
<p>Ambient & Melody Creator</p>
<a href="https://www.instagram.com/samarth.musicc?igsh=MTdob29qZm12cnVhbg==" target="_blank" class="insta-btn">
📸 Instagram
</a>
`;
}

/* INSERT CONTENT */
document.getElementById("modalContent").innerHTML = content;

/* SHOW MODAL */
document.getElementById("modal").classList.add("show");
}

/* CLOSE MODAL */
function closeModal(){
document.getElementById("modal").classList.remove("show");
}

/* CLICK OUTSIDE CLOSE */
window.addEventListener("click", function(e){
const modal = document.getElementById("modal");
if(e.target === modal){
modal.classList.remove("show");
}
});

/* ========================= */
/* 🖼 IMAGE POPUP SYSTEM */
/* ========================= */

const galleryImages = document.querySelectorAll(".gallery img");

galleryImages.forEach(img => {
img.addEventListener("click", () => {
document.getElementById("popupImg").src = img.src;
document.getElementById("imgModal").classList.add("show");
});
});

/* CLOSE IMAGE */
function closeImage(){
document.getElementById("imgModal").classList.remove("show");
}

/* CLICK OUTSIDE IMAGE CLOSE */
document.getElementById("imgModal").addEventListener("click", function(e){
if(e.target.id === "imgModal"){
closeImage();
}
});
/* ========================= */
/* 🎬 VIDEO POPUP SYSTEM */
/* ========================= */

function openVideo(video){

  const modal = document.getElementById("videoModal");
  const popupVideo = document.getElementById("popupVideo");

  // Set video source
  popupVideo.src = video.querySelector("source").src;

  // Show modal
  modal.classList.add("show");

  // Play video
  popupVideo.play();
}

/* CLOSE VIDEO */
function closeVideo(){
  const modal = document.getElementById("videoModal");
  const popupVideo = document.getElementById("popupVideo");

  modal.classList.remove("show");

  // Stop video
  popupVideo.pause();
  popupVideo.currentTime = 0;
}

/* CLICK OUTSIDE TO CLOSE */
document.getElementById("videoModal").addEventListener("click", function(e){
  if(e.target.id === "videoModal"){
    closeVideo();
  }
});