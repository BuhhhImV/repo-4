export function renderSubs(state) {
  // Calculate active total
  const activeTotal = state.subscriptions
    .filter(s => !s.isCancelled)
    .reduce((sum, s) => sum + s.price, 0);

  return `
    <div class="chip chip-pink" style="align-self: flex-start; margin-bottom: 16px;">VAMPIRE SLAYER 🧛</div>

    <!-- HERO BANNER -->
    <div style="background: var(--pink); border-radius: 14px; padding: 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <div>
        <div class="uppercase tracking-wide" style="font-size: 12px; color: rgba(255,255,255,0.7); font-weight: 800;">Bleeding Monthly</div>
        <div class="syne-900" style="font-size: 32px; color: #fff; letter-spacing: -1px; margin: 4px 0;">$${activeTotal.toFixed(2)}</div>
        <div style="font-size: 14px; color: rgba(255,255,255,0.9); font-weight: 600;">= $${(activeTotal * 12).toFixed(2)}/year gone 💀</div>
      </div>
      <div style="font-size: 36px;">🩸</div>
    </div>

    <!-- SUBSCRIPTION LIST -->
    <div class="flex-col" style="gap: 10px;">
      ${state.subscriptions.map(sub => `
        <div class="card flex-row" style="padding: 12px; justify-content: space-between; align-items: center; ${sub.isCancelled ? 'opacity: 0.4; border-color: transparent;' : ''}">
          <div class="flex-row" style="gap: 12px;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: ${sub.bg}; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold;">
              ${sub.name.charAt(0)}
            </div>
            <div class="flex-col">
              <span class="font-bold text-base" style="${sub.isCancelled ? 'text-decoration: line-through;' : ''}">${sub.name}</span>
              <span class="text-xs text-muted">Renews ${sub.date} · Monthly</span>
            </div>
          </div>
          <div class="flex-row" style="gap: 16px; align-items: center;">
            <span class="syne-900 text-lg">$${sub.price.toFixed(2)}</span>
            <button class="slay-btn" data-id="${sub.id}" ${sub.isCancelled ? 'disabled' : ''} style="
              border: 2px solid ${sub.isCancelled ? 'var(--muted)' : 'var(--pink)'};
              color: ${sub.isCancelled ? 'var(--muted)' : 'var(--pink)'};
              background: transparent;
              border-radius: 8px;
              padding: 6px 12px;
              font-weight: 800;
              font-size: 12px;
              transition: 0.2s;
              cursor: ${sub.isCancelled ? 'not-allowed' : 'pointer'};
            ">
              ${sub.isCancelled ? 'SLAYED ✓' : 'SLAY'}
            </button>
          </div>
        </div>
      `).join('')}
    </div>
    <style>
      .slay-btn:hover:not(:disabled) {
        background: var(--pink) !important;
        color: #fff !important;
      }
    </style>
  `;
}

export function setupSubs(state) {
  document.querySelectorAll('.slay-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.dataset.id);
      const sub = state.subscriptions.find(s => s.id === id);
      if (sub && !sub.isCancelled) {
        sub.isCancelled = true;
        document.querySelector('[data-tab=subs]').click(); // Re-render
      }
    });
  });
}
