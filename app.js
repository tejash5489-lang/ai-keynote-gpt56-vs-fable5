(() => {
  'use strict';

  const chapters = Array.from(document.querySelectorAll('.chapter'));
  const sectionLabel = document.getElementById('sectionLabel');
  const progressFill = document.getElementById('progressFill');

  const state = { chapter: 0, beat: 0 };

  // Precompute max beat index per chapter by scanning [data-beat] elements.
  const maxBeat = chapters.map(ch => {
    const beats = Array.from(ch.querySelectorAll('[data-beat]')).map(el => parseInt(el.dataset.beat, 10));
    return beats.length ? Math.max(...beats) : 0;
  });

  const stepsPerChapter = maxBeat.map(m => m + 1);
  const totalSteps = stepsPerChapter.reduce((a, b) => a + b, 0);

  function currentAbsoluteStep() {
    let sum = 0;
    for (let i = 0; i < state.chapter; i++) sum += stepsPerChapter[i];
    return sum + state.beat + 1;
  }

  function render() {
    chapters.forEach((ch, i) => {
      const active = i === state.chapter;
      ch.classList.toggle('active', active);
      if (active) {
        sectionLabel.textContent = ch.dataset.title || '';
        ch.querySelectorAll('[data-beat]').forEach(el => {
          const b = parseInt(el.dataset.beat, 10);
          el.classList.toggle('revealed', b <= state.beat);
        });
      }
    });
    const pct = (currentAbsoluteStep() / totalSteps) * 100;
    progressFill.style.width = pct + '%';

    if (state.chapter === 3) updateCostChart();
  }

  function next() {
    if (state.beat < maxBeat[state.chapter]) {
      state.beat++;
    } else if (state.chapter < chapters.length - 1) {
      state.chapter++;
      state.beat = 0;
    }
    render();
  }

  function prev() {
    if (state.beat > 0) {
      state.beat--;
    } else if (state.chapter > 0) {
      state.chapter--;
      state.beat = maxBeat[state.chapter];
    }
    render();
  }

  function jumpTo(n) {
    if (n < 0 || n >= chapters.length) return;
    state.chapter = n;
    state.beat = 0;
    render();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  window.addEventListener('keydown', (e) => {
    const k = e.key;
    if (['ArrowRight', 'ArrowLeft', ' ', 'Spacebar'].includes(k)) e.preventDefault();

    if (k === 'ArrowRight' || k === ' ' || k === 'Spacebar') { next(); return; }
    if (k === 'ArrowLeft') { prev(); return; }
    if (k.toLowerCase() === 'f') { toggleFullscreen(); return; }
    if (/^[0-9]$/.test(k)) { jumpTo(parseInt(k, 10)); return; }
  });

  // click zones: right 60% advances, left 20% reverses (keeps controls clickable in the middle band)
  document.getElementById('deck').addEventListener('click', (e) => {
    if (e.target.closest('button, a, .tier-card')) return;
    const x = e.clientX / window.innerWidth;
    if (x < 0.15) prev(); else next();
  });

  // ---------------- CH01: tier card pinning ----------------
  const tierCards = document.getElementById('tierCards');
  if (tierCards) {
    tierCards.addEventListener('click', (e) => {
      const card = e.target.closest('.tier-card');
      if (!card) return;
      const wasPinned = card.classList.contains('pinned');
      tierCards.querySelectorAll('.tier-card').forEach(c => c.classList.remove('pinned'));
      if (!wasPinned) {
        card.classList.add('pinned');
        tierCards.classList.add('has-pin');
      } else {
        tierCards.classList.remove('has-pin');
      }
    });
  }

  // ---------------- generic accordions ----------------
  document.querySelectorAll('.accordion-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const acc = btn.closest('.accordion');
      const open = acc.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // ---------------- CH03: cost switch + bars ----------------
  const costSwitch = document.getElementById('costSwitch');
  const costChart = document.getElementById('costChart');
  let costMode = 'input';

  function updateCostChart() {
    if (!costChart) return;
    const fills = Array.from(costChart.querySelectorAll('.bar-fill'));
    const values = fills.map(f => parseFloat(f.dataset[costMode]));
    const max = Math.max(...values);
    fills.forEach(f => {
      const v = parseFloat(f.dataset[costMode]);
      const w = (v / max) * 100;
      f.style.width = w + '%';
      f.setAttribute('data-tip', '$' + v + ' / MTok · ' + (costMode === 'input' ? 'input' : 'output'));
      const row = f.closest('.bar-row');
      const valueEl = row.querySelector('.bar-value');
      if (valueEl) valueEl.textContent = '$' + v;
    });
  }

  if (costSwitch) {
    costSwitch.addEventListener('click', (e) => {
      const btn = e.target.closest('.seg-btn');
      if (!btn) return;
      costSwitch.querySelectorAll('.seg-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      costMode = btn.dataset.mode;
      updateCostChart();
    });
  }

  // ---------------- CH04: benchmark row expand ----------------
  document.querySelectorAll('.bench-head').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.bench-row');
      const open = row.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // ---------------- CH05: opinion pills/tabs ----------------
  const opinionPills = document.getElementById('opinionPills');
  if (opinionPills) {
    opinionPills.addEventListener('click', (e) => {
      const pill = e.target.closest('.pill');
      if (!pill) return;
      const idx = pill.dataset.panel;
      opinionPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      document.querySelectorAll('.opinion-panel').forEach(p => {
        p.classList.toggle('active', p.dataset.panel === idx);
      });
    });
  }

  // ---------------- CH06: recommendation toggle ----------------
  const recoToggle = document.getElementById('recoToggle');
  const recoText = document.getElementById('recoText');
  const recoCopy = {
    coding: 'Coding-heavy, cost-sensitive, high-volume agents → <strong>GPT-5.6 Terra or Luna</strong>. Hardest single agentic-coding runs → <strong>Sol</strong>, cheaper than Fable 5 at similar Coding Agent Index scores.',
    knowledge: 'Long-horizon knowledge work, multi-day autonomy, highest raw Intelligence Index → <strong>Claude Fable 5</strong>. You are paying 2–3× Sol’s rate for that ceiling and the longest unattended runs.'
  };
  if (recoToggle) {
    recoToggle.addEventListener('click', (e) => {
      const btn = e.target.closest('.seg-btn');
      if (!btn) return;
      recoToggle.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      recoText.innerHTML = recoCopy[btn.dataset.reco];
    });
  }

  render();
})();
