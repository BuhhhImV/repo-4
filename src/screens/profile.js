export function renderProfile(state) {
  const user = state.user;

  return `
    <!-- HERO -->
    <div class="flex-col align-center" style="margin-top: 20px; margin-bottom: 32px;">
      <div style="
        width: 80px; 
        height: 80px; 
        border-radius: 50%; 
        background: var(--lime); 
        border: 4px solid var(--charcoal); 
        box-shadow: 0 0 0 3px var(--lime); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-weight: 900; 
        font-size: 32px; 
        color: #0D0D0D;
        margin-bottom: 16px;
      ">
        ${user.initials}
      </div>
      <div class="syne-900" style="font-size: 24px; letter-spacing: -0.5px;">${user.name}</div>
      <div class="text-muted" style="font-size: 13px;">${user.handle} · AuraBank Member</div>
    </div>

    <!-- STATS ROW -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px;">
      <div class="card flex-col align-center" style="padding: 14px;">
        <div class="syne-900 text-lime" style="font-size: 22px; margin-bottom: 4px;">${user.auraScore}</div>
        <div class="uppercase tracking-wide text-muted" style="font-size: 10px;">Aura Score</div>
      </div>
      <div class="card flex-col align-center" style="padding: 14px;">
        <div class="syne-900 text-lime" style="font-size: 22px; margin-bottom: 4px;">${user.streakDays}</div>
        <div class="uppercase tracking-wide text-muted" style="font-size: 10px;">Day Streak</div>
      </div>
      <div class="card flex-col align-center" style="padding: 14px;">
        <div class="syne-900 text-lime" style="font-size: 22px; margin-bottom: 4px;">$${user.saved}</div>
        <div class="uppercase tracking-wide text-muted" style="font-size: 10px;">Saved</div>
      </div>
    </div>

    <!-- BOY MATH BADGE -->
    ${user.boyMathStreak >= 3 ? `
      <div style="display: flex; justify-content: center; margin-bottom: 32px;">
        <div class="chip chip-orange">BOY MATH STREAK: ${user.boyMathStreak}x 🧢</div>
      </div>
    ` : '<div style="margin-bottom: 32px;"></div>'}

    <!-- SETTINGS MENU -->
    <div class="flex-col" style="gap: 10px;">
      <button class="card flex-row justify-between settings-row" style="padding: 16px;">
        <div class="flex-row" style="gap: 16px;">
          <span style="font-size: 20px;">🔒</span>
          <div class="flex-col" style="align-items: flex-start;">
            <span class="font-bold">Security & Auth</span>
            <span class="text-xs text-muted">Biometrics + Secure OTP active</span>
          </div>
        </div>
        <span class="text-muted font-bold">›</span>
      </button>

      <button class="card flex-row justify-between settings-row" style="padding: 16px;">
        <div class="flex-row" style="gap: 16px;">
          <span style="font-size: 20px;">🤖</span>
          <div class="flex-col" style="align-items: flex-start;">
            <span class="font-bold">Fin-Bestie Settings</span>
            <span class="text-xs text-muted">Snarky mode: ON 💅</span>
          </div>
        </div>
        <span class="text-muted font-bold">›</span>
      </button>

      <button class="card flex-row justify-between settings-row" style="padding: 16px;" id="theme-toggle-btn">
        <div class="flex-row" style="gap: 16px;">
          <span style="font-size: 20px;">🎨</span>
          <div class="flex-col" style="align-items: flex-start;">
            <span class="font-bold">Aura Themes</span>
            <span class="text-xs text-muted" id="theme-status">Cyberpunk Dark (active)</span>
          </div>
        </div>
        <span class="text-muted font-bold">›</span>
      </button>

      <button class="card flex-row justify-between settings-row" style="padding: 16px;">
        <div class="flex-row" style="gap: 16px;">
          <span style="font-size: 20px;">📊</span>
          <div class="flex-col" style="align-items: flex-start;">
            <span class="font-bold">Financial Health Report</span>
            <span class="text-xs text-muted">Last generated: Today</span>
          </div>
        </div>
        <span class="text-muted font-bold">›</span>
      </button>

      <button class="card flex-row justify-between settings-row" style="padding: 16px;">
        <div class="flex-row" style="gap: 16px;">
          <span style="font-size: 20px;">🏦</span>
          <div class="flex-col" style="align-items: flex-start;">
            <span class="font-bold">Linked Accounts</span>
            <span class="text-xs text-muted">Chase ···4821 · Robinhood</span>
          </div>
        </div>
        <span class="text-muted font-bold">›</span>
      </button>
    </div>

    <style>
      .settings-row {
        cursor: pointer;
        transition: 0.2s;
        border-color: var(--border);
      }
      .settings-row:hover {
        border-color: var(--lime) !important;
      }
    </style>
  `;
}

export function setupProfile(state) {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeStatus = document.getElementById('theme-status');
  
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        themeStatus.textContent = 'Cyberpunk Dark (active)';
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeStatus.textContent = 'Cyberpunk Light (active)';
      }
    });
  }
}
