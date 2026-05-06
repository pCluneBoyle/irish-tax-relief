'use client';
import { useState, useEffect } from 'react';
import { Save, Bell, User, Briefcase, GraduationCap, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import type { UserProfile } from '@/lib/types';

const TAX_YEARS = [2024, 2023, 2022, 2021, 2020];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  employmentType: 'full-time',
  isStudent: false,
  taxYearsChecked: [2024],
  reminderEnabled: false,
  reminderMonth: 1,
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const p = localStorage.getItem('user-profile');
    if (p) setProfile(JSON.parse(p));
  }, []);

  function handleSave() {
    localStorage.setItem('user-profile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function toggleYear(y: number) {
    const yrs = profile.taxYearsChecked.includes(y)
      ? profile.taxYearsChecked.filter((v) => v !== y)
      : [...profile.taxYearsChecked, y];
    setProfile({ ...profile, taxYearsChecked: yrs });
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Your Profile</h1>
          <p className="text-slate-500 text-sm">Save your details to personalise future checks.</p>
        </div>

        <div className="space-y-5">
          {/* Personal details */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-slate-500" />
              <h2 className="font-semibold text-slate-900">Personal details</h2>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Full name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Email address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Employment */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4 text-slate-500" />
              <h2 className="font-semibold text-slate-900">Employment</h2>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Employment type</label>
              <select
                value={profile.employmentType}
                onChange={(e) => setProfile({ ...profile, employmentType: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="full-time">Full-time PAYE</option>
                <option value="part-time">Part-time PAYE</option>
                <option value="contract">Contract (PAYE)</option>
                <option value="multiple">Multiple employers</option>
              </select>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                type="checkbox"
                id="isStudent"
                checked={profile.isStudent}
                onChange={(e) => setProfile({ ...profile, isStudent: e.target.checked })}
                className="w-4 h-4 accent-emerald-600"
              />
              <label htmlFor="isStudent" className="flex items-center gap-1.5 text-sm text-slate-700">
                <GraduationCap className="w-4 h-4 text-slate-400" />
                I am or was a student during one of the tax years
              </label>
            </div>
          </div>

          {/* Tax years */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h2 className="font-semibold text-slate-900 mb-1">Tax years I want to check</h2>
            <p className="text-xs text-slate-400 mb-3">Select all that apply.</p>
            <div className="flex flex-wrap gap-2">
              {TAX_YEARS.map((y) => (
                <button
                  key={y}
                  onClick={() => toggleYear(y)}
                  className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                    profile.taxYearsChecked.includes(y)
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 text-slate-600 hover:border-emerald-300'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Reminders */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-4 h-4 text-slate-500" />
              <h2 className="font-semibold text-slate-900">Yearly reminder</h2>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="reminder"
                checked={profile.reminderEnabled}
                onChange={(e) => setProfile({ ...profile, reminderEnabled: e.target.checked })}
                className="w-4 h-4 accent-emerald-600"
              />
              <label htmlFor="reminder" className="text-sm text-slate-700">
                Remind me to check my tax reliefs each year
              </label>
            </div>
            {profile.reminderEnabled && (
              <div>
                <label className="text-xs font-medium text-slate-500 mb-1 block">Remind me in</label>
                <select
                  value={profile.reminderMonth}
                  onChange={(e) => setProfile({ ...profile, reminderMonth: Number(e.target.value) })}
                  className="px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                >
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Save button */}
          <Button onClick={handleSave} className="w-full">
            {saved ? (
              <><CheckCircle className="w-4 h-4 mr-2" /> Saved</>
            ) : (
              <><Save className="w-4 h-4 mr-2" /> Save profile</>
            )}
          </Button>

          <p className="text-xs text-slate-400 text-center">
            Your profile is saved locally on this device only.
          </p>
        </div>
      </div>
    </div>
  );
}
