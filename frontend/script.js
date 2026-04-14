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
<a href="https://instagram.com/yourusername" target="_blank" class="insta-btn">
📸 Instagram
</a>

<br><br>

<h3>Utkarsh Ojha</h3>
<p>Bollywood Vocalist | Fusion Performer</p>
<a href="https://instagram.com/yourusername" target="_blank" class="insta-btn">
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
<a href="https://instagram.com/yourusername" target="_blank" class="insta-btn">
📸 Instagram
</a>

<br><br>

<h3>Sutej Bir Rana</h3>
<p>Electric Lead Guitarist</p>
<a href="https://instagram.com/yourusername" target="_blank" class="insta-btn">
📸 Instagram
</a>
`;
}

/* PERCUSSION */
if(type === "percussion"){
content = `
<h2>🥁 Percussion</h2>

<h3>Satyam Srivastava</h3>
<p>Cahon Specialist</p>

<a href="https://instagram.com/yourusername" target="_blank" class="insta-btn">
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
<a href="https://instagram.com/yourusername" target="_blank" class="insta-btn">
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