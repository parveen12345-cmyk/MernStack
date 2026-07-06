/* ═══════════════════════════════════════════════════════
   Readify AI — 100% Frontend, No Backend, No API Needed
   ═══════════════════════════════════════════════════════ */

// ── Embedded Book Library ─────────────────────────────────────────────────────
const BOOKS = [
  {
    id:"1", title:"The Alchemist", author:"Paulo Coelho", category:"Adventure", rating:4.8,
    coverUrl:"https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
    tags:["dream","destiny","spiritual","hopeful","purpose","journey","mystical","inspiring","magical","adventure","meaning","life"],
    description:"A magical journey of Santiago from Spain to Egypt searching for treasure. Mystical, hopeful, and deeply inspiring.",
    content:`Chapter 1: The Boy and His Dream

Every night, Santiago had the same dream. A child appeared and told him to seek treasure at the foot of the Egyptian pyramids.

"When you want something," the old king Melchizedek told him, "all the universe conspires in helping you to achieve it."

Santiago sold his sheep and began the greatest journey of his life. Through the markets of Tangier, across the Sahara desert, he learned that the true treasure was the journey itself.

Chapter 2: The Crystal Merchant

Santiago arrived in Tangier, but he was soon robbed of all his money. Alone and penniless, he found work in a crystal shop.

The merchant was a man of routine, afraid of change. But Santiago's presence brought new life to the shop. He cleaned the crystal, he built a display case, and he even suggested serving tea in crystal glasses.

"Maktub," the merchant often said. "It is written." Santiago stayed for a year, saving money to continue his journey. He realized that even when things go wrong, there is always a path forward if one is willing to see it.

Chapter 3: The Desert Caravan

With enough money saved, Santiago joined a caravan crossing the Sahara toward Egypt. He met an Englishman who was searching for an alchemist.

The Englishman spent all his time reading books, while Santiago spent his time observing the desert. "I've learned that the desert has its own language," Santiago realized. "The wind, the sand, and the silence all speak if you know how to listen."

The desert was vast and dangerous, but Santiago felt a growing sense of connection to the Soul of the World. He was no longer just a shepherd; he was a traveler on a path of destiny.

Chapter 4: The Oasis of Al-Fayoum

The caravan reached a beautiful oasis, a place of safety and peace amidst the warring tribes of the desert. Here, Santiago met Fatima, a woman of the desert.

"I love you because the entire universe conspired to help me find you," he told her. But Fatima encouraged him to continue his quest. "The desert takes our men from us, and they don't always come back," she said. "But if you are part of my Personal Legend, you will return one day."

At the oasis, Santiago met the Alchemist himself. The Alchemist challenged him to find life in the desert, testing his resolve. "Life attracts life," the Alchemist said, as Santiago began his final training in the ways of the world.`
  },
  {
    id:"2", title:"Atomic Habits", author:"James Clear", category:"Self-Help", rating:4.9,
    coverUrl:"https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    tags:["habit","routine","discipline","productive","change","improve","system","small","consistent","focus","build","morning","lazy"],
    description:"Tiny 1% daily improvements lead to remarkable results. Practical, disciplined, and motivating.",
    content:`Chapter 1: The Surprising Power of Atomic Habits

A 1% improvement every single day results in being 37 times better by the end of the year.

Forget goals. Goals are for people who care about winning once. Systems are for people who care about consistent progress.

You do not rise to the level of your goals. You fall to the level of your systems. Every action you take is a vote for the person you want to become.

Chapter 2: How Your Habits Shape Your Identity

The most effective way to change your habits is to focus not on what you want to achieve, but on who you want to become.

There are three levels of change: outcome change, process change, and identity change. Most people start with outcomes. Successful people start with identity.

If you want to be a writer, don't focus on finishing a book. Focus on being the type of person who writes every day. "I am a writer" is much more powerful than "I want to write."

Chapter 3: How to Build Better Habits in 4 Simple Steps

The process of building a habit can be divided into four simple steps: cue, craving, response, and reward.

1. The Cue: Something that triggers your brain to initiate a behavior.
2. The Craving: The motivational force behind every habit.
3. The Response: The actual habit you perform.
4. The Reward: The end goal of every habit.

To build a good habit, make the cue obvious, the craving attractive, the response easy, and the reward satisfying. To break a bad habit, do the opposite.

Chapter 4: The 1st Law: Make It Obvious

Most people think they lack motivation, but what they really lack is clarity.

Use implementation intentions: "I will [BEHAVIOR] at [TIME] in [LOCATION]." This simple plan removes the need for decision-making in the moment.

Habit stacking is another powerful tool: "After [CURRENT HABIT], I will [NEW HABIT]." By anchoring a new habit to an existing one, you make it much more likely to stick.`
  },
  {
    id:"3", title:"Deep Work", author:"Cal Newport", category:"Productivity", rating:4.7,
    coverUrl:"https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    tags:["focus","distraction","work","concentrate","study","analytical","productivity","serious","professional","phone","social media","deep"],
    description:"Focus without distraction on demanding tasks. Serious, analytical, high-performance reading.",
    content:`Introduction: Deep Work Is Becoming Rare

Deep work: professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit.

In contrast, shallow work is easy to replicate and adds little value to the world.

The ability to focus is a superpower in the modern economy. Those who cultivate it will thrive.

Chapter 1: Deep Work is Valuable

In the age of network tools, the ability to concentrate deeply is becoming increasingly valuable.

The modern workforce is divided into two groups: those who can work with intelligent machines and those who cannot. Those who can master complex systems quickly will have a massive advantage.

Deep work is necessary to master hard things and produce at an elite level. Without intense focus, you are simply following the path of least resistance.

Chapter 2: Deep Work is Rare

Our culture is shifting away from deep work. Open offices, constant email, and social media have made distraction the new normal.

Business leaders often mistake busyness for productivity. But sending 100 emails is not the same as writing a groundbreaking report or designing a new software architecture.

We are living in a distraction economy. The companies that win are the ones that can capture and hold our attention. To resist this, we must consciously cultivate the habit of deep focus.

Chapter 3: Deep Work is Meaningful

A life lived with deep focus is a more satisfying and meaningful life.

When you are deeply immersed in a challenging task, you enter a state of "flow." In this state, time disappears, and you experience a sense of mastery and purpose.

Shallow work, by contrast, is often fragmented and unfulfilling. It leaves us feeling drained but without a sense of accomplishment. Deep work provides the mental "crunch" that leads to genuine growth and satisfaction.`
  },
  {
    id:"4", title:"Psychology of Money", author:"Morgan Housel", category:"Finance", rating:4.8,
    coverUrl:"https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
    tags:["money","wealth","finance","wise","investment","saving","rich","greed","behavior","reflective","grounded","economic","salary","earn"],
    description:"The emotional and behavioral side of financial decisions. Reflective, wise, and grounded.",
    content:`Chapter 1: No One Is Crazy

Your experiences with money make up maybe 0.00001% of world events, but perhaps 80% of how you think the world works.

No one is crazy. We all make financial decisions based on our unique life experience.

The person who grew up in poverty will view risk differently than the person who grew up with a trust fund. Neither is "wrong"; they are simply operating from different sets of data.

Chapter 2: Luck & Risk

Nothing is as good or as bad as it looks.

Success is often a combination of hard work, skill, and sheer luck. Similarly, failure is often the result of unforeseen risks rather than just poor decisions.

Be careful when judging others—or yourself—based on financial outcomes. The line between a bold vision and a reckless gamble is often only visible in hindsight. Humility is the best defense against the uncertainty of the market.

Chapter 3: Never Enough

When rich people do crazy things.

The hardest financial skill is getting the goalpost to stop moving. If you always want more, you will never be satisfied, no matter how much you have.

There are many things not worth risking, no matter the potential gain: reputation, freedom, family, friends, and being loved. Happiness is simply results minus expectations.

Chapter 4: Confounding Compounding

$81.5 billion of Warren Buffett's $84.5 billion net worth came after his 65th birthday.

The real secret to Buffett's success isn't just that he's a great investor; it's that he's been a great investor for three-quarters of a century.

Compounding is not intuitive. We tend to think linearly, but wealth grows exponentially. The most powerful tool in your financial arsenal is time. Start early, stay consistent, and let the math do the work.`
  },
  {
    id:"5", title:"Can't Hurt Me", author:"David Goggins", category:"Growth", rating:4.9,
    coverUrl:"https://covers.openlibrary.org/b/isbn/9781544512273-L.jpg",
    tags:["strong","motivation","intense","powerful","pain","resilience","unstoppable","hard","fitness","military","mental","tough","overcome","weak","struggle"],
    description:"Master your mind and defy all odds. Raw, brutal, and powerfully motivating memoir.",
    content:`Introduction: The 40% Rule

When your mind says you are done, you are actually only at 40% of your true capacity.

David Goggins grew up in poverty and abuse. He was mocked for his learning difficulties, his weight, his failures. Yet he became one of the only people to complete Navy SEAL training, Army Ranger School, and Air Force Tactical Air Controller training.

Nobody is coming to save you. You have to save yourself.

Chapter 1: I Should Have Been a Statistic

Goggins describes his traumatic childhood in Buffalo, New York. His father was abusive, and he struggled with learning disabilities and a stutter.

He was a "soft" kid, looking for the easy way out. He was overweight and lacked direction. But a chance encounter with a Navy SEAL recruiting commercial changed everything.

He realized that he had been living a lie, pretending to be someone he wasn't to fit in. He decided that he was going to become the toughest man alive, no matter what it took.

Chapter 2: Truth Hurts

Goggins began his transformation by facing the brutal truth of his situation. He created the "Accountability Mirror," where he would stand and list all his weaknesses and failures.

He lost over 100 pounds in less than three months to qualify for SEAL training. He ran until his feet bled and biked until his legs gave out.

He learned that the only way to grow is to embrace pain and discomfort. "Comfort is a slow death," he says. "You have to be willing to suffer to find out who you truly are."

Chapter 3: The Impossible Task

Goggins faced Hell Week, the most grueling part of SEAL training, multiple times due to injuries. He pushed through stress fractures and pneumonia.

He learned that the mind is the ultimate weapon. If you can control your thoughts, you can control your body. He developed the "Cookie Jar" technique—recalling past victories to fuel him through present struggles.

He graduated as a Navy SEAL, proving to himself and the world that the "impossible" is just a starting point. But he didn't stop there. He wanted to see how far he could truly go.`
  },
  {
    id:"6", title:"Zero to One", author:"Peter Thiel", category:"Startup", rating:4.7,
    coverUrl:"https://covers.openlibrary.org/b/isbn/9780804139021-L.jpg",
    tags:["startup","business","innovation","bold","entrepreneur","future","strategy","build","company","idea","technology","invest","create"],
    description:"Build the future by going from 0 to 1. Bold, contrarian, and essential for innovators.",
    content:`Chapter 1: The Challenge of the Future

Every moment in business happens only once. The next Bill Gates will not build an operating system.

Zero to one means going from nothing to something new. One to n means copying something that exists.

The most important question: What valuable company is nobody building?

Chapter 2: Party Like It's 1999

Thiel reflects on the dot-com bubble and the lessons learned. Most people became cautious and incremental after the crash.

But the real lesson is that you must be bold. Incrementalism is the path to mediocrity. To build a great company, you must have a vision that is significantly different from the status quo.

Don't just look for "better." Look for "different." The most successful startups are the ones that define a new category rather than competing in an old one.

Chapter 3: All Happy Companies Are Different

Monopoly is the condition of every successful business. Competition is for losers.

If you are in a competitive market, your margins will be driven to zero. But if you have a monopoly, you can set your own prices and reinvest in the future.

Google has a monopoly on search. Microsoft once had a monopoly on operating systems. Apple has a monopoly on the premium smartphone experience. All these companies are "happy" because they aren't fighting over scraps; they own the whole pie.

Chapter 4: The Ideology of Competition

We are taught from a young age that competition is good. But in business, competition is destructive.

Competition makes us focus on our rivals rather than our customers. It leads to price wars and copycat products. It is the enemy of innovation.

Instead of trying to beat your competitors at their own game, change the game entirely. Create something so unique and valuable that competition becomes irrelevant. This is the only way to build a truly lasting and impactful company.`
  }
];

