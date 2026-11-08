import React from 'react';
import { Play, Sun, Moon, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types.ts';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isDark: boolean;
  toggleDark: () => void;
  onOpenPromptSimulation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  toggleDark,
  onOpenPromptSimulation,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400 font-mono text-base font-bold text-slate-950 shadow-sm">
            JS
          </div>
          <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            Praticando JS <span className="font-normal text-slate-400 dark:text-slate-500">· Ex 1</span>
          </span>
        </div>

        {/* Zone 2: 5 clean single-line navigation tabs */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'bg-slate-100 text-slate-950 font-semibold dark:bg-slate-800 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Simulador
          </button>
          <button
            onClick={() => setActiveTab('stepper')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'stepper'
                ? 'bg-slate-100 text-slate-950 font-semibold dark:bg-slate-800 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Passo a Passo
          </button>
          <button
            onClick={() => setActiveTab('math')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'math'
                ? 'bg-slate-100 text-slate-950 font-semibold dark:bg-slate-800 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Visualizador Matemático
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'editor'
                ? 'bg-slate-100 text-slate-950 font-semibold dark:bg-slate-800 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Editor & Desafios
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'bg-slate-100 text-slate-950 font-semibold dark:bg-slate-800 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Quiz Teórico
          </button>
        </nav>

        {/* Zone 3: 1 primary action + theme toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleDark}
            aria-label="Alternar tema claro e escuro"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={onOpenPromptSimulation}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors whitespace-nowrap"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Simular prompt()</span>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div className="flex md:hidden overflow-x-auto border-t border-slate-200 dark:border-slate-800 px-4 py-2 gap-2 text-xs">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'simulator'
              ? 'bg-slate-200 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Simulador
        </button>
        <button
          onClick={() => setActiveTab('stepper')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'stepper'
              ? 'bg-slate-200 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Passo a Passo
        </button>
        <button
          onClick={() => setActiveTab('math')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'math'
              ? 'bg-slate-200 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Visualizador
        </button>
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'editor'
              ? 'bg-slate-200 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'quiz'
              ? 'bg-slate-200 dark:bg-slate-800 font-semibold text-slate-900 dark:text-white'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Quiz
        </button>
      </div>
    </header>
  );
};
