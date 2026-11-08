import React, { useState } from 'react';
import { HelpCircle, AlertOctagon, CheckCircle2, Split, Calculator } from 'lucide-react';

export const MathVisualizer: React.FC = () => {
  const [dividend, setDividend] = useState(12);
  const [divisor, setDivisor] = useState(3);

  const isDivZero = divisor === 0;
  const quotient = isDivZero ? null : dividend / divisor;
  const integerQuotient = isDivZero ? null : Math.trunc(dividend / divisor);
  const remainder = isDivZero ? null : dividend % divisor;

  // Generate visual blocks for representation (up to reasonable limits)
  const displayBlocksCount = Math.min(Math.max(0, dividend), 60);
  const displayDivisor = Math.max(1, Math.min(divisor, 12));

  return (
    <div className="space-y-6">
      {/* Visualizer Title */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Visualizador Matemático da Divisão
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Compreenda a anatomia da divisão: Dividendo, Divisor, Quociente e o porquê do tratamento da divisão por zero.
          </p>
        </div>

        {/* Sliders & Controls */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          {/* Dividend Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Dividendo (<code className="font-mono text-indigo-600 dark:text-indigo-400">a</code>): o total a ser dividido
              </span>
              <span className="font-mono font-bold text-base text-slate-900 dark:text-white">
                {dividend}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="36"
              value={dividend}
              onChange={(e) => setDividend(parseInt(e.target.value) || 0)}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>0</span>
              <span>12</span>
              <span>24</span>
              <span>36</span>
            </div>
          </div>

          {/* Divisor Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Divisor (<code className="font-mono text-indigo-600 dark:text-indigo-400">b</code>): quantidade de partes
              </span>
              <span className="font-mono font-bold text-base text-slate-900 dark:text-white">
                {divisor}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              value={divisor}
              onChange={(e) => setDivisor(parseInt(e.target.value) || 0)}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span className="text-amber-500 font-bold">0 (Erro!)</span>
              <span>3</span>
              <span>6</span>
              <span>12</span>
            </div>
          </div>
        </div>

        {/* Division Equation Formula */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
          <div className="flex items-center gap-3 font-mono text-xl md:text-2xl font-bold">
            <span className="rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 px-3.5 py-1.5 border border-indigo-200 dark:border-indigo-900/50">
              {dividend}
            </span>
            <span className="text-slate-400">÷</span>
            <span className={`rounded-lg px-3.5 py-1.5 border ${
              isDivZero
                ? 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
                : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/50'
            }`}>
              {divisor}
            </span>
            <span className="text-slate-400">=</span>
            <span className={`rounded-lg px-4 py-1.5 border ${
              isDivZero
                ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800 text-base'
                : 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
            }`}>
              {isDivZero ? 'Erro: divisão por zero' : (Number.isInteger(quotient) ? quotient : quotient?.toFixed(4))}
            </span>
          </div>
        </div>

        {/* Mathematical Parts Breakdown */}
        {!isDivZero ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Quociente Real</div>
              <div className="mt-1 font-mono text-xl font-bold text-slate-900 dark:text-white tabular-nums">
                {quotient}
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Valor retornado por <code className="font-mono">a / b</code></p>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Quociente Inteiro</div>
              <div className="mt-1 font-mono text-xl font-bold text-slate-900 dark:text-white tabular-nums">
                {integerQuotient}
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Número de grupos inteiros completos</p>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Resto da Divisão (a % b)</div>
              <div className="mt-1 font-mono text-xl font-bold text-slate-900 dark:text-white tabular-nums">
                {remainder}
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Sobra inteira após repartir em partes iguais</p>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 dark:border-amber-900/60 dark:bg-amber-950/30 p-5">
            <div className="flex items-start gap-3">
              <AlertOctagon className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-2 text-xs text-amber-900 dark:text-amber-200">
                <h4 className="text-sm font-bold text-amber-950 dark:text-amber-100">
                  Por que a matemática proíbe dividir por zero?
                </h4>
                <p>
                  A divisão é a operação inversa da multiplicação. Quando dizemos que <code className="font-mono">{dividend} ÷ {divisor} = x</code>, estamos perguntando: <em>"qual número x multiplicado por {divisor} resulta em {dividend}?"</em>
                </p>
                <div className="font-mono p-2.5 rounded bg-amber-100/80 dark:bg-amber-900/40 text-amber-950 dark:text-amber-100">
                  x × 0 = {dividend}
                </div>
                <p>
                  Como qualquer número multiplicado por 0 é sempre 0, se o dividendo for diferente de zero ({dividend}), <strong>não existe nenhum número real que satisfaça essa equação</strong>. Se o dividendo também fosse 0 (0 ÷ 0), qualquer número satisfaria a equação (indeterminação).
                </p>
                <div className="pt-2 border-t border-amber-200 dark:border-amber-900/50 text-[11px]">
                  <strong>No JavaScript padrão:</strong> se não colocássemos o <code className="font-mono">if (b === 0)</code>, o JavaScript retornaria o valor especial <code className="font-mono">Infinity</code> ou <code className="font-mono">-Infinity</code>. O exercício ensina a boa prática de validar e fornecer uma mensagem compreensível ao usuário!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visual Partitioning Diagram */}
        {!isDivZero && dividend > 0 && (
          <div className="mt-6 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <Split className="h-4 w-4 text-indigo-600" />
              <span>Representação Gráfica: Repartindo {dividend} unidades em {divisor} {divisor === 1 ? 'grupo' : 'grupos'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: displayDivisor }).map((_, groupIndex) => {
                const itemsInThisGroup = Math.floor(dividend / divisor) + (groupIndex < (dividend % divisor) ? 1 : 0);
                return (
                  <div
                    key={groupIndex}
                    className="p-3 rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 mb-2 font-mono">
                      <span>Grupo #{groupIndex + 1}</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{itemsInThisGroup} itens</span>
                    </div>

                    <div className="flex flex-wrap gap-1 min-h-[28px] items-center">
                      {Array.from({ length: itemsInThisGroup }).map((__, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="h-3.5 w-3.5 rounded bg-indigo-500/80 dark:bg-indigo-400"
                          title={`Item ${itemIdx + 1}`}
                        />
                      ))}
                      {itemsInThisGroup === 0 && (
                        <span className="text-[11px] text-slate-400 italic">Vazio</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
