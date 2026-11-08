import React, { useState } from 'react';
import { Play, Copy, Check, RotateCcw, Award, Lightbulb, Terminal as TerminalIcon } from 'lucide-react';

const ORIGINAL_CODE = `// Exercício 1: Divisão com validação
const numero1 = parseFloat(prompt("Insira o primeiro número:"));
const numero2 = parseFloat(prompt("Insira o segundo número:"));

// Verifica se os valores digitados são números válidos
if (isNaN(numero1) || isNaN(numero2)) {
  alert("Por favor, insira números válidos!");
} else {
  const resultadoDivisao = divida(numero1, numero2);
  alert("O resultado da divisão é igual a: " + resultadoDivisao);
}

function divida(a, b) {
  if (b === 0) {
    return "Erro: não é possível dividir por zero!";
  }
  return a / b;
}`;

const CHALLENGE_1_CODE = `// Desafio 1: Formatar resultado com 2 casas decimais (toFixed)
const numero1 = parseFloat(prompt("Insira o primeiro número:"));
const numero2 = parseFloat(prompt("Insira o segundo número:"));

if (isNaN(numero1) || isNaN(numero2)) {
  alert("Por favor, insira números válidos!");
} else {
  const resultadoDivisao = divida(numero1, numero2);
  // Se for número, formata com toFixed(2)
  if (typeof resultadoDivisao === 'number') {
    alert("O resultado formatado é: " + resultadoDivisao.toFixed(2));
  } else {
    alert(resultadoDivisao);
  }
}

function divida(a, b) {
  if (b === 0) return "Erro: não é possível dividir por zero!";
  return a / b;
}`;

const CHALLENGE_2_CODE = `// Desafio 2: Calcular Quociente Inteiro e Resto da Divisão (%)
const numero1 = parseFloat(prompt("Insira o primeiro número:"));
const numero2 = parseFloat(prompt("Insira o segundo número:"));

if (isNaN(numero1) || isNaN(numero2)) {
  alert("Por favor, insira números válidos!");
} else if (numero2 === 0) {
  alert("Erro: divisão por zero!");
} else {
  const quociente = Math.floor(numero1 / numero2);
  const resto = numero1 % numero2;
  alert("Quociente: " + quociente + " | Resto: " + resto);
}`;

const CHALLENGE_3_CODE = `// Desafio 3: Sintaxe Moderna (Arrow Function + Template Literals)
const divida = (a, b) => (b === 0 ? "Erro: divisão por zero" : a / b);

const n1 = parseFloat(prompt("Primeiro número:"));
const n2 = parseFloat(prompt("Segundo número:"));

if (Number.isNaN(n1) || Number.isNaN(n2)) {
  alert("Insira valores numéricos válidos!");
} else {
  const res = divida(n1, n2);
  alert(\`Divisão de \${n1} por \${n2} = \${res}\`);
}`;

interface OutputLog {
  type: 'log' | 'alert' | 'error';
  text: string;
}

