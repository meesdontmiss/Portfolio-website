const DEFAULT_RAMP = " .:-=+*#%@";
const MODES = {
  plasma(sample, c) {
    const v =
      Math.sin(sample.x * 3.2 + c.t * 1.1) +
      Math.sin(sample.y * 4.1 - c.t * 0.9) +
      Math.sin((sample.x + sample.y) * 5.4 + c.t * 0.7);
    return 0.5 + v * 0.16;
  },
  spiral(sample, c) {
    const arms = Math.sin(sample.r * 13.5 - sample.a * 5.0 + c.t * 1.6);
    const rings = Math.sin(sample.r * 24.0 + c.t * 0.55);
    return 0.52 + arms * 0.28 + rings * 0.12;
  },
  metaballs(sample, c) {
    const ax = Math.sin(c.t * 0.7) * 0.48;
    const ay = Math.cos(c.t * 0.53) * 0.34;
    const bx = Math.cos(c.t * 0.41 + 2.1) * 0.56;
    const by = Math.sin(c.t * 0.62 + 1.4) * 0.42;
    const cx = Math.sin(c.t * 0.31 + 4.0) * 0.38;
    const cy = Math.cos(c.t * 0.49 + 3.2) * 0.48;
    const da = 0.085 / ((sample.x - ax) ** 2 + (sample.y - ay) ** 2 + 0.035);
    const db = 0.07 / ((sample.x - bx) ** 2 + (sample.y - by) ** 2 + 0.032);
    const dc = 0.055 / ((sample.x - cx) ** 2 + (sample.y - cy) ** 2 + 0.03);
    return Math.min(1, (da + db + dc) * 0.34);
  },
  grid(sample, c) {
    const x = sample.x * c.cosT - sample.y * c.sinT;
    const y = sample.x * c.sinT + sample.y * c.cosT;
    const gx = Math.abs(Math.sin(x * 12.0));
    const gy = Math.abs(Math.sin(y * 12.0));
    const axis = Math.max(0, 1 - Math.min(gx, gy) * 8.0);
    const pulse = Math.sin((x + y) * 4.0 + c.t * 1.2) * 0.18;
    return 0.2 + axis * 0.72 + pulse;
  },
  tunnel(sample, c) {
    const depth = Math.sin(9.0 / (sample.r + 0.22) + sample.a * 4.0 + c.t * 2.1);
    const spokes = Math.sin(sample.a * 14.0 + c.t * 0.9);
    return 0.48 + depth * 0.28 + spokes * 0.12;
  },
  moire(sample, c) {
    const p = sample.x * c.cosT + sample.y * c.sinT;
    const q = -sample.x * c.sinT + sample.y * c.cosT;
    return 0.5 + Math.sin(p * 18.0 + c.t) * 0.23 + Math.sin(q * 21.0 - c.t * 0.83) * 0.23;
  },
  signal(sample, c) {
    const pulse = Math.max(0, 1 - Math.abs(sample.y - Math.sin(sample.x * 5.8 + c.t * 1.8) * 0.16) * 10.0);
    const band = Math.max(0, 1 - Math.abs(sample.y + 0.36 + Math.sin(sample.x * 2.3 - c.t) * 0.045) * 28.0);
    const barId = Math.floor((sample.x + 1.0) * 16.0);
    const barCenter = -0.82 + barId * 0.105;
    const candleHeight = 0.15 + Math.abs(Math.sin(barId * 1.91 + c.t * 0.85 + c.seed)) * 0.38;
    const candleBody = Math.abs(sample.x - barCenter) < 0.018 && Math.abs(sample.y + 0.08) < candleHeight;
    const candleWick = Math.abs(sample.x - barCenter) < 0.006 && Math.abs(sample.y + 0.08) < candleHeight + 0.11;
    return 0.18 + pulse * 0.48 + band * 0.34 + (candleBody ? 0.62 : 0) + (candleWick ? 0.28 : 0);
  },
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized.length === 3
    ? normalized.split("").map((char) => char + char).join("")
    : normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function makeRampPalette(palette, rampLength) {
  const stops = (Array.isArray(palette) && palette.length ? palette : ["#5fe7ff", "#bdff5a"]).map(hexToRgb);
  const colors = new Array(rampLength);

  for (let i = 0; i < rampLength; i += 1) {
    const p = rampLength <= 1 ? 1 : i / (rampLength - 1);
    const scaled = p * (stops.length - 1);
    const left = Math.floor(scaled);
    const right = Math.min(stops.length - 1, left + 1);
    const mix = scaled - left;
    const a = stops[left];
    const b = stops[right];
    const alpha = 0.12 + p * 0.56;
    colors[i] = `rgba(${Math.round(a.r + (b.r - a.r) * mix)}, ${Math.round(a.g + (b.g - a.g) * mix)}, ${Math.round(a.b + (b.b - a.b) * mix)}, ${alpha})`;
  }

  return colors;
}

function createGlyphAtlas(ramp, palette, cellW, cellH) {
  const atlas = document.createElement("canvas");
  const ctx = atlas.getContext("2d");
  const atlasCellW = Math.ceil(cellW * 1.4);
  const atlasCellH = Math.ceil(cellH * 1.4);
  const colors = makeRampPalette(palette, ramp.length);

  atlas.width = atlasCellW * ramp.length;
  atlas.height = atlasCellH;
  ctx.clearRect(0, 0, atlas.width, atlas.height);
  ctx.font = `${Math.max(10, Math.floor(cellH * 0.72))}px ui-monospace, SFMono-Regular, Consolas, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < ramp.length; i += 1) {
    ctx.fillStyle = colors[i];
    ctx.fillText(ramp[i], i * atlasCellW + atlasCellW / 2, atlasCellH / 2);
  }

  return { atlas, atlasCellW, atlasCellH };
}

export function createAsciiShader({
  canvas,
  mode = "signal",
  palette = ["#5fe7ff", "#bdff5a"],
  density = 1,
  speed = 1,
  seed = 1,
  ramp = DEFAULT_RAMP,
} = {}) {
  const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
  const state = {
    mode,
    palette,
    speed,
    seed,
    ramp,
    width: 1,
    height: 1,
    dpr: 1,
    cols: 1,
    rows: 1,
    cellW: 14,
    cellH: 17,
    qualityScale: 1,
    raf: 0,
    running: false,
    hidden: document.hidden,
    lastTime: 0,
    time: 0,
    frameAvg: 16,
    slowFrames: 0,
    fastFrames: 0,
    brightness: new Float32Array(1),
    glyphs: new Uint8Array(1),
    xs: new Float32Array(1),
    ys: new Float32Array(1),
    radii: new Float32Array(1),
    angles: new Float32Array(1),
    noise: new Float32Array(1),
    atlas: null,
    sample: { x: 0, y: 0, r: 0, a: 0, n: 0 },
    constants: { t: 0, seed, sinT: 0, cosT: 1 },
  };

  const rebuildAtlas = () => {
    state.atlas = createGlyphAtlas(state.ramp, state.palette, state.cellW, state.cellH);
  };

  const configureGrid = () => {
    const base = clamp(15 / Math.max(0.55, density) * state.qualityScale, 11, 28);
    state.cellW = Math.round(base);
    state.cellH = Math.round(base * 1.18);
    state.cols = Math.max(1, Math.ceil(state.width / state.cellW));
    state.rows = Math.max(1, Math.ceil(state.height / state.cellH));

    const total = state.cols * state.rows;
    state.brightness = new Float32Array(total);
    state.glyphs = new Uint8Array(total);
    state.xs = new Float32Array(total);
    state.ys = new Float32Array(total);
    state.radii = new Float32Array(total);
    state.angles = new Float32Array(total);
    state.noise = new Float32Array(total);

    let index = 0;
    for (let row = 0; row < state.rows; row += 1) {
      const y = ((row + 0.5) / state.rows) * 2 - 1;
      for (let col = 0; col < state.cols; col += 1) {
        const x = ((col + 0.5) / state.cols) * 2 - 1;
        const hash = Math.sin((col * 127.1 + row * 311.7 + state.seed * 19.19) * 43758.5453);
        state.xs[index] = x;
        state.ys[index] = y;
        state.radii[index] = Math.hypot(x, y);
        state.angles[index] = Math.atan2(y, x);
        state.noise[index] = hash - Math.floor(hash);
        index += 1;
      }
    }

    rebuildAtlas();
  };

  const resize = () => {
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.width = Math.max(1, window.innerWidth);
    state.height = Math.max(1, window.innerHeight);
    canvas.width = Math.floor(state.width * state.dpr);
    canvas.height = Math.floor(state.height * state.dpr);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    configureGrid();
  };

  const adaptQuality = () => {
    if (state.frameAvg > 20) {
      state.slowFrames += 1;
      state.fastFrames = 0;
      if (state.slowFrames > 30 && state.qualityScale < 2.2) {
        state.qualityScale *= 1.14;
        state.slowFrames = 0;
        configureGrid();
      }
      return;
    }

    if (state.frameAvg < 13 && state.qualityScale > 1.02) {
      state.fastFrames += 1;
      state.slowFrames = 0;
      if (state.fastFrames > 180) {
        state.qualityScale = Math.max(1, state.qualityScale / 1.08);
        state.fastFrames = 0;
        configureGrid();
      }
      return;
    }

    state.slowFrames = 0;
    state.fastFrames = 0;
  };

  const render = (timestamp) => {
    if (!state.running || state.hidden) return;

    if (!state.lastTime) state.lastTime = timestamp;
    const dt = clamp(timestamp - state.lastTime, 0, 50);
    state.lastTime = timestamp;
    state.time += dt * 0.001 * state.speed;
    state.frameAvg = state.frameAvg * 0.92 + dt * 0.08;

    const modeFn = MODES[state.mode] || MODES.signal;
    const constants = state.constants;
    constants.t = state.time;
    constants.seed = state.seed;
    constants.sinT = Math.sin(state.time * 0.32);
    constants.cosT = Math.cos(state.time * 0.32);

    ctx.fillStyle = state.mode === "spiral" ? "#060806" : "#050708";
    ctx.fillRect(0, 0, state.width, state.height);

    const rampMax = state.ramp.length - 1;
    const sample = state.sample;
    const total = state.cols * state.rows;

    for (let i = 0; i < total; i += 1) {
      sample.x = state.xs[i];
      sample.y = state.ys[i];
      sample.r = state.radii[i];
      sample.a = state.angles[i];
      sample.n = state.noise[i];

      const vignette = clamp(1.12 - sample.r * 0.34, 0.38, 1);
      const brightness = clamp(modeFn(sample, constants) * vignette, 0, 1);
      const glyph = brightness < 0.11 ? 0 : Math.min(rampMax, Math.floor(brightness * rampMax));
      state.brightness[i] = brightness;
      state.glyphs[i] = glyph;
    }

    const { atlas, atlasCellW, atlasCellH } = state.atlas;
    for (let row = 0, i = 0; row < state.rows; row += 1) {
      const dy = row * state.cellH;
      for (let col = 0; col < state.cols; col += 1, i += 1) {
        const glyph = state.glyphs[i];
        if (glyph === 0) continue;
        ctx.drawImage(
          atlas,
          glyph * atlasCellW,
          0,
          atlasCellW,
          atlasCellH,
          col * state.cellW,
          dy,
          state.cellW,
          state.cellH
        );
      }
    }

    adaptQuality();
    state.raf = requestAnimationFrame(render);
  };

  const pause = () => {
    state.running = false;
    if (state.raf) cancelAnimationFrame(state.raf);
    state.raf = 0;
  };

  const resume = () => {
    if (state.running || state.hidden) return;
    state.running = true;
    state.lastTime = 0;
    state.raf = requestAnimationFrame(render);
  };

  const onVisibilityChange = () => {
    state.hidden = document.hidden;
    if (state.hidden) {
      pause();
      state.hidden = true;
    } else {
      state.hidden = false;
      resume();
    }
  };

  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVisibilityChange);
  resume();

  return {
    pause,
    resume,
    resize,
    setMode(nextMode) {
      state.mode = MODES[nextMode] ? nextMode : "signal";
    },
    setPalette(nextPalette) {
      state.palette = nextPalette;
      rebuildAtlas();
    },
    destroy() {
      pause();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    },
  };
}
