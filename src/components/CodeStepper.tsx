import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, RotateCcw, Check, AlertCircle, Info, ChevronRight, ChevronLeft } from 'lucide-react';

interface CodeStepperProps {
  initialNum1?: string;
  initialNum2?: string;
}

interface StepInfo {
  line: number;
  label: string;
  explanation: string;
  variables: Record<string, string>;
  activeBranch?: 'if' | 'else' | 'function_if' | 'function_else';
}

export const CodeStepper: React.FC<CodeStepperProps> = ({
  initialNum1 = '12',
  initialNum2 = '3',
}) => {
  const [input1, setInput1] = useState(initialNum1);
  const [input2, setInput2] = useState(initialNum2);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Compute steps dynamically based on inputs
  const num1 = parseFloat(input1);
  const num2 = parseFloat(input2);
  const is1NaN = isNaN(num1);
  const is2NaN = isNaN(num2);
  const hasNaN = is1NaN || is2NaN;
  const isDivZero = !hasNaN && num2 === 0;

  const steps: StepInfo[] = [];

  // Step 0: Initial state before execution
  steps.push({
    line: 1,
    label: 'Início da execução',
    explanation: 'O navegador começa executando o script do topo. A função prompt() é chamada para ler o primeiro valor.',
    variables: {
      numero1: 'undefined',
      numero2: 'undefined',
      resultadoDivisao: 'undefined',
    },
  });

  // Step 1: Reading numero1
  steps.push({
    line: 1,
    label: 'Leitura de numero1',
    explanation: `prompt("Insira o primeiro número:") recebeu "${input1}". A função parseFloat("${input1}") converteu a string em número: ${String(num1)}.`,
    variables: {
      numero1: String(num1) + (is1NaN ? ' (NaN)' : ''),
      numero2: 'undefined',
      resultadoDivisao: 'undefined',
    },
  });

  // Step 2: Reading numero2
  steps.push({
    line: 2,
    label: 'Leitura de numero2',
    explanation: `prompt("Insira o segundo número:") recebeu "${input2}". A função parseFloat("${input2}") converteu a string em número: ${String(num2)}.`,
    variables: {
      numero1: String(num1),
      numero2: String(num2) + (is2NaN ? ' (NaN)' : ''),
      resultadoDivisao: 'undefined',
    },
  });

  // Step 3: if condition
  steps.push({
    line: 5,
    label: 'Verificação if (isNaN(numero1) || isNaN(numero2))',
    explanation: `Avaliação: isNaN(${String(num1)}) é ${is1NaN ? 'true' : 'false'} e isNaN(${String(num2)}) é ${is2NaN ? 'true' : 'false'}. O operador || (OU) resulta em ${hasNaN ? 'TRUE' : 'FALSE'}.`,
    variables: {
      numero1: String(num1),
      numero2: String(num2),
      'isNaN(numero1)': String(is1NaN),
      'isNaN(numero2)': String(is2NaN),
      condição: hasNaN ? 'true (entra no if)' : 'false (vai para o else)',
    },
  });

  if (hasNaN) {
    // Step 4: alert invalid input
    steps.push({
      line: 6,
      label: 'alert("Por favor, insira números válidos!")',
      explanation: 'Como um dos valores fornecidos é NaN (Not a Number), o bloco IF é executado e um alerta de erro é exibido ao usuário.',
      variables: {
        numero1: String(num1),
        numero2: String(num2),
        alerta: '"Por favor, insira números válidos!"',
      },
      activeBranch: 'if',
    });
  } else {
    // Step 4: Call divida(numero1, numero2)
    steps.push({
      line: 8,
      label: 'Chamada da função divida(numero1, numero2)',
      explanation: `O fluxo entra no bloco ELSE. A função divida é invocada passando a = ${num1} e b = ${num2}.`,
      variables: {
        numero1: String(num1),
        numero2: String(num2),
        'divida(a, b)': `chamada com (${num1}, ${num2})`,
      },
      activeBranch: 'else',
    });

    // Step 5: Enter function and check b === 0
    steps.push({
      line: 13,
      label: 'Dentro de divida: if (b === 0)',
      explanation: `O JavaScript entra no escopo de divida. Verifica com igualdade estrita (===) se b (${num2}) é estritamente igual a 0: ${isDivZero ? 'TRUE' : 'FALSE'}.`,
      variables: {
        'a (parâmetro)': String(num1),
        'b (parâmetro)': String(num2),
        'b === 0': String(isDivZero),
      },
      activeBranch: isDivZero ? 'function_if' : 'function_else',
    });

    if (isDivZero) {
      // Step 6: Return zero error
      steps.push({
        line: 14,
        label: 'Retorno de Erro: Divisão por Zero',
        explanation: 'Como b é 0, a função interrompe a execução e retorna a string de erro "Erro: não é possível dividir por zero!".',
        variables: {
          retorno: '"Erro: não é possível dividir por zero!"',
        },
        activeBranch: 'function_if',
      });

      // Step 7: alert error string
      steps.push({
        line: 9,
        label: 'alert do resultado recebido',
        explanation: `A variável resultadoDivisao recebe a mensagem retornada. O alert exibe: "O resultado da divisão é igual a: Erro: não é possível dividir por zero!"`,
        variables: {
          resultadoDivisao: '"Erro: não é possível dividir por zero!"',
          alerta: '"O resultado da divisão é igual a: Erro: não é possível dividir por zero!"',
        },
      });
    } else {
      // Step 6: Perform division return a / b
      const res = num1 / num2;
      steps.push({
        line: 16,
        label: 'Cálculo matemático: return a / b',
        explanation: `O divisor não é zero. O operador / realiza a divisão: ${num1} / ${num2} = ${res}. A função retorna este número.`,
        variables: {
          'a / b': String(res),
          retorno: String(res),
        },
        activeBranch: 'function_else',
      });

      // Step 7: alert result
      steps.push({
        line: 9,
        label: 'alert do resultado final',
        explanation: `A variável resultadoDivisao guarda ${res}. Concatenação de string com número: alert exibe "O resultado da divisão é igual a: ${res}".`,
        variables: {
          resultadoDivisao: String(res),
          alerta: `"O resultado da divisão é igual a: ${res}"`,
        },
      });
    }
  }

  // Auto-play timer
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const currentStep = steps[Math.min(currentStepIndex, steps.length - 1)];

  const codeLines = [
    { num: 1, text: 'const numero1 = parseFloat(prompt("Insira o primeiro número:"));' },
    { num: 2, text: 'const numero2 = parseFloat(prompt("Insira o segundo número:"));' },
    { num: 3, text: '' },
    { num: 4, text: '// Verifica se os valores digitados são números válidos' },
    { num: 5, text: 'if (isNaN(numero1) || isNaN(numero2)) {' },
    { num: 6, text: '  alert("Por favor, insira números válidos!");' },
    { num: 7, text: '} else {' },
    { num: 8, text: '  const resultadoDivisao = divida(numero1, numero2);' },
    { num: 9, text: '  alert("O resultado da divisão é igual a: " + resultadoDivisao);' },
    { num: 10, text: '}' },
    { num: 11, text: '' },
    { num: 12, text: 'function divida(a, b) {' },
    { num: 13, text: '  if (b === 0) {' },
    { num: 14, text: '    return "Erro: não é possível dividir por zero!";' },
    { num: 15, text: '  }' },
    { num: 16, text: '  return a / b;' },
    { num: 17, text: '}' },
  ];

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Depurador e Rastreamento Passo a Passo
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Acompanhe a linha exata que o JavaScript está executando e inspecione as variáveis na memória.
            </p>
          </div>

          {/* Test values input */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <label htmlFor="step-n1" className="font-semibold text-slate-600 dark:text-slate-400">N1:</label>
              <input
                id="step-n1"
                type="text"
                value={input1}
                onChange={(e) => {
                  setInput1(e.target.value);
                  setCurrentStepIndex(0);
                }}
                className="w-16 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-center font-mono text-xs dark:text-white"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <label htmlFor="step-n2" className="font-semibold text-slate-600 dark:text-slate-400">N2:</label>
              <input
                id="step-n2"
                type="text"
                value={input2}
                onChange={(e) => {
                  setInput2(e.target.value);
                  setCurrentStepIndex(0);
                }}
                className="w-16 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-center font-mono text-xs dark:text-white"
              />
            </div>
            <button
              onClick={() => {
                setInput1('10');
                setInput2('2');
                setCurrentStepIndex(0);
              }}
              className="rounded border border-slate-200 dark:border-slate-700 px-2 py-1 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Resetar
            </button>
          </div>
        </div>

        {/* Stepper Controls Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex(0);
              }}
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors"
              title="Voltar ao início"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => Math.max(0, prev - 1));
              }}
              disabled={currentStepIndex === 0}
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-40 transition-colors"
              title="Passo anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
              <span>{isPlaying ? 'Pausar' : 'Auto Play'}</span>
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
              }}
              disabled={currentStepIndex >= steps.length - 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-40 transition-colors"
            >
              <span>Próximo Passo</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
            Passo <strong className="text-indigo-600 dark:text-indigo-400">{currentStepIndex + 1}</strong> de {steps.length}
          </div>
        </div>

        {/* Two-Column Code + Inspector Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Code Box with Highlighted Line */}
          <div className="lg:col-span-7 rounded-lg border border-slate-200 bg-slate-900 text-slate-100 overflow-hidden shadow-inner font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-400 text-[11px]">
              <span>exercicio1.js</span>
              <span className="text-amber-400">● Linha ativa: {currentStep.line}</span>
            </div>

            <div className="p-3 overflow-x-auto space-y-0.5">
              {codeLines.map((cl) => {
                const isCurrentLine = cl.num === currentStep.line;
                return (
                  <div
                    key={cl.num}
                    className={`flex items-center px-2 py-1 rounded transition-colors ${
                      isCurrentLine
                        ? 'bg-indigo-600/30 text-white font-semibold border-l-2 border-indigo-400'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-8 shrink-0 select-none text-right pr-3 text-slate-600 text-[11px]">
                      {cl.num}
                    </span>
                    <span className="whitespace-pre">
                      {cl.text || ' '}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Inspector & Step Explanation */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Step Explanation Card */}
            <div className="rounded-lg border border-indigo-100 dark:border-indigo-950/60 bg-indigo-50/50 dark:bg-indigo-950/20 p-4">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-semibold text-xs mb-1">
                <Info className="h-4 w-4" />
                <span>{currentStep.label}</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-1">
                {currentStep.explanation}
              </p>
            </div>

            {/* Variable State Watcher */}
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Memória / Variáveis em Tempo Real
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                {Object.entries(currentStep.variables).map(([key, val]) => (
                  <div key={key} className="py-2 flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{key}</span>
                    <span className="font-semibold text-slate-900 dark:text-white max-w-[200px] truncate text-right">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
