import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
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
  Save,
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
  { id: "serif-sans", number: "10", title: "SERIF / SANS SERIF", descriptor: "Two systems. Two personalities.", kicker: "FORM / CONTEXT", visual: "Aa", className: "tile-serif-sans" },
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
  { label: "Cap Height", type: "guide", letters: ["A", "R", "S"], x: 12, y: 11, side: "left", where: "the top of a capital letter", explanation: "Cap height is the distance from the baseline to the top of a capital letter." },
  { label: "X-Height", type: "guide", letters: ["g", "e"], x: 12, y: 39, side: "left", where: "the top of the lowercase body", explanation: "X-height is the height of the main lowercase body. It changes how large and readable a typeface feels." },
  { label: "Ascender", type: "part", letters: ["g", "e"], x: 78, y: 13, side: "right", where: "the stroke rising above x-height", explanation: "An ascender is a part of a lowercase letter that reaches above its main body, like the stem of h." },
  { label: "Descender", type: "part", letters: ["g"], x: 76, y: 84, side: "right", where: "the stroke dropping below baseline", explanation: "A descender drops below the baseline. The lower loop of g is a clear example." },
  { label: "Stem", type: "part", letters: ["A", "R", "e"], x: 29, y: 44, side: "left", where: "the main structural stroke", explanation: "The stem is the main structural stroke. It carries much of a letter's visual weight." },
  { label: "Bowl", type: "part", letters: ["g", "R"], x: 66, y: 39, side: "right", where: "the rounded enclosed stroke", explanation: "A bowl is the rounded part that wraps around a counter, as in the upper bowl of R." },
  { label: "Counter", type: "part", letters: ["g", "R", "e", "A"], x: 57, y: 48, side: "right", where: "the enclosed negative space", explanation: "A counter is the space inside a letter. Its size and shape affect readability." },
  { label: "Serif", type: "part", letters: ["A", "R", "e"], x: 32, y: 73, side: "left", where: "the finishing stroke at the foot", explanation: "A serif is a small finishing stroke. It can add rhythm and a more literary voice." },
  { label: "Terminal", type: "part", letters: ["g", "e", "S"], x: 73, y: 66, side: "right", where: "the end of a stroke", explanation: "A terminal is where a stroke ends. Its shape can feel sharp, soft, or expressive." },
  { label: "Aperture", type: "part", letters: ["e", "S"], x: 61, y: 53, side: "right", where: "the opening into a counter", explanation: "An aperture is an opening. A generous aperture helps a small letter stay clear." },
  { label: "Crossbar", type: "part", letters: ["A"], x: 49, y: 47, side: "right", where: "the horizontal stroke across A", explanation: "The crossbar connects the two sides of A and changes the balance of its counter." },
  { label: "Ear", type: "part", letters: ["g"], x: 69, y: 28, side: "right", where: "the small stroke near the top of g", explanation: "The ear is the small stroke that projects from the top of a two-storey lowercase g." },
  { label: "Tail", type: "part", letters: ["R", "Q", "g"], x: 36, y: 78, side: "left", where: "the finishing stroke that sweeps away", explanation: "A tail is a descending or sweeping stroke that gives a letter movement and personality." },
  { label: "Apex", type: "part", letters: ["A", "R"], x: 50, y: 8, side: "right", where: "the pointed top where strokes meet", explanation: "The apex is the highest point of a letter where two strokes meet, as in the top of A." },
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

