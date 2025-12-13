import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, RefreshCw, ArrowRight, Info, Sparkles } from "lucide-react";
import { caesarCipher, ALPHABET } from "@/lib/caesar";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [message, setMessage] = useState("");
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-update result when inputs change
  useEffect(() => {
    const output = caesarCipher(message, shift, mode === "decrypt");
    setResult(output);
  }, [message, shift, mode]);

  const handleAction = (newMode: "encrypt" | "decrypt") => {
    setMode(newMode);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const resetApp = () => {
    setMessage("");
    setShift(3);
    setMode("encrypt");
    setResult("");
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-center font-sans text-slate-800">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-white/50 rounded-full mb-4 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-primary mr-2" />
            <span className="text-primary font-bold tracking-wide text-sm uppercase">Mathématiques en action</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
            Cryptage César
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Découvre le secret des codes anciens. Déplace les lettres, transforme le message et deviens un maître du chiffrement !
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Main Interface */}
          <div className="md:col-span-7 space-y-6">
            <motion.div 
              layout
              className="glass-card rounded-3xl p-6 md:p-8 space-y-6"
            >
              {/* Input Area */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">
                  Ton Message Secret
                </label>
                <Textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Écris ton message ici..."
                  className="min-h-[120px] text-lg bg-white/50 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl resize-none shadow-inner"
                  data-testid="input-message"
                />
              </div>

              {/* Controls */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      Décalage (Clé)
                    </label>
                    <span className="bg-primary text-white font-mono font-bold text-xl w-10 h-10 flex items-center justify-center rounded-lg shadow-md">
                      {shift}
                    </span>
                  </div>
                  <Slider 
                    value={[shift]}
                    onValueChange={(vals) => setShift(vals[0])}
                    min={0}
                    max={25}
                    step={1}
                    className="py-4"
                    data-testid="slider-shift"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-mono px-1">
                    <span>0</span>
                    <span>13</span>
                    <span>25</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleAction("encrypt")}
                    variant={mode === "encrypt" ? "default" : "outline"}
                    className={`h-12 text-md rounded-xl transition-all duration-300 ${mode === "encrypt" ? "shadow-lg shadow-primary/25 scale-[1.02]" : "hover:bg-primary/5"}`}
                    data-testid="btn-encrypt"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Chiffrer
                  </Button>
                  <Button
                    onClick={() => handleAction("decrypt")}
                    variant={mode === "decrypt" ? "default" : "outline"}
                    className={`h-12 text-md rounded-xl transition-all duration-300 ${mode === "decrypt" ? "shadow-lg shadow-primary/25 scale-[1.02] bg-secondary hover:bg-secondary/90 text-slate-900" : "hover:bg-secondary/10"}`}
                    data-testid="btn-decrypt"
                  >
                    <Unlock className="w-4 h-4 mr-2" />
                    Déchiffrer
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Result Area */}
            <motion.div 
              layout
              className={`result-card rounded-3xl p-6 md:p-8 relative overflow-hidden transition-colors duration-500 ${mode === "encrypt" ? "border-primary/50" : "border-secondary/50"}`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              <div className="flex justify-between items-start mb-4">
                <label className={`text-sm font-bold uppercase tracking-wider ${mode === "encrypt" ? "text-primary" : "text-secondary-foreground"}`}>
                  Résultat {mode === "encrypt" ? "Chiffré" : "Déchiffré"}
                </label>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={resetApp}
                  className="hover:bg-slate-100 rounded-full -mt-2 -mr-2"
                  title="Réinitialiser"
                  data-testid="btn-reset"
                >
                  <RefreshCw className="w-5 h-5 text-slate-400" />
                </Button>
              </div>
              
              <div className="min-h-[60px] flex items-center">
                {result ? (
                  <motion.p 
                    key={result}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl md:text-3xl font-mono font-medium text-slate-800 break-all"
                    data-testid="text-result"
                  >
                    {result}
                  </motion.p>
                ) : (
                  <span className="text-slate-300 italic text-lg">Le résultat apparaîtra ici...</span>
                )}
              </div>
            </motion.div>
          </div>

          {/* Educational Side Panel */}
          <div className="md:col-span-5 space-y-6">
            {/* Alphabet Visualization */}
            <div className="glass-card rounded-3xl p-6 overflow-hidden">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center mr-3 text-indigo-600">Aa</span>
                L'Alphabet Décalé
              </h3>
              
              <div className="relative">
                <div className="flex justify-between text-xs text-slate-400 font-bold uppercase mb-2 px-1">
                  <span>Original</span>
                  <span>Codé</span>
                </div>
                
                <div className="space-y-2 max-h-[400px] overflow-y-auto alphabet-scroll pr-2">
                  {ALPHABET.split("").map((char, i) => {
                    const shiftedChar = ALPHABET[(i + shift) % 26];
                    const isActive = message.toUpperCase().includes(char) || result.includes(shiftedChar);
                    
                    return (
                      <div 
                        key={char} 
                        className={`flex items-center justify-between p-2 rounded-xl border border-transparent transition-all duration-200 ${isActive ? "bg-white shadow-sm border-slate-100 scale-[1.02]" : "hover:bg-white/40"}`}
                      >
                        <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold ${isActive ? "bg-slate-100 text-slate-800" : "text-slate-400"}`}>
                          {char}
                        </span>
                        
                        <ArrowRight className={`w-4 h-4 ${isActive ? "text-primary" : "text-slate-300"}`} />
                        
                        <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold ${isActive ? "bg-primary text-white shadow-md shadow-primary/30" : "text-slate-400"}`}>
                          {shiftedChar}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Did You Know Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20">
              <div className="flex items-start gap-4">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Le saviez-vous ?</h3>
                  <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                    Le chiffre de César porte le nom de Jules César, qui l'utilisait pour sa correspondance secrète militaire.
                  </p>
                  <div className="bg-black/20 rounded-lg p-3 font-mono text-xs text-center border border-white/10">
                    C = (L + {shift}) mod 26
                  </div>
                  <p className="text-[10px] text-center mt-2 text-indigo-200 opacity-70">
                    C = Lettre Codée, L = Lettre Originale
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
