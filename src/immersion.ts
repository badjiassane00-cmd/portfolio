import { projects, technologyGroups } from './model/portfolio';
import { getLocale } from './i18n';

interface Scene {
  kicker: string;
  title: string;
  description: string;
  actionLabel: string;
  destination: string;
  en: { kicker: string; title: string; description: string; actionLabel: string };
}

const scenes: Scene[] = [
  { kicker: '01 / IDENTITÉ', title: 'Assane Badji', description: 'Développeur Web & Mobile. Bienvenue dans mon univers numérique.', actionLabel: 'Découvrir mon parcours', destination: '#apropos', en: { kicker: '01 / IDENTITY', title: 'Assane Badji', description: 'Web & Mobile Developer. Welcome to my digital world.', actionLabel: 'Explore my background' } },
  { kicker: '02 / PRÉSENTATION', title: 'Du besoin à l’expérience', description: 'Écouter, structurer, construire : chaque projet avance avec un objectif clair.', actionLabel: 'Découvrir mon parcours', destination: '#apropos', en: { kicker: '02 / APPROACH', title: 'From need to experience', description: 'Listen, structure, build: every project moves forward with a clear goal.', actionLabel: 'Explore my background' } },
  { kicker: '03 / EXPERTISES', title: 'Du Web au Mobile', description: 'Deux terrains complémentaires, une même attention portée aux usages.', actionLabel: 'Voir mes compétences', destination: '#competences', en: { kicker: '03 / EXPERTISE', title: 'From Web to Mobile', description: 'Two complementary areas, with the same attention to how people use them.', actionLabel: 'View my skills' } },
  { kicker: '04 / PROJETS', title: 'Des idées en orbite', description: 'Des projets en démonstration et des études de réalisation. Choisissez un projet pour découvrir son contexte et ses fonctionnalités.', actionLabel: 'Parcourir les projets', destination: '#projets', en: { kicker: '04 / PROJECTS', title: 'Ideas in orbit', description: 'Live demos and project overviews. Choose a project to explore its context and features.', actionLabel: 'Browse projects' } },
  { kicker: '05 / STUDIO NUMÉRIQUE', title: 'Tout est connecté', description: 'Interfaces, logique applicative, services et données composent les systèmes que je conçois.', actionLabel: 'Explorer les outils', destination: '#competences', en: { kicker: '05 / DIGITAL STUDIO', title: 'Everything is connected', description: 'Interfaces, application logic, services and data form the systems I build.', actionLabel: 'Explore the toolkit' } },
  { kicker: '06 / CONTACT', title: 'La suite, ensemble', description: 'Un projet, un stage ou une collaboration ? Je serais heureux d’en parler.', actionLabel: 'M’écrire directement', destination: 'mailto:badjiassane00@gmail.com', en: { kicker: '06 / CONTACT', title: 'What comes next, together', description: 'A project, internship or collaboration? I would be glad to talk.', actionLabel: 'Email me directly' } },
];

const vertexSource = `
precision mediump float;
attribute vec3 aPosition;
attribute vec4 aColor;
uniform float uCameraZ;
uniform float uLookX;
uniform float uLookY;
uniform float uAspect;
uniform float uPointScale;
uniform float uTime;
uniform float uIsPoint;
varying vec4 vColor;
void main() {
  vec3 p = aPosition - vec3(uLookX * 0.48, uLookY * 0.32, uCameraZ);
  float yaw = uLookX * 0.16;
  float x = p.x * cos(yaw) - p.z * sin(yaw);
  float z = p.x * sin(yaw) + p.z * cos(yaw);
  p.x = x;
  p.z = z;
  float pitch = uLookY * 0.12;
  float y = p.y * cos(pitch) - p.z * sin(pitch);
  p.z = p.y * sin(pitch) + p.z * cos(pitch);
  p.y = y;
  p.xy *= 1.0 + sin(uTime * 0.75 + aPosition.z * 0.22) * 0.004;
  float depth = -p.z;
  float focal = 1.18;
  float nearClip = 0.1;
  float farClip = 80.0;
  if (depth <= nearClip) {
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
    gl_PointSize = 1.0;
    vColor = aColor;
    return;
  }
  float clipZ = ((farClip + nearClip) / (farClip - nearClip)) * depth - ((2.0 * farClip * nearClip) / (farClip - nearClip));
  gl_Position = vec4(p.x * focal / uAspect, p.y * focal, clipZ, depth);
  gl_PointSize = uIsPoint > 0.5 ? clamp(uPointScale * (38.0 / depth), 1.0, 6.0) : 1.0;
  vColor = aColor;
}`;

