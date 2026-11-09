const phrases = [
  '✌️ 剪刀手定力 +999',
  '👗 紫衣女装魅魔值 +10086',
  '🥬 辣白菜脆爽度 MAX',
  '✨ 北辰仙尊功德 +1',
  '💃 皇家华尔兹优雅度 +999',
  '🔥 同行审视眼神杀 +888',
  '👑 九天十地第一绝色'
];

let meritCount = 999;
const meritCounterEl = document.getElementById('merit-count');
const toastContainer = document.getElementById('toast-container');

function spawnFloatingToast(x, y, customText) {
  const el = document.createElement('div');
  el.className = 'floating-word';
  el.textContent = customText || phrases[Math.floor(Math.random() * phrases.length)];
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  toastContainer.appendChild(el);
  setTimeout(() => {
    el.remove();
  }, 1800);
}

const meritBtn = document.getElementById('merit-btn');
if (meritBtn) {
  meritBtn.addEventListener('click', (e) => {
    meritCount += 1;
    if (meritCounterEl) {
      meritCounterEl.textContent = meritCount;
    }
    const rect = meritBtn.getBoundingClientRect();
    const x = e.clientX || (rect.left + rect.width / 2);
    const y = e.clientY || rect.top;
    spawnFloatingToast(x, y);
  });
}

const saluteBtn = document.getElementById('salute-btn');
if (saluteBtn) {
  saluteBtn.addEventListener('click', (e) => {
    const rect = saluteBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top;
    const saluteMessages = [
      '🥂 恭送北辰仙尊！',
      '🥬 辣白菜一路顺风！',
      '✌️ 江湖再见，依然比耶！',
      '👑 祝前程似锦，万事胜意！',
      '👗 紫衣传说永留互联网！'
    ];
    saluteMessages.forEach((msg, idx) => {
      setTimeout(() => {
        const offsetX = (Math.random() - 0.5) * 260;
        const offsetY = (Math.random() - 0.5) * 80;
        spawnFloatingToast(centerX + offsetX, centerY + offsetY, msg);
      }, idx * 160);
    });
    saluteBtn.textContent = '🥂 已向北辰仙尊献上最高敬意（再点继续放礼花）';
  });
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('[data-lightbox="true"]').forEach((card) => {
  card.addEventListener('click', () => {
    const imgEl = card.querySelector('img');
    const title = card.getAttribute('data-title') || '';
    const desc = card.getAttribute('data-desc') || '';
    if (imgEl && lightbox) {
      lightboxImg.src = imgEl.src;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;
      lightbox.classList.add('active');
    }
  });
});

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove('active');
  }
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 48 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2.2 + 0.6,
    vx: (Math.random() - 0.5) * 0.35,
    vy: -Math.random() * 0.55 - 0.15,
    alpha: Math.random() * 0.65 + 0.2,
    hue: Math.random() > 0.35 ? 45 : 280
  }));

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${p.alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(drawParticles);
  }

  drawParticles();
}

const cdnMirrors = [
  'https://testingcf.jsdelivr.net/gh/susu-sus-web/beichen-xianzun@main/',
  'https://fastly.jsdelivr.net/gh/susu-sus-web/beichen-xianzun@main/',
  'https://gcore.jsdelivr.net/gh/susu-sus-web/beichen-xianzun@main/'
];

document.querySelectorAll('img[src^="media/"]').forEach((img) => {
  const relPath = img.getAttribute('src');
  let mirrorIdx = 0;
  img.addEventListener('error', () => {
    if (mirrorIdx < cdnMirrors.length) {
      img.src = cdnMirrors[mirrorIdx] + relPath;
      mirrorIdx += 1;
    }
  });
});

