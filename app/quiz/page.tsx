'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Progress from '@/components/ui/Progress';
import { QUIZ_QUESTIONS, getVisibleQuestions, TAX_YEARS } from '@/lib/quiz';
import type { QuizAnswers } from '@/lib/types';

function formatCurrency(val: string): string {
  const num = val.replace(/[^0-9]/g, '');
  return num ? Number(num).toLocaleString('en-IE') : '';
}

export default function QuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const visible = getVisibleQuestions(answers);
  const current = visible[stepIndex];
  const isLast = stepIndex === visible.length - 1;
  const pct = visible.length > 0 ? ((stepIndex + 1) / visible.length) * 100 : 0;

  useEffect(() => {
    const saved = localStorage.getItem('quiz-answers');
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  function saveAndAdvance(newAnswers: QuizAnswers) {
    localStorage.setItem('quiz-answers', JSON.stringify(newAnswers));
    setAnswers(newAnswers);
    setInputValue('');
    if (isLast) {
      router.push('/results');
    } else {
      let next = stepIndex + 1;
      const newVisible = getVisibleQuestions(newAnswers);
      while (next < newVisible.length - 1 && newVisible[next].condition && !newVisible[next].condition!(newAnswers)) {
        next++;
      }
      setStepIndex(Math.min(next, newVisible.length - 1));
    }
  }

  function handleBoolean(val: boolean) {
    const updated = { ...answers, [current.id]: val };
    saveAndAdvance(updated);
  }

  function handleNumber() {
    const raw = inputValue.replace(/[^0-9.]/g, '');
    if (!raw) return;
    const updated = { ...answers, [current.id]: Number(raw) };
    saveAndAdvance(updated);
  }

  function handleMultiselect(val: number) {
    const current_arr = (answers[current.id] as number[] | undefined) ?? [];
    const updated_arr = current_arr.includes(val)
      ? current_arr.filter((v) => v !== val)
      : [...current_arr, val];
    setAnswers({ ...answers, [current.id]: updated_arr });
  }

  function handleMultiselectDone() {
    const arr = (answers[current.id] as number[] | undefined) ?? [];
    if (arr.length === 0) return;
    saveAndAdvance({ ...answers });
  }

  function handleBack() {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  }

  function handleSkip() {
    if (isLast) {
      router.push('/results');
    } else {
      setStepIndex(stepIndex + 1);
    }
  }

  if (!current) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Quiz complete</h2>
          <Button onClick={() => router.push('/results')}>See my results</Button>
        </div>
      </div>
    );
  }

  const currentVal = answers[current.id];

  if (answers.isPAYE === false && stepIndex === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">This tool is for PAYE workers</h2>
          <p className="text-slate-500 mb-6 text-sm leading-relaxed">
            If you are self-employed, you will need to file a Form 11 through Revenue ROS. This tool is designed for employees taxed through payroll.
          </p>
          <Button onClick={() => { setAnswers({}); setStepIndex(0); }} variant="outline">
            Start again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Question {stepIndex + 1} of {visible.length}
            </span>
            <span className="text-sm text-slate-400">Tax Relief Finder</span>
          </div>
          <Progress value={pct} showPercent />
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-2 leading-snug">
            {current.question}
          </h2>
          {current.hint && (
            <p className="text-sm text-slate-500 mb-6 leading-relaxed bg-slate-50 rounded-xl p-3">
              {current.hint}
            </p>
          )}

          {/* Boolean */}
          {current.type === 'boolean' && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleBoolean(true)}
                className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                  currentVal === true
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleBoolean(false)}
                className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                  currentVal === false
                    ? 'border-slate-500 bg-slate-100 text-slate-700'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                No
              </button>
            </div>
          )}

          {/* Currency / Number */}
          {(current.type === 'currency' || current.type === 'number') && (
            <div className="mt-4">
              <div className="flex items-center border-2 border-slate-200 rounded-xl overflow-hidden focus-within:border-emerald-500 transition-colors">
                {current.prefix && (
                  <span className="px-4 py-3 bg-slate-50 text-slate-500 font-semibold border-r border-slate-200">
                    {current.prefix}
                  </span>
                )}
                <input
                  type="text"
                  inputMode="numeric"
                  value={current.type === 'currency' ? formatCurrency(inputValue) : inputValue}
                  onChange={(e) => setInputValue(e.target.value.replace(/[^0-9]/g, ''))}
                  onKeyDown={(e) => e.key === 'Enter' && handleNumber()}
                  placeholder={current.placeholder ?? '0'}
                  className="flex-1 px-4 py-3 text-lg font-semibold text-slate-900 focus:outline-none"
                />
                {current.suffix && (
                  <span className="px-4 py-3 bg-slate-50 text-slate-500 font-medium border-l border-slate-200">
                    {current.suffix}
                  </span>
                )}
              </div>
              <div className="flex gap-3 mt-4">
                <Button onClick={handleNumber} className="flex-1" disabled={!inputValue}>
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="ghost" onClick={handleSkip} size="sm">
                  Skip
                </Button>
              </div>
            </div>
          )}

          {/* Multiselect */}
          {current.type === 'multiselect' && (
            <div className="mt-4 space-y-2">
              {current.options?.map((opt) => {
                const selected = ((answers[current.id] as number[] | undefined) ?? []).includes(opt.value as number);
                return (
                  <button
                    key={String(opt.value)}
                    onClick={() => handleMultiselect(opt.value as number)}
                    className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                      selected
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${selected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'}`}>
                        {selected && <CheckCircle className="w-3 h-3 text-white fill-white" />}
                      </span>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
              <Button
                onClick={handleMultiselectDone}
                className="w-full mt-2"
                disabled={((answers[current.id] as number[] | undefined) ?? []).length === 0}
              >
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-4">
          <Button variant="ghost" onClick={handleBack} disabled={stepIndex === 0} size="sm">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <Button variant="ghost" onClick={handleSkip} size="sm">
            Skip <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 text-center mt-6 leading-relaxed">
          Your answers are saved locally on your device. We use them only to calculate your potential reliefs.
        </p>
      </div>
    </div>
  );
}
