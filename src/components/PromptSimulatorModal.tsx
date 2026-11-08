import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface PromptSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinishExecution: (num1Str: string, num2Str: string, result: string, isError: boolean) => void;
}

type SimulationStage = 'prompt1' | 'prompt2' | 'alert' | 'cancelled';

export const PromptSimulatorModal: React.FC<PromptSimulatorModalProps> = ({
  isOpen,
  onClose,
  onFinishExecution,
}) => {
  const [stage, setStage] = useState<SimulationStage>('prompt1');
  const [inputVal1, setInputVal1] = useState('10');
  const [inputVal2, setInputVal2] = useState('2');
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertError, setIsAlertError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setStage('prompt1');
      setInputVal1('10');
      setInputVal2('2');
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrompt1Submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setStage('prompt2');
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);
  };

  const handlePrompt2Submit = (e?: React.FormEvent) => {
    e?.preventDefault();

    // Replicate the user's exact JavaScript logic:
    const numero1 = parseFloat(inputVal1);
    const numero2 = parseFloat(inputVal2);

    let finalAlert = '';
    let isError = false;

    if (isNaN(numero1) || isNaN(numero2)) {
      finalAlert = 'Por favor, insira números válidos!';
      isError = true;
    } else {
      // function divida(a, b)
      if (numero2 === 0) {
        finalAlert = 'O resultado da divisão é igual a: Erro: não é possível dividir por zero!';
        isError = true;
      } else {
        const resultadoDivisao = numero1 / numero2;
        finalAlert = 'O resultado da divisão é igual a: ' + resultadoDivisao;
        isError = false;
      }
    }

    setAlertMessage(finalAlert);
    setIsAlertError(isError);
    setStage('alert');
    onFinishExecution(inputVal1, inputVal2, finalAlert, isError);
  };

  const handleCancel = () => {
    setStage('cancelled');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Browser Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-900/75 px-5 py-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="font-mono">execício1.html diz</span>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {stage === 'prompt1' && (
            <form onSubmit={handlePrompt1Submit} className="space-y-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Passo 1 de 3: prompt()
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Insira o primeiro número:
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Código executando: <code className="font-mono text-indigo-600 dark:text-indigo-300">const numero1 = parseFloat(prompt(...));</code>
                </p>
              </div>

              <div>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal1}
                  onChange={(e) => setInputVal1(e.target.value)}
                  placeholder="Ex: 10 ou 15.5"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-mono text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 shadow-sm transition-colors"
                >
                  <span>OK</span>
                  <CornerDownLeft className="h-3 w-3" />
                </button>
              </div>
            </form>
          )}

          {stage === 'prompt2' && (
            <form onSubmit={handlePrompt2Submit} className="space-y-4">
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Passo 2 de 3: prompt()
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Insira o segundo número:
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Código executando: <code className="font-mono text-indigo-600 dark:text-indigo-300">const numero2 = parseFloat(prompt(...));</code>
                </p>
              </div>

              <div>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal2}
                  onChange={(e) => setInputVal2(e.target.value)}
                  placeholder="Ex: 2 ou 0 para testar erro"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-mono text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 shadow-sm transition-colors"
                >
                  <span>OK</span>
                  <CornerDownLeft className="h-3 w-3" />
                </button>
              </div>
            </form>
          )}

          {stage === 'alert' && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    isAlertError
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                  }`}
                >
                  {isAlertError ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Passo 3 de 3: alert()
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {alertMessage}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-slate-100 dark:bg-slate-800/80 p-3 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div className="font-semibold text-slate-800 dark:text-slate-200">
                  Valores processados pelo script:
                </div>
                <div>• <code className="font-mono">numero1</code>: {inputVal1} → <span className="font-mono text-indigo-600 dark:text-indigo-400">{String(parseFloat(inputVal1))}</span></div>
                <div>• <code className="font-mono">numero2</code>: {inputVal2} → <span className="font-mono text-indigo-600 dark:text-indigo-400">{String(parseFloat(inputVal2))}</span></div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-700 shadow-sm transition-colors"
                >
                  Fechar (OK)
                </button>
              </div>
            </div>
          )}

          {stage === 'cancelled' && (
            <div className="py-4 text-center text-sm text-slate-500 dark:text-slate-400">
              Operação cancelada pelo usuário.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