// ── Mood → Tag Mapping (synonym expansion) ────────────────────────────────────
const MOOD_MAP = {
  "i feel sad":["inspiring","hopeful","purpose"],
  "i feel lost":["purpose","meaning","destiny","spiritual"],
  "i feel lazy":["habit","discipline","routine","motivating"],
  "i feel weak":["strong","resilience","powerful","tough"],
  "i feel inspired":["adventure","mystical","dream","journey"],
  "i feel stressed":["focus","calm","grounded","wise"],
  "i feel bored":["adventure","journey","mystical"],
  "i want to improve":["habit","discipline","system","improve"],
  "i want success":["discipline","startup","system","innovation"],
  "i want money":["money","wealth","finance","saving"],
  "i want to focus":["focus","distraction","deep","study"],
  "i want to start a business":["startup","entrepreneur","innovation","idea"],
  "adventure":["adventure","journey","mystical","inspiring"],
  "motivation":["resilience","powerful","discipline","strong"],
  "calm":["wise","grounded","reflective","spiritual"]
};

// ── Search Engine ─────────────────────────────────────────────────────────────
function searchBooks(query) {
  if (!query || query.trim().length < 2) return BOOKS;
  const q = query.toLowerCase().trim();

  // Check mood map first
  let expandedTags = [];
  for (const [phrase, tags] of Object.entries(MOOD_MAP)) {
    if (q.includes(phrase) || phrase.includes(q)) {
      expandedTags = [...expandedTags, ...tags];
    }
  }

  const words = [...new Set([...q.split(/\s+/), ...expandedTags])];

  const scored = BOOKS.map(b => {
    let score = 0;
    const hay = `${b.title} ${b.author} ${b.category} ${b.tags.join(' ')} ${b.description}`.toLowerCase();
    words.forEach(w => {
      if (w.length < 2) return;
      if (b.title.toLowerCase().includes(w)) score += 10;
      if (b.author.toLowerCase().includes(w)) score += 8;
      if (b.category.toLowerCase() === w) score += 9;
      if (b.tags.some(t => t.includes(w) || w.includes(t))) score += 6;
      if (hay.includes(w)) score += 2;
    });
    return { ...b, score };
  }).filter(b => b.score > 0).sort((a, b) => b.score - a.score);

  return scored.length > 0 ? scored : BOOKS;
}

