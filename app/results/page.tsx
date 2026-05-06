'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  FileText,
  RefreshCw,
  TrendingUp,
  Info,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { computeResults, totalRefundRange } from '@/lib/eligibility';
import type { QuizAnswers, ReliefResult } from '@/lib/types';

const confidenceLabel: Record<string, string> = {
  high: 'High confidence',
  medium: 'Medium confidence',
  check: 'Check manually',
};

const statusLabel: Record<string, string> = {
  eligible: 'Likely eligible',
  possible: 'Possibly eligible',
  check: 'Check manually',
};

const difficultyLabel: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  complex: 'Complex',
};

function fmt(n: number) {
  return `€${Math.round(n).toLocaleString('en-IE')}`;
}

function groupByYear(results: ReliefResult[]): Map<number, ReliefResult[]> {
  const map = new Map<number, ReliefResult[]>();
  for (const r of results) {
    const arr = map.get(r.taxYear) ?? [];
    arr.push(r);
    map.set(r.taxYear, arr);
  }
  return map;
}

export default function ResultsPage() {
  const [results, setResults] = useState<ReliefResult[]>([]);
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('quiz-answers');
    if (saved) {
      const parsed: QuizAnswers = JSON.parse(saved);
      setAnswers(parsed);
      const computed = computeResults(parsed);
      setResults(computed);
      localStorage.setItem('relief-results', JSON.stringify(computed));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Calculating your reliefs...</span>
        </div>
      </div>
    );
  }

  if (!answers || results.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <Info className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">No results yet</h2>
          <p className="text-slate-500 mb-6 text-sm">Complete the quiz to see which tax reliefs you may be eligible for.</p>
          <Link href="/quiz">
            <Button>Start the quiz</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { min, max } = totalRefundRange(results);
  const grouped = groupByYear(results);
  const years = Array.from(grouped.keys()).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Summary banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-6 md:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-emerald-200 text-sm font-medium mb-1">Estimated potential refund</p>
              <div className="text-4xl font-bold mb-1">
                {fmt(min)} – {fmt(max)}
              </div>
              <p className="text-emerald-200 text-sm">
                Across {(answers.taxYears ?? [2024]).length} tax year{(answers.taxYears ?? []).length !== 1 ? 's' : ''} · {results.length} relief{results.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/checklist">
                <Button className="bg-white !text-emerald-700 hover:bg-emerald-50 w-full">
                  View claim checklist <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/walkthrough">
                <Button variant="outline" className="!border-white/40 !text-white hover:!bg-white/10 w-full">
                  Revenue walkthrough
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex gap-2 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
          <p>
            <strong>These are estimates only.</strong> Final eligibility and refund amounts depend on Revenue rules and your individual circumstances. You are responsible for the information you submit to Revenue.
          </p>
        </div>

        {/* Results by year */}
        {years.map((year) => {
          const yearResults = grouped.get(year)!;
          const yearTotal = totalRefundRange(yearResults);
          return (
            <div key={year} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">Tax Year {year}</h2>
                <div className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5 inline mr-1" />
                  {fmt(yearTotal.min)} – {fmt(yearTotal.max)}
                </div>
              </div>
              <div className="space-y-3">
                {yearResults.map((r) => (
                  <div
                    key={`${r.reliefId}-${r.taxYear}`}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-900">{r.reliefName}</h3>
                          <Badge variant={r.eligibleStatus}>{statusLabel[r.eligibleStatus]}</Badge>
                          <Badge variant={r.confidence}>{confidenceLabel[r.confidence]}</Badge>
                          <Badge variant={r.difficulty === 'easy' ? 'easy' : r.difficulty === 'complex' ? 'complex' : 'medium'}>
                            {difficultyLabel[r.difficulty]}
                          </Badge>
                        </div>
                        {r.notes && (
                          <p className="text-sm text-slate-500 mb-3 leading-relaxed">{r.notes}</p>
                        )}
                        {r.estimatedRefundMax > 0 && (
                          <div className="text-base font-bold text-emerald-700">
                            Estimated: {fmt(r.estimatedRefundMin)} – {fmt(r.estimatedRefundMax)}
                          </div>
                        )}
                      </div>
                    </div>

                    {r.proofNeeded.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" /> Documents needed
                        </p>
                        <ul className="space-y-1">
                          {r.proofNeeded.map((proof, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                              {proof}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-3 text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
                      <strong>Revenue section:</strong> {r.revenueSection}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
          <Link href="/vault">
            <Button variant="outline" className="w-full">
              Upload documents
            </Button>
          </Link>
          <Link href="/checklist">
            <Button className="w-full">
              Claim checklist
            </Button>
          </Link>
          <Link href="/quiz">
            <Button variant="ghost" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" /> Redo quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
