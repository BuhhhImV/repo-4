import { getAuraState, getFinBestieMessage } from '../utils/aura-engine.js';

export function renderHome(state) {
  const aura = getAuraState(state.user.auraScore);
  const finBestieMsg = getFinBestieMessage(state);
  
  return `
    <!-- SPENDING AURA WIDGET -->
    <div class="aura-widget flex-col align-center" style="align-items: center; text-align: center; margin-bottom: 24px;">
      <div class="aura-ring-container" style="position: relative; width: 240px; height: 240px; animation: float 3s ease-in-out infinite;">
        <!-- SVG Radial Ring -->
        <svg viewBox="0 0 240 240" style="width: 100%; height: 100%; overflow: visible;">
          <!-- Outer dashed ring — uses .aura-dashed-ring class for proper rotation -->
          <circle class="aura-dashed-ring" cx="120" cy="120" r="110" fill="none" stroke="${aura.hex}" stroke-width="1.5" stroke-dasharray="8 4" />
          <!-- Track -->
          <circle cx="120" cy="120" r="80" fill="none" stroke="var(--mid)" stroke-width="12" />
          <!-- Segments -->
          <circle cx="120" cy="120" r="80" fill="none" stroke="var(--cyan)" stroke-width="12" stroke-dasharray="100 400" stroke-dashoffset="0" stroke-linecap="round" />
          <circle cx="120" cy="120" r="80" fill="none" stroke="var(--lime)" stroke-width="12" stroke-dasharray="250 400" stroke-dashoffset="-100" stroke-linecap="round" />
          <circle cx="120" cy="120" r="80" fill="none" stroke="var(--pink)" stroke-width="12" stroke-dasharray="150 400" stroke-dashoffset="-350" stroke-linecap="round" />
          <!-- Center mask -->
          <circle cx="120" cy="120" r="74" fill="var(--charcoal)" />
        </svg>
        <!-- Center Text -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; gap: 2px;">
          <span class="syne-900" style="font-size: 42px; color: ${aura.hex}; line-height: 1;">${state.user.auraScore}</span>
          <span style="font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--muted);">Aura Score</span>
        </div>
      </div>
      <div class="syne-900" style="font-size: 22px; color: ${aura.hex}; margin-top: 16px;">✦ ${aura.label}</div>
    </div>

    <!-- BALANCE CARD -->
    <div class="card" style="background: var(--lime); border-color: var(--charcoal); border-width: 3px; position: relative; overflow: hidden; color: var(--charcoal);">
      <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: rgba(0,0,0,0.08); border-radius: 50%;"></div>
      <div class="uppercase tracking-wide" style="font-size: 12px; color: rgba(0,0,0,0.5); font-weight: 800;">Total Balance</div>
      <div class="syne-900" style="font-size: 40px; letter-spacing: -2px; margin: 8px 0;">$${state.user.balance.toFixed(2)}</div>
      <div class="flex-row justify-between w-full">
        <span class="font-bold" style="font-size: 14px;">↑ +$342 this month</span>
        <span class="chip" style="background: var(--charcoal); color: var(--lime);">SECURED 🔐</span>
      </div>
    </div>

    <!-- FIN-BESTIE AI CARD -->
    <div class="card" style="border-color: var(--pink); border-width: 2px;">
      <div class="flex-row justify-between" style="margin-bottom: 12px;">
        <div class="flex-row" style="gap: 8px;">
          <div style="width: 32px; height: 32px; background: var(--pink); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px;">🤖</div>
          <span class="syne font-bold text-pink uppercase" style="font-size: 13px;">Fin-Bestie AI ✨</span>
        </div>
        <div class="flex-row" style="gap: 8px;">
          <span class="text-xs text-muted">Just now</span>
          <span class="chip chip-pink">NEW</span>
        </div>
      </div>
      <div style="font-size: 14px; line-height: 1.5; color: var(--text);" id="fin-bestie-msg">
        ${finBestieMsg}
      </div>
    </div>

    <!-- MATH MODES -->
    <div>
      <div class="uppercase tracking-wide text-muted" style="font-size: 11px; margin-bottom: 12px;">MATH MODES 🧮</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <!-- Girl Math Card -->
        <div class="card math-card ${state.user.mathModes.girlMath ? 'active-pink' : ''}" id="girl-math-card" style="cursor: pointer; transition: all 0.2s;">
          <div class="flex-row justify-between" style="margin-bottom: 8px;">
            <span style="font-size: 24px;">💅</span>
            <div class="toggle-switch ${state.user.mathModes.girlMath ? 'on pink' : ''}" id="toggle-girl-math"></div>
          </div>
          <div class="syne font-bold font-girl" style="font-size: 22px;">Girl Math</div>
          <div class="text-xs text-muted">Justify it, queen</div>
        </div>
        
        <!-- Boy Math Card -->
        <div class="card math-card ${state.user.mathModes.boyMath ? 'active-orange' : ''}" id="boy-math-card" style="cursor: pointer; transition: all 0.2s;">
          <div class="flex-row justify-between" style="margin-bottom: 8px;">
            <span style="font-size: 24px;">🧢</span>
            <div class="toggle-switch ${state.user.mathModes.boyMath ? 'on orange' : ''}" id="toggle-boy-math"></div>
          </div>
          <div class="syne font-bold font-boy" style="font-size: 18px;">Boy Math</div>
          <div class="text-xs text-muted">It's basically an investment</div>
        </div>
      </div>
      
      <!-- Girl Math Panel -->
      <div id="girl-math-panel" style="display: ${state.user.mathModes.girlMath ? 'block' : 'none'}; margin-top: 12px; background: var(--mid); border: 3px solid var(--pink); border-radius: 16px; padding: 16px;">
        <div class="syne-900 text-pink font-girl" style="font-size: 26px; margin-bottom: 12px;">💅 Girl Math is ON</div>
        <div class="math-row font-girl">👟 $180 sneakers worn 60x = $3/wear. <strong class="text-pink">Practically groceries.</strong></div>
        <div class="math-row font-girl">☕ $7 iced coffee × 5 days = $35/week BUT it powers $200/hr productivity. <strong class="text-pink">ROI: immaculate.</strong></div>
        <div class="math-row font-girl">🛍️ Returning $30 of that $200 haul means <strong class="text-pink">you made $30.</strong> That's just facts.</div>
      </div>

      <!-- Boy Math Panel -->
      <div id="boy-math-panel" style="display: ${state.user.mathModes.boyMath ? 'block' : 'none'}; margin-top: 12px; background: var(--mid); border: 3px solid var(--orange); border-radius: 16px; padding: 16px;">
        <div class="syne-900 text-orange font-boy" style="font-size: 22px; margin-bottom: 12px;">🧢 Boy Math is ON</div>
        <div class="math-row font-boy">🎮 $70 game played 200 hours = 35 cents/hour. <strong class="text-orange">Cheaper than therapy.</strong></div>
        <div class="math-row font-boy">🔧 $400 tool I'll use once saved me a $50 repair bill. <strong class="text-orange">Net gain: immeasurable confidence.</strong></div>
        <div class="math-row font-boy">📺 $1,200 monitor makes me 12% more productive. <strong class="text-orange">Pays for itself in 3 months, bro.</strong></div>
      </div>
    </div>

    <!-- SPENDING CATEGORIES -->
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
      <!-- Category 1 -->
      <div class="card hover-lime" style="padding: 12px;">
        <div class="flex-row justify-between w-full" style="margin-bottom: 8px;">
          <span style="font-size: 26px;">🍕</span>
          <div class="flex-col" style="align-items: flex-end;">
            <span class="text-muted uppercase" style="font-size: 10px;">Food</span>
            <span class="syne font-bold" style="font-size: 16px;">$312</span>
          </div>
        </div>
        <div style="height: 3px; background: var(--border); width: 100%; border-radius: 2px;">
          <div style="height: 100%; width: 65%; background: var(--pink); border-radius: 2px;"></div>
        </div>
      </div>
      <!-- Category 2 -->
      <div class="card hover-lime" style="padding: 12px;">
        <div class="flex-row justify-between w-full" style="margin-bottom: 8px;">
          <span style="font-size: 26px;">👟</span>
          <div class="flex-col" style="align-items: flex-end;">
            <span class="text-muted uppercase" style="font-size: 10px;">Fashion</span>
            <span class="syne font-bold" style="font-size: 16px;">$189</span>
          </div>
        </div>
        <div style="height: 3px; background: var(--border); width: 100%; border-radius: 2px;">
          <div style="height: 100%; width: 40%; background: var(--cyan); border-radius: 2px;"></div>
        </div>
      </div>
      <!-- Category 3 -->
      <div class="card hover-lime" style="padding: 12px;">
        <div class="flex-row justify-between w-full" style="margin-bottom: 8px;">
          <span style="font-size: 26px;">💪</span>
          <div class="flex-col" style="align-items: flex-end;">
            <span class="text-muted uppercase" style="font-size: 10px;">Fitness</span>
            <span class="syne font-bold" style="font-size: 16px;">$74</span>
          </div>
        </div>
        <div style="height: 3px; background: var(--border); width: 100%; border-radius: 2px;">
          <div style="height: 100%; width: 20%; background: var(--lime); border-radius: 2px;"></div>
        </div>
      </div>
      <!-- Category 4 -->
      <div class="card hover-lime" style="padding: 12px;">
        <div class="flex-row justify-between w-full" style="margin-bottom: 8px;">
          <span style="font-size: 26px;">🏠</span>
          <div class="flex-col" style="align-items: flex-end;">
            <span class="text-muted uppercase" style="font-size: 10px;">Rent</span>
            <span class="syne font-bold" style="font-size: 16px;">$900</span>
          </div>
        </div>
        <div style="height: 3px; background: var(--border); width: 100%; border-radius: 2px;">
          <div style="height: 100%; width: 100%; background: var(--muted); border-radius: 2px;"></div>
        </div>
      </div>
    </div>

    <!-- QUICK ACTIONS -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
      <button class="card flex-col align-center" style="padding: 12px; gap: 8px; justify-content: center; border-radius: 12px;" onclick="document.querySelector('[data-tab=subs]').click()">
        <span style="font-size: 24px;">🧛</span>
        <span class="font-bold text-xs uppercase text-center" style="line-height: 1.2;">Subs<br>Slayer</span>
      </button>
      <button class="card flex-col align-center" style="padding: 12px; gap: 8px; justify-content: center; border-radius: 12px;" onclick="document.querySelector('[data-tab=squad]').click()">
        <span style="font-size: 24px;">🎯</span>
        <span class="font-bold text-xs uppercase text-center" style="line-height: 1.2;">Squad<br>Goals</span>
      </button>
      <button class="card flex-col align-center" style="padding: 12px; gap: 8px; justify-content: center; border-radius: 12px;" onclick="document.querySelector('[data-tab=profile]').click()">
        <span style="font-size: 24px;">🌟</span>
        <span class="font-bold text-xs uppercase text-center" style="line-height: 1.2;">My<br>Stats</span>
      </button>
    </div>
    
    <style>
      .math-row {
        font-size: 13px;
        padding: 12px 0;
        border-bottom: 1px solid var(--border);
      }
      .font-girl { font-family: 'Caveat', cursive; font-size: 20px; line-height: 1.2; }
      .font-boy { font-family: 'Bebas Neue', sans-serif; font-size: 18px; line-height: 1.2; letter-spacing: 1px; }
      .math-row:last-child { border-bottom: none; padding-bottom: 0; }
      .active-pink { border-color: var(--pink) !important; background: rgba(255,45,120,0.06) !important; }
      .active-orange { border-color: var(--orange) !important; background: rgba(255,107,0,0.06) !important; }
      .toggle-switch {
        width: 40px; height: 22px; background: var(--border); border-radius: 20px; position: relative; transition: 0.3s;
      }
      .toggle-switch::after {
        content: ''; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; background: #fff; border-radius: 50%; transition: 0.3s;
      }
      .toggle-switch.on.pink { background: var(--pink); }
      .toggle-switch.on.orange { background: var(--orange); }
      .toggle-switch.on::after { transform: translateX(18px); }
      .hover-lime { border-color: transparent; transition: 0.2s; }
      .hover-lime:hover { border-color: var(--lime); }
      .align-center { align-items: center; }
      .text-center { text-align: center; }
    </style>
  `;
}

export function setupHome(state) {
  const gmCard = document.getElementById('girl-math-card');
  const bmCard = document.getElementById('boy-math-card');

  const updateFinBestie = () => {
    const msgEl = document.getElementById('fin-bestie-msg');
    if (msgEl) {
      msgEl.innerHTML = getFinBestieMessage(state);
    }
  };

  if (gmCard) {
    gmCard.addEventListener('click', () => {
      state.user.mathModes.girlMath = !state.user.mathModes.girlMath;
      if(state.user.mathModes.girlMath) state.user.mathModes.boyMath = false; // Optional exclusivity
      document.querySelector('[data-tab=home]').click(); // Re-render trick for vanilla SPA
    });
  }

  if (bmCard) {
    bmCard.addEventListener('click', () => {
      state.user.mathModes.boyMath = !state.user.mathModes.boyMath;
      if(state.user.mathModes.boyMath) state.user.mathModes.girlMath = false; // Optional exclusivity
      document.querySelector('[data-tab=home]').click();
    });
  }
}