// ── Page Router ───────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const page = location.pathname.split('/').pop() || 'dashboard.html';
  initSearch();
  if (page === 'dashboard.html' || page === 'library.html' || page === '') renderLibrary(BOOKS);
  if (page === 'book_details.html') initDetails();
  if (page === 'reader.html') initReader();
  if (page === 'ai_assistant.html') { initChat(); checkPendingAnalysis(); }
});

// ── Search UI ─────────────────────────────────────────────────────────────────
function initSearch() {
  const input = document.querySelector('input[placeholder*="Search"], input[placeholder*="feel"], input[type="text"]');
  const askBtn = document.querySelector('button.bg-primary');
  if (!input) return;

  // Dropdown
  const dropdown = document.createElement('div');
  dropdown.id = 'search-dropdown';
  dropdown.className = 'hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden max-h-96 overflow-y-auto';
  const wrap = input.closest('div') || input.parentElement;
  wrap.style.position = 'relative';
  wrap.appendChild(dropdown);

  const trigger = () => doSearch(input.value);
  if (askBtn) askBtn.addEventListener('click', trigger);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') trigger(); });

  let timer;
  input.addEventListener('input', e => {
    clearTimeout(timer);
    const q = e.target.value.trim();
    if (q.length < 2) { dropdown.classList.add('hidden'); return; }
    timer = setTimeout(() => showDropdown(q), 250);
  });

  document.addEventListener('click', e => { if (!wrap.contains(e.target)) dropdown.classList.add('hidden'); });
}

