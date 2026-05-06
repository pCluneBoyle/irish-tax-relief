import { clsx } from 'clsx';

type BadgeVariant =
  | 'green'
  | 'blue'
  | 'amber'
  | 'red'
  | 'slate'
  | 'emerald'
  | 'high'
  | 'medium'
  | 'check'
  | 'easy'
  | 'complex'
  | 'eligible'
  | 'possible';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  amber: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-800',
  slate: 'bg-slate-100 text-slate-700',
  emerald: 'bg-emerald-100 text-emerald-800',
  high: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  check: 'bg-blue-100 text-blue-800',
  easy: 'bg-emerald-100 text-emerald-800',
  complex: 'bg-red-100 text-red-700',
  eligible: 'bg-emerald-100 text-emerald-800',
  possible: 'bg-amber-100 text-amber-800',
};

export default function Badge({ variant = 'slate', children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
