import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, RefreshCw, ArrowRight, Info, Sparkles, Shield, Key, BarChart3, ChevronDown, Check } from "lucide-react";
import { caesarCipher, vigenereCipher, ALPHABET } from "@/lib/caesar";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [activeCipher, setActiveCipher] = useState<"caesar" | "vigenere">("caesar");
  
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  
  // Caesar State
  const [caesarShift, setCaesarShift] = useState(3);
  
  // Vigenere State
  const [vigenereKey, setVigenereKey] = useState("MATHS");

  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-update result when inputs change
  useEffect(() => {
    let output = "";
    if (activeCipher === "caesar") {
      output = caesarCipher(message, caesarShift, mode === "decrypt");
    } else {
      output = vigenereCipher(message, vigenereKey, mode === "decrypt");
    }
    setResult(output);
  }, [message, caesarShift, vigenereKey, mode, activeCipher]);

  const handleAction = (newMode: "encrypt" | "decrypt") => {
    setMode(newMode);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const resetApp = () => {
    setMessage("");
    setCaesarShift(3);
    setVigenereKey("MATHS");
    setMode("encrypt");
    setResult("");
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-start font-sans text-slate-800 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="inline-flex items-center justify-center p-3 bg-white/60 rounded-full shadow-sm backdrop-blur-sm ring-1 ring-white/50">
            <Sparkles className="w-5 h-5 text-indigo-500 mr-2" />
            <span className="text-indigo-600 font-bold tracking-wide text-xs md:text-sm uppercase">Cryptographie & Mathématiques</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-600">
            César vs Vigenère
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore deux méthodes historiques de chiffrement. Compare leur fonctionnement, leur sécurité et découvre les mathématiques qui se cachent derrière.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Interface */}
          <div className="lg:col-span-7 space-y-6">
            
            <Tabs defaultValue="caesar" value={activeCipher} onValueChange={(v) => setActiveCipher(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-14 bg-white/50 backdrop-blur p-1 rounded-2xl shadow-sm border border-white/40">
                <TabsTrigger value="caesar" className="rounded-xl text-base font-medium data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-md transition-all">
                  Chiffrement de César
                </TabsTrigger>
                <TabsTrigger value="vigenere" className="rounded-xl text-base font-medium data-[state=active]:bg-white data-[state=active]:text-cyan-600 data-[state=active]:shadow-md transition-all">
                  Chiffrement de Vigenère
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <motion.div 
              layout
              className="glass-card rounded-3xl p-6 md:p-8 space-y-6 bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-indigo-500/5"
            >
              {/* Input Area */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                   <label className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    Ton Message
                  </label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetApp}
                    className="h-8 text-xs hover:bg-slate-100 rounded-full text-slate-400"
                    title="Réinitialiser"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Effacer
                  </Button>
                </div>
               
                <Textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écris ton message secret ici..."
                  className="min-h-[120px] text-lg bg-white border-slate-200 focus:border-indigo-400 focus:ring-indigo-400/20 rounded-xl resize-none shadow-inner"
                  data-testid="input-message"
                />
              </div>

              {/* Dynamic Controls based on Cipher */}
              <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-4">
                {activeCipher === "caesar" ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                        <Key className="w-4 h-4 text-indigo-500" />
                        Décalage (Clé)
                      </label>
                      <span className="bg-indigo-600 text-white font-mono font-bold text-xl w-10 h-10 flex items-center justify-center rounded-lg shadow-md shadow-indigo-200">
                        {caesarShift}
                      </span>
                    </div>
                    <Slider 
                      value={[caesarShift]}
                      onValueChange={(vals) => setCaesarShift(vals[0])}
                      min={0}
                      max={25}
                      step={1}
                      className="py-4"
                      data-testid="slider-shift"
                    />
                    <div className="flex justify-between text-xs text-slate-400 font-mono px-1">
                      <span>A=A</span>
                      <span>A=N</span>
                      <span>A=Z</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-cyan-900 uppercase tracking-wider flex items-center gap-2">
                        <Key className="w-4 h-4 text-cyan-600" />
                        Mot-Clé Secret
                      </label>
                    </div>
                    <Input 
                      value={vigenereKey}
                      onChange={(e) => setVigenereKey(e.target.value.toUpperCase().replace(/[^A-Z]/g, ""))}
                      placeholder="EX: MATHS"
                      className="h-12 text-lg font-mono tracking-widest uppercase bg-white border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500/20"
                      data-testid="input-key"
                    />
                    <p className="text-xs text-cyan-600/70 ml-1">
                      Le mot-clé est répété pour correspondre à la longueur du message.
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleAction("encrypt")}
                  variant={mode === "encrypt" ? "default" : "outline"}
                  className={`h-14 text-lg rounded-xl transition-all duration-300 ${
                    mode === "encrypt" 
                      ? activeCipher === "caesar" 
                        ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 scale-[1.02]" 
                        : "bg-cyan-600 hover:bg-cyan-700 shadow-lg shadow-cyan-200 scale-[1.02]"
                      : "hover:bg-slate-50 border-slate-200 text-slate-500"
                  }`}
                  data-testid="btn-encrypt"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Chiffrer
                </Button>
                <Button
                  onClick={() => handleAction("decrypt")}
                  variant={mode === "decrypt" ? "default" : "outline"}
                  className={`h-14 text-lg rounded-xl transition-all duration-300 ${
                    mode === "decrypt" 
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-[1.02]" 
                      : "hover:bg-slate-50 border-slate-200 text-slate-500"
                  }`}
                  data-testid="btn-decrypt"
                >
                  <Unlock className="w-5 h-5 mr-2" />
                  Déchiffrer
                </Button>
              </div>
            </motion.div>

            {/* Result Area */}
            <motion.div 
              layout
              className={`result-card rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-500 bg-white border-2 ${
                mode === "encrypt" 
                  ? activeCipher === "caesar" ? "border-indigo-100 shadow-xl shadow-indigo-100" : "border-cyan-100 shadow-xl shadow-cyan-100"
                  : "border-emerald-100 shadow-xl shadow-emerald-100"
              }`}
            >
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r opacity-80 ${
                 mode === "encrypt" 
                  ? activeCipher === "caesar" ? "from-indigo-400 via-purple-400 to-indigo-400" : "from-cyan-400 via-teal-400 to-cyan-400"
                  : "from-emerald-400 via-green-400 to-emerald-400"
              }`} />
              
              <div className="flex justify-between items-start mb-6">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    mode === "encrypt" 
                      ? activeCipher === "caesar" ? "bg-indigo-500" : "bg-cyan-500"
                      : "bg-emerald-500"
                  }`}></span>
                  Résultat
                </label>
                <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-normal">
                  {result.length} caractères
                </Badge>
              </div>
              
              <div className="min-h-[80px] flex items-center p-4 bg-slate-50/50 rounded-xl border border-slate-100/50">
                {result ? (
                  <motion.p 
                    key={result}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-3xl font-mono font-medium text-slate-800 break-all leading-relaxed w-full"
                    data-testid="text-result"
                  >
                    {result}
                  </motion.p>
                ) : (
                  <span className="text-slate-300 italic text-lg w-full text-center">Le message transformé apparaîtra ici...</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Educational Side Panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Math Explanation Card */}
            <div className={`rounded-3xl p-6 text-white shadow-xl transition-colors duration-500 relative overflow-hidden ${
              activeCipher === "caesar" 
                ? "bg-gradient-to-br from-indigo-600 to-purple-700 shadow-indigo-500/20" 
                : "bg-gradient-to-br from-cyan-600 to-teal-700 shadow-cyan-500/20"
            }`}>
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <BarChart3 size={120} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-xl">Logique Mathématique</h3>
                </div>

                <div className="space-y-4">
                  <p className="text-white/90 text-sm leading-relaxed">
                    {activeCipher === "caesar" 
                      ? "Le chiffre de César décale chaque lettre d'un nombre fixe." 
                      : "Vigenère utilise une série de chiffres de César différents basés sur un mot-clé."}
                  </p>

                  <div className="bg-black/20 rounded-xl p-4 font-mono text-sm text-center border border-white/10 shadow-inner">
                    <div className="mb-2 text-white/60 text-xs uppercase tracking-widest">Formule de chiffrement</div>
                    {activeCipher === "caesar" ? (
                      <span className="text-lg font-bold">L' = (L + {caesarShift}) mod 26</span>
                    ) : (
                      <span className="text-lg font-bold">L' = (L + K<span className="text-xs align-sub">i</span>) mod 26</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-white/70 text-center">
                    <div className="bg-white/5 rounded px-2 py-1">L = Lettre Originale (0-25)</div>
                    <div className="bg-white/5 rounded px-2 py-1">mod 26 = Reste division par 26</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="glass-card rounded-3xl p-6 bg-white/60 backdrop-blur-md border border-white/60">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-slate-800">Comparaison Rapide</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                  <span className="text-left">Critère</span>
                  <span className="text-indigo-600">César</span>
                  <span className="text-cyan-600">Vigenère</span>
                </div>

                {/* Row 1: Simplicity */}
                <div className="grid grid-cols-3 text-sm items-center py-3 border-b border-slate-100">
                  <span className="font-medium text-slate-600">Simplicité</span>
                  <div className="flex justify-center">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Très Simple</span>
                  </div>
                  <div className="flex justify-center">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Moyen</span>
                  </div>
                </div>

                {/* Row 2: Security */}
                <div className="grid grid-cols-3 text-sm items-center py-3 border-b border-slate-100">
                  <span className="font-medium text-slate-600">Sécurité</span>
                  <div className="flex justify-center">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Faible</span>
                  </div>
                  <div className="flex justify-center">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Meilleure</span>
                  </div>
                </div>

                {/* Row 3: Key Type */}
                <div className="grid grid-cols-3 text-sm items-center py-3 border-b border-slate-100">
                  <span className="font-medium text-slate-600">Type de Clé</span>
                  <div className="text-center text-slate-500 text-xs">Un nombre (0-25)</div>
                  <div className="text-center text-slate-500 text-xs">Un mot (Lettres)</div>
                </div>
                
                 {/* Row 4: Vulnerability */}
                 <div className="grid grid-cols-3 text-sm items-center py-3">
                  <span className="font-medium text-slate-600">Faiblesse</span>
                  <div className="text-center text-slate-500 text-xs">Analyse fréquentielle facile</div>
                  <div className="text-center text-slate-500 text-xs">Mot-clé court = répétition</div>
                </div>
              </div>
            </div>

            {/* Alphabet Visualization (Simplified for Comparison view) */}
            <div className="glass-card rounded-3xl p-5 bg-white/40 backdrop-blur-sm border border-white/40">
               <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center">
                 Aperçu de la transformation
               </h3>
               <div className="flex flex-wrap gap-1 justify-center">
                  {message.slice(0, 15).toUpperCase().split('').map((char, i) => {
                     if (!ALPHABET.includes(char)) return null;
                     
                     let shiftedChar = char;
                     if (activeCipher === "caesar") {
                       const idx = ALPHABET.indexOf(char);
                       shiftedChar = ALPHABET[(idx + caesarShift) % 26];
                     } else if (vigenereKey) {
                       const idx = ALPHABET.indexOf(char);
                       const cleanKey = vigenereKey.replace(/[^A-Z]/g, "");
                       if (cleanKey) {
                         const k = cleanKey[i % cleanKey.length];
                         const shift = ALPHABET.indexOf(k);
                         shiftedChar = ALPHABET[(idx + shift) % 26];
                       }
                     }

                     return (
                       <div key={i} className="flex flex-col items-center gap-1">
                         <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-slate-400 font-mono text-xs border border-slate-100">{char}</div>
                         <ArrowRight className="w-3 h-3 text-slate-300 rotate-90" />
                         <div className={`w-8 h-8 rounded flex items-center justify-center font-bold font-mono text-sm text-white shadow-sm ${
                           activeCipher === "caesar" ? "bg-indigo-500" : "bg-cyan-500"
                         }`}>
                           {shiftedChar}
                         </div>
                       </div>
                     )
                  })}
                  {message.length === 0 && (
                    <div className="text-slate-400 text-sm italic py-4">Commence à écrire pour voir la transformation lettre par lettre...</div>
                  )}
               </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