function showDropdown(q) {
  const dropdown = document.getElementById('search-dropdown');
  if (!dropdown) return;
  const results = searchBooks(q).slice(0, 5);
  dropdown.innerHTML = `
    <div class="px-4 pt-3 pb-1"><span class="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-widest">Smart Match</span></div>
    ${results.map(b => `
      <div class="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 cursor-pointer transition-colors border-t border-slate-50"
           onclick="window.location.href='book_details.html?id=${b.id}'">
        <img src="${b.coverUrl}" class="w-10 h-14 object-cover rounded-lg shadow"
             onerror="this.src='https://placehold.co/80x112/e0e7ff/4f46e5?text=Book'">
        <div>
          <p class="text-sm font-bold text-slate-800">${b.title}</p>
          <p class="text-xs text-slate-500">${b.author}</p>
          <p class="text-[10px] text-indigo-400 mt-0.5">${b.tags.slice(0,3).join(' · ')}</p>
        </div>
      </div>`).join('')}
    <div class="p-2 bg-slate-50 border-t border-slate-100 text-center">
      <button class="text-xs font-bold text-indigo-600 hover:underline"
              onclick="document.getElementById('search-dropdown').classList.add('hidden'); doSearch('${q.replace(/'/g,"\\'")}')">
        See all ${results.length} results →
      </button>
    </div>`;
  dropdown.classList.remove('hidden');
}