const serifTimeline = [
  { era: "15TH C.", title: "Humanist roots", specimen: "TEXTURA", font: "'DM Serif Display', serif", body: "Early printed type followed the rhythm of handwritten and inscriptional forms. Serif details carried the trace of the tool." },
  { era: "18TH C.", title: "The rational serif", specimen: "READ / REASON", font: "'Playfair Display', serif", body: "Transitional and modern serifs sharpened contrast, creating a more elegant voice for books, newspapers and scholarship." },
  { era: "1920s", title: "A clean break", specimen: "FORM FOLLOWS FUNCTION", font: "'Space Grotesk', sans-serif", body: "Modernism embraced sans serif systems for posters, transport and a new visual language of industry." },
  { era: "1957", title: "The neutral system", specimen: "HELLO / WORLD", font: "'Inter', sans-serif", body: "Swiss design and neo-grotesk sans serifs made clarity, consistency and international communication visible." },
  { era: "NOW", title: "Variable voices", specimen: "TYPE / EVERYWHERE", font: "'Fraunces', serif", body: "Digital typography lets serif and sans systems shift across screens, sizes and contexts without losing their character." },
];
const serifPersonalityData = {
  serif: { label: "SERIF", font: "'Fraunces', serif", words: "traditional / editorial / literary", body: "These are design associations, not rules. A serif can signal continuity, craft or considered reading when the context supports it." },
  sans: { label: "SANS SERIF", font: "'Space Grotesk', sans-serif", words: "modern / direct / minimal", body: "These are design associations, not rules. A sans serif can feel energetic, neutral or expressive depending on its proportions and use." },
};
const serifQuizQuestions = [
  { topic: "IDENTIFICATION", prompt: "Which specimen is most likely a serif face?", options: ["Fraunces", "Space Grotesk", "Inter"], answer: "Fraunces", explanation: "Fraunces has visible finishing strokes and contrast; the others are sans serif systems." },
  { topic: "READING", prompt: "Which term describes comfortable long-form reading?", options: ["Readability", "Legibility", "Tracking"], answer: "Readability", explanation: "Readability describes how a larger amount of text works together as a line, paragraph or page." },
  { topic: "CONTEXT", prompt: "Which pairing is most direct for a navigation interface?", options: ["Sans serif / digital", "Blackletter / dashboard", "Script / wayfinding"], answer: "Sans serif / digital", explanation: "Sans serif forms often support scanning, changing sizes and clear interface hierarchy." },
  { topic: "ANATOMY", prompt: "What is the small finishing stroke at a letter's end?", options: ["Serif", "Counter", "Ascender"], answer: "Serif", explanation: "A serif is the finishing stroke that extends from the end of a main letter stroke." },
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
  const [machineScale, setMachineScale] = useState(100);
  const [machineOpacity, setMachineOpacity] = useState(100);
  const [machineInk, setMachineInk] = useState("black");
  const [machinePreset, setMachinePreset] = useState("EDITORIAL");

  const [anatomyLetter, setAnatomyLetter] = useState("g");
  const [anatomyTerm, setAnatomyTerm] = useState("Counter");
  const [anatomyMode, setAnatomyMode] = useState<"explore" | "guided">("explore");
  const [anatomyLabels, setAnatomyLabels] = useState(true);
  const [anatomyFeature, setAnatomyFeature] = useState("Counter");
  const [classification, setClassification] = useState(0);
  const [classificationText, setClassificationText] = useState("");
  const [mood, setMood] = useState("trust");
  const [psychFont, setPsychFont] = useState("'Fraunces', serif");
  const [psychWeight, setPsychWeight] = useState(500);
  const [psychSpacing, setPsychSpacing] = useState(-2);
  const [psychSize, setPsychSize] = useState(100);
  const [battleA, setBattleA] = useState("'Fraunces', serif");
  const [battleB, setBattleB] = useState("'Space Grotesk', sans-serif");
  const [battleText, setBattleText] = useState("Make room for meaning.");
  const [battleSize, setBattleSize] = useState(74);
  const [battleWeight, setBattleWeight] = useState(600);
  const [battleSpacing, setBattleSpacing] = useState(-1.5);
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
  const [typeTestFontB, setTypeTestFontB] = useState("'Fraunces', serif");
  const [typeTestInk, setTypeTestInk] = useState("black");
  const [typeTestPreset, setTypeTestPreset] = useState("EDITORIAL");
  const [typeTestSize, setTypeTestSize] = useState(74);
  const [typeTestWeight, setTypeTestWeight] = useState(600);
  const [typeTestSpacing, setTypeTestSpacing] = useState(-1);
  const [typeTestLeading, setTypeTestLeading] = useState(1.05);
  const [typeTestAlign, setTypeTestAlign] = useState("left");
  const [typeTestCase, setTypeTestCase] = useState("none");
  const [typeTestItalic, setTypeTestItalic] = useState(false);
  const [typeTestFullscreen, setTypeTestFullscreen] = useState(false);
  const [typeTestOpen, setTypeTestOpen] = useState(true);
  const [serifText, setSerifText] = useState("Typography has a voice.");
  const [serifFont, setSerifFont] = useState("'Fraunces', serif");
  const [sansFont, setSansFont] = useState("'Space Grotesk', sans-serif");
  const [serifMix, setSerifMix] = useState(50);
  const [serifTimelineIndex, setSerifTimelineIndex] = useState(2);
  const [serifReadSize, setSerifReadSize] = useState(18);
  const [serifReadWeight, setSerifReadWeight] = useState(450);
  const [serifReadSpacing, setSerifReadSpacing] = useState(0);
  const [serifContext, setSerifContext] = useState<"print" | "digital">("print");
  const [serifAnatomyLetter, setSerifAnatomyLetter] = useState("A");
  const [serifAnatomyFocus, setSerifAnatomyFocus] = useState(true);
  const [serifPersonality, setSerifPersonality] = useState<"serif" | "sans">("serif");
  const [serifQuizIndex, setSerifQuizIndex] = useState(0);
  const [serifQuizSelected, setSerifQuizSelected] = useState<string | null>(null);
  const [serifQuizScore, setSerifQuizScore] = useState(0);

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
    authority: { label: "AUTHORITY", font: "'Bebas Neue', sans-serif", body: "Strong vertical rhythm and decisive weight make the message feel consequential.", color: "#c7d4ff" },
    trust: { label: "TRUST", font: "'Fraunces', serif", body: "A considered voice. Reliable without being cold.", color: "#d6ddff" },
    urgency: { label: "URGENCY", font: "'Bebas Neue', sans-serif", body: "Compressed display forms push the eye forward and make the message feel immediate.", color: "#ffb7a8" },
    elegance: { label: "ELEGANCE", font: "'Playfair Display', serif", body: "Contrast, proportion and restraint create a quieter kind of confidence.", color: "#ead6f4" },
    playfulness: { label: "PLAYFULNESS", font: "'Caveat', cursive", body: "A gesture that refuses to stand still.", color: "#ffd66b" },
    technology: { label: "TECHNOLOGY", font: "'JetBrains Mono', monospace", body: "The system is visible. Precision becomes personality.", color: "#8be5d5" },
    tradition: { label: "TRADITION", font: "'DM Serif Display', serif", body: "Weight and restraint connect the message to history and continuity.", color: "#d5c4b6" },
    strength: { label: "STRENGTH", font: "'Space Grotesk', sans-serif", body: "A firm rhythm and solid weight create a stable visual voice.", color: "#c7c7c7" },
    calmness: { label: "CALMNESS", font: "'Inter', sans-serif", body: "Open spacing and a steady line let the eye move without friction.", color: "#c4e6dc" },
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
            <div className="tile-top"><span>{item.number} / 10</span><ArrowUpRight size={18} /></div>
            <div className="tile-visual" aria-hidden="true">{item.visual}</div>
            <div className="tile-bottom"><div><span className="tile-kicker">{item.kicker}</span><h2>{item.title}</h2><p>{item.descriptor}</p></div><span className="tile-arrow"><ArrowRight size={16} /></span></div>
          </button>
        ))}
      </section>
      <section className="hub-footer"><p><span className="blue-dot" /> 10 EXHIBITS / 01 TOOLBOX / ∞ WAYS TO LOOK</p><p className="mono">THE LETTER IS THE MATERIAL</p></section>
    </main>
  );

  const renderMachine = () => {
    const presets: Record<string, { font: string; size: number; weight: number; spacing: number; leading: number; rotation: number; scale: number; opacity: number; ink: string }> = {
      EDITORIAL: { font: "'Fraunces', serif", size: 74, weight: 500, spacing: 0, leading: 1.15, rotation: 0, scale: 100, opacity: 100, ink: "black" },
      POSTER: { font: "'Bebas Neue', sans-serif", size: 118, weight: 700, spacing: 1, leading: .9, rotation: 0, scale: 100, opacity: 100, ink: "blue" },
      TECHNICAL: { font: "'JetBrains Mono', monospace", size: 46, weight: 500, spacing: -1, leading: 1.1, rotation: 0, scale: 100, opacity: 90, ink: "black" },
      LUXURY: { font: "'Playfair Display', serif", size: 82, weight: 400, spacing: -1, leading: 1, rotation: 0, scale: 100, opacity: 100, ink: "black" },
      BRUTALIST: { font: "'Space Grotesk', sans-serif", size: 88, weight: 800, spacing: -3, leading: .85, rotation: 0, scale: 100, opacity: 100, ink: "black" },
      SYSTEM: { font: "'Inter', sans-serif", size: 56, weight: 600, spacing: 0, leading: 1.1, rotation: 0, scale: 100, opacity: 100, ink: "black" },
      FUTURISTIC: { font: "'Space Grotesk', sans-serif", size: 72, weight: 500, spacing: 4, leading: 1, rotation: -2, scale: 100, opacity: 100, ink: "blue" },
    };
    const applyPreset = (preset: string) => { const selected = presets[preset]; setMachinePreset(preset); setMachineFont(selected.font); setMachineSize(selected.size); setMachineWeight(selected.weight); setMachineSpacing(selected.spacing); setMachineLeading(selected.leading); setMachineRotate(selected.rotation); setMachineScale(selected.scale); setMachineOpacity(selected.opacity); setMachineInk(selected.ink); };
    const reset = () => { setMachineText("Typography is a voice."); setMachineFont(fontOptions[0].value); setMachineSize(74); setMachineWeight(600); setMachineSpacing(-1); setMachineLeading(1.05); setMachineAlign("left"); setMachineCase("none"); setMachineRotate(0); setMachineScale(100); setMachineOpacity(100); setMachineInk("black"); setMachinePreset("EDITORIAL"); };
    return <ExhibitFrame eyebrow="VARIABLE / EDIT" title="TYPE MACHINE" intro="A letter is not a picture. It is a set of decisions." number="01">
      <div className="machine-layout"><div className="machine-stage"><div className="stage-corner">LIVE SPECIMEN<br /><span>01 — / — 04</span></div><div className="stage-ruler"><span>—</span><span>—</span><span>—</span><span>—</span><span>—</span></div><div className="machine-specimen-wrap" style={{ transform: `rotate(${machineRotate}deg) scale(${machineScale / 100})`, opacity: machineOpacity / 100 }}><Specimen text={machineText || "Type something."} font={machineFont} size={machineSize} weight={machineWeight} spacing={machineSpacing} lineHeight={machineLeading} align={machineAlign as React.CSSProperties["textAlign"]} className={`machine-specimen case-${machineCase} ink-${machineInk}`}  /><span className="baseline-marker">BASELINE</span></div><div className="stage-meta"><span>FONT / {fontOptions.find((font) => font.value === machineFont)?.label.toUpperCase()}</span><span>SIZE / {machineSize}px</span><span>WEIGHT / {machineWeight}</span><span>TRACKING / {machineSpacing}px</span><span>LEADING / {machineLeading}</span></div></div><aside className="control-rail machine-controls"><div className="machine-control-group"><span className="mono">SPECIMEN / TEXT</span><label className="field-label">YOUR SPECIMEN<textarea value={machineText} onChange={(event) => setMachineText(event.target.value)} rows={2} /></label><label className="field-label">TYPEFACE<select className="lab-select" value={machineFont} onChange={(event) => setMachineFont(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select></label></div><div className="machine-control-group machine-ranges"><RangeControl label="Font size" value={machineSize} min={28} max={150} onChange={setMachineSize} suffix="px" /><RangeControl label="Weight" value={machineWeight} min={300} max={900} step={100} onChange={setMachineWeight} /><RangeControl label="Tracking" value={machineSpacing} min={-5} max={12} step={0.5} onChange={setMachineSpacing} suffix="px" /><RangeControl label="Leading" value={machineLeading} min={0.75} max={1.8} step={0.05} onChange={setMachineLeading} /><RangeControl label="Rotation" value={machineRotate} min={-6} max={6} step={1} onChange={setMachineRotate} suffix="°" /><RangeControl label="Scale" value={machineScale} min={70} max={130} onChange={setMachineScale} suffix="%" /><RangeControl label="Opacity" value={machineOpacity} min={30} max={100} onChange={setMachineOpacity} suffix="%" /></div><div className="machine-control-group machine-choice-group"><span className="mono">CASE</span><div className="choice-grid">{[["none", "None"], ["uppercase", "Upper"], ["lowercase", "Lower"]].map(([value, label]) => <button key={value} className={machineCase === value ? "active" : ""} onClick={() => setMachineCase(value)}>{label}</button>)}</div><span className="mono">ALIGN</span><div className="choice-grid">{[["left", "Left"], ["center", "Center"], ["right", "Right"]].map(([value, label]) => <button key={value} className={machineAlign === value ? "active" : ""} onClick={() => setMachineAlign(value)}>{label}</button>)}</div><span className="mono">INK</span><div className="choice-grid two"><button className={machineInk === "black" ? "active" : ""} onClick={() => setMachineInk("black")}>Black</button><button className={machineInk === "blue" ? "active" : ""} onClick={() => setMachineInk("blue")}>Blue</button></div></div><div className="machine-control-group"><span className="mono">PRESETS</span><div className="machine-presets">{Object.keys(presets).map((preset) => <button key={preset} className={machinePreset === preset ? "active" : ""} onClick={() => applyPreset(preset)}>{preset}</button>)}</div></div><div className="machine-actions"><button className="text-button" onClick={reset}><RotateCcw size={15} /> Reset</button><button className="text-button" onClick={() => navigator.clipboard?.writeText(`font-family: ${machineFont};\nfont-size: ${machineSize}px;\nfont-weight: ${machineWeight};\nletter-spacing: ${machineSpacing}px;\nline-height: ${machineLeading};`)}><Copy size={15} /> Copy CSS</button><button className="text-button" onClick={() => localStorage.setItem("type-lab-machine-save", machineText)}><Save size={15} /> Save</button></div></aside></div>
    </ExhibitFrame>;
  };
  const renderAnatomy = () => {
    const relevant = anatomyFeatures.filter((feature) => feature.letters.includes(anatomyLetter));
    const active = anatomyFeatures.find((feature) => feature.label === anatomyFeature) || relevant[0] || anatomyFeatures[0];
    const activeIndex = Math.max(0, anatomyFeatures.findIndex((feature) => feature.label === active.label));
    const chooseFeature = (label: string) => { setAnatomyFeature(label); setAnatomyTerm(label); };
    const stepFeature = (direction: number) => { const next = (activeIndex + direction + anatomyFeatures.length) % anatomyFeatures.length; chooseFeature(anatomyFeatures[next].label); };
    return <ExhibitFrame eyebrow="FORM / STRUCTURE" title="ANATOMY" intro="A typeface is a system of relationships. Follow the line to see exactly where each feature lives." number="02">
      <div className="anatomy-toolbar"><div className="anatomy-mode"><button className={anatomyMode === "explore" ? "active" : ""} onClick={() => setAnatomyMode("explore")}>Explore mode</button><button className={anatomyMode === "guided" ? "active" : ""} onClick={() => setAnatomyMode("guided")}>Guided mode</button></div><div className="anatomy-actions"><button onClick={() => setAnatomyLabels(true)}>Show all labels</button><button onClick={() => setAnatomyLabels(false)}>Hide labels</button><button onClick={() => { setAnatomyLabels(true); setAnatomyMode("explore"); chooseFeature(anatomyFeatures[0]?.label || "Counter"); }}>Reset</button></div></div>
      <div className={`anatomy-layout refined-anatomy ${anatomyMode}`}>
        <div className="anatomy-stage">
          <div className="letter-controls"><span className="mono">LETTER /</span>{["g", "A", "R", "S", "e"].map((letter) => <button key={letter} className={anatomyLetter === letter ? "active" : ""} onClick={() => { setAnatomyLetter(letter); setAnatomyFeature(""); }}>{letter}</button>)}</div>
          <div className="anatomy-legend"><span><i className="legend-blue" /> blue marker / interactive point</span><span><i className="legend-line" /> leader line / exact location</span><span><i className="legend-highlight" /> highlight / selected feature</span></div>
          <div className="anatomy-letter-wrap clear-specimen"><span className="measure-label cap">CAP HEIGHT</span><span className="measure-label xheight">X-HEIGHT</span><span className="measure-label base">BASELINE</span><span className="measure-label desc">DESCENDER</span><div className="guide-line guide-cap" /><div className="guide-line guide-x" /><div className="guide-line guide-base" /><div className="guide-line guide-desc" /><div className="anatomy-letter" style={{ fontFamily: anatomyLetter === "g" ? "'Fraunces', serif" : "'Playfair Display', serif" }}>{anatomyLetter}</div>{anatomyLabels && <div className="feature-map">{relevant.map((feature) => <button key={feature.label} className={`feature-pin ${active.label === feature.label ? "active" : ""} side-${feature.side}`} style={{ left: `${feature.x}%`, top: `${feature.y}%` }} onMouseEnter={() => chooseFeature(feature.label)} onFocus={() => chooseFeature(feature.label)} onClick={() => chooseFeature(feature.label)} aria-label={`Inspect ${feature.label}`}><i /><span className="feature-leader" /><b>{feature.label}</b></button>)}</div>}</div>
          <div className="anatomy-caption"><span className="mono">SPECIMEN / {anatomyLetter.toUpperCase()} / {anatomyFeatures.length} FEATURES</span><p><strong>How to read:</strong> follow the blue line from a label to its dot. <strong>{active.label}</strong> is {active.where}.</p></div>
        </div>
        <aside className="term-index anatomy-explanation"><div className="term-index-head"><span className="eyebrow">{anatomyMode === "guided" ? "GUIDED OBSERVATION" : "FEATURE INDEX"}</span><span className="mono">{activeIndex + 1} / {anatomyFeatures.length}</span></div><div className="term-list">{anatomyFeatures.map((feature) => <button key={feature.label} className={active.label === feature.label ? "active" : ""} onClick={() => chooseFeature(feature.label)}><span>{feature.label}</span><ArrowUpRight size={14} /></button>)}</div><div className="term-definition"><span className="mono">WHERE IT IS</span><h3>{active.label}</h3><p><strong>{active.where}.</strong> {active.explanation}</p></div>{anatomyMode === "guided" && <div className="guided-controls"><button onClick={() => stepFeature(-1)}><ChevronLeft size={15} /> Previous</button><button onClick={() => stepFeature(1)}>Next <ChevronRight size={15} /></button></div>}</aside>
      </div>
    </ExhibitFrame>;
  };

  const renderClassification = () => {
    const item = classificationData[classification];
    return <ExhibitFrame eyebrow="FAMILIES / CONTEXT" title="CLASSIFICATION" intro="Different voices, different jobs. Explore the typographic family tree." number="03">
      <div className="classification-layout"><nav className="classification-tabs" aria-label="Type classifications">{classificationData.map((category, index) => <button key={category.name} className={classification === index ? "active" : ""} onClick={() => setClassification(index)}><span>0{index + 1}</span>{category.name}<ArrowUpRight size={14} /></button>)}</nav><div className="classification-specimen"><div className="class-meta"><span className="eyebrow">CLASS / 0{classification + 1}</span><span className="mono">{item.tone}</span></div><label className="classification-input"><span className="mono">YOUR SPECIMEN / LIVE INPUT</span><input aria-label="Classification custom specimen" value={classificationText} placeholder={item.specimen} onChange={(event) => setClassificationText(event.target.value)} /></label><Specimen text={classificationText || item.specimen} font={item.font} size={clamp(70, 16, 180)} weight={500} spacing={-2} className="class-word" /><div className="class-details"><div><span className="mono">VISUAL CHARACTER</span><p>{item.description}</p></div><div><span className="mono">CONTEXT / USE</span><p>{item.history} <strong>{item.uses}.</strong></p></div></div><div className="class-tags"><span>{item.name.toUpperCase()}</span><span>{item.tone.toUpperCase()}</span><span>TYPE AS TOOL</span></div></div></div>
    </ExhibitFrame>;
  };

  const renderPsychology = () => (
    <ExhibitFrame eyebrow="TONE / PERCEPTION" title="PSYCHOLOGY" intro="The words stay the same. Adjust the voice and observe what changes in your reading." number="04">
      <div className="psychology-layout"><div className="mood-list"><span className="mono">CHOOSE AN IMPRESSION</span>{Object.entries(psychologyFaces).map(([key, value]) => <button key={key} className={mood === key ? "active" : ""} onClick={() => { setMood(key); setPsychFont(value.font); }}>{<span className="mood-dot" style={{ background: value.color }} />}{value.label}<ArrowUpRight size={15} /></button>)}<div className="mood-note"><BookOpen size={17} /><p>Type is not neutral. Shape, rhythm, weight and spacing all change how a message lands.</p></div></div><div className="psychology-stage" style={{ background: selectedMood.color }}><span className="stage-corner dark-corner">MESSAGE / 001</span><div className="psych-controls"><select className="lab-select" value={psychFont} onChange={(event) => setPsychFont(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select><RangeControl label="Weight" value={psychWeight} min={300} max={800} step={100} onChange={setPsychWeight} /><RangeControl label="Tracking" value={psychSpacing} min={-4} max={9} step={0.5} onChange={setPsychSpacing} suffix="px" /><RangeControl label="Scale" value={psychSize} min={55} max={150} onChange={setPsychSize} suffix="px" /></div><div className="psych-message" style={{ fontFamily: psychFont, fontWeight: psychWeight, letterSpacing: `${psychSpacing}px`, fontSize: `${psychSize}px` }}><span>We need</span><strong>your attention.</strong></div><div className="psych-footer"><span>{selectedMood.label}</span><p>{selectedMood.body}</p></div></div></div>
    </ExhibitFrame>
  );

  const renderBattle = () => {
    const metrics = ["Readability", "Personality", "Formality", "Energy", "Technical Feel", "Display Impact"];
    return <ExhibitFrame eyebrow="COMPARE / CONTRAST" title="TYPE BATTLE" intro="Two typefaces enter. The message reveals what they value." number="05">
      <div className="battle-layout"><div className="battle-input-row"><label className="field-label">PHRASE / SAME TEXT<input value={battleText} onChange={(event) => setBattleText(event.target.value)} /></label><RangeControl label="Size" value={battleSize} min={30} max={130} onChange={setBattleSize} suffix="px" /><RangeControl label="Weight" value={battleWeight} min={300} max={900} step={100} onChange={setBattleWeight} /><RangeControl label="Tracking" value={battleSpacing} min={-4} max={10} step={0.5} onChange={setBattleSpacing} suffix="px" /></div><div className="battle-head"><div><span className="mono">TYPEFACE A</span><select className="lab-select" value={battleA} onChange={(event) => setBattleA(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select></div><span className="versus">VS</span><div><span className="mono">TYPEFACE B</span><select className="lab-select" value={battleB} onChange={(event) => setBattleB(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select></div></div><div className="battle-specimens"><div className="battle-side side-a"><span className="battle-label">A / THE EDITOR</span><Specimen text={battleText || "Make room for meaning."} font={battleA} size={battleSize} weight={battleWeight} spacing={battleSpacing} /><p>Measured, literate, with a little friction.</p></div><div className="battle-side side-b"><span className="battle-label">B / THE SIGNAL</span><Specimen text={battleText || "Make room for meaning."} font={battleB} size={battleSize} weight={battleWeight} spacing={battleSpacing} /><p>Direct, contemporary, built to travel.</p></div></div><div className="metrics">{metrics.map((metric, index) => <div key={metric} className="metric"><span>{metric}</span><div className="metric-bars"><i style={{ width: `${72 - index * 5}%` }} /><i style={{ width: `${48 + index * 6}%` }} /></div><span className="mono">A&nbsp;&nbsp; B</span></div>)}</div></div>
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

  const renderTypeTest = () => {
    const presets: Record<string, { font: string; size: number; weight: number; spacing: number; leading: number; ink: string }> = {
      EDITORIAL: { font: "'Fraunces', serif", size: 74, weight: 500, spacing: 0, leading: 1.15, ink: "black" },
      POSTER: { font: "'Bebas Neue', sans-serif", size: 120, weight: 700, spacing: 1, leading: .9, ink: "blue" },
      TECHNICAL: { font: "'JetBrains Mono', monospace", size: 46, weight: 500, spacing: -1, leading: 1.1, ink: "black" },
      LUXURY: { font: "'Playfair Display', serif", size: 82, weight: 400, spacing: -1, leading: 1, ink: "black" },
      BRUTALIST: { font: "'Space Grotesk', sans-serif", size: 88, weight: 800, spacing: -3, leading: .85, ink: "black" },
      SYSTEM: { font: "'Inter', sans-serif", size: 56, weight: 600, spacing: 0, leading: 1.1, ink: "black" },
      FUTURISTIC: { font: "'Space Grotesk', sans-serif", size: 72, weight: 500, spacing: 4, leading: 1, ink: "blue" },
    };
    const applyPreset = (preset: string) => { const selected = presets[preset]; setTypeTestPreset(preset); setTypeTestFont(selected.font); setTypeTestSize(selected.size); setTypeTestWeight(selected.weight); setTypeTestSpacing(selected.spacing); setTypeTestLeading(selected.leading); setTypeTestInk(selected.ink); };
    const resetTypeTest = () => { setTypeTestText("Typography is a voice."); setTypeTestFont(fontOptions[0].value); setTypeTestFontB("'Fraunces', serif"); setTypeTestSize(74); setTypeTestWeight(600); setTypeTestSpacing(-1); setTypeTestLeading(1.05); setTypeTestAlign("left"); setTypeTestCase("none"); setTypeTestItalic(false); setTypeTestInk("black"); setTypeTestPreset("EDITORIAL"); };
    return <div className={`type-test-panel ${typeTestFullscreen ? "full-type-test" : ""}`}>
      <div className="type-test-head"><div><span className="eyebrow blue-mark"><span /> WRITE YOUR TYPE</span><h2>Type Test</h2></div><div className="type-test-actions"><button onClick={() => navigator.clipboard?.writeText(typeTestText)}><Check size={14} /> Copy text</button><button onClick={() => navigator.clipboard?.writeText(`font-family: ${typeTestFont};\nfont-size: ${typeTestSize}px;\nfont-weight: ${typeTestWeight};\nletter-spacing: ${typeTestSpacing}px;\nline-height: ${typeTestLeading};`)}><Copy size={14} /> Copy CSS</button><button onClick={() => localStorage.setItem("type-lab-saved-specimen", typeTestText)}><Save size={14} /> Save</button><button onClick={() => setTypeTestFullscreen(!typeTestFullscreen)}><Maximize2 size={14} /> {typeTestFullscreen ? "Exit" : "Fullscreen"}</button><button onClick={resetTypeTest}>Reset</button></div></div>
      <div className="type-test-grid"><div className="type-test-stage"><label className="character-input"><span>CHARACTER <b>{typeTestText.length} CHARS</b></span><textarea aria-label="Character input" placeholder="Aa / Type here…" value={typeTestText} onChange={(event) => setTypeTestText(event.target.value)} /></label><div className={`type-test-specimen case-${typeTestCase}`} style={{ fontFamily: typeTestFont, fontSize: `${typeTestSize}px`, fontWeight: typeTestWeight, letterSpacing: `${typeTestSpacing}px`, lineHeight: typeTestLeading, textAlign: typeTestAlign as React.CSSProperties["textAlign"], color: typeTestInk === "blue" ? "var(--blue)" : "var(--ink)", fontStyle: typeTestItalic ? "italic" : "normal" }}>{typeTestText || "Type something."}</div><div className="type-test-readout"><span>FONT / {fontOptions.find((font) => font.value === typeTestFont)?.label}</span><span>SIZE / {typeTestSize}px</span><span>WEIGHT / {typeTestWeight}</span><span>TRACK / {typeTestSpacing}px</span></div></div><div className="type-test-controls"><label className="field-label">SPECIMEN A<select className="lab-select" value={typeTestFont} onChange={(event) => setTypeTestFont(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select></label><label className="field-label">SPECIMEN B<select className="lab-select" value={typeTestFontB} onChange={(event) => setTypeTestFontB(event.target.value)}>{fontOptions.map((font) => <option key={font.value} value={font.value}>{font.label}</option>)}</select></label><RangeControl label="Font size" value={typeTestSize} min={28} max={150} onChange={setTypeTestSize} suffix="px" /><RangeControl label="Weight" value={typeTestWeight} min={300} max={900} step={100} onChange={setTypeTestWeight} /><RangeControl label="Tracking" value={typeTestSpacing} min={-5} max={12} step={0.5} onChange={setTypeTestSpacing} suffix="px" /><RangeControl label="Leading" value={typeTestLeading} min={0.75} max={1.8} step={0.05} onChange={setTypeTestLeading} /><div className="control-row"><label className="field-label compact">ALIGN<select className="lab-select" value={typeTestAlign} onChange={(event) => setTypeTestAlign(event.target.value)}><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></label><label className="field-label compact">CASE<select className="lab-select" value={typeTestCase} onChange={(event) => setTypeTestCase(event.target.value)}><option value="none">None</option><option value="uppercase">Upper</option><option value="lowercase">Lower</option></select></label></div><div className="toolbox-subcontrols"><label className="field-label compact">INK<select className="lab-select" value={typeTestInk} onChange={(event) => setTypeTestInk(event.target.value)}><option value="black">Black</option><option value="blue">Blue</option></select></label><button className={`toggle-lab ${typeTestItalic ? "active" : ""}`} onClick={() => setTypeTestItalic(!typeTestItalic)}>Italic where supported</button></div><div className="preset-grid"><span className="mono">PRESETS</span>{Object.keys(presets).map((preset) => <button key={preset} className={typeTestPreset === preset ? "active" : ""} onClick={() => applyPreset(preset)}>{preset}</button>)}</div><div className="toolbox-bottom-actions"><button className="text-button" onClick={resetTypeTest}><RotateCcw size={14} /> Reset</button><button className="text-button" onClick={() => navigator.clipboard?.writeText(`font-family: ${typeTestFont};\nfont-size: ${typeTestSize}px;`)}><Copy size={14} /> Copy CSS</button><button className="text-button" onClick={() => localStorage.setItem("type-lab-saved-specimen", typeTestText)}><Save size={14} /> Save</button></div></div></div>
      <div className="type-test-specimens"><div><span className="mono">PARAGRAPH / BODY</span><p style={{ fontFamily: typeTestFont }}>{typeTestText || "Your paragraph specimen."}</p></div><div><span className="mono">NUMERIC / 0123456789</span><p style={{ fontFamily: typeTestFont }}>0123456789  $€%&amp;@</p></div><div><span className="mono">CHARACTER / Aa Gg Qq</span><p style={{ fontFamily: typeTestFont }}>Aa Gg Qq Rr Ss</p></div><div><span className="mono">PUNCTUATION / !?.,:;—</span><p style={{ fontFamily: typeTestFont }}>! ? . , ; — ( ) [ ]</p></div></div>
    </div>;
  };
  const renderSerifSans = () => {
    const timeline = serifTimeline[serifTimelineIndex];
    const activePersonality = serifPersonality === "serif" ? serifPersonalityData.serif : serifPersonalityData.sans;
    const serifQuiz = serifQuizQuestions[Math.min(serifQuizIndex, serifQuizQuestions.length - 1)];
    const answerSerifQuiz = (answer: string) => { if (serifQuizSelected) return; setSerifQuizSelected(answer); if (answer === serifQuiz.answer) setSerifQuizScore((score) => score + 1); };
    const nextSerifQuiz = () => { setSerifQuizSelected(null); setSerifQuizIndex((index) => index + 1); };
    return <ExhibitFrame eyebrow="FORM / CONTEXT" title="SERIF / SANS SERIF" intro="Two systems. Two personalities. One language. See what changes when the same message changes clothes." number="10">
      <div className="serif-module">
        <section className="serif-intro-grid"><div><span className="mono">THE BASIC DIFFERENCE</span><h2>Serif gives the line a tail.<br /><em>Sans serif removes it.</em></h2></div><p>Serifs are small finishing strokes at the ends of letterforms. They create rhythm, texture and a literary, established feeling. Sans serif faces use clean terminals and open shapes for a direct, contemporary voice. Neither is universally better—the context decides.</p></section>
        <section className="serif-story-rail" aria-label="Typography problem to application"><article><span className="mono">01 / PROBLEM</span><h3>One message can feel too formal or too cold.</h3><p>Choosing a face without considering context can change how the same words land.</p></article><article><span className="mono">02 / WHY IT MATTERS</span><h3>Typography shapes trust, pace and attention.</h3><p>Readers notice tone before they consciously analyse the letterforms.</p></article><article><span className="mono">03 / DESIGN RESPONSE</span><h3>Compare the system, not just the font.</h3><p>Serif texture can support continuity; sans serif clarity can support scanning.</p></article><article><span className="mono">04 / EXAMPLE</span><h3>Book page or interface?</h3><p>Use the side-by-side specimen below to make the choice visible.</p></article></section><section className="serif-hero"><div className="serif-hero-head"><span className="eyebrow blue-mark"><span /> SAME MESSAGE / TWO SYSTEMS</span><label className="serif-phrase">CHANGE THE PHRASE<input value={serifText} onChange={(event) => setSerifText(event.target.value)} /></label></div><div className="serif-sides"><article className="serif-side serif-side-serif"><span className="mono">SERIF / {fontOptions.find((font) => font.value === serifFont)?.label.toUpperCase()}</span><div className="serif-big" style={{ fontFamily: serifFont }}>{serifText || "Aa"}</div><select className="lab-select" value={serifFont} onChange={(event) => setSerifFont(event.target.value)}><option value="'Fraunces', serif">Fraunces</option><option value="'Playfair Display', serif">Playfair Display</option><option value="'DM Serif Display', serif">DM Serif Display</option></select><p>Finishing strokes create rhythm, tradition and a warm editorial texture. Often found in books, magazines, newspapers and cultural identities.</p></article><article className="serif-side serif-side-sans"><span className="mono">SANS SERIF / {fontOptions.find((font) => font.value === sansFont)?.label.toUpperCase()}</span><div className="serif-big" style={{ fontFamily: sansFont }}>{serifText || "Aa"}</div><select className="lab-select" value={sansFont} onChange={(event) => setSansFont(event.target.value)}><option value="'Space Grotesk', sans-serif">Space Grotesk</option><option value="'Inter', sans-serif">Inter</option><option value="'Bebas Neue', sans-serif">Bebas Neue</option></select><p>Clean terminals and open forms feel direct, modern and efficient. Common in interfaces, wayfinding, dashboards and digital branding.</p></article></div><div className="serif-mix-control"><span>SERIF</span><input aria-label="Serif to sans reveal" type="range" min="0" max="100" value={serifMix} onChange={(event) => setSerifMix(Number(event.target.value))} /><span>SANS</span><b>{serifMix}% SANS REVEAL</b></div><div className="serif-reveal" style={{ "--sans-reveal": `${serifMix}%` } as React.CSSProperties}><div className="reveal-serif" style={{ fontFamily: serifFont }}>{serifText}</div><div className="reveal-sans" style={{ fontFamily: sansFont }}>{serifText}</div></div></section>
        <section className="serif-timeline-block"><div className="section-kicker-row"><span className="eyebrow">HISTORICAL DEVELOPMENT</span><span className="mono">0{serifTimelineIndex + 1} / 05</span></div><div className="serif-timeline-nav">{serifTimeline.map((item, index) => <button key={item.era} className={index === serifTimelineIndex ? "active" : ""} onClick={() => setSerifTimelineIndex(index)}><span>{item.era}</span><i /></button>)}</div><div className="serif-timeline-card"><div className="timeline-specimen" style={{ fontFamily: timeline.font }}>{timeline.specimen}</div><div><span className="mono">{timeline.era}</span><h3>{timeline.title}</h3><p>{timeline.body}</p><button className="text-button" onClick={() => setSerifTimelineIndex((serifTimelineIndex + 1) % serifTimeline.length)}>Next development <ArrowRight size={15} /></button></div></div></section>
        <section className="readability-lab"><div className="section-kicker-row"><span className="eyebrow">READABILITY / LEGIBILITY</span><span className="mono">TWO WAYS OF LOOKING</span></div><div className="readability-grid"><article><div className="readability-label"><span>LEGIBILITY</span><b>THE LETTER</b></div><div className="legibility-sample" style={{ fontFamily: serifMix < 50 ? serifFont : sansFont, fontSize: `${Math.max(42, serifReadSize * 3)}px`, fontWeight: serifReadWeight, letterSpacing: `${serifReadSpacing}px` }}>Aa Gg Qq 8B</div><p>How easily individual characters can be recognised. Compare counters, terminals and distinct shapes.</p></article><article><div className="readability-label"><span>READABILITY</span><b>THE LINE</b></div><p className="readability-paragraph" style={{ fontFamily: serifMix < 50 ? serifFont : sansFont, fontSize: `${serifReadSize}px`, fontWeight: serifReadWeight, letterSpacing: `${serifReadSpacing}px` }}>Typography works in sequence. A comfortable line length, balanced weight and generous leading help a paragraph hold together.</p><p>How comfortably a larger amount of text can be read as a whole.</p></article></div><div className="readability-controls"><RangeControl label="Size" value={serifReadSize} min={12} max={28} onChange={setSerifReadSize} suffix="px" /><RangeControl label="Weight" value={serifReadWeight} min={300} max={700} step={50} onChange={setSerifReadWeight} /><RangeControl label="Spacing" value={serifReadSpacing} min={-1} max={4} step={0.5} onChange={setSerifReadSpacing} suffix="px" /></div></section>
        <section className="serif-context-block"><div className="section-kicker-row"><span className="eyebrow">APPLICATIONS IN {serifContext.toUpperCase()} MEDIA</span><div className="context-toggle"><button className={serifContext === "print" ? "active" : ""} onClick={() => setSerifContext("print")}>PRINT</button><button className={serifContext === "digital" ? "active" : ""} onClick={() => setSerifContext("digital")}>DIGITAL</button></div></div><div className={`context-specimen ${serifContext}`}><div className="context-visual">{serifContext === "print" ? <><span className="context-page-no">P. 048</span><h3>On making<br /><em>things last.</em></h3><p>Books, magazines and packaging use serif texture to suggest craft, continuity and considered reading.</p><span className="context-rule" /></> : <><span className="context-page-no">09:41 / ONLINE</span><div className="ui-bar">TYPE//LAB <span>☰</span></div><h3>Clear systems.<br /><strong>Open signals.</strong></h3><button>Read the study <ArrowRight size={15} /></button><p>Websites, apps and wayfinding use sans serif clarity to support scanning, navigation and action.</p></>}</div><div className="context-notes"><span className="mono">WHY THIS CHOICE?</span><h3>{serifContext === "print" ? "Texture supports time." : "Clarity supports movement."}</h3><p>{serifContext === "print" ? "A serif can slow the eye in a useful way, giving editorial content a sense of depth and continuity." : "A sans serif keeps interfaces legible at changing sizes, distances and screen conditions."}</p></div></div><div className="real-gallery"><span className="mono">REAL-WORLD GALLERY / TYPE IS A CONTEXT</span>{["EDITORIAL", "PACKAGING", "WAYFINDING", "INTERFACE"].map((item, index) => <div key={item} className={`gallery-card gallery-${index + 1}`}><span>0{index + 1}</span><strong>{item}</strong><small>{serifContext === "print" ? "printed matter" : "digital system"}</small></div>)}</div></section>
        <section className="serif-detail-block"><div><span className="eyebrow">VISUAL SERIF ANATOMY</span><h2>Find the small stroke.</h2><p>Hover or click the blue marker to isolate the serif detail, then compare the same letter without it.</p><div className="detail-letter-picker">{["A", "T", "R"].map((letter) => <button key={letter} className={serifAnatomyLetter === letter ? "active" : ""} onClick={() => setSerifAnatomyLetter(letter)}>{letter}</button>)}</div></div><div className="serif-detail-compare"><div className={`detail-letter ${serifAnatomyFocus ? "focused" : ""}`} style={{ fontFamily: serifFont }} onClick={() => setSerifAnatomyFocus(!serifAnatomyFocus)}>{serifAnatomyLetter}<button className="detail-pin" aria-label="Toggle serif detail" onClick={(event) => { event.stopPropagation(); setSerifAnatomyFocus(!serifAnatomyFocus); }} /><span className="detail-callout">{serifAnatomyFocus ? "SERIF / finishing stroke" : "click the blue marker"}</span></div><div className="detail-letter sans-detail" style={{ fontFamily: sansFont }}>{serifAnatomyLetter}<span>NO SERIF / clean terminal</span></div></div></section>
        <section className="personality-block"><div className="section-kicker-row"><span className="eyebrow">PERSONALITY / ASSOCIATION</span><span className="mono">CONTEXT, NOT A RULE</span></div><div className="personality-toggle"><button className={serifPersonality === "serif" ? "active" : ""} onClick={() => setSerifPersonality("serif")}>SERIF</button><button className={serifPersonality === "sans" ? "active" : ""} onClick={() => setSerifPersonality("sans")}>SANS SERIF</button></div><div className="personality-stage" style={{ fontFamily: activePersonality.font }}><span>{activePersonality.label}</span><strong>{activePersonality.words}</strong><p>{activePersonality.body}</p></div></section>
        <section className="message-block"><div className="section-kicker-row"><span className="eyebrow">SAME MESSAGE / DIFFERENT TYPE</span><span className="mono">THE FUTURE IS DESIGNED</span></div><div className="message-treatment-grid"><div style={{ fontFamily: serifFont, fontWeight: 500 }}>THE FUTURE<br /><em>IS DESIGNED</em></div><div style={{ fontFamily: sansFont, fontWeight: 800, letterSpacing: "-.04em" }}>THE FUTURE<br />IS DESIGNED</div><div style={{ fontFamily: sansFont, fontWeight: 400, letterSpacing: ".18em", fontSize: "clamp(18px, 3vw, 35px)" }}>THE FUTURE<br />IS DESIGNED</div></div><p className="message-note">Same words, different weather: a literary serif, a confident sans and a spaced system voice.</p></section>
        <section className="serif-quiz-block"><div className="section-kicker-row"><span className="eyebrow">QUICK KNOWLEDGE CHECK</span><span className="mono">0{Math.min(serifQuizIndex + 1, serifQuizQuestions.length)} / 0{serifQuizQuestions.length}</span></div>{serifQuizIndex >= serifQuizQuestions.length ? <div className="serif-quiz-result"><span className="result-mark">{serifQuizScore}</span><h3>YOUR EYE IS CALIBRATED.</h3><p>{serifQuizScore} / {serifQuizQuestions.length} correct. Type rewards looking closely.</p><button className="text-button" onClick={() => { setSerifQuizIndex(0); setSerifQuizScore(0); setSerifQuizSelected(null); }}>Try again <RotateCcw size={15} /></button></div> : <div className="serif-quiz-question"><span className="mono">{serifQuiz.topic}</span><h3>{serifQuiz.prompt}</h3><div className="serif-quiz-options">{serifQuiz.options.map((option) => <button key={option} className={serifQuizSelected === option ? (option === serifQuiz.answer ? "correct" : "wrong") : serifQuizSelected && option === serifQuiz.answer ? "correct" : ""} onClick={() => answerSerifQuiz(option)}><span>{option === serifQuiz.answer ? "Aa" : "A"}</span>{option}</button>)}</div>{serifQuizSelected && <div className={`serif-quiz-feedback ${serifQuizSelected === serifQuiz.answer ? "good" : "bad"}`}><strong>{serifQuizSelected === serifQuiz.answer ? "Correct." : "Not quite."}</strong><span>{serifQuiz.explanation}</span><button className="text-button" onClick={nextSerifQuiz}>{serifQuizIndex === serifQuizQuestions.length - 1 ? "See result" : "Next question"}<ArrowRight size={15} /></button></div>}</div>}</section>
      </div>
    </ExhibitFrame>;
  };

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
      case "serif-sans": return renderSerifSans();
      default: return renderHub();
    }
  };

  return (
    <div className={`lab-shell ${theme} ${grid ? "show-grid" : ""} ${exhibition ? "is-exhibition" : ""}`} onPointerMove={handlePointer} style={{ "--pointer-x": `${pointer.x}%`, "--pointer-y": `${pointer.y}%` } as React.CSSProperties}>
      {!entered ? <section className="entry-screen"><div className="entry-grid" /><div className="entry-top"><span>TYPE//LAB</span><span>AN INTERACTIVE STUDY OF TYPOGRAPHY</span><span>EST. 2026 / 01—10</span></div><div className="entry-center"><div className="entry-marker"><span className="blue-dot" /> A DIGITAL EXHIBITION</div><h1><span>TYPE</span><span>IS</span><span>EVERYWHERE<span className="period">.</span></span></h1><div className="entry-bottom"><p>Typography is not decoration.<br />It is how information gets a body.</p><button className="enter-button" onClick={() => setEntered(true)}>ENTER THE LAB <ArrowRight size={17} /></button></div></div><div className="entry-cursor">MOVE TO BEGIN <MousePointer2 size={14} /></div></section> : <>
        {!exhibition && <header className="lab-header"><button className="brand-button" onClick={goHub}><span className="brand-mark">T</span><span>TYPE<span>//</span>LAB</span></button><div className="header-center">{view === "hub" ? <span className="header-location">LAB HUB / INDEX</span> : <><span className="header-location">EXHIBIT / {currentExhibit?.number}</span><span className="header-title">{currentExhibit?.title}</span></>}</div><div className="header-actions"><button aria-label="Toggle grid overlay" className={grid ? "active" : ""} onClick={() => setGrid(!grid)}><Grid3X3 size={16} /></button><button aria-label="Toggle theme" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? <Moon size={16} /> : <Sun size={16} />}</button><button aria-label="Open toolbox" className={toolbox ? "active" : ""} onClick={() => setToolbox(!toolbox)}><SlidersHorizontal size={16} /></button></div></header>}
        <div className="view-wrap">{renderExhibit()}</div>
        {view !== "hub" && !exhibition && <div className="section-nav"><button onClick={goHub}><ArrowLeft size={15} /> Back to lab</button><span className="section-count">{currentExhibit?.number} / 10</span><div><button aria-label="Previous exhibit" onClick={goPrev}><ChevronLeft size={17} /></button><button aria-label="Next exhibit" onClick={goNext}><ChevronRight size={17} /></button></div></div>}
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
