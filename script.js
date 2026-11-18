// ====== Звук «поп» ======
let audioCtx = null;
function playPop(freq = 600) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(freq, audioCtx.currentTime);
    o.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + 0.12);
    g.gain.setValueAtTime(0.15, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + 0.15);
  } catch (e) {}
}

// ====== Тост ======
function showToast(text) {
  const toast = document.createElement('div');
  toast.textContent = text;
  document.body.appendChild(toast);
  Object.assign(toast.style, { position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%) translateY(40px)', background: 'linear-gradient(135deg, #ff9f43, #ee5253)', color: '#fff', padding: '14px 28px', borderRadius: '50px', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 10px 30px rgba(238,82,83,0.5)', zIndex: '1000', opacity: '0', transition: 'all 0.4s ease', pointerEvents: 'none', maxWidth: '90vw', textAlign: 'center' });
  requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(-50%) translateY(40px)'; setTimeout(() => toast.remove(), 400); }, 2300);
}

// ====== Конфетти ======
function fireConfetti(count = 30) {
  const colors = ['#ff9f43', '#ee5253', '#00b894', '#6c5ce7', '#fdcb6e', '#74b9ff'];
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.style.cssText = `position:fixed; left:${Math.random()*100}vw; top:-20px; width:${6+Math.random()*8}px; height:${6+Math.random()*8}px; background:${colors[Math.floor(Math.random()*colors.length)]}; border-radius:${Math.random()>0.5?'50%':'2px'}; z-index:9999; pointer-events:none; transition: transform ${1.5+Math.random()*1.5}s ease-in, opacity 2s ease-in; transform: rotate(0deg);`;
    document.body.appendChild(c);
    requestAnimationFrame(() => { c.style.transform = `translate(${(Math.random()-0.5)*300}px, ${window.innerHeight+50}px) rotate(${Math.random()*1080}deg)`; c.style.opacity = '0'; });
    setTimeout(() => c.remove(), 3200);
  }
}

// ====== Ripple-эффект ======
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.style.cssText = `position:absolute; border-radius:50%; background:rgba(255,255,255,0.6); width:${size}px; height:${size}px; left:${e.clientX - rect.left - size/2}px; top:${e.clientY - rect.top - size/2}px; transform:scale(0); animation:rippleAnim 0.6s linear; pointer-events:none;`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
const style = document.createElement('style');
style.innerHTML = `@keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }`;
document.head.appendChild(style);

// ====== Летающие предметы ======
const bgLayer = document.getElementById('bgLayer');
const flyingItems = [
  { emoji: '🏋️', msg: '🏋️ Штанга! Копатыч: «Постепенно, настойчиво!»' },
  { emoji: '💪', msg: '💪 Каждое усилие — шаг к победе!' },
  { emoji: '🌍', msg: '🌍 Притяжение земли не помеха, если верить в себя!' },
  { emoji: '🍯', msg: '🍯 Мёд даёт энергию для рекордов! Копатыч одобряет.' },
  { emoji: '🦜', msg: '🦜 Кар-Карыч: «Вдвоём быстрее, чем в одиночку!»' },
  { emoji: '🏆', msg: '🏆 Кубок — за настойчивость и терпение!' },
  { emoji: '🥇', msg: '🥇 Медаль за преодоление «плато»! Так держать!' }
];
function createFlyingItem() {
  const item = flyingItems[Math.floor(Math.random() * flyingItems.length)];
  const el = document.createElement('div');
  el.className = 'flying-item';
  el.textContent = item.emoji;
  el.style.top = Math.random() * 90 + 5 + 'vh';
  el.style.fontSize = (Math.random() * 1.6 + 1.3) + 'rem';
  el.style.animationDuration = (Math.random() * 12 + 10) + 's';
  el.style.animationDelay = (Math.random() * 6) + 's';
  el.addEventListener('click', (e) => { e.stopPropagation(); playPop(700); showToast(item.msg); el.style.transform = 'scale(2) rotate(720deg)'; el.style.opacity = '0'; setTimeout(() => el.remove(), 400); });
  bgLayer.appendChild(el);
  setTimeout(() => { if (el.parentNode) el.remove(); }, (parseFloat(el.style.animationDuration) + parseFloat(el.style.animationDelay)) * 1000 + 1000);
}
for (let i = 0; i < 10; i++) createFlyingItem();
setInterval(() => { if (bgLayer.children.length < 12) createFlyingItem(); }, 2200);

// ====== Падающие звёзды ======
const bgShootingStars = document.getElementById('bgShootingStars');
function createShootingStar() {
  const s = document.createElement('div');
  s.className = 'shooting-star';
  s.style.left = Math.random() * 80 + 20 + 'vw';
  s.style.top = Math.random() * 50 + 'vh';
  s.style.animation = `shoot ${Math.random() * 1.5 + 0.5}s linear forwards`;
  bgShootingStars.appendChild(s);
  setTimeout(() => s.remove(), 2000);
}
setInterval(createShootingStar, 3000);

// ====== Пузыри ======
const bgBubbles = document.getElementById('bgBubbles');
function createBubble() {
  const b = document.createElement('div'); b.className = 'bubble';
  const size = Math.random() * 50 + 15;
  b.style.width = size + 'px'; b.style.height = size + 'px'; b.style.left = Math.random() * 100 + 'vw';
  b.style.animationDuration = (Math.random() * 15 + 12) + 's'; b.style.animationDelay = (Math.random() * 8) + 's';
  bgBubbles.appendChild(b); setTimeout(() => b.remove(), 30000);
}
for (let i = 0; i < 14; i++) createBubble();
setInterval(() => { if (bgBubbles.children.length < 16) createBubble(); }, 2000);

// ====== Звёзды ======
const bgStars = document.getElementById('bgStars');
for (let i = 0; i < 40; i++) {
  const s = document.createElement('div'); s.className = 'star';
  const size = Math.random() * 4 + 2;
  s.style.width = size + 'px'; s.style.height = size + 'px'; s.style.left = Math.random() * 100 + 'vw'; s.style.top = Math.random() * 100 + 'vh';
  s.style.animationDelay = Math.random() * 3 + 's'; s.style.animationDuration = (Math.random() * 2 + 2) + 's';
  bgStars.appendChild(s);
}

// ====== Игра 1: Тренажёр Копатыча ======
const meterPointer = document.getElementById('meterPointer'), liftGameBtn = document.getElementById('liftGameBtn'), gameMessage = document.getElementById('gameMessage');
let meterPosition = 0, meterDirection = 1, isGameActive = false;
function updateMeter() {
  if (!isGameActive) return;
  meterPosition += meterDirection * 2.5;
  if (meterPosition >= 100) { meterPosition = 100; meterDirection = -1; }
  if (meterPosition <= 0) { meterPosition = 0; meterDirection = 1; }
  if (meterPointer) meterPointer.style.left = meterPosition + '%';
  requestAnimationFrame(updateMeter);
}
if (liftGameBtn) {
  liftGameBtn.addEventListener('click', () => {
    if (!isGameActive) {
      isGameActive = true; liftGameBtn.textContent = 'СТОП!';
      gameMessage.textContent = 'Лови момент!'; gameMessage.style.color = '#e17055'; updateMeter();
    } else {
      isGameActive = false; liftGameBtn.textContent = 'Поднять! 💪';
      if (meterPosition >= 70 && meterPosition <= 90) {
        gameMessage.textContent = '🎉 ИДЕАЛЬНО! Копатыч преодолел плато!'; gameMessage.style.color = '#00b894';
        playPop(900); fireConfetti(40); showToast('🏆 Плато прорвано!');
      } else {
        gameMessage.textContent = '❌ Застой... Попробуй ещё раз!'; gameMessage.style.color = '#d63031'; playPop(300);
      }
    }
  });
}

// ====== Игра 2: Эстафета дружбы ======
const btnKopatych = document.getElementById('btnKopatych'), btnKarkarych = document.getElementById('btnKarkarych'), relayFill = document.getElementById('relayFill'), relayMessage = document.getElementById('relayMessage');
let relayProgress = 0, lastPressed = null;
function handleRelayPress(player) {
  if (relayProgress >= 10) return;
  if (lastPressed === player) {
    relayMessage.textContent = 'Не так быстро! Жми по очереди!'; relayMessage.style.color = '#d63031'; playPop(200); return;
  }
  lastPressed = player; relayProgress++; playPop(600 + relayProgress * 30);
  relayFill.style.width = (relayProgress / 10) * 100 + '%';
  relayMessage.textContent = `Отлично! Сделано ${relayProgress} из 10`; relayMessage.style.color = '#6c5ce7';
  if (relayProgress >= 10) {
    relayMessage.textContent = '🎉 Ура! Вдвоём вы подняли штангу!'; relayMessage.style.color = '#00b894';
    btnKopatych.disabled = true; btnKarkarych.disabled = true;
    fireConfetti(50); showToast('🤝 Сила товарищества!');
    setTimeout(() => {
      relayProgress = 0; lastPressed = null; relayFill.style.width = '0%';
      relayMessage.textContent = 'Жми по очереди!'; relayMessage.style.color = '#6c5ce7';
      btnKopatych.disabled = false; btnKarkarych.disabled = false;
    }, 3000);
  }
}
if (btnKopatych) btnKopatych.addEventListener('click', () => handleRelayPress('kopatych'));
if (btnKarkarych) btnKarkarych.addEventListener('click', () => handleRelayPress('karkarych'));

// ====== Викторина ======
const quizData = [
  { question: 'Кого Копатыч обучает тяжёлой атлетике?', options: ['Кар-Карыча', 'Ёжика', 'Кроша', 'Совунью'], correct: 0 },
  { question: 'Сколько лет Копатыч находится в «плато»?', options: ['Полгода', 'Один год', 'Два года', 'Пять лет'], correct: 2 },
  { question: 'Что помогает Копатычу преодолеть застой?', options: ['Новый тренажёр', 'Обучение Кар-Карыча и поддержка', 'Волшебная сила', 'Сон'], correct: 1 },
  { question: 'Какой главный смысл серии?', options: ['Нужно тренироваться в одиночку', 'Постепенность, настойчивость и товарищество', 'Спорт не важен', 'Главное — сила'], correct: 1 }
];
let currentQuiz = 0;
const quizQuestion = document.getElementById('quizQuestion'), quizOptions = document.getElementById('quizOptions'), quizFeedback = document.getElementById('quizFeedback'), nextQuizBtn = document.getElementById('nextQuizBtn');
function renderQuiz() {
  const q = quizData[currentQuiz];
  quizQuestion.textContent = `Вопрос ${currentQuiz + 1}/${quizData.length}: ${q.question}`;
  quizOptions.innerHTML = ''; quizFeedback.textContent = ''; nextQuizBtn.classList.add('hidden');
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button'); btn.className = 'quiz-option'; btn.textContent = opt;
    btn.addEventListener('click', () => handleAnswer(i, btn)); quizOptions.appendChild(btn);
  });
}
function handleAnswer(index, btn) {
  const q = quizData[currentQuiz];
  const allBtns = quizOptions.querySelectorAll('.quiz-option');
  allBtns.forEach(b => b.disabled = true);
  if (index === q.correct) {
    btn.classList.add('correct'); quizFeedback.textContent = '✅ Верно! Молодец!'; playPop(900); fireConfetti(15);
  } else {
    btn.classList.add('wrong'); allBtns[q.correct].classList.add('correct');
    quizFeedback.textContent = '❌ Не совсем. Правильный ответ подсвечен.'; playPop(300);
  }
  if (currentQuiz < quizData.length - 1) nextQuizBtn.classList.remove('hidden');
  else { quizFeedback.textContent += ' 🎉 Викторина пройдена!'; fireConfetti(40); showToast('🏆 Викторина пройдена!'); }
}
if (nextQuizBtn) nextQuizBtn.addEventListener('click', () => { if (currentQuiz < quizData.length - 1) { currentQuiz++; renderQuiz(); } });
if (quizQuestion) renderQuiz();

