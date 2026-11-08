import React from 'react';
import { BookOpen, AlertCircle, Sparkles, CheckCircle } from 'lucide-react';

export const TheoryNotes: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Guia Teórico: Conceitos Fundamentais do Exercício 1
        </h3>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
        {/* Concept 1 */}
        <div className="space-y-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            1. Entrada de Dados com prompt() e parseFloat()
          </div>
          <p>
            O método <code className="font-mono text-indigo-600 dark:text-indigo-300">prompt()</code> sempre retorna uma <strong>string</strong> (texto) ou <code className="font-mono">null</code> se cancelado.
          </p>
          <p>
            Para realizar contas matemáticas, utilizamos <code className="font-mono text-indigo-600 dark:text-indigo-300">parseFloat(str)</code>, que analisa o texto e converte para número decimal. Se digitarmos letras como "abc", o resultado é <code className="font-mono text-rose-500">NaN</code>.
          </p>
        </div>

        {/* Concept 2 */}
        <div className="space-y-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            2. Validação com isNaN() e Operador Lógico ||
          </div>
          <p>
            <code className="font-mono text-indigo-600 dark:text-indigo-300">isNaN(valor)</code> verifica se o valor não é um número válido ("Not a Number").
          </p>
          <p>
            A expressão <code className="font-mono text-indigo-600 dark:text-indigo-300">isNaN(numero1) || isNaN(numero2)</code> utiliza o operador <code className="font-mono">||</code> (OU lógico). Basta que uma das variáveis seja inválida para que a condição seja verdadeira e o alerta de erro seja disparado.
          </p>
        </div>

        {/* Concept 3 */}
        <div className="space-y-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            3. A Função divida(a, b) e Escopo
          </div>
          <p>
            Funções agrupam blocos reutilizáveis de código. A declaração <code className="font-mono text-indigo-600 dark:text-indigo-300">function divida(a, b)</code> recebe dois argumentos posicionais e devolve um resultado através da instrução <code className="font-mono">return</code>.
          </p>
          <p>
            Em JavaScript, funções declaradas com a palavra-chave <code className="font-mono">function</code> sofrem "hoisting" (elevação), podendo ser invocadas antes ou depois da sua declaração no arquivo.
          </p>
        </div>

        {/* Concept 4 */}
        <div className="space-y-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800">
          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            4. Tratamento de Divisão por Zero
          </div>
          <p>
            Diferente de calculadoras físicas e outras linguagens que travam ou lançam erros, o JavaScript nativo calcula <code className="font-mono">10 / 0</code> e retorna <code className="font-mono text-amber-500">Infinity</code>.
          </p>
          <p>
            A verificação <code className="font-mono text-indigo-600 dark:text-indigo-300">if (b === 0)</code> é uma prática recomendada para interceptar essa condição matematicamente inválida e devolver uma mensagem amigável ao usuário.
          </p>
        </div>
      </div>
    </div>
  );
};
