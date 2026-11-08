import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../types.ts';

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'O que a função prompt() do navegador sempre retorna por padrão quando o usuário digita algo?',
    options: [
      'Sempre uma string de texto, exigindo conversão com parseFloat() ou Number() para cálculos.',
      'Um valor numérico (number) caso o usuário digite apenas algarismos.',
      'Um objeto contendo as propriedades input e timestamp.',
      'O tipo primitivo inferido automaticamente pelo interpretador JavaScript.',
    ],
    correctIndex: 0,
    explanation: 'O método prompt() sempre devolve uma string (ou null se o usuário clicar em Cancelar). Sem o parseFloat(), operações matemáticas podem se comportar inesperadamente (por exemplo, "10" + "2" resultaria em "102").',
  },
  {
    id: 2,
    question: 'Se a função divida() NÃO tivesse o if (b === 0), o que o JavaScript retornaria ao calcular 10 / 0?',
    options: [
      'Infinity (número infinito positivo).',
      'Dispararia uma exceção fatal (DivisionByZeroError) interrompendo a página.',
      'Retornaria null.',
      'Retornaria 0.',
    ],
    correctIndex: 0,
    explanation: 'Ao contrário de linguagens como Python ou Java que lançam exceções fatais ao dividir por zero, o JavaScript segue a especificação IEEE 754 e retorna Infinity (ou -Infinity). Por isso a validação explícita no exercício é essencial para a experiência do usuário.',
  },
  {
    id: 3,
    question: 'O que a verificação isNaN(numero1) || isNaN(numero2) faz com o operador ||?',
    options: [
      'Retorna true se pelo menos um dos valores for inválido (NaN), ativando o alerta de erro.',
      'Retorna true apenas se ambos os números forem válidos simultaneamente.',
      'Calcula a média aritmética entre os dois números.',
      'Converte os valores inválidos em zero automaticamente.',
    ],
    correctIndex: 0,
    explanation: 'O operador || é o OU lógico (logical OR). Se numero1 for NaN OU numero2 for NaN, a expressão inteira é avaliada como verdadeira (true), entrando no bloco if e alertando o usuário.',
  },
  {
    id: 4,
    question: 'Qual é a principal vantagem de usar b === 0 com três iguais (igualdade estrita)?',
    options: [
      'Verifica tanto o valor numérico quanto o tipo de dado (number), evitando coerções implícitas perigosas.',
      'Executa a comparação mais lentamente para garantir precisão quântica.',
      'Permite que strings como "0" também passem no teste.',
      'Não há diferença alguma em relação a b == 0.',
    ],
    correctIndex: 0,
    explanation: 'O operador === (strict equality) não realiza coerção de tipos ("type coercion"). Com == (dois iguais), valores como "" (string vazia), false ou [0] poderiam ser coagidos a 0, gerando falsos positivos.',
  },
];

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const allAnswered = QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Quiz de Fixação: Conceitos do Exercício
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Teste seus conhecimentos sobre <code className="font-mono text-slate-700 dark:text-slate-300">parseFloat</code>, <code className="font-mono text-slate-700 dark:text-slate-300">isNaN</code>, divisão por zero e operadores lógicos.
            </p>
          </div>

          {submitted && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 border border-indigo-200 dark:border-indigo-900/40 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                <Award className="h-4 w-4" />
                <span>Pontuação: {score} de {QUESTIONS.length} acertos ({Math.round((score / QUESTIONS.length) * 100)}%)</span>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Refazer</span>
              </button>
            </div>
          )}
        </div>

        {/* Questions list */}
        <div className="mt-6 space-y-6">
          {QUESTIONS.map((q, idx) => {
            const userAnswer = selectedAnswers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div
                key={q.id}
                className="rounded-lg border border-slate-200 dark:border-slate-800 p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {idx + 1}. {q.question}
                  </h3>
                  {submitted && (
                    <span className="shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-rose-500" />
                      )}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {q.options.map((option, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    let optionStyle = 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-850';

                    if (submitted) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 font-medium';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-rose-300 bg-rose-50 text-rose-950 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-indigo-500 bg-indigo-50/60 dark:border-indigo-500 dark:bg-indigo-950/40 font-medium';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelect(q.id, optIdx)}
                        disabled={submitted}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-start gap-3 ${optionStyle}`}
                      >
                        <span className="h-4 w-4 shrink-0 rounded-full border border-current flex items-center justify-center text-[10px] mt-0.5">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Explicação: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit button */}
        {!submitted && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>{allAnswered ? 'Verificar Respostas' : 'Responda a todas as perguntas'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
