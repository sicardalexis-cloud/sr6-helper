// src/components/MagicRoutineModal/useMagicRoutine.ts
import { useState, useEffect } from "react";
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
  const [tempSpirits, setTempSpirits] = useState<any[]>([]);   // ← Liste temporaire

  const [routineTradition, setRoutineTradition] = useState<"hermetic" | "shamanic">("hermetic");
  const [routineWIL, setRoutineWIL] = useState<number>(5);
  const [routineTDA, setRoutineTDA] = useState<number>(6);
  const [routineBOD, setRoutineBOD] = useState<number>(3);
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
      cast: { spellId: "", castingPool: 10, minHits: 2, autoRetry: true } 
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

            const inv = rollDice(conjuringPool);
            const spi = rollDice(force * 2);
            const dr = rollDice(routineWIL + routineTDA);

            const invH = countHits(inv);
            const spiH = countHits(spi);
            const drH = countHits(dr);

            const servicesThis = Math.max(0, invH - spiH);
            const drainThis = Math.max(0, spiH - drH);

            services = Math.max(services, servicesThis);
            drain += drainThis;

            allAttempts.push({
              invocationRolls: inv,
              spiritRolls: spi,
              drainRolls: dr,
              drainThisAttempt: drainThis
            });

            console.log(`    Tentative ${attempts} → Services: ${services}/${minServices} | Drain actuel: ${drain}`);

            // === AUTO-RESTS ===
            while (drain >= maxDrainThreshold && autoRestsCount < maxAutoRests && !routineStopped) {
              const restPool = routineBOD + routineWIL;
              const rolls = rollDice(restPool);
              const hits = countHits(rolls);
              const healed = Math.min(drain, hits);

              drain = Math.max(0, drain - healed);
              autoRestsCount++;

              console.log(`      → Auto-rest #${autoRestsCount} | Drain récupéré: ${healed} | Drain restant: ${drain}`);

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
                console.log("⛔ Max auto-rests atteint → arrêt complet de la routine");
              }
            }

            await new Promise(r => setTimeout(r, 400));
          }

          // Résultat final de l'étape Summon
          results.push({
            stepNumber,
            type: "summon",
            services,
            drain: Math.floor(drain),
            attempts,
            allAttempts,
            interruptedByDrain: drain >= maxDrainThreshold
          });

          // === AJOUT DE L'ESPRIT TEMPORAIRE ===
          if (services >= minServices) {
            const newSpirit = {
              id: `temp-spirit-${Date.now()}`,
              name: `${step.summon.spiritType.charAt(0).toUpperCase() + step.summon.spiritType.slice(1)} Spirit`,
              type: step.summon.spiritType,
              force: step.summon.force,
              services: services,
              remainingServices: services,
              temporary: true,
              summonedFromRoutine: true
            };

            setTempSpirits(prev => [...prev, newSpirit]);

            console.log(`➕ Esprit temporaire ajouté : ${newSpirit.name} (${services} services)`);
          }
        } 


        else if (step.type === "cast" && step.cast) {
          const { 
            castingPool = 10, 
            minHits = 2, 
            autoRetry = false, 
            spellId, 
            increaseAttribute = false, 
            essenceThreshold = 6,
            boostAttribute = "WIL"
          } = step.cast;

          // Recherche du sort pour récupérer son Drain de base
          const spell = ALL_SPELLS.find(s => s.id === spellId);
          const baseDrain = Number(spell?.drain) || 3;

          let hits = 0;
          let attempts = 0;
          const allAttempts: any[] = [];

          console.log(`  Cast ${spell?.name || spellId} | Drain de base = ${baseDrain}`);

          while (hits < minHits && (autoRetry || attempts === 0) && attempts < 20) {
            attempts++;

            const spellRolls = rollDice(castingPool);
            const spellHits = countHits(spellRolls);

            const drainRolls = rollDice(routineWIL + routineTDA);
            const drainHits = countHits(drainRolls);

            let drainThis = Math.max(0, baseDrain - drainHits);

            // === LOGIQUE INCREASE ATTRIBUTE ===
                       if (increaseAttribute) {
              const essenceCible = essenceThreshold || 6;
              let netHits = essenceCible - 5 + spellHits;
              netHits = Math.max(0, Math.min(4, netHits));   // limite 0-4

              const attr = (step.cast.boostAttribute || "WIL") as "WIL" | "TDA" | "BOD";

              const currentBest = tempBoosts[attr];

              if (netHits > currentBest) {
                const improvement = netHits - currentBest;

                // Mise à jour du meilleur bonus
                setTempBoosts(prev => ({ ...prev, [attr]: netHits }));

                // Application immédiate sur l'attribut temporaire
                if (attr === "WIL") setRoutineWIL(prev => prev + improvement);
                else if (attr === "TDA") setRoutineTDA(prev => prev + improvement);
                else if (attr === "BOD") setRoutineBOD(prev => prev + improvement);

                // Extra drain uniquement si le bonus est accepté
                const extraDrain = Math.max(0, netHits - 1);
                drainThis += extraDrain;

                console.log(`      → ${attr} boosté : +${netHits} (amélioration +${improvement}) | +${extraDrain} drain`);
              } else {
                console.log(`      → Boost ${attr} ignoré (${netHits} ≤ meilleur actuel ${currentBest}) → pas d'extra drain`);
              }
            }

            hits = Math.max(hits, spellHits);
            drain += drainThis;

            allAttempts.push({
              spellRolls,
              drainRolls,
              drainThisAttempt: drainThis,
              baseDrain,
              drainHits,
              netHits: increaseAttribute ? Math.max(0, Math.min(4, (essenceThreshold) - 5 + spellHits)) : undefined
            });

            console.log(`    Tentative ${attempts} → Hits: ${spellHits} | Drain causé: ${drainThis}`);

            await new Promise(r => setTimeout(r, 400));
          }

          results.push({
            stepNumber,
            type: "cast",
            services: hits,
            drain: Math.floor(drain),
            attempts,
            allAttempts,
            spellId: spellId,
            interruptedByDrain: drain >= maxDrainThreshold
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