function doSearch(q) {
  if (!q.trim()) return;
  const dropdown = document.getElementById('search-dropdown');
  if (dropdown) dropdown.classList.add('hidden');

  const container = document.getElementById('continue-reading-container')
                 || document.getElementById('currently-reading-container');
  if (!container) return;

  const heading = container.closest('section')?.querySelector('h2');

  const results = searchBooks(q);

  if (heading) heading.textContent = `${results.length} results for "${q}"`;
  renderLibrary(results);
}

// ── Render Books ──────────────────────────────────────────────────────────────
function renderLibrary(books) {
  const container = document.getElementById('continue-reading-container')
                 || document.getElementById('currently-reading-container');
  if (!container) return;

  if (!books || books.length === 0) {
    container.innerHTML = `<div class="col-span-3 py-8 text-center text-slate-400">No books found. Try: "adventure", "focus", "money"</div>`;
    return;
  }

  container.innerHTML = books.map(b => `
    <div class="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1
                transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
         onclick="window.location.href='book_details.html?id=${b.id}'">
      <div class="relative h-52 overflow-hidden bg-indigo-50">
        <img src="${b.coverUrl}" alt="${b.title}"
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
        <div style="display:none" class="absolute inset-0 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
          <p class="text-indigo-600 font-bold text-sm text-center px-4">${b.title}</p>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <span class="absolute top-3 left-3 bg-white/90 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">${b.category}</span>
        <div class="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full">
          ★ ${b.rating}
        </div>
      </div>
      <div class="p-5 flex flex-col flex-grow">
        <h3 class="font-bold text-slate-800 text-base leading-snug mb-1 line-clamp-2">${b.title}</h3>
        <p class="text-xs text-slate-500 mb-3">${b.author}</p>
        <div class="flex flex-wrap gap-1 mb-4">
          ${b.tags.slice(0,3).map(t => `<span class="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">${t}</span>`).join('')}
        </div>
        <button class="mt-auto w-full py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold
                       hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
                onclick="event.stopPropagation(); window.location.href='reader.html?id=${b.id}'">
          Read Now
        </button>
      </div>
    </div>`).join('');
}

// ── Book Details ──────────────────────────────────────────────────────────────
function initDetails() {
  const id = new URLSearchParams(location.search).get('id') || '1';
  const book = BOOKS.find(b => b.id === id) || BOOKS[0];

  const h1 = document.querySelector('h1');
  const authorEl = document.querySelector('.font-headline-md');
  const cover = document.getElementById('book-details-cover');
  const descEl = document.getElementById('book-description');
  const readBtn = document.getElementById('read-now-btn');

  if (h1) h1.textContent = book.title;
  if (authorEl) authorEl.textContent = `by ${book.author}`;
  if (cover) {
    cover.src = book.coverUrl;
    cover.onerror = () => { cover.src = `https://placehold.co/400x600/e0e7ff/4f46e5?text=${encodeURIComponent(book.title)}`; };
  }
  if (descEl) descEl.textContent = book.description;
  if (readBtn) readBtn.onclick = () => location.href = `reader.html?id=${book.id}`;
}

// ── Reader ────────────────────────────────────────────────────────────────────
function initReader() {
  const id = new URLSearchParams(location.search).get('id') || '1';
  const book = BOOKS.find(b => b.id === id) || BOOKS[0];

  const titleEl = document.getElementById('reader-book-title');
  const contentEl = document.getElementById('reader-content-area');
  if (!contentEl) return;

  if (titleEl) titleEl.textContent = book.title;

  contentEl.innerHTML = book.content.split('\n').filter(p => p.trim()).map((p, i) => {
    if (/^Chapter|^Introduction|^Rule/.test(p)) {
      return `<h2 class="text-2xl font-bold font-serif text-indigo-700 mt-10 mb-4">${p}</h2>`;
    }
    if (i === 0) {
      return `<p class="mb-6 text-[19px] first-letter:text-6xl first-letter:font-bold first-letter:text-indigo-600 first-letter:float-left first-letter:mr-3 first-letter:leading-none">${p}</p>`;
    }
    return `<p class="mb-5 text-[19px]">${p}</p>`;
  }).join('');

  initSelectionAI();
}

