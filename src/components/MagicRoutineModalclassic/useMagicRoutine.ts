// src/components/MagicRoutineModal/useMagicRoutine.ts
import { useState, useEffect, useRef } from "react";
import { ALL_SPELLS } from "../../data/spells";


const ROUTINE_KEY = 'magic-routine-state';

export const useMagicRoutine = ({ char, isOpen }: { char: any; isOpen: boolean }) => {
  const [steps, setSteps] = useState<any[]>([]);
  const [stepResults, setStepResults] = useState<any[]>([]);
  const [totalDrain, setTotalDrain] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [autoRestsUsed, setAutoRestsUsed] = useState(0);

const [tempBoosts, setTempBoosts] = useState<{
    WIL: number;
    TDA: number;
    BOD: number;
  }>({
    WIL: 0,
    TDA: 0,
    BOD: 0
  });
    const [tempSpirits, setTempSpirits] = useState<any[]>([]);   
  const tempSpiritsRef = useRef<any[]>([]);

  useEffect(() => {
    tempSpiritsRef.current = tempSpirits;
  }, [tempSpirits]);

    const [routineTradition, setRoutineTradition] = useState<"hermetic" | "shamanic">("hermetic");
  const [routineWIL, setRoutineWIL] = useState<number>(5);
  const [routineTDA, setRoutineTDA] = useState<number>(6);
  const [routineBOD, setRoutineBOD] = useState<number>(3);
    // === RÉFÉRENCE FRAÎCHE POUR TOUS LES ATTRIBUTS TEMPORAIRES ===
  const routineAttributesRef = useRef({ BOD: 3, WIL: 5, TDA: 6 });

  useEffect(() => {
    routineAttributesRef.current = { 
      BOD: routineBOD, 
      WIL: routineWIL, 
      TDA: routineTDA 
    };
  }, [routineBOD, routineWIL, routineTDA]);

  const [maxDrainThreshold, setMaxDrainThreshold] = useState<number>(12);
  const [maxAutoRests, setMaxAutoRests] = useState<number>(3);

  const resetAttributesToChar = () => {
    const attrs = char?.attributes || {};
    setRoutineWIL(attrs.WIL ?? 5);
    setRoutineBOD(attrs.BOD ?? 3);
    if (routineTradition === "shamanic") {
      setRoutineTDA(attrs.CHA ?? 6);
    } else {
      setRoutineTDA(attrs.LOG ?? 6);
    }
  };

  // Persistance
  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(ROUTINE_KEY);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          if (data.steps) setSteps(data.steps);
          if (data.routineTradition) setRoutineTradition(data.routineTradition);
          if (data.maxDrainThreshold) setMaxDrainThreshold(data.maxDrainThreshold);
          if (data.maxAutoRests !== undefined) setMaxAutoRests(data.maxAutoRests);
        } catch (e) {}
      } else {
        resetAttributesToChar();
      }
    }
  }, [isOpen, char]);

  useEffect(() => {
    if (isOpen) {
      localStorage.setItem(ROUTINE_KEY, JSON.stringify({
        steps,
        routineTradition,
        maxDrainThreshold,
        maxAutoRests,
      }));
    }
  }, [steps, routineTradition, maxDrainThreshold, maxAutoRests, isOpen]);

      const resetProgress = () => {
    setStepResults([]);
    setTotalDrain(0);
    setAutoRestsUsed(0);
    setIsRunning(false);
    setTempSpirits([]);                    // ← Reset de la liste temporaire des esprits

    // Reset direct et explicite des attributs temporaires
    const attrs = char?.attributes || {};
    setRoutineWIL(attrs.WIL ?? 5);
    setRoutineBOD(attrs.BOD ?? 3);
    
    if (routineTradition === "shamanic") {
      setRoutineTDA(attrs.CHA ?? 6);
    } else {
      setRoutineTDA(attrs.LOG ?? 6);
    }

    // Reset des boosts temporaires
    setTempBoosts({ 
      WIL: 0, 
      TDA: 0, 
      BOD: 0 
    });

    console.log("🔄 ResetProgress : Tout remis à zéro (résultats, attributs, boosts, esprits temporaires)");
  };

  const addSummonStep = () => {
    setSteps(prev => [...prev, { 
      type: "summon", 
      summon: { spiritType: "fire", force: 4, conjuringPool: 10, minServices: 1, autoRetry: true } 
    }]);
  };

    const addCastStep = () => {
    setSteps(prev => [...prev, { 
      type: "cast", 
      cast: { 
        spellId: "", 
        castingPool: 10, 
        minHits: 2, 
        autoRetry: true,
        caster: "mage",           // ← AJOUTE ÇA
        increaseAttribute: false
      } 
    }]);
  };

  const addRestStep = () => {
    setSteps(prev => [...prev, { type: "rest" }]);
  };

  const removeStep = (index: number) => {
    setSteps(prev => prev.filter((_, i) => i !== index));
  };

  const rollDice = (pool: number) => Array.from({ length: pool }, () => Math.floor(Math.random() * 6) + 1);
  const countHits = (rolls: number[]) => rolls.filter(r => r >= 5).length;

 // === NOUVELLE FONCTION GLITCH ===
  const detectGlitch = (rolls: number[], pool: number) => {
    const ones = rolls.filter(d => d === 1).length;
    const isGlitch = ones > pool / 2;
    const hits = countHits(rolls);
    const isCriticalGlitch = isGlitch && hits === 0;

    return { isGlitch, isCriticalGlitch, ones };
  };

     const runRoutine = async () => {
      if (steps.length === 0 || isRunning) return;

      resetProgress();
      setIsRunning(true);

      let drain = 0;
      const results: any[] = [];
      let autoRestsCount = 0;
      let routineStopped = false;   // ← NOUVEAU

      console.log("=== DÉBUT NOUVELLE ROUTINE ===");
      console.log(`Nombre d'étapes : ${steps.length}`);

      for (let i = 0; i < steps.length; i++) {
        if (routineStopped) break;   // ← Arrêt global

        const step = steps[i];
        const stepNumber = i + 1;

        console.log(`\n→ Début de l'étape ${stepNumber} : ${step.type.toUpperCase()}`);

                              if (step.type === "summon" && step.summon) {
          const { conjuringPool = 10, force = 4, minServices = 1, autoRetry = false } = step.summon;

          let services = 0;
          let attempts = 0;
          const allAttempts: any[] = [];

          while (services < minServices && (autoRetry || attempts === 0) && attempts < 20 && !routineStopped) {
            attempts++;

            const attrs = routineAttributesRef.current;

            const inv = rollDice(conjuringPool);
            const spi = rollDice(force * 2);
            const dr = rollDice(attrs.WIL + attrs.TDA);

            const invH = countHits(inv);
            const spiH = countHits(spi);
            const drH = countHits(dr);

            const servicesThis = Math.max(0, invH - spiH);
            const drainThis = Math.max(0, spiH - drH);

            services = Math.max(services, servicesThis);
            drain += drainThis;

            // === GLITCH DETECTION ===
            const invGlitch = detectGlitch(inv, conjuringPool);
            const spiGlitch = detectGlitch(spi, force * 2);
            const drGlitch = detectGlitch(dr, attrs.WIL + attrs.TDA);

            let glitchMessage = "";
            if (invGlitch.isCriticalGlitch || spiGlitch.isCriticalGlitch || drGlitch.isCriticalGlitch) {
              glitchMessage = "💥 CRITICAL GLITCH !";
              routineStopped = true;
              console.log("💥 CRITICAL GLITCH détecté → Arrêt immédiat de la routine");
            } else if (invGlitch.isGlitch || spiGlitch.isGlitch || drGlitch.isGlitch) {
              glitchMessage = "⚠️ GLITCH";
              console.log("⚠️ Glitch détecté sur cette tentative");
            }

            allAttempts.push({
              invocationRolls: inv,
              spiritRolls: spi,
              drainRolls: dr,
              drainThisAttempt: drainThis,
              glitch: { invocation: invGlitch, spirit: spiGlitch, drain: drGlitch }
            });

            console.log(`    Tentative ${attempts} → Services: ${services}/${minServices} | Drain: ${drain} ${glitchMessage}`);

            // Auto-rests...
            while (drain >= maxDrainThreshold && autoRestsCount < maxAutoRests && !routineStopped) {
              const restPool = attrs.BOD + attrs.WIL;
              const rolls = rollDice(restPool);
              const hits = countHits(rolls);
              const healed = Math.min(drain, hits);

              drain = Math.max(0, drain - healed);
              autoRestsCount++;

              console.log(`      → Auto-rest #${autoRestsCount} | Pool = ${restPool} | Hits = ${hits} | Drain récupéré = ${healed}`);

              results.push({
                stepNumber,
                type: "rest",
                isAutoRest: true,
                pool: restPool,
                hits,
                drainHealed: healed,
                rolls,
                autoRestNumber: autoRestsCount,
                triggeredByAttempt: attempts
              });

              setStepResults([...results]);
              await new Promise(r => setTimeout(r, 700));

              if (autoRestsCount >= maxAutoRests) {
                routineStopped = true;
              }
            }

            await new Promise(r => setTimeout(r, 400));
          }

          // Résultat final Summon
          results.push({
            stepNumber,
            type: "summon",
            services,
            drain: Math.floor(drain),
            attempts,
            allAttempts,
            interruptedByDrain: drain >= maxDrainThreshold
          });

          if (services >= minServices) {
            const newSpirit = {
              id: `temp-spirit-${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
              element: step.summon.spiritType,
              force: step.summon.force,
              servicesRemaining: services,
              conditionDamage: 0,
              invocationDate: new Date().toLocaleDateString("fr-FR"),
              solarPhase: "Day",
              solarTokens: 2,
              temporary: true,
              summonedFromRoutine: true
            };

            setTempSpirits(prev => [...prev, newSpirit]);
          }
        } 

                                          else if (step.type === "cast" && step.cast) {
          const castConfig = step.cast || {};
          const { 
            castingPool = 10, 
            minHits = 2, 
            autoRetry = false, 
            spellId, 
            increaseAttribute = false, 
            essenceThreshold = 6,
            boostAttribute = "WIL",
            caster = "mage"
          } = castConfig;

          const spell = ALL_SPELLS.find(s => s.id === spellId);
          const baseDrain = Number(spell?.drain) || 3;

          let hits = 0;
          let attempts = 0;
          const allAttempts: any[] = [];

          const currentSpirits = [...tempSpiritsRef.current];
          const attrs = routineAttributesRef.current;
          let resistancePool = attrs.WIL + attrs.TDA;
          let isSpiritCasting = false;
          let castingSpirit = null;

          if (caster === "spirit" && currentSpirits.length > 0) {
            castingSpirit = currentSpirits[currentSpirits.length - 1];
            resistancePool = castingSpirit.force * 2;
            isSpiritCasting = true;
            console.log(`🌟 [CAST] Esprit détecté : ${castingSpirit.element?.toUpperCase() || "UNKNOWN"} (Force ${castingSpirit.force})`);
          } else {
            console.log(`🧙 [CAST] Mage casting (caster="${caster}" | Pool = ${resistancePool})`);
          }

          while (hits < minHits && (autoRetry || attempts === 0) && attempts < 20 && !routineStopped) {
            attempts++;

            const spellRolls = rollDice(castingPool);
            const spellHits = countHits(spellRolls);

            const drainRolls = rollDice(resistancePool);
            const drainHits = countHits(drainRolls);

            let drainThis = Math.max(0, baseDrain - drainHits);

            if (increaseAttribute) {
              const essenceCible = essenceThreshold || 6;
              let netHits = essenceCible - 5 + spellHits;
              netHits = Math.max(0, Math.min(4, netHits));

              const attr = (boostAttribute) as "WIL" | "TDA" | "BOD";
              const currentBest = tempBoosts[attr];

              if (netHits > currentBest) {
                const improvement = netHits - currentBest;
                setTempBoosts(prev => ({ ...prev, [attr]: netHits }));

                if (attr === "WIL") setRoutineWIL(p => p + improvement);
                else if (attr === "TDA") setRoutineTDA(p => p + improvement);
                else if (attr === "BOD") setRoutineBOD(p => p + improvement);

                const extraDrain = Math.max(0, netHits - 1);
                drainThis += extraDrain;
              }
            }

            hits = Math.max(hits, spellHits);

            // === GLITCH DETECTION SUR CAST ===
            const spellGlitch = detectGlitch(spellRolls, castingPool);
            const drainGlitch = detectGlitch(drainRolls, resistancePool);

            let glitchMessage = "";
            if (spellGlitch.isCriticalGlitch || drainGlitch.isCriticalGlitch) {
              glitchMessage = "💥 CRITICAL GLITCH !";
              routineStopped = true;
              console.log("💥 CRITICAL GLITCH sur Cast → Arrêt immédiat de la routine");
            } else if (spellGlitch.isGlitch || drainGlitch.isGlitch) {
              glitchMessage = "⚠️ GLITCH";
              console.log("⚠️ Glitch détecté sur Cast");
            }

            if (isSpiritCasting && castingSpirit) {
              let remaining = castingSpirit.servicesRemaining ?? castingSpirit.services ?? 0;
              remaining = Math.max(0, remaining - 1);

              const spiritDrain = drainThis;
              let newConditionDamage = (castingSpirit.conditionDamage || 0) + spiritDrain;

              castingSpirit.servicesRemaining = remaining;
              castingSpirit.conditionDamage = newConditionDamage;

              console.log(`      → ${castingSpirit.element?.toUpperCase()} Spirit encaisse ${spiritDrain} drain | Condition Damage: ${newConditionDamage} | Services restants: ${remaining} ${glitchMessage}`);
            } else {
              drain += drainThis;
              console.log(`      → Mage encaisse ${drainThis} drain ${glitchMessage}`);
            }

            allAttempts.push({
              spellRolls,
              drainRolls,
              drainThisAttempt: drainThis,
              caster: isSpiritCasting ? "spirit" : "mage",
              glitch: { spell: spellGlitch, drain: drainGlitch }
            });

            await new Promise(r => setTimeout(r, 400));
          }

          // Vérification auto-rest après le cast
          while (drain >= maxDrainThreshold && autoRestsCount < maxAutoRests && !routineStopped) {
            const restPool = attrs.BOD + attrs.WIL;
            const rolls = rollDice(restPool);
            const hits = countHits(rolls);
            const healed = Math.min(drain, hits);

            drain = Math.max(0, drain - healed);
            autoRestsCount++;

            results.push({
              stepNumber,
              type: "rest",
              isAutoRest: true,
              pool: restPool,
              hits,
              drainHealed: healed,
              rolls,
              autoRestNumber: autoRestsCount,
              triggeredByAttempt: attempts
            });

            setStepResults([...results]);
            await new Promise(r => setTimeout(r, 700));

            if (autoRestsCount >= maxAutoRests) routineStopped = true;
          }

          results.push({
            stepNumber,
            type: "cast",
            services: hits,
            drain: Math.floor(drain),
            attempts,
            allAttempts,
            spellId,
            isSpiritCasting,
            interruptedByDrain: !isSpiritCasting && drain >= maxDrainThreshold
          });
        }

        setStepResults([...results]);
        setTotalDrain(drain);
        await new Promise(r => setTimeout(r, 300));
      }

      console.log("=== FIN DE LA ROUTINE ===");
      setIsRunning(false);
    };

    return {
    steps,
    setSteps,
    stepResults,
    totalDrain,
    isRunning,
    maxDrainThreshold,
    setMaxDrainThreshold,
    maxAutoRests,
    setMaxAutoRests,
    routineTradition,
    setRoutineTradition,
    routineWIL,
    routineTDA,
    routineBOD,
    runRoutine,
    resetProgress,
    addSummonStep,
    addCastStep,
    addRestStep,
    removeStep,

    // ← AJOUTE CES DEUX LIGNES
    tempSpirits,
    setTempSpirits,
  };
};