export const CodePlayground: React.FC = () => {
  const [code, setCode] = useState(ORIGINAL_CODE);
  const [copied, setCopied] = useState(false);
  const [outputLogs, setOutputLogs] = useState<OutputLog[]>([]);
  const [simPromptN1, setSimPromptN1] = useState('20');
  const [simPromptN2, setSimPromptN2] = useState('4');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    const logs: OutputLog[] = [];

    // Create safe mock functions
    const mockPrompt = (msg: string) => {
      logs.push({ type: 'log', text: `[prompt] "${msg}"` });
      if (msg.includes('primeiro') || msg.includes('Primeiro')) {
        return simPromptN1;
      }
      return simPromptN2;
    };

    const mockAlert = (msg: string) => {
      logs.push({ type: 'alert', text: `[alert] ${msg}` });
    };

    const mockConsole = {
      log: (...args: any[]) => {
        logs.push({ type: 'log', text: args.map(String).join(' ') });
      },
      error: (...args: any[]) => {
        logs.push({ type: 'error', text: args.map(String).join(' ') });
      },
    };

    try {
      // Execute the student code using Function constructor with sandbox arguments
      const runFn = new Function('prompt', 'alert', 'console', code);
      runFn(mockPrompt, mockAlert, mockConsole);
    } catch (err: any) {
      logs.push({
        type: 'error',
        text: `Erro de Execução: ${err?.message || String(err)}`,
      });
    }

    setOutputLogs(logs);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Editor de Código & Desafios Práticos
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Edite o script, experimente modificações e veja a saída no terminal simulado.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
            <button
              onClick={() => {
                setCode(ORIGINAL_CODE);
                setOutputLogs([]);
              }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restaurar</span>
            </button>
          </div>
        </div>

        {/* Challenge Selection Tabs */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setCode(ORIGINAL_CODE)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              code === ORIGINAL_CODE
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Original (Exercício 1)
          </button>
          <button
            onClick={() => setCode(CHALLENGE_1_CODE)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              code === CHALLENGE_1_CODE
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Desafio 1: toFixed(2)
          </button>
          <button
            onClick={() => setCode(CHALLENGE_2_CODE)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              code === CHALLENGE_2_CODE
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Desafio 2: Resto com %
          </button>
          <button
            onClick={() => setCode(CHALLENGE_3_CODE)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              code === CHALLENGE_3_CODE
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Desafio 3: Arrow & Template
          </button>
        </div>

        {/* Input values to inject into prompt() calls during execution */}
        <div className="mt-4 flex flex-wrap items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
          <span className="font-semibold text-slate-600 dark:text-slate-300">Valores para responder aos prompt():</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">1º prompt:</span>
            <input
              type="text"
              value={simPromptN1}
              onChange={(e) => setSimPromptN1(e.target.value)}
              className="w-16 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-0.5 font-mono text-center dark:text-white"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">2º prompt:</span>
            <input
              type="text"
              value={simPromptN2}
              onChange={(e) => setSimPromptN2(e.target.value)}
              className="w-16 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-0.5 font-mono text-center dark:text-white"
            />
          </div>
          <button
            onClick={handleRun}
            className="ml-auto flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-1.5 font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Executar Sandbox</span>
          </button>
        </div>

        {/* Two-Column Editor & Output */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Code Editor Area */}
          <div className="lg:col-span-7 flex flex-col rounded-lg border border-slate-300 dark:border-slate-700 overflow-hidden bg-slate-950">
            <div className="flex items-center justify-between bg-slate-900 px-4 py-2 text-xs font-mono text-slate-400 border-b border-slate-800">
              <span>editor.js</span>
              <span className="text-slate-500">JavaScript (ES6+)</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={16}
              spellCheck={false}
              className="w-full resize-y bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200 outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Simulated Console / Terminal Output */}
          <div className="lg:col-span-5 flex flex-col rounded-lg border border-slate-300 dark:border-slate-700 overflow-hidden bg-slate-900">
            <div className="flex items-center justify-between bg-slate-950 px-4 py-2 text-xs font-mono text-slate-400 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <TerminalIcon className="h-3.5 w-3.5 text-indigo-400" />
                <span>Console & Alertas</span>
              </div>
              {outputLogs.length > 0 && (
                <button
                  onClick={() => setOutputLogs([])}
                  className="text-[11px] text-slate-500 hover:text-slate-300"
                >
                  Limpar
                </button>
              )}
            </div>

            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto max-h-[360px] space-y-2">
              {outputLogs.length === 0 ? (
                <div className="text-slate-500 py-6 text-center italic">
                  Clique em "Executar Sandbox" para rodar o código acima.
                </div>
              ) : (
                outputLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-xs leading-relaxed ${
                      log.type === 'error'
                        ? 'bg-rose-950/50 text-rose-300 border border-rose-900/40'
                        : log.type === 'alert'
                        ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-900/40 font-semibold'
                        : 'text-slate-300'
                    }`}
                  >
                    {log.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
