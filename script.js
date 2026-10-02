const CONFIG = {
  name: 'Fatimah',
  intro: 'May Allah bless your new age with peace, happiness, good health, beautiful moments and barakah in everything you do. Ameen.',
  // The full personal message split for the letter
  messageParts: [
    "Happy birthday to one of the first female friends I made in this school 🥹❤️. I’m genuinely grateful I met you.",
    "From showing me around to always listening to me, giving me advice, and being there whenever I need someone to talk to, you’ve been such a sweet and amazing friend.",
    "I really appreciate you more than you know. I pray this new year brings you happiness, success, peace, and everything you deserve. ❤️",
    "Happy birthday, bestieee 🥳🎂🫶🏽"
  ],
  heroPhoto: 'media/hero_fatimah.jpg',
  bannerPhoto: 'media/banner.jpg',
  photos: [
    { src: 'media/photo2.jpg', caption: 'Looking bright as always.' },
    { src: 'media/photo5.jpg', caption: 'May there be many more.' },
    { src: 'media/photo6.jpg', caption: 'Golden hour glow.' },
    { src: 'media/photo7.jpg', caption: 'That smile again.' },
    { src: 'media/photo8.jpg', caption: 'Mirror moments.' },
    { src: 'media/photo9.jpg', caption: 'Everyday magic.' },
    { src: 'media/photo10.jpg', caption: 'Just being you.' },
    // { src: 'media/photo11.jpg', caption: 'Yellow elegance.' },
    { src: 'media/photo12.jpg', caption: 'Sunny day vibes.' },
    { src: 'media/photo13.jpg', caption: 'Braids and beauty.' },
    { src: 'media/photo14.jpg', caption: 'Playful tongue out 😜' }
  ],
  videos: [
    { src: 'media/hero_video.mp4', caption: 'That energy though 😌', type: 'goofy' },
    { src: 'media/v01.mp4', caption: 'A little lip-sync', type: 'goofy' },
    { src: 'media/v02.mp4', caption: 'Fan vibes', type: 'goofy' },
    { src: 'media/v03.mp4', caption: 'With the squad', type: 'normal' },
    { src: 'media/v04.mp4', caption: 'Full-length mirror check', type: 'normal' },
    { src: 'media/v05.mp4', caption: 'Late-night energy', type: 'goofy' },
    { src: 'media/v06.mp4', caption: 'Dancing in the purple light', type: 'goofy' },
    { src: 'media/v07.mp4', caption: 'Soft selfie moment', type: 'normal' },
    { src: 'media/v08.mp4', caption: 'Just vibing', type: 'normal' },
    { src: 'media/v09.mp4', caption: 'Goofy faces', type: 'goofy' },
    { src: 'media/v10.mp4', caption: 'More energy', type: 'goofy' },
    { src: 'media/v11.mp4', caption: 'Calm clip', type: 'normal' },
    { src: 'media/v12.mp4', caption: 'Laughing it out', type: 'goofy' },
    { src: 'media/v13.mp4', caption: 'Night mode', type: 'normal' },
    { src: 'media/v14.mp4', caption: 'One more for the road', type: 'goofy' },
    { src: 'media/v15.mp4', caption: 'Obsessed with you ❤️', type: 'goofy' }
  ]
};

// Name & text
document.querySelector('#name').textContent = CONFIG.name;
document.querySelector('#endName').textContent = CONFIG.name;
document.querySelector('#intro').textContent = CONFIG.intro;

// Spread message into letter
const spread = document.querySelector('#messageSpread');
spread.innerHTML = '';
CONFIG.messageParts.forEach(part => {
  const p = document.createElement('p');
  p.textContent = part;
  spread.appendChild(p);
});

// Hero is now a static photo (age transition handles the magic)

// Banner image
const banner = document.querySelector('#bannerImage');
if (CONFIG.bannerPhoto && banner) {
  banner.style.backgroundImage = `url('${CONFIG.bannerPhoto}')`;
}

// Photo gallery
const gallery = document.querySelector('#photoGallery');
gallery.innerHTML = '';
CONFIG.photos.forEach((p, i) => {
  const fig = document.createElement('figure');
  fig.innerHTML = `
    <div class="media" style="background-image:url('${p.src}');background-size:cover;background-position:center 20%"></div>
    <figcaption>${p.caption}</figcaption>
  `;
  gallery.appendChild(fig);
});

