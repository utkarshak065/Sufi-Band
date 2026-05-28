/* ========================= */
/* SMOOTH SCROLL */
/* ========================= */
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

/* ========================= */
/* SCROLL REVEAL */
/* ========================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ========================= */
/* CONTACT FORM */
/* ========================= */
async function sendMessage(e) {
  e.preventDefault();

  const form = e.target;
  const btn  = form.querySelector('button[type="submit"]');
  const [nameInput, emailInput, msgInput] = form.querySelectorAll('input, textarea');

  const name    = nameInput.value.trim();
  const email   = emailInput.value.trim();
  const message = msgInput.value.trim();

  // Loading state
  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  try {
    const res = await fetch('/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    if (res.ok) {
      btn.textContent = 'Sent ✓';
      btn.style.background = 'linear-gradient(135deg, #4caf50, #388e3c)';
      btn.style.opacity = '1';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    } else {
      throw new Error(data.message || 'Something went wrong.');
    }

  } catch (err) {
    btn.textContent = 'Failed — Try Again';
    btn.style.background = 'linear-gradient(135deg, #c0392b, #922b21)';
    btn.style.opacity = '1';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
    }, 4000);
    console.error('Form error:', err.message);
  }
}

/* ========================= */
/* MEMBER MODAL */
/* ========================= */
function openModal(type) {
  let content = '';

  if (type === 'vocalist') {
    content = `
      <div class="ornament" style="justify-content:flex-start; margin-bottom:16px;">
        <div class="ornament-diamond"></div>
      </div>
      <h2 style="margin-bottom:30px;">🎤 Vocalists</h2>
      <div class="member-entry">
        <h3>Satyam Srivastava</h3>
        <p>Lead Vocalist — Sufi &amp; Classical Singer</p>
        <a href="https://www.instagram.com/__._satyammm_?igsh=MTdwcng5amVmZDRxdA==" target="_blank" class="insta-btn">📸 &nbsp;Instagram</a>
      </div>
      <div class="member-entry">
        <h3>Utkarsh Ojha</h3>
        <p>Bollywood Vocalist — Fusion Performer</p>
        <a href="https://www.instagram.com/utkarsh_lyrics?igsh=bzFqbnEzbDd4MW9p" target="_blank" class="insta-btn">📸 &nbsp;Instagram</a>
      </div>
    `;
  }

  if (type === 'guitar') {
    content = `
      <div class="ornament" style="justify-content:flex-start; margin-bottom:16px;">
        <div class="ornament-diamond"></div>
      </div>
      <h2 style="margin-bottom:30px;">🎸 Guitarists</h2>
      <div class="member-entry">
        <h3>Sanidhya Goswami</h3>
        <p>Acoustic Lead Guitarist</p>
        <a href="https://www.instagram.com/__sanidhy001__?igsh=bzZxOW9qZ3lhOXA4" target="_blank" class="insta-btn">📸 &nbsp;Instagram</a>
      </div>
      <div class="member-entry">
        <h3>Sutej Bir Rana</h3>
        <p>Electric Lead Guitarist</p>
        <a href="https://www.instagram.com/sutz__riffs?igsh=MWV2YWdoNmRjbXczNg==" target="_blank" class="insta-btn">📸 &nbsp;Instagram</a>
      </div>
    `;
  }

  if (type === 'percussion') {
    content = `
      <div class="ornament" style="justify-content:flex-start; margin-bottom:16px;">
        <div class="ornament-diamond"></div>
      </div>
      <h2 style="margin-bottom:30px;">🥁 Percussion</h2>
      <div class="member-entry">
        <h3>Priyam Dutta</h3>
        <p>Cajon &amp; Drums</p>
        <a href="https://www.instagram.com/_.priyamm0?igsh=MTZhenRjZzZ0MmhkeQ==" target="_blank" class="insta-btn">📸 &nbsp;Instagram</a>
      </div>
    `;
  }

  if (type === 'keyboard') {
    content = `
      <div class="ornament" style="justify-content:flex-start; margin-bottom:16px;">
        <div class="ornament-diamond"></div>
      </div>
      <h2 style="margin-bottom:30px;">🎹 Keyboard</h2>
      <div class="member-entry">
        <h3>Samarth Sharma</h3>
        <p>Ambient &amp; Melody Creator</p>
        <a href="https://www.instagram.com/samarth.musicc?igsh=MTdob29qZm12cnVhbg==" target="_blank" class="insta-btn">📸 &nbsp;Instagram</a>
      </div>
    `;
  }

  document.getElementById('modalContent').innerHTML = content;
  document.getElementById('modal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
  document.body.style.overflow = '';
}

window.addEventListener('click', function(e) {
  if (e.target.id === 'modal') closeModal();
});

/* ========================= */
/* IMAGE POPUP */
/* ========================= */
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    document.getElementById('popupImg').src = img.src;
    document.getElementById('imgModal').classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

function closeImage() {
  document.getElementById('imgModal').classList.remove('show');
  document.body.style.overflow = '';
}

document.getElementById('imgModal').addEventListener('click', function(e) {
  if (e.target.id === 'imgModal') closeImage();
});

/* ========================= */
/* VIDEO POPUP */
/* ========================= */
function openVideo(src) {
  const modal = document.getElementById('videoModal');
  const vid = document.getElementById('popupVideo');
  vid.src = src;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  vid.play();
}

function closeVideo() {
  const modal = document.getElementById('videoModal');
  const vid = document.getElementById('popupVideo');
  modal.classList.remove('show');
  vid.pause();
  vid.currentTime = 0;
  vid.src = '';
  document.body.style.overflow = '';
}

document.getElementById('videoModal').addEventListener('click', function(e) {
  if (e.target.id === 'videoModal') closeVideo();
});

/* ========================= */
/* KEYBOARD ESC CLOSE */
/* ========================= */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
    closeImage();
    closeVideo();
  }
});