function initSelectionAI() {
  const btn = document.getElementById('ai-analyze-btn');
  if (!btn) return;
  document.addEventListener('mouseup', () => {
    const sel = window.getSelection();
    const text = sel ? sel.toString().trim() : '';
    if (text.length > 20) {
      try {
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        btn.style.left = `${Math.max(0, rect.left + rect.width / 2 - 90)}px`;
        btn.style.top  = `${window.scrollY + rect.top - 58}px`;
      } catch (_) {}
      btn.classList.remove('hidden');
      btn.onclick = () => { localStorage.setItem('readify_analyze', text); location.href = 'ai_assistant.html'; };
    } else {
      btn.classList.add('hidden');
    }
  });
}

// ── AI Assistant (local NLP — no API) ────────────────────────────────────────
const AI_RESPONSES = [
  { keys:["habit","atomic","clear","routine"],  reply:"This passage is about the power of small, consistent habits. James Clear's core insight: tiny improvements compound over time. A 1% gain daily leads to 37x growth in a year. The key is building identity-based habits — ask 'who do I want to be?' rather than 'what do I want to achieve?'" },
  { keys:["focus","deep","distract","newport"], reply:"This text emphasizes the value of undistracted focus. Cal Newport argues that deep work — sustained, focused effort on cognitively demanding tasks — is becoming both rarer and more valuable. Protect your attention fiercely; it is your most limited resource." },
  { keys:["money","wealth","housel","finance"],  reply:"Morgan Housel reminds us that financial success is mostly behavioral, not intellectual. The biggest risk is not knowing when to stop and enjoy what you have. Wealth is what you don't spend — the savings you keep, not the things you display." },
  { keys:["goggins","hurt","mind","strong"],    reply:"Goggins' core philosophy: your mind will quit long before your body does. The 40% Rule states that when you feel done, you're only at 40% capacity. Pushing through discomfort consistently builds mental resilience — the callused mind." },
  { keys:["startup","zero","thiel","one"],      reply:"Thiel's argument: true progress means creating something new (0 to 1), not copying what exists (1 to n). The best businesses build monopolies in niche markets first, then expand. Seek contrarian truths others overlook." },
  { keys:["alchemist","coelho","dream","legend"], reply:"Paulo Coelho's message: the universe conspires to help those who pursue their Personal Legend. Fear and comfort are the enemies of destiny. Every journey begins with a dream and ends with transformation." },
];

function getAIResponse(msg) {
  const m = msg.toLowerCase();
  for (const r of AI_RESPONSES) {
    if (r.keys.some(k => m.includes(k))) return r.reply;
  }
  // Keyword analysis fallback
  const matched = BOOKS.find(b => b.tags.some(t => m.includes(t)) || m.includes(b.title.toLowerCase()));
  if (matched) {
    return `This passage relates to themes found in "${matched.title}" by ${matched.author}. Key ideas: ${matched.tags.slice(0,5).join(', ')}. ${matched.description}`;
  }
  return `Interesting perspective! This passage touches on themes of growth, understanding, and reflection. Consider how this idea connects to your own experience — the most meaningful insights are those that resonate personally and inspire action.`;
}

function checkPendingAnalysis() {
  const text = localStorage.getItem('readify_analyze');
  if (!text) return;
  localStorage.removeItem('readify_analyze');
  setTimeout(() => sendMsg(`Analyze this passage: "${text}"`), 600);
}

function initChat() {
  const input = document.getElementById('chat-input') || document.querySelector('input[placeholder*="Ask AI"], input[placeholder*="ask"], textarea');
  const btn = document.getElementById('inquire-btn') || document.querySelector('button[type="submit"], .send-btn, form button, button:last-of-type');
  if (!input || !btn) return;
  const fire = () => { if (input.value.trim()) { sendMsg(input.value.trim()); input.value = ''; } };
  btn.addEventListener('click', fire);
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); fire(); } });
}

function sendMsg(text) {
  appendMsg('user', text);
  setTimeout(() => appendMsg('ai', getAIResponse(text)), 600);
}

function appendMsg(role, text) {
  const c = document.getElementById('chat-history-container');
  if (!c) return;
  c.insertAdjacentHTML('beforeend', role === 'user'
    ? `<div class="flex justify-end mb-4"><div class="bg-indigo-600 text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[75%] text-sm shadow-lg">${text}</div></div>`
    : `<div class="flex gap-3 mb-4"><div class="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0"><span class="material-symbols-outlined text-indigo-600 text-lg">smart_toy</span></div><div class="bg-white border border-slate-100 px-5 py-3 rounded-2xl rounded-tl-sm max-w-[75%] text-sm text-slate-700 shadow-sm leading-relaxed">${text}</div></div>`
  );
  c.scrollTop = c.scrollHeight;
}
