import './style.css';

// Mocked Data & Global State
window.appState = {
  user: {
    name: 'Zara K.',
    initials: 'ZK',
    handle: '@zarakhan',
    balance: 342.00,
    auraScore: 82,
    streakDays: 14,
    saved: 520,
    boyMathStreak: 2,
    mathModes: {
      girlMath: false,
      boyMath: false
    }
  },
  squad: {
    goalName: '✈️ Spring Break Cancún',
    goalAmount: 2000,
    currentSaved: 1360,
    daysLeft: 18,
    members: [
      { name: 'Zara K.', initials: 'ZK', amount: 520, status: 'Savings queen 💅', color: '--lime', rank: 1 },
      { name: 'Maya J.', initials: 'MJ', amount: 340, status: 'Cut 2 subs this week ✂️', color: '--pink', rank: 2 },
      { name: 'Layla S.', initials: 'LS', amount: 280, status: 'DoorDash addict 🙈', color: '--cyan', rank: 3 },
      { name: 'Ty N.', initials: 'TN', amount: 110, status: 'We\'re rooting for you babe 💔', color: '#555555', rank: 4 }
    ]
  },
  subscriptions: [
    { id: 1, name: 'Netflix', price: 15.99, bg: '#E50914', date: 'June 3', isCancelled: false },
    { id: 2, name: 'Spotify', price: 10.99, bg: '#1DB954', date: 'June 7', isCancelled: false },
    { id: 3, name: 'Adobe CC', price: 29.99, bg: '#FF0000', date: 'June 12', isCancelled: false },
    { id: 4, name: 'Gym', price: 11.00, bg: '#333333', date: 'June 1', isCancelled: false }
  ]
};

// Screen Modules Import
import { renderHome, setupHome } from './screens/home.js';
import { renderSubs, setupSubs } from './screens/subscriptions.js';
import { renderSquad, setupSquad } from './screens/squad.js';
import { renderProfile, setupProfile } from './screens/profile.js';
import { calculateAura } from './utils/aura-engine.js';

const screens = {
  home: { render: renderHome, setup: setupHome },
  subs: { render: renderSubs, setup: setupSubs },
  squad: { render: renderSquad, setup: setupSquad },
  profile: { render: renderProfile, setup: setupProfile }
};

function navigateTo(tabId) {
  const mainContent = document.getElementById('main-content');
  
  // Render HTML
  mainContent.innerHTML = `<div class="screen active" id="screen-${tabId}">
    ${screens[tabId].render(window.appState)}
  </div>`;
  
  // Attach Event Listeners
  if (screens[tabId].setup) {
    screens[tabId].setup(window.appState);
  }

  // Update Navigation Active States
  document.querySelectorAll('.nav-item').forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Scroll to top
  mainContent.scrollTop = 0;
}

// Global Nav Setup
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const tabId = e.currentTarget.dataset.tab;
    navigateTo(tabId);
  });
});

// Initialize App
calculateAura(); // Recalculate global aura stats
navigateTo('home');
