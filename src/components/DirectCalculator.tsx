import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle2, History, Trash2, ArrowRight } from 'lucide-react';
import { ExecutionRecord } from '../types.ts';

interface DirectCalculatorProps {
  history: ExecutionRecord[];
  onAddHistory: (record: ExecutionRecord) => void;
  onClearHistory: () => void;
  onOpenPromptSimulation: () => void;
}

export const DirectCalculator: React.FC<DirectCalculatorProps> = ({
  history,
  onAddHistory,
  onClearHistory,
  onOpenPromptSimulation,
}) => {
  const [val1, setVal1] = useState('10');
  const [val2, setVal2] = useState('2');

  const num1 = parseFloat(val1);
  const num2 = parseFloat(val2);

  const isNum1NaN = isNaN(num1);
  const isNum2NaN = isNaN(num2);
  const hasNaN = isNum1NaN || isNum2NaN;
  const isDivByZero = !hasNaN && num2 === 0;

  // Exact function logic from the exercise
  function divida(a: number, b: number): number | string {
    if (b === 0) {
      return "Erro: não é possível dividir por zero!";
    }
    return a / b;
  }

  let executionResultText = '';
  let status: 'success' | 'invalid_input' | 'division_by_zero' = 'success';
  let numericQuotient: number | undefined;

  if (hasNaN) {
    executionResultText = 'Por favor, insira números válidos!';
    status = 'invalid_input';
  } else {
    const res = divida(num1, num2);
    if (typeof res === 'string') {
      executionResultText = res;
      status = 'division_by_zero';
    } else {
      executionResultText = `O resultado da divisão é igual a: ${res}`;
      status = 'success';
      numericQuotient = res;
    }
  }

  const handleExecute = () => {
    const record: ExecutionRecord = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      input1: val1,
      input2: val2,
      num1,
      num2,
      status,
      resultText: executionResultText,
      quotient: numericQuotient,
      remainder: !hasNaN && num2 !== 0 ? num1 % num2 : undefined,
    };
    onAddHistory(record);
  };

  const applyPreset = (n1: string, n2: string) => {
    setVal1(n1);
    setVal2(n2);
  };

  return (
    <div className="space-y-6">
      {/* Exercise Presentation Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Simulador do Código JavaScript
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Teste os valores das variáveis <code className="font-mono text-slate-700 dark:text-slate-300">numero1</code> e <code className="font-mono text-slate-700 dark:text-slate-300">numero2</code> e veja a validação em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPromptSimulation}
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-900/60 transition-colors"
            >
              <Play className="h-3.5 w-3.5" />
              <span>Simular com prompt() do Navegador</span>
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-medium text-slate-500 dark:text-slate-400 mr-1">Casos de teste rápidos:</span>
          <button
            onClick={() => applyPreset('10', '2')}
            className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            10 ÷ 2 (Exata)
          </button>
          <button
            onClick={() => applyPreset('7', '2')}
            className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            7 ÷ 2 (Decimal 3.5)
          </button>
          <button
            onClick={() => applyPreset('1', '3')}
            className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            1 ÷ 3 (Dízima)
          </button>
          <button
            onClick={() => applyPreset('15', '0')}
            className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-amber-800 hover:bg-amber-100 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300 dark:hover:bg-amber-900/50 transition-colors"
          >
            15 ÷ 0 (Divisão por zero)
          </button>
          <button
            onClick={() => applyPreset('teste', '5')}
            className="rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-rose-800 hover:bg-rose-100 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300 dark:hover:bg-rose-900/50 transition-colors"
          >
            "teste" ÷ 5 (Inválido / NaN)
          </button>
          <button
            onClick={() => applyPreset('-24', '6')}
            className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            -24 ÷ 6 (Negativo)
          </button>
        </div>

        {/* Input Controls Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input 1 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="num1" className="font-semibold text-slate-700 dark:text-slate-300">
                1º Número (Dividendo)
              </label>
              <span className="font-mono text-slate-400">
                parseFloat("{val1}") = <strong className={isNum1NaN ? 'text-rose-500' : 'text-slate-700 dark:text-slate-200'}>{String(num1)}</strong>
              </span>
            </div>
            <div className="relative">
              <input
                id="num1"
                type="text"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                placeholder="Insira o primeiro número"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-base font-mono text-slate-900 shadow-sm focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-white ${
                  isNum1NaN
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-800'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700'
                }`}
              />
              {isNum1NaN && (
                <span className="absolute right-3 top-3 text-xs font-semibold text-rose-500">
                  NaN
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Valor capturado pelo primeiro <code className="font-mono">prompt()</code>
            </p>
          </div>

          {/* Input 2 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="num2" className="font-semibold text-slate-700 dark:text-slate-300">
                2º Número (Divisor)
              </label>
              <span className="font-mono text-slate-400">
                parseFloat("{val2}") = <strong className={isNum2NaN ? 'text-rose-500' : 'text-slate-700 dark:text-slate-200'}>{String(num2)}</strong>
              </span>
            </div>
            <div className="relative">
              <input
                id="num2"
                type="text"
                value={val2}
                onChange={(e) => setVal2(e.target.value)}
                placeholder="Insira o segundo número"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-base font-mono text-slate-900 shadow-sm focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-white ${
                  isNum2NaN
                    ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-800'
                    : isDivByZero
                    ? 'border-amber-400 focus:border-amber-500 focus:ring-amber-500/20 dark:border-amber-600'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-700'
                }`}
              />
              {isNum2NaN ? (
                <span className="absolute right-3 top-3 text-xs font-semibold text-rose-500">
                  NaN
                </span>
              ) : isDivByZero ? (
                <span className="absolute right-3 top-3 text-xs font-semibold text-amber-500">
                  Divisor 0
                </span>
              ) : null}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Valor capturado pelo segundo <code className="font-mono">prompt()</code>
            </p>
          </div>
        </div>

        {/* Live Validation Logic Walkthrough */}
        <div className="mt-6 rounded-lg bg-slate-50 dark:bg-slate-850 p-4 border border-slate-100 dark:border-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Avaliação das Condições do Código
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            {/* Condition 1 */}
            <div className={`p-3 rounded-md border ${hasNaN ? 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/30 dark:border-rose-900/60 dark:text-rose-200' : 'bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">if (isNaN(numero1) || isNaN(numero2))</span>
                <span className="font-bold">{hasNaN ? 'TRUE' : 'FALSE'}</span>
              </div>
              <div className="text-[11px] opacity-80">
                isNaN({String(num1)}) || isNaN({String(num2)}) → {isNum1NaN ? 'true' : 'false'} || {isNum2NaN ? 'true' : 'false'}
              </div>
            </div>

            {/* Condition 2 */}
            <div className={`p-3 rounded-md border ${isDivByZero ? 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-900/60 dark:text-amber-200' : 'bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">function divida: if (b === 0)</span>
                <span className="font-bold">{isDivByZero ? 'TRUE' : 'FALSE'}</span>
              </div>
              <div className="text-[11px] opacity-80">
                b === 0 → {String(num2)} === 0 ({num2 === 0 ? 'true' : 'false'})
              </div>
            </div>
          </div>
        </div>

        {/* Output Banner */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {status === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
              {status === 'division_by_zero' && <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
              {status === 'invalid_input' && <AlertTriangle className="h-5 w-5 text-rose-600 dark:text-rose-400" />}
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Mensagem que o <code className="font-mono">alert()</code> exibe:
              </div>
              <div className="mt-0.5 text-base font-semibold text-slate-900 dark:text-white">
                "{executionResultText}"
              </div>
            </div>
          </div>

          <button
            onClick={handleExecute}
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors whitespace-nowrap"
          >
            <span>Salvar no Histórico</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Execution History */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-slate-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Histórico de Execuções
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({history.length} {history.length === 1 ? 'registro' : 'registros'})
            </span>
          </div>

          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Limpar histórico</span>
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Nenhuma execução salva ainda. Ajuste os números acima e clique em "Salvar no Histórico" ou use a simulação do <code className="font-mono">prompt()</code>.
          </div>
        ) : (
          <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-2 font-medium">Horário</th>
                  <th className="pb-2 font-medium">Entradas (a, b)</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Mensagem de Saída</th>
                  <th className="pb-2 font-medium">Resultado Numérico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50">
                    <td className="py-3 font-mono text-slate-500">{item.timestamp}</td>
                    <td className="py-3 font-mono">
                      "{item.input1}" ÷ "{item.input2}"
                    </td>
                    <td className="py-3">
                      {item.status === 'success' && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Sucesso</span>
                      )}
                      {item.status === 'division_by_zero' && (
                        <span className="text-amber-600 dark:text-amber-400 font-semibold">Divisão por Zero</span>
                      )}
                      {item.status === 'invalid_input' && (
                        <span className="text-rose-600 dark:text-rose-400 font-semibold">Entrada Inválida (NaN)</span>
                      )}
                    </td>
                    <td className="py-3 font-medium text-slate-700 dark:text-slate-300 max-w-xs truncate">
                      {item.resultText}
                    </td>
                    <td className="py-3 font-mono tabular-nums text-slate-900 dark:text-white">
                      {item.quotient !== undefined ? item.quotient : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
