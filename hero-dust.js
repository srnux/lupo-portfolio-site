// <dust-canvas> — looping explosive dust plumes in dark grey. Canvas so it really animates.
(function () {
  if (customElements.get('dust-canvas')) return;

  class DustCanvas extends HTMLElement {
    connectedCallback() {
      if (this._cv) return;
      this.style.display = 'block';
      this._cv = document.createElement('canvas');
      this._cv.style.cssText = 'display:block;width:100%;height:100%';
      this.appendChild(this._cv);
      this._ctx = this._cv.getContext('2d');
      this._puffs = [];
      this._t = 0;
      this._nextBurst = 0;
      this._ro = new ResizeObserver(() => this._size());
      this._ro.observe(this);
      this._size();
      this._loop = this._loop.bind(this);
      this._raf = requestAnimationFrame(this._loop);
    }
    disconnectedCallback() {
      cancelAnimationFrame(this._raf);
      if (this._ro) this._ro.disconnect();
    }
    _size() {
      const r = this.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this._w = Math.max(1, r.width);
      this._h = Math.max(1, r.height);
      const bw = Math.round(this._w * dpr), bh = Math.round(this._h * dpr);
      if (this._cv.width === bw && this._cv.height === bh) return; // resizing clears the bitmap
      this._cv.width = bw;
      this._cv.height = bh;
      this._ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    _burst() {
      // origin biased to the right half, where the mockup's figure sits
      const ox = this._w * (0.42 + Math.random() * 0.52);
      const oy = this._h * (0.25 + Math.random() * 0.6);
      const n = 9 + Math.floor(Math.random() * 7);
      const power = 0.6 + Math.random() * 0.9;
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = (0.25 + Math.random() * 1.5) * power;
        this._puffs.push({
          x: ox + Math.cos(a) * 12,
          y: oy + Math.sin(a) * 12,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp * 0.62 - 0.18,
          r: (26 + Math.random() * 70) * power,
          grow: 0.5 + Math.random() * 1.5,
          life: 0,
          max: 150 + Math.random() * 190,
          seed: Math.random() * 6.28,
          tone: 62 + Math.floor(Math.random() * 46),
          alpha: 0.12 + Math.random() * 0.2
        });
      }
    }
    _loop() {
      const c = this._ctx;
      this._t++;
      if (this._t > this._nextBurst) {
        this._burst();
        this._nextBurst = this._t + 40 + Math.random() * 110;
      }
      c.clearRect(0, 0, this._w, this._h);
      c.fillStyle = '#0b090b';
      c.fillRect(0, 0, this._w, this._h);
      c.globalCompositeOperation = 'lighter';
      for (let i = this._puffs.length - 1; i >= 0; i--) {
        const p = this._puffs[i];
        p.life++;
        if (p.life > p.max) { this._puffs.splice(i, 1); continue; }
        const k = p.life / p.max;
        p.x += p.vx + Math.sin(p.seed + p.life * 0.02) * 0.3;
        p.y += p.vy - k * 0.22;
        p.vx *= 0.975;
        p.vy *= 0.975;
        const rad = p.r * (0.3 + p.grow * k * 1.9);
        const fade = Math.sin(Math.min(1, k * 1.1) * Math.PI) * p.alpha;
        if (fade <= 0.001) continue;
        const g = c.createRadialGradient(p.x, p.y, rad * 0.08, p.x, p.y, rad);
        const t = p.tone;
        g.addColorStop(0, 'rgba(' + t + ',' + t + ',' + (t + 4) + ',' + fade.toFixed(3) + ')');
        g.addColorStop(0.5, 'rgba(' + (t - 22) + ',' + (t - 24) + ',' + (t - 20) + ',' + (fade * 0.5).toFixed(3) + ')');
        g.addColorStop(1, 'rgba(12,10,12,0)');
        c.fillStyle = g;
        c.beginPath();
        c.arc(p.x, p.y, rad, 0, 6.2832);
        c.fill();
      }
      c.globalCompositeOperation = 'source-over';
      this._raf = requestAnimationFrame(this._loop);
    }
  }
  customElements.define('dust-canvas', DustCanvas);
})();