// ====== Аккордеон ======
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
  header.addEventListener('click', function() {
    accordionHeaders.forEach(h => { if (h !== this) { h.classList.remove('active'); h.nextElementSibling.style.maxHeight = null; } });
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    if (content.style.maxHeight) content.style.maxHeight = null;
    else content.style.maxHeight = content.scrollHeight + 'px';
  });
});

// ====== Секреты персонажей ======
document.querySelectorAll('.char-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const secret = btn.nextElementSibling;
    secret.classList.toggle('hidden');
    const card = btn.closest('.char-card');
    const isKarkarych = card.querySelector('h3').textContent === 'Кар-Карыч';
    if (!secret.classList.contains('hidden')) { playPop(800); fireConfetti(15); btn.textContent = 'Скрыть секрет 🙈'; }
    else btn.textContent = isKarkarych ? 'Узнать секрет 🎩' : 'Узнать секрет 💪';
  });
});

// ====== Совет дня ======
const tips = ['Постепенность — ключ к прогрессу. Не торопись! 🐢', 'Даже в «плато» продолжай тренироваться — прорыв близко! 🌍', 'Тренируйся с другом — вместе быстрее и веселее! 🤝', 'Настойчивость побеждает любой застой. Верь в себя! 💪'];
const tipBtn = document.getElementById('tipBtn'), tipText = document.getElementById('tipText');
if (tipBtn) tipBtn.addEventListener('click', () => {
  tipText.textContent = tips[Math.floor(Math.random() * tips.length)];
  tipText.style.background = '#fff3cd'; setTimeout(() => tipText.style.background = '#e8f8f5', 600);
});