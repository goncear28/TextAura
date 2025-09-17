// ===========================
// LIMBI MULTILINGV
// ===========================
const translations = {
  en: {
    title: "TextAura",
    fancyPlaceholder: "Enter text here...",
    fancyButton: "Generate Fancy Text",
    fancyOutput: "Results:",
    nickPlaceholder: "Enter a keyword...",
    nickButton: "Generate Nickname",
    nickOutput: "Generated Nicknames:"
  },
  ro: {
    title: "TextAura",
    fancyPlaceholder: "Scrie textul aici...",
    fancyButton: "Generează Fancy Text",
    fancyOutput: "Rezultate:",
    nickPlaceholder: "Scrie un cuvânt cheie...",
    nickButton: "Generează Nickname",
    nickOutput: "Nickname-uri generate:"
  },
  ru: {
    title: "ТекстАура",
    fancyPlaceholder: "Введите текст здесь...",
    fancyButton: "Сгенерировать Fancy Text",
    fancyOutput: "Результаты:",
    nickPlaceholder: "Введите ключевое слово...",
    nickButton: "Сгенерировать Никнейм",
    nickOutput: "Сгенерированные Никнеймы:"
  },
  es: {
    title: "TextAura",
    fancyPlaceholder: "Escribe tu texto aquí...",
    fancyButton: "Generar Fancy Text",
    fancyOutput: "Resultados:",
    nickPlaceholder: "Escribe una palabra clave...",
    nickButton: "Generar Nickname",
    nickOutput: "Nicknames generados:"
  },
  fr: {
    title: "TextAura",
    fancyPlaceholder: "Écrivez votre texte ici...",
    fancyButton: "Générer Fancy Text",
    fancyOutput: "Résultats:",
    nickPlaceholder: "Écrivez un mot-clé...",
    nickButton: "Générer Nickname",
    nickOutput: "Nicknames générés:"
  }
};

// ===========================
// SCHIMBARE LIMBA
// ===========================
function changeLanguage(){
  const lang = document.getElementById('languageSelect').value;
  const t = translations[lang];
  document.getElementById('title').innerText = t.title;
  document.getElementById('inputText').placeholder = t.fancyPlaceholder;
  document.getElementById('generateBtn').innerText = t.fancyButton;
  document.getElementById('outputTitle').innerText = t.fancyOutput;
  document.getElementById('nicknameKeyword').placeholder = t.nickPlaceholder;
  document.getElementById('generateNickBtn').innerText = t.nickButton;
  document.getElementById('nicknameTitle').innerText = t.nickOutput;
}

// ===========================
// FANCY TEXT GENERATOR
// ===========================
const fancyStyles = {
  "Bold":       "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘷𝘄𝘹𝘺𝘻",
  "Italic":     "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻",
  "Bold Italic":"𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯",
  "Script":     "𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝓄𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏",
  "Fraktur":    "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷",
  "Monospace":  "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣"
};

function generateFancyText(){
  const input = document.getElementById('inputText').value || "TextAura";
  const outputDiv = document.getElementById('outputText');
  outputDiv.innerHTML = "";
  for(const style in fancyStyles){
    let transformed = "";
    const chars = fancyStyles[style];
    for(let i=0;i<input.length;i++){
      const c = input[i].toLowerCase();
      if(c>='a' && c<='z'){
        const index = c.charCodeAt(0)-97;
        transformed += chars[index] || c;
      } else { transformed += c; }
    }
    const div = document.createElement('div');
    div.innerHTML = `<strong>${style}:</strong> ${transformed}`;
    outputDiv.appendChild(div);
  }
}

// ===========================
// NICKNAME GENERATOR
// ===========================
const adjectives = ["Mystic","Shadow","Lunar","Crystal","Nova","Cosmic","Neon"];
const nouns = ["Dragon","Tiger","Phoenix","Wolf","Falcon","Knight","Shadow"];

function generateNickname(){
  const keyword = document.getElementById('nicknameKeyword').value.trim();
  const outputDiv = document.getElementById('nicknameOutput');
  outputDiv.innerHTML = "";
  for(let i=0;i<5;i++){
    const adj = adjectives[Math.floor(Math.random()*adjectives.length)];
    const noun = nouns[Math.floor(Math.random()*nouns.length)];
    const nickname = keyword ? keyword + adj + noun : adj + noun;
    const div = document.createElement('div');
    div.innerText = nickname;
    outputDiv.appendChild(div);
  }
}

// ===========================
// BACKGROUND PARTICLE ANIMATION CU CLICK DISSOLVE
// ===========================
// FUNDAL PARTICULE COMPLET CU CLICK DISSOLVE
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 400; // mai multe particule pentru full background
let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
let dissolve = false;

// Set canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mouse movement
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

// Click pentru dissolve
canvas.addEventListener('click', () => {
  dissolve = true;
  setTimeout(() => { dissolve = false; }, 2000); // 2 secunde și revin
});

// Particle class
class Particle {
  constructor() {
    this.initX = Math.random() * canvas.width;
    this.initY = Math.random() * canvas.height;
    this.x = this.initX;
    this.y = this.initY;
    this.size = Math.random()*3+1.5; // particule mai mici pentru densitate mare
    this.speedX = Math.random()*1-0.5;
    this.speedY = Math.random()*1-0.5;
    this.opacity = 1;
    this.color = `rgba(255,121,198,${this.opacity})`;
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    this.x += dx*0.005 + this.speedX; // mai subtil pe mouse
    this.y += dy*0.005 + this.speedY;

    // Dissolve effect
    if(dissolve){
      this.opacity -= 0.03;
      if(this.opacity < 0) this.opacity = 0;
    } else {
      // Revin la opacitate normală
      if(this.opacity < 0.8) this.opacity += 0.03;
      // Return la poziția inițială
      this.x += (this.initX - this.x)*0.01;
      this.y += (this.initY - this.y)*0.01;
    }

    // Reset dacă ies din ecran
    if(this.x>canvas.width) this.x=0;
    if(this.x<0) this.x=canvas.width;
    if(this.y>canvas.height) this.y=0;
    if(this.y<0) this.y=canvas.height;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,121,198,${this.opacity})`;
    ctx.fill();
  }
}

// Creare particule
particles = [];
for(let i=0;i<particleCount;i++){
  particles.push(new Particle());
}

// Animare
function animate() {
  ctx.fillStyle = 'rgba(0,0,0,0.15)'; // trail subtil
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

// Resize canvas
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


// ===========================
// INIT
// ===========================
window.onload = function(){ changeLanguage(); }
