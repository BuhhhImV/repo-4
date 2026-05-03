export function renderSquad(state) {
  const squad = state.squad;
  const progressPercent = Math.min(100, Math.round((squad.currentSaved / squad.goalAmount) * 100));

  return `
    <div class="chip chip-cyan" style="align-self: flex-start; margin-bottom: 16px;">SQUAD ACTIVE 🎯</div>

    <!-- ACTIVE GOAL CARD -->
    <div class="card" style="border: 3px solid var(--cyan); border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <div class="uppercase tracking-wide text-muted" style="font-size: 11px; margin-bottom: 8px;">Active Goal</div>
      <div class="syne-900" style="font-size: 22px; margin-bottom: 16px;">${squad.goalName}</div>
      
      <!-- Progress Bar -->
      <div style="height: 12px; background: var(--border); border-radius: 6px; margin-bottom: 12px; overflow: hidden;">
        <div style="height: 100%; width: ${progressPercent}%; background: var(--cyan); border-radius: 6px;"></div>
      </div>
      
      <div class="flex-row justify-between w-full" style="font-size: 13px;">
        <span class="font-bold text-cyan">$${squad.currentSaved} saved</span>
        <span class="text-muted">$${squad.goalAmount} goal · ${squad.daysLeft} days left</span>
      </div>
    </div>

    <!-- LEADERBOARD -->
    <div class="flex-col" style="gap: 12px; margin-bottom: 24px;">
      ${squad.members.map(member => `
        <div class="card flex-row" style="padding: 14px 16px; justify-content: space-between; align-items: center; border: 2px solid ${member.rank === 1 ? 'var(--lime)' : 'transparent'};">
          <div class="flex-row" style="gap: 16px; flex: 1;">
            <div class="syne-900" style="font-size: 18px; color: ${member.rank === 1 ? 'var(--lime)' : 'var(--muted)'}; width: 16px;">
              ${member.rank}
            </div>
            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(${member.color}); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; color: ${['--lime', '--cyan'].includes(member.color) ? '#0D0D0D' : '#fff'};">
              ${member.initials}
            </div>
            <div class="flex-col" style="flex: 1;">
              <div class="font-bold" style="font-size: 15px;">${member.name} ${member.rank === 1 ? '👑' : ''}</div>
              <div style="height: 4px; background: var(--border); border-radius: 2px; width: 100%; margin: 6px 0;">
                <div style="height: 100%; width: ${Math.round((member.amount / 600) * 100)}%; background: var(${member.rank === 1 ? '--lime' : '--cyan'}); border-radius: 2px;"></div>
              </div>
              <div class="text-muted" style="font-size: 11px;">${member.status}</div>
            </div>
          </div>
          <div class="syne-900" style="font-size: 17px; color: ${member.rank === 1 ? 'var(--lime)' : 'inherit'};">
            $${member.amount}
          </div>
        </div>
      `).join('')}
    </div>

    <!-- INVITE CARD -->
    <button class="card flex-col align-center" style="padding: 20px; border: 2px dashed var(--border); justify-content: center; width: 100%; background: transparent; cursor: pointer;">
      <div style="font-size: 24px; margin-bottom: 8px;">➕</div>
      <div class="font-bold" style="font-size: 14px;">Invite a friend</div>
      <div class="text-muted text-sm">Share the link, build the bag</div>
    </button>
  `;
}

export function setupSquad(state) {
  // Add interactivity if needed
}
