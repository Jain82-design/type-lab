import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Crosshair,
  Eye,
  Grid3X3,
  Keyboard,
  Maximize2,
  Moon,
  MousePointer2,
  RotateCcw,
  ScanLine,
  SlidersHorizontal,
  Sparkles,
  Sun,
  X,
} from "lucide-react";

const fontOptions = [
  { label: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
  { label: "Inter", value: "'Inter', sans-serif" },
  { label: "Fraunces", value: "'Fraunces', serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "DM Serif Display", value: "'DM Serif Display', serif" },
  { label: "Bebas Neue", value: "'Bebas Neue', sans-serif" },
  { label: "Caveat", value: "'Caveat', cursive" },
  { label: "UnifrakturCook", value: "'UnifrakturCook', cursive" },
  { label: "JetBrains Mono", value: "'JetBrains Mono', monospace" },
];

const exhibits = [
  { id: "machine", number: "01", title: "TYPE MACHINE", descriptor: "Tune a living specimen.", kicker: "VARIABLE / EDIT", visual: "Aa", className: "tile-machine" },
  { id: "anatomy", number: "02", title: "ANATOMY", descriptor: "Look closer at the letter.", kicker: "FORM / STRUCTURE", visual: "g", className: "tile-anatomy" },
  { id: "classification", number: "03", title: "CLASSIFICATION", descriptor: "Map the typographic genome.", kicker: "FAMILIES / CONTEXT", visual: "Aa", className: "tile-classification" },
  { id: "psychology", number: "04", title: "PSYCHOLOGY", descriptor: "Feel the voice of a face.", kicker: "TONE / PERCEPTION", visual: "LOUD", className: "tile-psychology" },
  { id: "battle", number: "05", title: "TYPE BATTLE", descriptor: "Two faces. One message.", kicker: "COMPARE / CONTRAST", visual: "A/B", className: "tile-battle" },
  { id: "quiz", number: "06", title: "QUIZ", descriptor: "Test your eye.", kicker: "KNOWLEDGE / 06", visual: "?", className: "tile-quiz" },
  { id: "real-world", number: "07", title: "REAL WORLD", descriptor: "Type leaves the screen.", kicker: "SIGN / SIGNAL", visual: "EXIT", className: "tile-real" },
  { id: "compare", number: "08", title: "COMPARE", descriptor: "Build a specimen sheet.", kicker: "SPECIMEN / MODE", visual: "Aa Aa", className: "tile-compare" },
  { id: "mirror", number: "09", title: "TYPE MIRROR", descriptor: "Write into the reflection.", kicker: "REFLECT / REPEAT", visual: "ↄ", className: "tile-mirror" },
];

const anatomyTerms = [
  { label: "Baseline", note: "The invisible line letters sit on." },
  { label: "X-height", note: "The height of a lowercase x; it sets the texture of a line." },
  { label: "Cap height", note: "The height of a capital letter, measured from the baseline." },
  { label: "Ascender", note: "A stroke that rises above the x-height, as in h or l." },
  { label: "Descender", note: "A stroke that drops below the baseline, as in g or p." },
  { label: "Stem", note: "The main vertical or diagonal stroke of a letter." },
  { label: "Bowl", note: "The rounded stroke enclosing a counter." },
  { label: "Counter", note: "The enclosed or partly enclosed negative space inside a form." },
  { label: "Serif", note: "A finishing stroke at the end of a main stroke." },
  { label: "Shoulder", note: "The curved stroke that descends from a stem, as in n." },
  { label: "Terminal", note: "The end of a stroke without a serif." },
  { label: "Crossbar", note: "A horizontal stroke crossing the stem of a letter." },
  { label: "Aperture", note: "An opening in a partly enclosed counter." },
  { label: "Spine", note: "The central curving stroke in an S." },
  { label: "Spur", note: "A small projecting detail off a main stroke." },
];

const anatomyFeatures = [
  { label: "Baseline", type: "guide", letters: ["g", "A", "R", "S", "e"], x: 10, y: 68, side: "left", where: "the bottom line of the letter", explanation: "Letters sit on the baseline like words sit on a page. It keeps a line of type steady." },
  { label: "Cap height", type: "guide", letters: ["A", "R", "S"], x: 12, y: 11, side: "left", where: "the top of a capital letter", explanation: "Cap height is the distance from the baseline to the top of a capital letter." },
  { label: "X-height", type: "guide", letters: ["g", "e"], x: 12, y: 39, side: "left", where: "the top of the lowercase body", explanation: "X-height is the height of the main lowercase body. It changes how large and readable a typeface feels." },
  { label: "Ascender", type: "part", letters: ["g", "e"], x: 78, y: 13, side: "right", where: "the stroke rising above x-height", explanation: "An ascender is a part of a lowercase letter that reaches above its main body, like the stem of h." },
  { label: "Descender", type: "part", letters: ["g"], x: 76, y: 84, side: "right", where: "the stroke dropping below baseline", explanation: "A descender drops below the baseline. The lower loop of g is a clear example." },
  { label: "Stem", type: "part", letters: ["A", "R", "e"], x: 29, y: 44, side: "left", where: "the main vertical stroke", explanation: "The stem is the main structural stroke. It carries much of a letter's visual weight." },
  { label: "Bowl", type: "part", letters: ["g", "R"], x: 66, y: 39, side: "right", where: "the rounded enclosed stroke", explanation: "A bowl is the rounded part that wraps around a counter, as in the upper bowl of R." },
  { label: "Counter", type: "part", letters: ["g", "R", "e", "A"], x: 57, y: 48, side: "right", where: "the enclosed negative space", explanation: "A counter is the space inside a letter. Its size and shape affect readability." },
  { label: "Serif", type: "part", letters: ["A", "R", "e"], x: 32, y: 73, side: "left", where: "the finishing stroke at the foot", explanation: "A serif is a small finishing stroke. It can add rhythm and a more literary voice." },
  { label: "Terminal", type: "part", letters: ["g", "e", "S"], x: 73, y: 66, side: "right", where: "the end of a stroke", explanation: "A terminal is where a stroke ends. Its shape can feel sharp, soft, or expressive." },
  { label: "Shoulder", type: "part", letters: ["e"], x: 68, y: 31, side: "right", where: "the curved stroke of lowercase e", explanation: "The shoulder is the curved stroke that turns away from a stem and gives e its gesture." },
  { label: "Aperture", type: "part", letters: ["e", "S"], x: 61, y: 53, side: "right", where: "the opening into a counter", explanation: "An aperture is an opening. A generous aperture helps a small letter stay clear." },
  { label: "Crossbar", type: "part", letters: ["A"], x: 49, y: 47, side: "right", where: "the horizontal stroke across A", explanation: "The crossbar connects the two sides of A and changes the balance of its counter." },
  { label: "Spur", type: "part", letters: ["G", "e"], x: 33, y: 58, side: "left", where: "the small projecting detail", explanation: "A spur is a small projection off a main stroke. It adds character at the edge of a form." },
  { label: "Ear", type: "part", letters: ["g"], x: 69, y: 28, side: "right", where: "the small stroke near the top of g", explanation: "The ear is the small stroke that projects from the top of a two-storey lowercase g." },
  { label: "Ligature", type: "part", letters: ["e"], x: 43, y: 54, side: "left", where: "a joined pair of letters", explanation: "A ligature joins two letters into one drawing. It can make a pair like fi feel more fluid." },
];

const classificationData = [
  { name: "Serif", specimen: "Humanist", font: "'Fraunces', serif", description: "Small finishing strokes create a visible rhythm and help guide the eye across long reading lines.", history: "Rooted in inscriptional forms and the craft of early type foundries.", uses: "Editorial, literary, cultural, luxury", tone: "Measured / trusted" },
  { name: "Sans Serif", specimen: "Signal", font: "'Space Grotesk', sans-serif", description: "Clean terminals and open forms make a direct, contemporary voice with little visual noise.", history: "Rose with industrial modernism and the desire for functional communication.", uses: "Interfaces, wayfinding, identity systems", tone: "Clear / current" },
  { name: "Slab Serif", specimen: "Block Party", font: "'Roboto Slab', serif", description: "Heavy, squared serifs give letters a sturdy architecture and a confident footprint.", history: "Popularised for posters, advertising and the demands of nineteenth-century display type.", uses: "Headlines, packaging, posters", tone: "Solid / assertive" },
  { name: "Script", specimen: "Gesture", font: "'Caveat', cursive", description: "Connected or gestural strokes imply a hand, a moment, or a personal signature.", history: "A broad family borrowing from calligraphy, lettering and the movement of a pen.", uses: "Invitations, food, lifestyle, personal notes", tone: "Warm / intimate" },
  { name: "Display", specimen: "Impact", font: "'Bebas Neue', sans-serif", description: "Designed for attention at a specific scale; display faces can be extreme, narrow or theatrical.", history: "Built to perform in posters, headlines and spaces where a few words carry the message.", uses: "Campaigns, covers, identities, titles", tone: "Loud / memorable" },
  { name: "Blackletter", specimen: "Textura", font: "'UnifrakturCook', cursive", description: "Dense, angular forms carry historical texture and a strong sense of ceremony.", history: "Evolved from medieval manuscript hands and the earliest European printing traditions.", uses: "Music, heritage, counterculture, formal seals", tone: "Historic / charged" },
  { name: "Monospace", specimen: "Terminal", font: "'JetBrains Mono', monospace", description: "Every character occupies the same width, exposing the underlying system of the line.", history: "Associated with typewriters, code, data and the logic of machines.", uses: "Code, data, technical labels, system UI", tone: "Precise / technical" },
];

const quizQuestions = [
  { prompt: "Which term describes the enclosed negative space inside a letterform?", options: ["Counter", "Terminal", "Shoulder", "Spur"], answer: "Counter", topic: "ANATOMY" },
  { prompt: "Which classification is designed for extended reading and commonly uses finishing strokes?", options: ["Display", "Serif", "Script", "Monospace"], answer: "Serif", topic: "CLASSIFICATION" },
  { prompt: "A typeface with equal character widths is usually called…", options: ["Humanist", "Geometric", "Monospace", "Blackletter"], answer: "Monospace", topic: "TERMINOLOGY" },
  { prompt: "Which choice would most likely make a message feel intimate and handwritten?", options: ["Script", "Slab Serif", "Monospace", "Bebas Neue"], answer: "Script", topic: "PSYCHOLOGY" },
  { prompt: "The invisible line that letters sit on is the…", options: ["Cap height", "Baseline", "X-height", "Ascender"], answer: "Baseline", topic: "ANATOMY" },
];

const realWorldItems = [
  { title: "WAYFINDING", place: "London Underground · transport", type: "Sans Serif", body: "A route system is a promise: direct, legible, repeatable. The type is designed to survive distance, movement and distraction.", specimen: "→  KING'S CROSS", className: "wayfinding" },
  { title: "INDUSTRIAL", place: "Shipping crate · logistics", type: "Stencil / Display", body: "Letters become instructions. High contrast and condensed proportions let a short command travel across rough surfaces.", specimen: "HANDLE WITH CARE", className: "industrial" },
  { title: "PACKAGING", place: "Grocery shelf · retail", type: "Serif + display", body: "On a crowded shelf, type establishes a product's voice before anyone reads the details: crafted, fresh, nostalgic, fast.", specimen: "GOOD / DAILY", className: "packaging" },
  { title: "PUBLIC NOTICE", place: "Street corner · civic", type: "Bold sans", body: "Public information trades personality for clarity. Weight, spacing and contrast are forms of care.", specimen: "PLEASE LOOK BOTH WAYS", className: "notice" },
];

function RangeControl({ label, value, min, max, step = 1, onChange, suffix = "" }: { label: string; value: number; min: number; max: number; step?: number; onChange: (value: number) => void; suffix?: string }) {
  return (
    <label className="range-control">
      <span><span>{label}</span><b>{value}{suffix}</b></span>
      <input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function Specimen({ text, font, size, weight, spacing, lineHeight = 1.1, align = "left", className = "" }: { text: string; font: string; size: number | string; weight: number; spacing: number; lineHeight?: number; align?: React.CSSProperties["textAlign"]; className?: string }) {
  return <div className={`specimen ${className}`} style={{ fontFamily: font, fontSize: typeof size === "number" ? `${size}px` : size, fontWeight: weight, letterSpacing: `${spacing}px`, lineHeight, textAlign: align }}>{text}</div>;
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [view, setView] = useState<"hub" | string>("hub");
  const [theme, setTheme] = useState<"light" | "dark">(() => (localStorage.getItem("type-lab-theme") as "light" | "dark") || "light");
  const [grid, setGrid] = useState(false);
  const [toolbox, setToolbox] = useState(false);
  const [exhibition, setExhibition] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [cursorLabel, setCursorLabel] = useState("MOVE");

  const [machineText, setMachineText] = useState("Typography is a voice.");
  const [machineFont, setMachineFont] = useState(fontOptions[0].value);
  const [machineSize, setMachineSize] = useState(74);
  const [machineWeight, setMachineWeight] = useState(600);
  const [machineSpacing, setMachineSpacing] = useState(-1);
  const [machineLeading, setMachineLeading] = useState(1.05);
  const [machineAlign, setMachineAlign] = useState("left");
  const [machineCase, setMachineCase] = useState("none");
  const [machineRotate, setMachineRotate] = useState(0);

  const [anatomyLetter, setAnatomyLetter] = useState("g");
  const [anatomyTerm, setAnatomyTerm] = useState("Counter");
  const [anatomyMode, setAnatomyMode] = useState<"explore" | "guided">("explore");
  const [anatomyLabels, setAnatomyLabels] = useState(true);
  const [anatomyFeature, setAnatomyFeature] = useState("Counter");
  const [classification, setClassification] = useState(0);
  const [mood, setMood] = useState("trustworthy");
  const [psychFont, setPsychFont] = useState("'Fraunces', serif");
  const [psychWeight, setPsychWeight] = useState(500);
  const [psychSpacing, setPsychSpacing] = useState(-2);
  const [psychSize, setPsychSize] = useState(100);
  const [battleA, setBattleA] = useState("'Fraunces', serif");
  const [battleB, setBattleB] = useState("'Space Grotesk', sans-serif");
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizExplanation, setQuizExplanation] = useState("");
  const [realWorld, setRealWorld] = useState(0);
  const [compareA, setCompareA] = useState("'Fraunces', serif");
  const [compareB, setCompareB] = useState("'Space Grotesk', sans-serif");
  const [compareText, setCompareText] = useState("The quick brown fox");
  const [compareSize, setCompareSize] = useState(56);
  const [compareWeight, setCompareWeight] = useState(500);
  const [compareSpacing, setCompareSpacing] = useState(0);
  const [mirrorText, setMirrorText] = useState(() => localStorage.getItem("type-lab-mirror-text") || "Look again.");
  const [mirrorFont, setMirrorFont] = useState(() => localStorage.getItem("type-lab-mirror-font") || "'Playfair Display', serif");
  const [mirrorSize, setMirrorSize] = useState(() => Number(localStorage.getItem("type-lab-mirror-size")) || 84);
  const [mirrorSpacing, setMirrorSpacing] = useState(() => Number(localStorage.getItem("type-lab-mirror-spacing")) || 0);
  const [mirrorRotation, setMirrorRotation] = useState(() => Number(localStorage.getItem("type-lab-mirror-rotation")) || 0);
  const [mirrorX, setMirrorX] = useState(() => localStorage.getItem("type-lab-mirror-x") !== "false");
  const [mirrorY, setMirrorY] = useState(() => localStorage.getItem("type-lab-mirror-y") !== "false");
  const [mirrorIntensity, setMirrorIntensity] = useState(() => Number(localStorage.getItem("type-lab-mirror-intensity")) || 45);
  const [typeTestText, setTypeTestText] = useState("Typography is a voice.");
  const [typeTestFont, setTypeTestFont] = useState(fontOptions[0].value);
  const [typeTestSize, setTypeTestSize] = useState(74);
  const [typeTestWeight, setTypeTestWeight] = useState(600);
  const [typeTestSpacing, setTypeTestSpacing] = useState(-1);
  const [typeTestLeading, setTypeTestLeading] = useState(1.05);
  const [typeTestAlign, setTypeTestAlign] = useState("left");
  const [typeTestCase, setTypeTestCase] = useState("none");
  const [typeTestItalic, setTypeTestItalic] = useState(false);
  const [typeTestFullscreen, setTypeTestFullscreen] = useState(false);
  const [typeTestOpen, setTypeTestOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem("type-lab-theme", theme);
    localStorage.setItem("type-lab-mirror-text", mirrorText);
    localStorage.setItem("type-lab-mirror-font", mirrorFont);
    localStorage.setItem("type-lab-mirror-size", String(mirrorSize));
    localStorage.setItem("type-lab-mirror-spacing", String(mirrorSpacing));
    localStorage.setItem("type-lab-mirror-rotation", String(mirrorRotation));
    localStorage.setItem("type-lab-mirror-x", String(mirrorX));
    localStorage.setItem("type-lab-mirror-y", String(mirrorY));
    localStorage.setItem("type-lab-mirror-intensity", String(mirrorIntensity));
  }, [theme, mirrorText, mirrorFont, mirrorSize, mirrorSpacing, mirrorRotation, mirrorX, mirrorY, mirrorIntensity]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (exhibition) setExhibition(false);
        else if (toolbox) setToolbox(false);
        else if (view !== "hub") setView("hub");
      }
      if (view !== "hub" && (event.key === "ArrowRight" || event.key === "ArrowLeft")) {
        const index = exhibits.findIndex((item) => item.id === view);
        if (index >= 0) {
          const next = event.key === "ArrowRight" ? (index + 1) % exhibits.length : (index - 1 + exhibits.length) % exhibits.length;
          setView(exhibits[next].id);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [view, exhibition, toolbox]);

  const currentIndex = exhibits.findIndex((item) => item.id === view);
  const currentExhibit = exhibits[currentIndex];
  const psychologyFaces = useMemo(() => ({
    trustworthy: { label: "TRUSTWORTHY", font: "'Fraunces', serif", body: "A considered voice. Reliable without being cold.", color: "#c7d4ff" },
    playful: { label: "PLAYFUL", font: "'Caveat', cursive", body: "A gesture that refuses to stand still.", color: "#ffd66b" },
    serious: { label: "SERIOUS", font: "'DM Serif Display', serif", body: "Weight and restraint make the message feel consequential.", color: "#d5c4b6" },
    technical: { label: "TECHNICAL", font: "'JetBrains Mono', monospace", body: "The system is visible. Precision becomes personality.", color: "#8be5d5" },
    futuristic: { label: "FUTURISTIC", font: "'Space Grotesk', sans-serif", body: "An engineered rhythm from just beyond the present.", color: "#aab6ff" },
  } as const), []);
  const selectedMood = psychologyFaces[mood as keyof typeof psychologyFaces];

  const openExhibit = (id: string) => {
    setView(id);
    setEntered(true);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };
  const goHub = () => { setView("hub"); setExhibition(false); window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); };
  const resetMachine = () => { setMachineText("Typography is a voice."); setMachineFont(fontOptions[0].value); setMachineSize(74); setMachineWeight(600); setMachineSpacing(-1); setMachineLeading(1.05); setMachineAlign("left"); setMachineCase("none"); setMachineRotate(0); };
  const resetMirror = () => { setMirrorText("Look again."); setMirrorFont("'Playfair Display', serif"); setMirrorSize(84); setMirrorSpacing(0); setMirrorRotation(0); setMirrorX(true); setMirrorY(true); setMirrorIntensity(45); };
  const resetAll = () => { resetMachine(); resetMirror(); setGrid(false); setToolbox(false); };
  const answerQuiz = (option: string) => { if (quizSelected) return; setQuizSelected(option); setQuizExplanation(option === quizQuestions[quizIndex].answer ? "Correct — the definition holds. Look for this feature in a real specimen." : `The answer is ${quizQuestions[quizIndex].answer}. This is a useful distinction to notice in type.`); if (option === quizQuestions[quizIndex].answer) setQuizScore((score) => score + 1); };
  const nextQuiz = () => { setQuizSelected(null); setQuizExplanation(""); setQuizIndex((index) => index + 1); };
  const goPrev = () => currentIndex >= 0 && setView(exhibits[(currentIndex - 1 + exhibits.length) % exhibits.length].id);
  const goNext = () => currentIndex >= 0 && setView(exhibits[(currentIndex + 1) % exhibits.length].id);

  const handlePointer = (event: React.PointerEvent) => {
    setPointer({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 });
  };

  const renderHub = () => (
    <main className="hub-view">
      <section className="hub-intro">
        <div>
          <p className="eyebrow blue-mark"><span /> FIELD GUIDE / 00</p>
          <h1>Typography<br /><em>is the</em> interface.</h1>
        </div>
        <div className="intro-note"><span className="mono">TYPE//LAB / INDEX</span><p>A digital exhibition for looking closer at the letters that shape our world.</p><span className="scroll-note"><MousePointer2 size={14} /> Select an exhibit to begin</span></div>
      </section>
      <section className="exhibit-grid" aria-label="TYPE//LAB exhibits">
        {exhibits.map((item, index) => (
          <button key={item.id} className={`exhibit-tile ${item.className} tile-${index + 1}`} onClick={() => openExhibit(item.id)} onMouseEnter={() => setCursorLabel(index === 7 ? "COMPARE" : "EXPLORE")} onMouseLeave={() => setCursorLabel("MOVE")}>
            <div className="tile-top"><span>{item.number} / 09</span><ArrowUpRight size={18} /></div>
            <div className="tile-visual" aria-hidden="true">{item.visual}</div>
            <div className="tile-bottom"><div><span className="tile-kicker">{item.kicker}</span><h2>{item.title}</h2><p>{item.descriptor}</p></div><span className="tile-arrow"><ArrowRight size={16} /></span></div>
          </button>
        ))}
      </section>
      <section className="hub-footer"><p><span className="blue-dot" /> 09 EXHIBITS / 01 TOOLBOX / ∞ WAYS TO LOOK</p><p className="mono">THE LETTER IS THE MATERIAL</p></section>
    </main>
  );

  const renderMachine = () => (
    <ExhibitFrame eyebrow="VARIABLE / EDIT" title="TYPE MACHINE" intro="A letter is not a picture. It is a set of decisions." number="01">
      <div className="machine-layout">
        <div className="machine-stage">
          <div className="stage-corner">LIVE SPECIMEN<br /><span>01 — / — 04</span></div>
          <div className="stage-ruler"><span>—</span><span>—</span><span>—</span><span>—</span><span>—</span></div>
          <div className="machine-specimen-wrap" style={{ transform: `rotate(${machineRotate}deg)` }}><Specimen text={machineText || "Type something."} font={machineFont} size={machineSize} weight={machineWeight} spacing={machineSpacing} lineHeight={machineLeading} align={machineAlign as React.CSSProperties["textAlign"]} className={`machine-specimen case-${machineCase}`} /><span className="baseline-marker">BASELINE</span></div>
          <div className="stage-meta"><span>FONT / {fontOptions.find((font) => font.value === machineFont)?.label.toUpperCase()}</span><span>SIZE / {machineSize}px</span><span>WEIGHT / {machineWeight}</span></div>
        </div>
        <aside className="control-rail">
          <label className="field-label">YOUR SPECIMEN<textarea value={machineText} onChange={(event) => setMachineText(event.target.value)} rows={2} /></label>
          <label className="field-label">TYPEFACE<select className="lab-select" value={machineFont} onChange={(event) => setMachineFont(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select></label>
          <RangeControl label="Font size" value={machineSize} min={28} max={150} onChange={setMachineSize} suffix="px" />
          <RangeControl label="Weight" value={machineWeight} min={300} max={900} step={100} onChange={setMachineWeight} />
          <RangeControl label="Letter spacing" value={machineSpacing} min={-5} max={12} step={0.5} onChange={setMachineSpacing} suffix="px" />
          <RangeControl label="Line height" value={machineLeading} min={0.75} max={1.8} step={0.05} onChange={setMachineLeading} />
          <RangeControl label="Rotation" value={machineRotate} min={-6} max={6} step={1} onChange={setMachineRotate} suffix="°" />
          <div className="control-row"><label className="field-label compact">ALIGN<select className="lab-select" value={machineAlign} onChange={(event) => setMachineAlign(event.target.value)}><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></label><label className="field-label compact">CASE<select className="lab-select" value={machineCase} onChange={(event) => setMachineCase(event.target.value)}><option value="none">As typed</option><option value="uppercase">Uppercase</option><option value="lowercase">Lowercase</option></select></label></div>
          <button className="text-button" onClick={resetMachine}><RotateCcw size={15} /> Reset specimen</button>
        </aside>
      </div>
    </ExhibitFrame>
  );

  const renderAnatomy = () => {
    const relevant = anatomyFeatures.filter((feature) => feature.letters.includes(anatomyLetter));
    const active = relevant.find((feature) => feature.label === anatomyFeature) || relevant[0] || anatomyFeatures[0];
    const activeIndex = Math.max(0, relevant.findIndex((feature) => feature.label === active.label));
    const chooseFeature = (label: string) => { setAnatomyFeature(label); setAnatomyTerm(label); };
    const stepFeature = (direction: number) => { const next = (activeIndex + direction + relevant.length) % relevant.length; chooseFeature(relevant[next].label); };
    return <ExhibitFrame eyebrow="FORM / STRUCTURE" title="ANATOMY" intro="A typeface is a system of relationships. Follow the line to see exactly where each feature lives." number="02">
      <div className="anatomy-toolbar"><div className="anatomy-mode"><button className={anatomyMode === "explore" ? "active" : ""} onClick={() => setAnatomyMode("explore")}>Explore mode</button><button className={anatomyMode === "guided" ? "active" : ""} onClick={() => setAnatomyMode("guided")}>Guided mode</button></div><div className="anatomy-actions"><button onClick={() => setAnatomyLabels(true)}>Show all labels</button><button onClick={() => setAnatomyLabels(false)}>Hide labels</button><button onClick={() => { setAnatomyLabels(true); setAnatomyMode("explore"); chooseFeature(relevant[0]?.label || "Counter"); }}>Reset</button></div></div>
      <div className={`anatomy-layout refined-anatomy ${anatomyMode}`}>
        <div className="anatomy-stage">
          <div className="letter-controls"><span className="mono">LETTER /</span>{["g", "A", "R", "S", "e"].map((letter) => <button key={letter} className={anatomyLetter === letter ? "active" : ""} onClick={() => { setAnatomyLetter(letter); setAnatomyFeature(""); }}>{letter}</button>)}</div>
          <div className="anatomy-legend"><span><i className="legend-blue" /> blue marker / interactive point</span><span><i className="legend-line" /> leader line / exact location</span><span><i className="legend-highlight" /> highlight / selected feature</span></div>
          <div className="anatomy-letter-wrap clear-specimen"><span className="measure-label cap">CAP HEIGHT</span><span className="measure-label xheight">X-HEIGHT</span><span className="measure-label base">BASELINE</span><span className="measure-label desc">DESCENDER</span><div className="guide-line guide-cap" /><div className="guide-line guide-x" /><div className="guide-line guide-base" /><div className="guide-line guide-desc" /><div className="anatomy-letter" style={{ fontFamily: anatomyLetter === "g" ? "'Fraunces', serif" : "'Playfair Display', serif" }}>{anatomyLetter}</div>{anatomyLabels && <div className="feature-map">{relevant.map((feature) => <button key={feature.label} className={`feature-pin ${active.label === feature.label ? "active" : ""} side-${feature.side}`} style={{ left: `${feature.x}%`, top: `${feature.y}%` }} onMouseEnter={() => chooseFeature(feature.label)} onFocus={() => chooseFeature(feature.label)} onClick={() => chooseFeature(feature.label)} aria-label={`Inspect ${feature.label}`}><i /><span className="feature-leader" /><b>{feature.label}</b></button>)}</div>}</div>
          <div className="anatomy-caption"><span className="mono">SPECIMEN / {anatomyLetter.toUpperCase()} / {relevant.length} FEATURES</span><p><strong>How to read:</strong> follow the blue line from a label to its dot. <strong>{active.label}</strong> is {active.where}.</p></div>
        </div>
        <aside className="term-index anatomy-explanation"><div className="term-index-head"><span className="eyebrow">{anatomyMode === "guided" ? "GUIDED OBSERVATION" : "FEATURE INDEX"}</span><span className="mono">{activeIndex + 1} / {relevant.length}</span></div><div className="term-list">{relevant.map((feature) => <button key={feature.label} className={active.label === feature.label ? "active" : ""} onClick={() => chooseFeature(feature.label)}><span>{feature.label}</span><ArrowUpRight size={14} /></button>)}</div><div className="term-definition"><span className="mono">WHERE IT IS</span><h3>{active.label}</h3><p><strong>{active.where}.</strong> {active.explanation}</p></div>{anatomyMode === "guided" && <div className="guided-controls"><button onClick={() => stepFeature(-1)}><ChevronLeft size={15} /> Previous</button><button onClick={() => stepFeature(1)}>Next <ChevronRight size={15} /></button></div>}</aside>
      </div>
    </ExhibitFrame>;
  };

  const renderClassification = () => {
    const item = classificationData[classification];
    return <ExhibitFrame eyebrow="FAMILIES / CONTEXT" title="CLASSIFICATION" intro="Different voices, different jobs. Explore the typographic family tree." number="03">
      <div className="classification-layout"><nav className="classification-tabs" aria-label="Type classifications">{classificationData.map((category, index) => <button key={category.name} className={classification === index ? "active" : ""} onClick={() => setClassification(index)}><span>0{index + 1}</span>{category.name}<ArrowUpRight size={14} /></button>)}</nav><div className="classification-specimen"><div className="class-meta"><span className="eyebrow">CLASS / 0{classification + 1}</span><span className="mono">{item.tone}</span></div><Specimen text={item.specimen} font={item.font} size={clamp(70, 16, 180)} weight={500} spacing={-2} className="class-word" /><div className="class-details"><div><span className="mono">VISUAL CHARACTER</span><p>{item.description}</p></div><div><span className="mono">CONTEXT / USE</span><p>{item.history} <strong>{item.uses}.</strong></p></div></div><div className="class-tags"><span>{item.name.toUpperCase()}</span><span>{item.tone.toUpperCase()}</span><span>TYPE AS TOOL</span></div></div></div>
    </ExhibitFrame>;
  };

  const renderPsychology = () => (
    <ExhibitFrame eyebrow="TONE / PERCEPTION" title="PSYCHOLOGY" intro="The words stay the same. Adjust the voice and observe what changes in your reading." number="04">
      <div className="psychology-layout"><div className="mood-list"><span className="mono">CHOOSE AN IMPRESSION</span>{Object.entries(psychologyFaces).map(([key, value]) => <button key={key} className={mood === key ? "active" : ""} onClick={() => { setMood(key); setPsychFont(value.font); }}>{<span className="mood-dot" style={{ background: value.color }} />}{value.label}<ArrowUpRight size={15} /></button>)}<div className="mood-note"><BookOpen size={17} /><p>Type is not neutral. Shape, rhythm, weight and spacing all change how a message lands.</p></div></div><div className="psychology-stage" style={{ background: selectedMood.color }}><span className="stage-corner dark-corner">MESSAGE / 001</span><div className="psych-controls"><select className="lab-select" value={psychFont} onChange={(event) => setPsychFont(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select><RangeControl label="Weight" value={psychWeight} min={300} max={800} step={100} onChange={setPsychWeight} /><RangeControl label="Tracking" value={psychSpacing} min={-4} max={9} step={0.5} onChange={setPsychSpacing} suffix="px" /><RangeControl label="Scale" value={psychSize} min={55} max={150} onChange={setPsychSize} suffix="px" /></div><div className="psych-message" style={{ fontFamily: psychFont, fontWeight: psychWeight, letterSpacing: `${psychSpacing}px`, fontSize: `${psychSize}px` }}><span>We need</span><strong>your attention.</strong></div><div className="psych-footer"><span>{selectedMood.label}</span><p>{selectedMood.body}</p></div></div></div>
    </ExhibitFrame>
  );

  const renderBattle = () => {
    const metrics = ["Readability", "Personality", "Structure", "Weight", "Spacing", "Context"];
    return <ExhibitFrame eyebrow="COMPARE / CONTRAST" title="TYPE BATTLE" intro="Two typefaces enter. The message reveals what they value." number="05">
      <div className="battle-layout"><div className="battle-head"><div><span className="mono">TYPEFACE A</span><select className="lab-select" value={battleA} onChange={(event) => setBattleA(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select></div><span className="versus">VS</span><div><span className="mono">TYPEFACE B</span><select className="lab-select" value={battleB} onChange={(event) => setBattleB(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select></div></div><div className="battle-specimens"><div className="battle-side side-a"><span className="battle-label">A / THE EDITOR</span><Specimen text="Make room for meaning." font={battleA} size={clamp(48, 8, 108)} weight={600} spacing={-1.5} /><p>Measured, literate, with a little friction.</p></div><div className="battle-side side-b"><span className="battle-label">B / THE SIGNAL</span><Specimen text="Make room for meaning." font={battleB} size={clamp(48, 8, 108)} weight={600} spacing={-1.5} /><p>Direct, contemporary, built to travel.</p></div></div><div className="metrics">{metrics.map((metric, index) => <div key={metric} className="metric"><span>{metric}</span><div className="metric-bars"><i style={{ width: `${72 - index * 5}%` }} /><i style={{ width: `${48 + index * 6}%` }} /></div><span className="mono">A&nbsp;&nbsp; B</span></div>)}</div></div>
    </ExhibitFrame>;
  };

  const renderQuiz = () => {
    const finished = quizIndex >= quizQuestions.length;
    const question = quizQuestions[Math.min(quizIndex, quizQuestions.length - 1)];
    return <ExhibitFrame eyebrow="KNOWLEDGE / 05" title="QUIZ" intro="A quick calibration for your typographic eye. Look, decide, then read the reason." number="06">
      <div className="quiz-layout"><div className="quiz-progress"><span className="eyebrow">FIELD TEST</span><strong>{finished ? "COMPLETE" : `0${quizIndex + 1} / 0${quizQuestions.length}`}</strong><div className="progress-line"><i style={{ width: `${finished ? 100 : (quizIndex / quizQuestions.length) * 100}%` }} /></div><p>Answer without overthinking. The first read is often the truest one.</p></div>{finished ? <div className="quiz-result"><span className="result-mark">{quizScore >= 4 ? "A" : quizScore >= 3 ? "B" : "C"}</span><span className="mono">YOUR RESULT</span><h2>{quizScore} / {quizQuestions.length}</h2><p>{quizScore >= 4 ? "Your eye is calibrated. Keep looking closer." : "Good start. Type rewards attention, not memorisation."}</p><button className="primary-button" onClick={() => { setQuizIndex(0); setQuizScore(0); setQuizSelected(null); setQuizExplanation(""); }}>Run it again <ArrowRight size={16} /></button></div> : <div className="quiz-question"><div className="question-meta"><span>{question.topic}</span><CircleHelp size={18} /></div><div className="quiz-example">Aa <span>{question.topic.toLowerCase()} / observe the shape</span></div><h2>{question.prompt}</h2><div className="quiz-options">{question.options.map((option, index) => { const correct = quizSelected && option === question.answer; const wrong = quizSelected === option && option !== question.answer; return <button key={option} className={`${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`} onClick={() => answerQuiz(option)}><span>{String.fromCharCode(65 + index)}</span>{option}{correct && <Check size={16} />}</button>; })}</div>{quizSelected && <div className={`quiz-feedback ${quizSelected === question.answer ? "good" : "bad"}`}><strong>{quizSelected === question.answer ? "Correct." : "Not quite."}</strong><span>{quizExplanation}</span><button className="text-button" onClick={nextQuiz}>{quizIndex === quizQuestions.length - 1 ? "See result" : "Next question"}<ArrowRight size={15} /></button></div>}</div>}</div>
    </ExhibitFrame>;
  };

  const renderRealWorld = () => { const item = realWorldItems[realWorld]; return <ExhibitFrame eyebrow="SIGN / SIGNAL" title="REAL WORLD" intro="Typography is infrastructure. Find it doing a job outside the screen." number="07"><div className="real-layout"><nav className="real-nav">{realWorldItems.map((entry, index) => <button key={entry.title} className={realWorld === index ? "active" : ""} onClick={() => setRealWorld(index)}><span>0{index + 1}</span>{entry.title}<ArrowUpRight size={14} /></button>)}</nav><div className={`real-stage ${item.className}`}><span className="stage-corner">OBSERVED / {item.place}</span><div className="real-specimen">{item.specimen}</div><div className="real-stage-bottom"><span>{item.type}</span><span>FIELD NOTE / {String(realWorld + 1).padStart(2, "0")}</span></div></div><div className="real-copy"><span className="mono">WHY IT MATTERS</span><h3>{item.title.toLowerCase()} type is a public act.</h3><p>{item.body}</p><div className="location-chip"><Crosshair size={15} /><span>{item.place}</span></div></div></div></ExhibitFrame>; };

  const renderCompare = () => <ExhibitFrame eyebrow="SPECIMEN / MODE" title="COMPARE" intro="Build a typographic specimen sheet. Make the differences visible." number="08"><div className={`compare-layout ${exhibition ? "presentation" : ""}`}><div className="compare-controls"><label className="field-label">PHRASE<input value={compareText} onChange={(event) => setCompareText(event.target.value)} /></label><label className="field-label">SPECIMEN A<select className="lab-select" value={compareA} onChange={(event) => setCompareA(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select></label><label className="field-label">SPECIMEN B<select className="lab-select" value={compareB} onChange={(event) => setCompareB(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select></label><RangeControl label="Size" value={compareSize} min={24} max={110} onChange={setCompareSize} suffix="px" /><RangeControl label="Weight" value={compareWeight} min={300} max={900} step={100} onChange={setCompareWeight} /><RangeControl label="Spacing" value={compareSpacing} min={-4} max={10} step={0.5} onChange={setCompareSpacing} suffix="px" /><button className="text-button" onClick={() => setExhibition(!exhibition)}>{exhibition ? <MinimizeIcon /> : <Maximize2 size={15} />}{exhibition ? "Exit specimen mode" : "Enter specimen mode"}</button></div><div className="compare-sheet"><div className="sheet-head"><span>TYPE//LAB / SPECIMEN 08</span><span>{new Date().getFullYear()} — PRESENT TENSE</span></div><div className="sheet-row"><span className="sheet-index">A</span><Specimen text={compareText} font={compareA} size={compareSize} weight={compareWeight} spacing={compareSpacing} /><span className="sheet-caption">{fontOptions.find((font) => font.value === compareA)?.label.toUpperCase()} / {compareWeight}</span></div><div className="sheet-row"><span className="sheet-index">B</span><Specimen text={compareText} font={compareB} size={compareSize} weight={compareWeight} spacing={compareSpacing} /><span className="sheet-caption">{fontOptions.find((font) => font.value === compareB)?.label.toUpperCase()} / {compareWeight}</span></div><div className="sheet-footer"><span>Same words / different weather.</span><span>SIZE {compareSize} / TRACK {compareSpacing}</span></div></div></div></ExhibitFrame>;

  const renderMirror = () => { const transform = `${mirrorX ? "scaleX(-1)" : ""} ${mirrorY ? "scaleY(-1)" : ""} rotate(${mirrorRotation}deg)`; return <ExhibitFrame eyebrow="REFLECT / REPEAT" title="TYPE MIRROR" intro="A phrase is a surface. Change its direction and it changes its meaning." number="09"><div className="mirror-layout"><div className="mirror-stage"><div className="mirror-grid-mark" /><span className="stage-corner">REFLECTION STUDY / {mirrorIntensity}%</span><div className="mirror-main" style={{ fontFamily: mirrorFont, fontSize: `${mirrorSize}px`, letterSpacing: `${mirrorSpacing}px`, transform: `rotate(${mirrorRotation}deg)` }}>{mirrorText || "Type a phrase."}</div><div className="mirror-reflection" style={{ fontFamily: mirrorFont, fontSize: `${mirrorSize}px`, letterSpacing: `${mirrorSpacing}px`, opacity: mirrorIntensity / 100, transform }}>{mirrorText || "Type a phrase."}</div><div className="mirror-axis" /></div><aside className="control-rail mirror-controls"><label className="field-label">YOUR PHRASE<textarea value={mirrorText} onChange={(event) => setMirrorText(event.target.value)} rows={2} /></label><label className="field-label">TYPEFACE<select className="lab-select" value={mirrorFont} onChange={(event) => setMirrorFont(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select></label><RangeControl label="Size" value={mirrorSize} min={30} max={150} onChange={setMirrorSize} suffix="px" /><RangeControl label="Spacing" value={mirrorSpacing} min={-5} max={14} step={0.5} onChange={setMirrorSpacing} suffix="px" /><RangeControl label="Rotation" value={mirrorRotation} min={-12} max={12} onChange={setMirrorRotation} suffix="°" /><RangeControl label="Reflection intensity" value={mirrorIntensity} min={0} max={100} onChange={setMirrorIntensity} suffix="%" /><div className="toggle-row"><button className={mirrorX ? "active" : ""} onClick={() => setMirrorX(!mirrorX)}>↔ Horizontal</button><button className={mirrorY ? "active" : ""} onClick={() => setMirrorY(!mirrorY)}>↕ Vertical</button></div><button className="text-button" onClick={resetMirror}><RotateCcw size={15} /> Reset mirror</button></aside></div></ExhibitFrame>; };

  const renderTypeTest = () => <div className={`type-test-panel ${typeTestFullscreen ? "full-type-test" : ""}`}><div className="type-test-head"><div><span className="eyebrow blue-mark"><span /> WRITE YOUR TYPE</span><h2>Type Test</h2></div><div className="type-test-actions"><button onClick={() => navigator.clipboard?.writeText(typeTestText)}><Check size={14} /> Copy text</button><button onClick={() => setTypeTestFullscreen(!typeTestFullscreen)}><Maximize2 size={14} /> {typeTestFullscreen ? "Exit" : "Fullscreen"}</button><button onClick={() => { setTypeTestText("Typography is a voice."); setTypeTestFont(fontOptions[0].value); setTypeTestSize(74); setTypeTestWeight(600); setTypeTestSpacing(-1); setTypeTestLeading(1.05); setTypeTestAlign("left"); setTypeTestCase("none"); setTypeTestItalic(false); }}>Reset</button></div></div><div className="type-test-grid"><div className="type-test-stage"><label className="character-input"><span>CHARACTER <b>{typeTestText.length} CHARS</b></span><textarea aria-label="Character input" placeholder="Aa / Type here…" value={typeTestText} onChange={(event) => setTypeTestText(event.target.value)} /></label><div className={`type-test-specimen case-${typeTestCase}`} style={{ fontFamily: typeTestFont, fontSize: `${typeTestSize}px`, fontWeight: typeTestWeight, letterSpacing: `${typeTestSpacing}px`, lineHeight: typeTestLeading, textAlign: typeTestAlign as React.CSSProperties["textAlign"], fontStyle: typeTestItalic ? "italic" : "normal" }}>{typeTestText || "Type something."}</div><div className="type-test-readout"><span>FONT / {fontOptions.find((font) => font.value === typeTestFont)?.label}</span><span>SIZE / {typeTestSize}px</span><span>WEIGHT / {typeTestWeight}</span><span>TRACK / {typeTestSpacing}px</span></div></div><div className="type-test-controls"><label className="field-label">TYPEFACE<select className="lab-select" value={typeTestFont} onChange={(event) => setTypeTestFont(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select></label><RangeControl label="Font size" value={typeTestSize} min={28} max={150} onChange={setTypeTestSize} suffix="px" /><RangeControl label="Weight" value={typeTestWeight} min={300} max={900} step={100} onChange={setTypeTestWeight} /><RangeControl label="Tracking" value={typeTestSpacing} min={-5} max={12} step={0.5} onChange={setTypeTestSpacing} suffix="px" /><RangeControl label="Line height" value={typeTestLeading} min={0.75} max={1.8} step={0.05} onChange={setTypeTestLeading} /><div className="control-row"><label className="field-label compact">ALIGN<select className="lab-select" value={typeTestAlign} onChange={(event) => setTypeTestAlign(event.target.value)}><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></label><label className="field-label compact">CASE<select className="lab-select" value={typeTestCase} onChange={(event) => setTypeTestCase(event.target.value)}><option value="none">As typed</option><option value="uppercase">Uppercase</option><option value="lowercase">Lowercase</option></select></label></div><button className={`toggle-lab ${typeTestItalic ? "active" : ""}`} onClick={() => setTypeTestItalic(!typeTestItalic)}>Italic where supported</button></div></div><div className="type-test-specimens"><div><span className="mono">PARAGRAPH / BODY</span><p style={{ fontFamily: typeTestFont }}>{typeTestText || "Your paragraph specimen."}</p></div><div><span className="mono">NUMERIC / 0123456789</span><p style={{ fontFamily: typeTestFont }}>0123456789  $€%&amp;@</p></div><div><span className="mono">CHARACTER / Aa Gg Qq</span><p style={{ fontFamily: typeTestFont }}>Aa Gg Qq Rr Ss</p></div><div><span className="mono">PUNCTUATION / !?.,:;—</span><p style={{ fontFamily: typeTestFont }}>! ? . , : ; — ( ) [ ]</p></div></div></div>;

  const renderExhibit = () => {
    switch (view) {
      case "machine": return renderMachine();
      case "anatomy": return renderAnatomy();
      case "classification": return renderClassification();
      case "psychology": return renderPsychology();
      case "battle": return renderBattle();
      case "quiz": return renderQuiz();
      case "real-world": return renderRealWorld();
      case "compare": return renderCompare();
      case "mirror": return renderMirror();
      default: return renderHub();
    }
  };

  return (
    <div className={`lab-shell ${theme} ${grid ? "show-grid" : ""} ${exhibition ? "is-exhibition" : ""}`} onPointerMove={handlePointer} style={{ "--pointer-x": `${pointer.x}%`, "--pointer-y": `${pointer.y}%` } as React.CSSProperties}>
      {!entered ? <section className="entry-screen"><div className="entry-grid" /><div className="entry-top"><span>TYPE//LAB</span><span>AN INTERACTIVE STUDY OF TYPOGRAPHY</span><span>EST. 2026 / 01—09</span></div><div className="entry-center"><div className="entry-marker"><span className="blue-dot" /> A DIGITAL EXHIBITION</div><h1><span>TYPE</span><span>IS</span><span>EVERYWHERE<span className="period">.</span></span></h1><div className="entry-bottom"><p>Typography is not decoration.<br />It is how information gets a body.</p><button className="enter-button" onClick={() => setEntered(true)}>ENTER THE LAB <ArrowRight size={17} /></button></div></div><div className="entry-cursor">MOVE TO BEGIN <MousePointer2 size={14} /></div></section> : <>
        {!exhibition && <header className="lab-header"><button className="brand-button" onClick={goHub}><span className="brand-mark">T</span><span>TYPE<span>//</span>LAB</span></button><div className="header-center">{view === "hub" ? <span className="header-location">LAB HUB / INDEX</span> : <><span className="header-location">EXHIBIT / {currentExhibit?.number}</span><span className="header-title">{currentExhibit?.title}</span></>}</div><div className="header-actions"><button aria-label="Toggle grid overlay" className={grid ? "active" : ""} onClick={() => setGrid(!grid)}><Grid3X3 size={16} /></button><button aria-label="Toggle theme" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? <Moon size={16} /> : <Sun size={16} />}</button><button aria-label="Open toolbox" className={toolbox ? "active" : ""} onClick={() => setToolbox(!toolbox)}><SlidersHorizontal size={16} /></button></div></header>}
        <div className="view-wrap">{renderExhibit()}</div>
        {view !== "hub" && !exhibition && <div className="section-nav"><button onClick={goHub}><ArrowLeft size={15} /> Back to lab</button><span className="section-count">{currentExhibit?.number} / 09</span><div><button aria-label="Previous exhibit" onClick={goPrev}><ChevronLeft size={17} /></button><button aria-label="Next exhibit" onClick={goNext}><ChevronRight size={17} /></button></div></div>}
        {view === "hub" && !exhibition && <button className="hub-toolbox-hint" onClick={() => setToolbox(true)}><SlidersHorizontal size={15} /> Open lab toolbox <span>⌘ K</span></button>}
        {toolbox && <aside className="toolbox-panel"><div className="toolbox-head"><span><span className="blue-dot" /> TYPE TOOLBOX</span><button aria-label="Close toolbox" onClick={() => setToolbox(false)}><X size={16} /></button></div><p className="toolbox-intro">A small instrument panel for testing, tuning and presenting type.</p><div className="toolbox-section"><button className="toolbox-group-head" onClick={() => setTypeTestOpen(!typeTestOpen)}><span><Sparkles size={15} /> TYPE TEST</span><span>{typeTestOpen ? "—" : "+"}</span></button>{typeTestOpen && renderTypeTest()}</div><div className="toolbox-section"><span className="mono">VIEW / PRESENTATION</span><button className="toolbox-control" onClick={() => setTheme(theme === "light" ? "dark" : "light")}><span>{theme === "light" ? <Moon size={16} /> : <Sun size={16} />} {theme === "light" ? "Dark mode" : "Light mode"}</span><kbd>{theme === "light" ? "OFF" : "ON"}</kbd></button><button className="toolbox-control" onClick={() => setGrid(!grid)}><span><Grid3X3 size={16} /> Grid overlay</span><kbd>{grid ? "ON" : "OFF"}</kbd></button><button className="toolbox-control" onClick={() => setExhibition(!exhibition)}><span><Maximize2 size={16} /> Exhibition mode</span><kbd>↗</kbd></button></div><div className="toolbox-section"><span className="mono">QUICK TYPE CONTROLS</span><RangeControl label="Size" value={typeTestSize} min={28} max={150} onChange={setTypeTestSize} suffix="px" /><RangeControl label="Spacing" value={typeTestSpacing} min={-5} max={12} step={0.5} onChange={setTypeTestSpacing} suffix="px" /><label className="field-label">TYPEFACE<select className="lab-select" value={typeTestFont} onChange={(event) => setTypeTestFont(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select></label></div><button className="toolbox-reset" onClick={resetAll}><RotateCcw size={15} /> Reset lab settings</button><div className="toolbox-footer"><Keyboard size={15} /><span>Esc closes panels · ← → move between exhibits</span></div></aside>}
        {!exhibition && <div className="cursor-indicator" style={{ left: `${pointer.x}%`, top: `${pointer.y}%` }}><span>{cursorLabel}</span></div>}
      </>}
    </div>
  );
}

function ExhibitFrame({ eyebrow, title, intro, number, children }: { eyebrow: string; title: string; intro: string; number: string; children: React.ReactNode }) {
  return <main className="exhibit-view"><section className="exhibit-heading"><div><p className="eyebrow blue-mark"><span /> {eyebrow}</p><h1>{title}</h1></div><div className="exhibit-intro"><span className="exhibit-number">{number}</span><p>{intro}</p></div></section><div className="exhibit-rule" />{children}</main>;
}

function clamp(min: number, vw: number, max: number) { return `clamp(${min}px, ${vw}vw, ${max}px)`; }
function MinimizeIcon() { return <span className="minimize-icon">↙</span>; }