const fragmentSource = `
precision mediump float;
uniform float uIsPoint;
varying vec4 vColor;
void main() {
  float alpha = vColor.a;
  if (uIsPoint > 0.5) {
    float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
    alpha *= 1.0 - smoothstep(0.25, 0.5, distanceFromCenter);
  }
  gl_FragColor = vec4(vColor.rgb, alpha);
}`;

type Vector3 = [number, number, number];
type Color = [number, number, number, number];

class WireframeWorld {
  private readonly gl: WebGLRenderingContext;
  private readonly program: WebGLProgram;
  private readonly linePositions: number[] = [];
  private readonly lineColors: number[] = [];
  private readonly pointPositions: number[] = [];
  private readonly pointColors: number[] = [];
  private readonly buffers: { linePosition: WebGLBuffer; lineColor: WebGLBuffer; pointPosition: WebGLBuffer; pointColor: WebGLBuffer };
  private readonly uniforms: { cameraZ: WebGLUniformLocation; lookX: WebGLUniformLocation; lookY: WebGLUniformLocation; aspect: WebGLUniformLocation; pointScale: WebGLUniformLocation; time: WebGLUniformLocation; isPoint: WebGLUniformLocation };
  private readonly locations: { position: number; color: number };

  constructor(private readonly canvas: HTMLCanvasElement, private readonly lowPower: boolean) {
    const context = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!context) throw new Error('WebGL indisponible');
    this.gl = context;
    this.program = this.createProgram(vertexSource, fragmentSource);
    const gl = this.gl;
    const getBuffer = (): WebGLBuffer => {
      const buffer = gl.createBuffer();
      if (!buffer) throw new Error('Création du buffer WebGL impossible');
      return buffer;
    };
    this.buffers = { linePosition: getBuffer(), lineColor: getBuffer(), pointPosition: getBuffer(), pointColor: getBuffer() };
    const uniform = (name: string): WebGLUniformLocation => {
      const value = gl.getUniformLocation(this.program, name);
      if (!value) throw new Error(`Uniform WebGL manquant: ${name}`);
      return value;
    };
    this.uniforms = { cameraZ: uniform('uCameraZ'), lookX: uniform('uLookX'), lookY: uniform('uLookY'), aspect: uniform('uAspect'), pointScale: uniform('uPointScale'), time: uniform('uTime'), isPoint: uniform('uIsPoint') };
    this.locations = { position: gl.getAttribLocation(this.program, 'aPosition'), color: gl.getAttribLocation(this.program, 'aColor') };
    this.createGeometry();
    this.upload(this.buffers.linePosition, this.linePositions);
    this.upload(this.buffers.lineColor, this.lineColors);
    this.upload(this.buffers.pointPosition, this.pointPositions);
    this.upload(this.buffers.pointColor, this.pointColors);
    gl.useProgram(this.program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0.015, 0.02, 0.03, 0);
  }

  resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, this.lowPower ? 0.85 : window.matchMedia('(max-width: 700px)').matches ? 1 : 1.5);
    const width = Math.max(1, Math.floor(this.canvas.clientWidth * dpr));
    const height = Math.max(1, Math.floor(this.canvas.clientHeight * dpr));
    if (this.canvas.width === width && this.canvas.height === height) return;
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
  }

  render(cameraScene: number, lookX: number, lookY: number, time: number): void {
    const gl = this.gl;
    this.resize();
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(this.program);
    gl.uniform1f(this.uniforms.cameraZ, -cameraScene * 4.2);
    gl.uniform1f(this.uniforms.lookX, lookX);
    gl.uniform1f(this.uniforms.lookY, lookY);
    gl.uniform1f(this.uniforms.aspect, this.canvas.width / Math.max(1, this.canvas.height));
    gl.uniform1f(this.uniforms.pointScale, Math.min(window.devicePixelRatio || 1, 1.5));
    gl.uniform1f(this.uniforms.time, time);

    this.bind(this.buffers.linePosition, this.locations.position, 3);
    this.bind(this.buffers.lineColor, this.locations.color, 4);
    gl.uniform1f(this.uniforms.isPoint, 0);
    gl.drawArrays(gl.LINES, 0, this.linePositions.length / 3);

    this.bind(this.buffers.pointPosition, this.locations.position, 3);
    this.bind(this.buffers.pointColor, this.locations.color, 4);
    gl.uniform1f(this.uniforms.isPoint, 1);
    gl.drawArrays(gl.POINTS, 0, this.pointPositions.length / 3);
  }

  dispose(): void {
    const gl = this.gl;
    Object.values(this.buffers).forEach((buffer) => gl.deleteBuffer(buffer));
    gl.deleteProgram(this.program);
  }

  private upload(buffer: WebGLBuffer, values: number[]): void {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(values), this.gl.STATIC_DRAW);
  }

  private bind(buffer: WebGLBuffer, location: number, size: number): void {
    const gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 0, 0);
  }

  private createProgram(vertex: string, fragment: string): WebGLProgram {
    const gl = this.gl;
    const compile = (type: number, source: string): WebGLShader => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error('Création du shader impossible');
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const issue = gl.getShaderInfoLog(shader) ?? 'Erreur de compilation shader';
        gl.deleteShader(shader);
        throw new Error(issue);
      }
      return shader;
    };
    const program = gl.createProgram();
    if (!program) throw new Error('Création du programme WebGL impossible');
    const vertexShader = compile(gl.VERTEX_SHADER, vertex);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, fragment);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const issue = gl.getProgramInfoLog(program) ?? 'Lien du programme WebGL impossible';
      gl.deleteProgram(program);
      throw new Error(issue);
    }
    return program;
  }

  private createGeometry(): void {
    const colors: Color[] = [
      [0.83, 0.72, 0.49, 0.82], [0.43, 0.73, 0.84, 0.78], [0.76, 0.61, 0.88, 0.78],
      [0.87, 0.57, 0.47, 0.78], [0.66, 0.78, 0.55, 0.82], [0.88, 0.76, 0.57, 0.88],
    ];
    const centers: Vector3[] = [
      [0, 0.05, -3.8], [0.62, 0.08, -8], [-0.56, -0.06, -12.2],
      [0.36, 0.03, -16.4], [0, -0.08, -20.6], [-0.42, 0.05, -24.8],
    ];
    for (let scene = 0; scene < centers.length; scene += 1) {
      const center = centers[scene];
      const color = colors[scene] ?? colors[0]!;
      this.addSphere(center, 0.88, color, 9, 18);
      this.addEllipse(center, 1.12, 0.36, color, 60, 0.18, 0.42);
      this.addEllipse([center[0], center[1], center[2] - 0.12], 1.1, 1.1, [color[0], color[1], color[2], 0.22], 64, 0, 0);
      this.addPoint(center, [color[0], color[1], color[2], 0.9]);

      if (scene === 0) this.addDial(center, color);
      if (scene === 1) { this.addCube(center, 0.38, color); this.addEllipse([center[0], center[1], center[2] - 0.8], 0.72, 0.44, color, 48, 0.22, 0.12); }
      if (scene === 2) { this.addCube(center, 0.36, color); this.addPhone([center[0] + 0.58, center[1], center[2]], color); }
      if (scene === 3) this.addProjectConstellation(center, color);
      if (scene === 4) this.addArchitecture(center, color);
      if (scene === 5) this.addContactRings(center, color);
    }

    for (let scene = 0; scene < centers.length - 1; scene += 1) {
      const from = centers[scene]!;
      const to = centers[scene + 1]!;
      let previous: Vector3 = [from[0], from[1], from[2] - 1.2];
      for (let step = 1; step <= 30; step += 1) {
        const progress = step / 30;
        const next: Vector3 = [
          from[0] + (to[0] - from[0]) * progress + Math.sin(progress * Math.PI * 3) * 0.13,
          from[1] + (to[1] - from[1]) * progress + Math.cos(progress * Math.PI * 2) * 0.11,
          from[2] - 1.2 + (to[2] - from[2] + 2.4) * progress,
        ];
        this.addLine(previous, next, [0.67, 0.64, 0.54, 0.21]);
        previous = next;
      }
    }

    let seed = 372019;
    const random = (): number => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    for (let index = 0; index < (this.lowPower ? 110 : 280); index += 1) {
      const tint = random() > 0.74 ? [0.77, 0.68, 0.48] : [0.49, 0.57, 0.61];
      this.addPoint([
        (random() - 0.5) * 19,
        (random() - 0.5) * 10,
        -0.6 - random() * 39,
      ], [tint[0]!, tint[1]!, tint[2]!, 0.2 + random() * 0.52]);
    }
  }

  private addPoint(point: Vector3, color: Color): void {
    this.pointPositions.push(...point);
    this.pointColors.push(...color);
  }

  private addLine(from: Vector3, to: Vector3, color: Color): void {
    this.linePositions.push(...from, ...to);
    this.lineColors.push(...color, ...color);
  }

  private addEllipse(center: Vector3, radiusX: number, radiusY: number, color: Color, segments: number, rotateX: number, rotateY: number): void {
    let previous: Vector3 | null = null;
    for (let index = 0; index <= segments; index += 1) {
      const angle = (index / segments) * Math.PI * 2;
      const raw: Vector3 = [Math.cos(angle) * radiusX, Math.sin(angle) * radiusY, 0];
      const aroundX = raw[1] * Math.cos(rotateX) - raw[2] * Math.sin(rotateX);
      const aroundZ = raw[1] * Math.sin(rotateX) + raw[2] * Math.cos(rotateX);
      const point: Vector3 = [
        center[0] + raw[0] * Math.cos(rotateY) + aroundZ * Math.sin(rotateY),
        center[1] + aroundX,
        center[2] - raw[0] * Math.sin(rotateY) + aroundZ * Math.cos(rotateY),
      ];
      if (previous) this.addLine(previous, point, color);
      previous = point;
    }
  }

  private addSphere(center: Vector3, radius: number, color: Color, latitudes: number, longitudes: number): void {
    for (let latitude = 1; latitude < latitudes; latitude += 1) {
      const phi = (latitude / latitudes) * Math.PI;
      const y = Math.cos(phi) * radius;
      const ring = Math.sin(phi) * radius;
      this.addEllipse([center[0], center[1] + y, center[2]], ring, ring, [color[0], color[1], color[2], color[3] * 0.55], longitudes, 0, 0);
    }
    for (let longitude = 0; longitude < longitudes; longitude += 1) {
      const angle = (longitude / longitudes) * Math.PI * 2;
      let previous: Vector3 | null = null;
      for (let step = 0; step <= latitudes * 2; step += 1) {
        const phi = (step / (latitudes * 2)) * Math.PI;
        const point: Vector3 = [
          center[0] + Math.sin(phi) * Math.cos(angle) * radius,
          center[1] + Math.cos(phi) * radius,
          center[2] + Math.sin(phi) * Math.sin(angle) * radius,
        ];
        if (previous) this.addLine(previous, point, [color[0], color[1], color[2], color[3] * 0.6]);
        previous = point;
      }
    }
  }

  private addCube(center: Vector3, size: number, color: Color): void {
    const points: Vector3[] = [];
    for (const z of [-size, size]) for (const y of [-size, size]) for (const x of [-size, size]) points.push([center[0] + x, center[1] + y, center[2] + z]);
    const edges = [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]];
    edges.forEach(([start, end]) => { const a = points[start ?? -1]; const b = points[end ?? -1]; if (a && b) this.addLine(a, b, color); });
  }

  private addDial(center: Vector3, color: Color): void {
    this.addEllipse([center[0], center[1], center[2] - 0.7], 0.59, 0.59, [color[0], color[1], color[2], 0.94], 56, 0, 0);
    this.addLine([center[0], center[1] + 0.36, center[2] - 0.69], [center[0] + 0.24, center[1] - 0.02, center[2] - 0.69], color);
    this.addLine([center[0], center[1] - 0.02, center[2] - 0.68], [center[0] - 0.2, center[1] - 0.24, center[2] - 0.68], [color[0], color[1], color[2], 0.78]);
  }

  private addPhone(center: Vector3, color: Color): void {
    const x = 0.34; const y = 0.64; const z = center[2] - 0.84;
    const a: Vector3 = [center[0] - x, center[1] - y, z];
    const b: Vector3 = [center[0] + x, center[1] - y, z];
    const c: Vector3 = [center[0] + x, center[1] + y, z];
    const d: Vector3 = [center[0] - x, center[1] + y, z];
    this.addLine(a, b, color); this.addLine(b, c, color); this.addLine(c, d, color); this.addLine(d, a, color);
    this.addEllipse([center[0], center[1] + 0.48, z], 0.055, 0.055, color, 16, 0, 0);
    this.addLine([center[0] - 0.19, center[1] - 0.43, z], [center[0] + 0.19, center[1] - 0.43, z], [color[0], color[1], color[2], 0.7]);
  }

  private addArchitecture(center: Vector3, color: Color): void {
    const nodes: Vector3[] = [[-0.57, 0.36, -0.75], [0.57, 0.36, -0.75], [-0.57, -0.36, -0.75], [0.57, -0.36, -0.75]];
    nodes.forEach(([x, y, z], index) => this.addCube([center[0] + x, center[1] + y, center[2] + z], index === 3 ? 0.2 : 0.15, [color[0], color[1], color[2], 0.86]));
    this.addLine([center[0] - 0.39, center[1] + 0.36, center[2] - 0.75], [center[0] + 0.39, center[1] + 0.36, center[2] - 0.75], color);
    this.addLine([center[0], center[1] + 0.2, center[2] - 0.75], [center[0], center[1] - 0.2, center[2] - 0.75], color);
    this.addLine([center[0] - 0.39, center[1] - 0.36, center[2] - 0.75], [center[0] + 0.39, center[1] - 0.36, center[2] - 0.75], color);
    this.addEllipse([center[0], center[1], center[2] - 0.8], 1.18, 0.68, [color[0], color[1], color[2], 0.37], 48, 0.18, 0.08);
  }

  private addProjectConstellation(center: Vector3, color: Color): void {
    const offsets: Vector3[] = [[-0.48, -0.02, -0.7], [0, 0.24, -1], [0.49, -0.06, -0.76]];
    offsets.forEach(([x, y, z], index) => this.addCube([center[0] + x, center[1] + y, center[2] + z], index === 1 ? 0.22 : 0.16, [color[0], color[1], color[2], 0.85]));
    this.addLine([center[0] - 0.29, center[1] + 0.08, center[2] - 0.78], [center[0] - 0.1, center[1] + 0.2, center[2] - 0.92], color);
    this.addLine([center[0] + 0.14, center[1] + 0.18, center[2] - 0.92], [center[0] + 0.34, center[1] + 0.02, center[2] - 0.79], color);
  }

  private addContactRings(center: Vector3, color: Color): void {
    this.addEllipse([center[0], center[1], center[2] - 0.82], 0.6, 0.6, color, 64, 0, 0);
    this.addEllipse([center[0], center[1], center[2] - 0.82], 0.82, 0.42, [color[0], color[1], color[2], 0.76], 64, 0.7, 0.55);
    this.addEllipse([center[0], center[1], center[2] - 0.82], 0.82, 0.42, [color[0], color[1], color[2], 0.62], 64, -0.7, -0.55);
  }
}

