import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { PromptSimulatorModal } from './components/PromptSimulatorModal.tsx';
import { DirectCalculator } from './components/DirectCalculator.tsx';
import { CodeStepper } from './components/CodeStepper.tsx';
import { MathVisualizer } from './components/MathVisualizer.tsx';
import { CodePlayground } from './components/CodePlayground.tsx';
import { QuizSection } from './components/QuizSection.tsx';
import { TheoryNotes } from './components/TheoryNotes.tsx';
import { ActiveTab, ExecutionRecord } from './types.ts';
import { Code2, Sparkles, BookOpen, Calculator, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('simulator');
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme_preference');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [history, setHistory] = useState<ExecutionRecord[]>(() => {
    return [
      {
        id: 'init-1',
        timestamp: '10:00:15',
        input1: '10',
        input2: '2',
        num1: 10,
        num2: 2,
        status: 'success',
        resultText: 'O resultado da divisão é igual a: 5',
        quotient: 5,
        remainder: 0,
      },
      {
        id: 'init-2',
        timestamp: '10:01:42',
        input1: '15',
        input2: '0',
        num1: 15,
        num2: 0,
        status: 'division_by_zero',
        resultText: 'Erro: não é possível dividir por zero!',
      },
    ];
  });

  // Dark mode effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_preference', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_preference', 'light');
    }
  }, [isDark]);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  const handleAddHistory = (record: ExecutionRecord) => {
    setHistory((prev) => [record, ...prev]);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handlePromptFinish = (num1Str: string, num2Str: string, result: string, isError: boolean) => {
    const n1 = parseFloat(num1Str);
    const n2 = parseFloat(num2Str);
    const hasNaN = isNaN(n1) || isNaN(n2);
    const isZero = !hasNaN && n2 === 0;

    const record: ExecutionRecord = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      input1: num1Str,
      input2: num2Str,
      num1: n1,
      num2: n2,
      status: hasNaN ? 'invalid_input' : isZero ? 'division_by_zero' : 'success',
      resultText: result,
      quotient: !hasNaN && !isZero ? n1 / n2 : undefined,
      remainder: !hasNaN && !isZero ? n1 % n2 : undefined,
    };
    handleAddHistory(record);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Navigation Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleDark={toggleDark}
        onOpenPromptSimulation={() => setIsPromptModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Context Area */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>JavaScript Fundamental</span>
            <span aria-hidden="true">·</span>
            <span>Exercício 1</span>
            <span aria-hidden="true">·</span>
            <span>Funções & Validações</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
                Praticando JavaScript — Exercício 1
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
                Divisão de números com entrada de dados via <code className="font-mono text-indigo-600 dark:text-indigo-400">prompt()</code>, conversão com <code className="font-mono text-indigo-600 dark:text-indigo-400">parseFloat()</code>, checagem de <code className="font-mono text-indigo-600 dark:text-indigo-400">isNaN()</code> e proteção contra divisão por zero.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsPromptModalOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors whitespace-nowrap"
              >
                <Terminal className="h-4 w-4" />
                <span>Simular prompt() & alert()</span>
              </button>
            </div>
          </div>
        </section>

        {/* Tab Viewport */}
        {activeTab === 'simulator' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <DirectCalculator
              history={history}
              onAddHistory={handleAddHistory}
              onClearHistory={handleClearHistory}
              onOpenPromptSimulation={() => setIsPromptModalOpen(true)}
            />
            <TheoryNotes />
          </div>
        )}

        {activeTab === 'stepper' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <CodeStepper initialNum1="10" initialNum2="2" />
            <TheoryNotes />
          </div>
        )}

        {activeTab === 'math' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <MathVisualizer />
            <TheoryNotes />
          </div>
        )}

        {activeTab === 'editor' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <CodePlayground />
            <TheoryNotes />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <QuizSection />
            <TheoryNotes />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Praticando JavaScript — Exercício 1: Divisão com validação
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('simulator')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Simulador
            </button>
            <button
              onClick={() => setActiveTab('stepper')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Passo a Passo
            </button>
            <button
              onClick={() => setActiveTab('math')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Matemática
            </button>
            <button
              onClick={() => setActiveTab('editor')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Quiz
            </button>
          </div>
        </div>
      </footer>

      {/* Authentic Browser Modal Simulation */}
      <PromptSimulatorModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        onFinishExecution={handlePromptFinish}
      />
    </div>
  );
}
