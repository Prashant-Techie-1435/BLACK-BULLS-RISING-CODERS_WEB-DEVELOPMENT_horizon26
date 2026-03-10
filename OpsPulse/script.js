/* =====================================================
   OpsPulse – Shared JavaScript
   All shared logic: auth, scoring, theme, toast, nav
   ===================================================== */

/* ── NAMESPACE ──────────────────────────────────────── */
const OPS = (() => {

  const K = { USERS:'ops_users', SESSION:'ops_session', DATA:'ops_biz_data', THEME:'ops_theme' };

  /* ── THEME ─────────────────────────────────────────── */
  function applyTheme() {
    const t = localStorage.getItem(K.THEME) || 'dark';
    document.body.classList.toggle('light', t === 'light');
    // sync toggle button if present
    const tog = document.getElementById('themeToggle');
    if (tog) tog.classList.toggle('on', t === 'light');
  }

  function toggleTheme() {
    const isLight = document.body.classList.toggle('light');
    localStorage.setItem(K.THEME, isLight ? 'light' : 'dark');
    const tog = document.getElementById('themeToggle');
    if (tog) tog.classList.toggle('on', isLight);
  }

  /* ── SESSION / AUTH ────────────────────────────────── */
  function getSession() {
    try { return JSON.parse(sessionStorage.getItem(K.SESSION)); } catch { return null; }
  }

  function setSession(user) {
    sessionStorage.setItem(K.SESSION, JSON.stringify(user));
  }

  function clearSession() {
    sessionStorage.removeItem(K.SESSION);
  }

  function requireAuth() {
    if (!getSession()) { window.location.href = 'index.html'; }
  }

  function requireData() {
    if (!getBizData()) { window.location.href = 'data.html'; }
  }

  /* ── USER STORE ────────────────────────────────────── */
  function getUsers() {
    try { return JSON.parse(localStorage.getItem(K.USERS)) || []; } catch { return []; }
  }

  function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(K.USERS, JSON.stringify(users));
  }

  function findUser(email) {
    return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  function validateLogin(email, password) {
    const user = findUser(email);
    if (!user) return { ok: false, msg: 'No account found with this email.' };
    if (user.password !== password) return { ok: false, msg: 'Incorrect password. Try again.' };
    return { ok: true, user };
  }

  /* ── BUSINESS DATA ─────────────────────────────────── */
  function saveBizData(data) {
    localStorage.setItem(K.DATA, JSON.stringify({ ...data, ts: Date.now() }));
  }

  function getBizData() {
    try { return JSON.parse(localStorage.getItem(K.DATA)); } catch { return null; }
  }

  /* ── STRESS SCORING ENGINE ─────────────────────────── */
  /*
    Weighted composite (0–100, higher = healthier):
      Sales      35% — revenue + growth rate
      Inventory  25% — stock level + turnover
      Finance    20% — profit margin + expense ratio
      Customer   20% — satisfaction - complaint penalty
  */
  function subScores(d) {
    // SALES (0–100)
    const growth = parseFloat(d.salesGrowth) || 0;
    let sales = Math.max(0, Math.min(100, 50 + growth * 1.6));
    const rev = parseFloat(d.revenue) || 0;
    sales = Math.min(100, sales + Math.min(12, (rev / 800000) * 12));

    // INVENTORY (0–100)
    const stock    = Math.max(0, Math.min(100, parseFloat(d.stockLevel) || 0));
    const turnover = parseFloat(d.turnoverRate) || 0;
    const turnSc   = Math.min(100, (turnover / 10) * 100);
    const inventory = Math.min(100, stock * 0.6 + turnSc * 0.4);

    // FINANCE (0–100)
    const margin   = parseFloat(d.profitMargin) || 0;
    const expenses = parseFloat(d.expenses) || 1;
    const revenue  = parseFloat(d.revenue) || 1;
    const marginSc = Math.max(0, Math.min(100, margin * 2.4));
    const expRatio = Math.max(0, 1 - expenses / revenue);
    const finance  = Math.min(100, marginSc * 0.65 + expRatio * 100 * 0.35);

    // CUSTOMER (0–100)
    const sat        = parseFloat(d.satisfaction) || 0;
    const complaints = Math.max(0, parseFloat(d.complaints) || 0);
    const satSc      = (sat / 5) * 100;
    const compPenalty= Math.min(45, complaints * 0.9);
    const customer   = Math.max(0, Math.min(100, satSc - compPenalty));

    const round = v => Math.round(v * 10) / 10;
    return {
      sales:     round(sales),
      inventory: round(inventory),
      finance:   round(finance),
      customer:  round(customer),
    };
  }

  function calcStress(d) {
    const s = subScores(d);
    return Math.round((s.sales * .35 + s.inventory * .25 + s.finance * .20 + s.customer * .20) * 10) / 10;
  }

  function scoreColor(v) {
    if (v >= 70) return '#34d399';
    if (v >= 40) return '#f5a623';
    return '#f43f5e';
  }

  function scoreLabel(v) {
    if (v >= 70) return { text: '✅ Healthy', cls: 'badge-green' };
    if (v >= 40) return { text: '⚠️ Moderate', cls: 'badge-amber' };
    return { text: '🚨 Critical', cls: 'badge-rose' };
  }

  function scoreDesc(v) {
    if (v >= 70) return 'Your business is performing strongly across all domains. Keep the momentum going with regular check-ins.';
    if (v >= 40) return 'Some domains need attention. Review your weakest area to prevent decline.';
    return 'Your business is under significant stress. Immediate action required across multiple fronts.';
  }

  /* ── UTILITIES ─────────────────────────────────────── */
  function fmtINR(n) {
    return (parseFloat(n) || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  return {
    applyTheme, toggleTheme,
    getSession, setSession, clearSession, requireAuth, requireData,
    getUsers, saveUser, findUser, validateLogin,
    saveBizData, getBizData,
    subScores, calcStress, scoreColor, scoreLabel, scoreDesc,
    fmtINR, clamp,
  };
})();

/* ── TOAST ───────────────────────────────────────────── */
function toast(msg, type = 'ok', icon = '') {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div'); el.id = 'toast'; document.body.appendChild(el);
  }
  const icons = { ok: '✅', err: '❌', info: 'ℹ️', warn: '⚠️' };
  el.innerHTML = `<span class="t-icon">${icon || icons[type] || icons.ok}</span><span>${msg}</span>`;
  el.className = 'show';
  clearTimeout(el._t);
  el._t = setTimeout(() => el.className = '', 3200);
}

/* ── FORM VALIDATION HELPERS ─────────────────────────── */
function setErr(fieldId, msg) {
  const wrap = document.getElementById(fieldId + 'Wrap') || document.getElementById(fieldId)?.closest('.field');
  if (!wrap) return;
  wrap.classList.add('has-error');
  const e = wrap.querySelector('.err');
  if (e) e.textContent = msg;
}

function clearErr(fieldId) {
  const wrap = document.getElementById(fieldId + 'Wrap') || document.getElementById(fieldId)?.closest('.field');
  if (wrap) wrap.classList.remove('has-error');
}

function clearAllErrors() {
  document.querySelectorAll('.field.has-error').forEach(f => f.classList.remove('has-error'));
}

function isEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s); }

/* ── AUTO-INIT ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  OPS.applyTheme();
  initGlobalToast();
});

function initGlobalToast() {
  if (document.getElementById('toast')) return;
  const el = document.createElement('div');
  el.id = 'toast';
  document.body.appendChild(el);
}