export function initImmersion(): void {
  const dialog = document.querySelector<HTMLDialogElement>('#immersion-dialog');
  const canvas = document.querySelector<HTMLCanvasElement>('#immersion-canvas');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const title = document.querySelector<HTMLElement>('#immersion-title');
  const kicker = document.querySelector<HTMLElement>('#immersion-kicker');
  const description = document.querySelector<HTMLElement>('#immersion-description');
  const number = document.querySelector<HTMLElement>('#immersion-number');
  const navigation = document.querySelector<HTMLElement>('#immersion-navigation');
  const actionRoot = document.querySelector<HTMLElement>('#immersion-actions');
  const progress = document.querySelector<HTMLElement>('#immersion-progress');
  const fallback = document.querySelector<HTMLElement>('#immersion-fallback');
  const extra = document.querySelector<HTMLElement>('#immersion-extra');
  const portrait = document.querySelector<HTMLElement>('#immersion-portrait');
  const loading = document.querySelector<HTMLElement>('#immersion-loading');
  if (!dialog || !canvas || !title || !kicker || !description || !number || !navigation || !actionRoot || !progress || !fallback || !extra || !portrait) return;

  const lowPower = (navigator.hardwareConcurrency || 8) <= 4 || ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4) <= 2;

  let scenePosition = 0;
  let currentScene = -1;
  let cameraScene = 0;
  let lookX = 0;
  let lookY = 0;
  let dragging = false;
  let pointerStartY = 0;
  let animationFrame = 0;
  let renderer: WireframeWorld | null = null;
  let failedWebgl = false;
  let resizeObserver: ResizeObserver | null = null;
  let lastFrame = 0;

  const sceneButtons = scenes.map((scene, index) => {
    const button = document.createElement('button');
    button.className = 'immersion-scene-button';
    button.type = 'button';
    button.dataset.scene = String(index);
    button.setAttribute('aria-label', getLocale() === 'en' ? `Scene ${index + 1} of ${scenes.length}: ${scene.en.title}` : `Scène ${index + 1} sur ${scenes.length} : ${scene.title}`);
    button.setAttribute('aria-pressed', 'false');
    button.innerHTML = `<span>0${index + 1}</span><i></i>`;
    navigation.append(button);
    button.addEventListener('click', () => setScene(index));
    return button;
  });

  const syncSceneContent = (index: number): void => {
    const scene = scenes[index];
    if (!scene || index === currentScene) return;
    currentScene = index;
    dialog.dataset.scene = String(index);
    portrait.classList.toggle('is-visible', index === 0);
    const copy = getLocale() === 'en' ? scene.en : scene;
    title.textContent = copy.title;
    kicker.textContent = copy.kicker;
    description.textContent = copy.description;
    extra.replaceChildren();
    number.textContent = String(index + 1).padStart(2, '0');
    progress.style.width = `${((index + 1) / scenes.length) * 100}%`;
    sceneButtons.forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-current', active);
    });
    actionRoot.replaceChildren();
    const link = document.createElement('a');
    link.className = 'immersion-primary';
    link.href = scene.destination;
    link.innerHTML = `<span>${copy.actionLabel}</span><i aria-hidden="true">↗</i>`;
    link.addEventListener('click', (event) => {
      dialog.close();
      if (scene.destination.startsWith('mailto:')) return;
      if (scene.destination === '#projets' || scene.destination === '#competences' || scene.destination === '#contact' || scene.destination === '#apropos') {
        const target = document.querySelector<HTMLElement>(scene.destination);
        if (target && !reduceMotion.matches) {
          event.preventDefault();
          window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20);
        }
      }
    });
    actionRoot.append(link);

    if (index === 2) {
      const english = getLocale() === 'en';
      const switcher = document.createElement('div');
      switcher.className = 'immersion-expertise-switch';
      const list = document.createElement('div');
      list.className = 'immersion-tech-list';
      const select = (domain: 'web' | 'mobile'): void => {
        switcher.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
          const active = button.dataset.domain === domain;
          button.classList.toggle('is-active', active);
          button.setAttribute('aria-pressed', String(active));
        });
        list.replaceChildren();
        if (domain === 'mobile') {
          description.textContent = english ? 'Mobile interfaces, touch journeys and application logic shaped around smartphone use.' : 'Interfaces mobiles, parcours tactiles et logique applicative pensés autour des usages sur smartphone.';
          (english ? ['Mobile interfaces', 'Touch journeys', 'Application logic'] : ['Interfaces mobiles', 'Parcours tactiles', 'Logique applicative']).forEach((name) => {
            const chip = document.createElement('span'); chip.textContent = name; list.append(chip);
          });
          return;
        }
        description.textContent = english ? 'Web interfaces and applications, from front end to back end, with APIs and databases.' : 'Interfaces et applications Web, du Front-End au Back-End, avec API et bases de données.';
        technologyGroups.flatMap((group) => group.items).forEach(({ name }) => {
          const chip = document.createElement('span'); chip.textContent = name; list.append(chip);
        });
      };
      (['web', 'mobile'] as const).forEach((domain) => {
        const button = document.createElement('button');
        button.type = 'button'; button.dataset.domain = domain;
        button.textContent = domain === 'web' ? (getLocale() === 'en' ? 'Web development' : 'Développement Web') : (getLocale() === 'en' ? 'Mobile development' : 'Développement Mobile');
        button.setAttribute('aria-pressed', String(domain === 'web'));
        button.addEventListener('click', () => select(domain));
        switcher.append(button);
      });
      extra.append(switcher, list);
      select('web');
    }

    if (index === 3) {
      const projectList = document.createElement('div');
      projectList.className = 'immersion-project-list';
      const orderedProjects = [...projects.filter((project) => project.url), ...projects.filter((project) => !project.url)];
      orderedProjects.forEach((project, projectIndex) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.project = project.name;
        button.innerHTML = `<span>0${projectIndex + 1}</span> ${project.name} <i aria-hidden="true">↗</i>`;
        projectList.append(button);
      });
      actionRoot.append(projectList);
    }

    if (index === 4) {
      const architecture = document.createElement('div');
      architecture.className = 'immersion-architecture';
      const architectureLabels = getLocale() === 'en' ? [['INTERFACES', 'HTML · CSS · JavaScript'], ['LOGIC', 'PHP · Laravel · Node.js'], ['SERVICES', 'APIs · applications'], ['DATA', 'MySQL · PostgreSQL']] : [['INTERFACES', 'HTML · CSS · JavaScript'], ['LOGIQUE', 'PHP · Laravel · Node.js'], ['SERVICES', 'API · applications'], ['DONNÉES', 'MySQL · PostgreSQL']];
      architectureLabels.forEach(([label, detail]) => {
        const node = document.createElement('div'); node.className = 'immersion-architecture-node';
        const heading = document.createElement('b'); heading.textContent = label ?? '';
        const content = document.createElement('span'); content.textContent = detail ?? '';
        node.append(heading, content); architecture.append(node);
      });
      extra.append(architecture);
    }
  };

  const setScene = (index: number): void => {
    scenePosition = Math.max(0, Math.min(scenes.length - 1, index));
    cameraScene = reduceMotion.matches ? scenePosition : cameraScene;
    syncSceneContent(Math.round(scenePosition));
    renderOnce();
  };

  const draw = (timestamp: number): void => {
    animationFrame = 0;
    if (!dialog.open || document.hidden) return;
    if (!reduceMotion.matches && timestamp - lastFrame < (lowPower ? 48 : 32)) {
      animationFrame = window.requestAnimationFrame(draw);
      return;
    }
    lastFrame = timestamp;
    if (reduceMotion.matches) cameraScene = scenePosition;
    else cameraScene += (scenePosition - cameraScene) * 0.065;
    if (Math.abs(cameraScene - scenePosition) < 0.002) cameraScene = scenePosition;
    renderer?.render(cameraScene, lookX, lookY, timestamp / 1000);
    if (!reduceMotion.matches) animationFrame = window.requestAnimationFrame(draw);
  };

  function renderOnce(): void {
    if (dialog?.open && !animationFrame) animationFrame = window.requestAnimationFrame(draw);
  }

  const ensureRenderer = (): void => {
    if (renderer || failedWebgl) return;
    try {
      renderer = new WireframeWorld(canvas, lowPower);
      fallback.hidden = true;
      dialog.classList.remove('webgl-fallback');
    } catch (error) {
      failedWebgl = true;
      dialog.classList.add('webgl-fallback');
      fallback.hidden = false;
      console.info('Mode immersif 2D activé : WebGL est indisponible.', error);
    }
  };

  const setSceneByDelta = (delta: number): void => {
    scenePosition = Math.max(0, Math.min(scenes.length - 1, scenePosition + delta));
    syncSceneContent(Math.round(scenePosition));
    renderOnce();
  };

  const open = (event?: Event): void => {
    event?.preventDefault();
    if (!dialog.open) dialog.showModal();
    if (loading) loading.hidden = false;
    dialog.classList.toggle('is-low-power', lowPower);
    ensureRenderer();
    if (resizeObserver) resizeObserver.observe(canvas);
    else window.addEventListener('resize', resizeCanvas);
    cameraScene = scenePosition;
    renderOnce();
    window.setTimeout(() => { if (loading) loading.hidden = true; }, 360);
  };

  const closeButtons = document.querySelectorAll<HTMLButtonElement>('[data-close-immersion]');
  window.addEventListener('portfolio:languagechange', () => {
    currentScene = -1;
    sceneButtons.forEach((button, index) => {
      const scene = scenes[index];
      if (scene) button.setAttribute('aria-label', getLocale() === 'en' ? `Scene ${index + 1} of ${scenes.length}: ${scene.en.title}` : `Scène ${index + 1} sur ${scenes.length} : ${scene.title}`);
    });
    syncSceneContent(Math.round(scenePosition));
  });
  document.querySelectorAll<HTMLButtonElement>('[data-open-immersion]').forEach((button) => button.addEventListener('click', open));
  closeButtons.forEach((button) => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    resizeObserver?.unobserve(canvas);
    if (!resizeObserver) window.removeEventListener('resize', resizeCanvas);
  });
  dialog.addEventListener('cancel', () => { if (animationFrame) window.cancelAnimationFrame(animationFrame); animationFrame = 0; });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) renderOnce(); });

  dialog.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (Math.abs(event.deltaY) > 2) setSceneByDelta(Math.max(-0.38, Math.min(0.38, event.deltaY / 650)));
  }, { passive: false });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') { event.preventDefault(); setSceneByDelta(1); }
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') { event.preventDefault(); setSceneByDelta(-1); }
  });
  canvas.addEventListener('pointerdown', (event) => {
    dragging = true;
    pointerStartY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', (event) => {
    const bounds = canvas.getBoundingClientRect();
    lookX = ((event.clientX - bounds.left) / Math.max(1, bounds.width) - 0.5) * 2;
    lookY = ((event.clientY - bounds.top) / Math.max(1, bounds.height) - 0.5) * -2;
    portrait.style.setProperty('--portrait-x', `${lookX * 9}px`);
    portrait.style.setProperty('--portrait-y', `${lookY * -7}px`);
    if (dragging && Math.abs(event.clientY - pointerStartY) > 48) {
      setSceneByDelta(event.clientY < pointerStartY ? 1 : -1);
      pointerStartY = event.clientY;
    }
    renderOnce();
  });
  canvas.addEventListener('pointerup', () => { dragging = false; });
  canvas.addEventListener('pointercancel', () => { dragging = false; });
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    renderer?.dispose();
    renderer = null;
    failedWebgl = true;
    dialog.classList.add('webgl-fallback');
    fallback.hidden = false;
  });
  canvas.addEventListener('webglcontextrestored', () => {
    failedWebgl = false;
    ensureRenderer();
    renderOnce();
  });
  reduceMotion.addEventListener('change', renderOnce);

  function resizeCanvas(): void {
    renderer?.resize();
    renderOnce();
  }

  if ('ResizeObserver' in window) resizeObserver = new ResizeObserver(resizeCanvas);
  syncSceneContent(0);
}
