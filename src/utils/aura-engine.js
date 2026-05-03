export function getAuraState(score) {
  if (score >= 80) return { label: 'Glowing Era 🌿', color: '--lime', hex: '#CCFF00' };
  if (score >= 60) return { label: 'Balanced Bestie', color: '--cyan', hex: '#00F5FF' };
  if (score >= 40) return { label: 'Soft Reset Needed', color: 'amber', hex: '#FFB800' };
  return { label: 'Red Flag Arc 🚩', color: '--pink', hex: '#FF2D78' };
}

export function calculateAura() {
  const state = window.appState;
  
  // In a real app, this would process window.appState.transactions
  // For the prototype, we derive the visual state from the mocked auraScore
  const score = state.user.auraScore;
  const aura = getAuraState(score);
  
  // Update header chip
  const headerChip = document.getElementById('header-chip');
  if (headerChip) {
    headerChip.textContent = `✦ ${aura.label.toUpperCase()}`;
    headerChip.className = `chip chip-${aura.color.replace('--', '')}`;
  }
  
  return aura;
}

export function getFinBestieMessage(state) {
  const { balance, auraScore, mathModes } = state.user;
  
  if (mathModes.girlMath) {
    return `<strong>Girl Math activated 💅</strong> Your aura is immaculate and returning that $30 Zara top means you literally made money today.`;
  }
  if (mathModes.boyMath) {
    return `<strong>Boy Math detected 🧢</strong> That $1,200 monitor is an "investment", bro. Just don't look at your Aura Score rn.`;
  }
  
  if (balance < 50) {
    return `Bestie, we have <strong>$${balance}</strong> left and the month is NOT over 💀 That Uber Eats charge is giving red flag arc energy.`;
  }
  if (auraScore >= 80) {
    return `Main character energy DETECTED — you just saved <strong>$${state.user.saved}</strong> this month 💅 The Cancun trip is basically already yours, no cap.`;
  }
  
  return `Okay so the aura is looking a little chaotic rn 🌪️ Let's slay some vampires before we buy more iced coffees.`;
}