// ---------- Dual marquee videos ----------
const trackTop = document.querySelector('#trackTop');
const trackBottom = document.querySelector('#trackBottom');
function makeMarqueeItem(vid) {
  const item = document.createElement('div');
  item.className = 'marquee-item ' + (vid.type === 'goofy' ? 'goofy' : 'normal');
  item.dataset.src = vid.src;
  item.dataset.caption = vid.caption || '';
  item.innerHTML = `
    <video muted loop playsinline preload="metadata" autoplay>
      <source src="${vid.src}" type="video/mp4">
    </video>
    <span class="vid-tag">${vid.type === 'goofy' ? 'Goofy' : 'Normal'}</span>
  `;
  // click / tap opens modal
  item.addEventListener('click', () => openModal(vid.src, vid.caption));
  return item;
}

// Build tracks – duplicate the list so the CSS -50% loop is seamless
function fillTrack(track, list, reverse = false) {
  track.innerHTML = '';
  const items = reverse ? [...list].reverse() : list;
  // two full copies
  [...items, ...items].forEach(vid => {
    track.appendChild(makeMarqueeItem(vid));
  });
}

fillTrack(trackTop, CONFIG.videos, false);   // top → right
fillTrack(trackBottom, CONFIG.videos, true); // bottom → left (reversed order looks nicer)

// Make sure muted autoplay works (some browsers need play() call)
document.querySelectorAll('.marquee-item video').forEach(v => {
  v.muted = true;
  v.playsInline = true;
  const p = v.play();
  if (p && p.catch) p.catch(() => {}); // ignore autoplay block
});

// ---------- Video Modal ----------
const modal = document.querySelector('#videoModal');
const modalVideo = document.querySelector('#modalVideo');
const modalCaption = document.querySelector('#modalCaption');
const modalClose = document.querySelector('#modalClose');
const modalBackdrop = document.querySelector('#modalBackdrop');

function openModal(src, caption) {
  modalVideo.src = src;
  modalCaption.textContent = caption || '';
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modalVideo.play().catch(() => {});
}

function closeModal() {
  modal.hidden = true;
  modalVideo.pause();
  modalVideo.removeAttribute('src');
  modalVideo.load();
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
  if (e.key === 'Escape' && !giftModal.hidden) closeGift();
});

// Smooth scroll
document.querySelector('#start').onclick = () => {
  document.querySelector('.intro').scrollIntoView({ behavior: 'smooth' });
};

// ---------- Easter Eggs / Hidden Gifts ----------
const giftModal = document.querySelector('#giftModal');
const giftText = document.querySelector('#giftText');
const giftOk = document.querySelector('#giftOk');
const giftBackdrop = document.querySelector('#giftBackdrop');
const foundCountEl = document.querySelector('#foundCount');

let found = 0;
const totalGifts = 5;
const foundSet = new Set();

function openGift(msg, btn) {
  if (btn.classList.contains('found')) return;
  giftText.textContent = msg;
  giftModal.hidden = false;
  document.body.style.overflow = 'hidden';
  
  // mark as found
  btn.classList.add('found');
  foundSet.add(btn);
  found = foundSet.size;
  foundCountEl.textContent = `Gifts found: ${found} / ${totalGifts}`;
  
  if (found === totalGifts) {
    setTimeout(() => {
      foundCountEl.textContent = `You found all 5 gifts! 🥳✨`;
      foundCountEl.style.color = 'var(--gold)';
    }, 600);
  }
}

function closeGift() {
  giftModal.hidden = true;
  document.body.style.overflow = '';
}

giftOk.addEventListener('click', closeGift);
giftBackdrop.addEventListener('click', closeGift);

// Wire up all eggs
document.querySelectorAll('.egg').forEach(btn => {
  btn.addEventListener('click', () => {
    const msg = btn.dataset.msg || 'A little surprise for you 💛';
    openGift(msg, btn);
  });
});


// ---------- Background music (from the provided video, low volume) ----------
const bgAudio = new Audio('media/bg_music.mp3');
bgAudio.loop = true;
bgAudio.volume = 0.18; // low volume
bgAudio.preload = 'auto';

// ---------- Age Splash (shows first) ----------
const splash = document.querySelector('#ageSplash');
function dismissSplash() {
  if (!splash || splash.classList.contains('hide')) return;
  splash.classList.add('hide');
  // Start soft background music on the first user tap (required for autoplay policy)
  bgAudio.play().catch(() => {});
  // unlock scroll after fade
  setTimeout(() => {
    splash.style.display = 'none';
  }, 750);
}
// Tap / click anywhere on splash — NO auto-dismiss; user must tap
if (splash) {
  splash.addEventListener('click', dismissSplash);
}
