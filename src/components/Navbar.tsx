import React, { useState } from 'react';
import {
  Activity,
  Sparkles,
  Menu,
  X,
  Lock,
  LogOut,
  UserCheck,
  ShieldCheck,
} from 'lucide-react';
import { AuthorizedUser } from '../types/auth';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onLaunchDemo: () => void;
  hasRecentResult: boolean;
  authUser: AuthorizedUser | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onLaunchDemo,
  hasRecentResult,
  authUser,
  onOpenLogin,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'screening', label: 'Screening' },
    { id: 'how-it-works', label: 'How It Works' },
    ...(hasRecentResult ? [{ id: 'results', label: 'Results' }] : []),
    { id: 'history', label: 'Records' },
    { id: 'about', label: 'About' },
    { id: 'disclaimer', label: 'Medical Disclaimer' },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-teal-800 transition-colors">
              <Activity className="w-5 h-5 text-teal-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 tracking-tight text-base sm:text-lg">
                  KneeKinematics AI
                </span>
                <span className="text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60 hidden sm:inline-block">
                  Prototype
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal hidden sm:block">
                Early Osteoarthritis Movement Screening
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? 'text-teal-800 bg-teal-50/80 font-semibold'
                      : 'hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Auth Controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onLaunchDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
              title="Demonstrate preset movement data without a camera"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Demo Analysis
            </button>

            {/* Authorised Evaluator Section */}
            {authUser ? (
              <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
                  <div className="w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center text-[10px] font-bold">
                    {authUser.avatarInitials}
                  </div>
                  <div className="text-left text-xs leading-none">
                    <span className="font-semibold text-slate-900 block truncate max-w-[120px]">
                      {authUser.name}
                    </span>
                    <span className="text-[10px] text-teal-700 font-medium">
                      {authUser.role}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition"
                  title="Sign Out"
                  aria-label="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-md shadow-2xs transition"
              >
                <Lock className="w-3.5 h-3.5 text-teal-700" />
                <span>Authorised Login</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('screening')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium text-white bg-teal-700 hover:bg-teal-800 rounded-md shadow-xs transition-colors"
            >
              Start Screening
            </button>
          </div>

          {/* Mobile hamburger & quick auth */}
          <div className="flex lg:hidden items-center gap-2">
            {!authUser && (
              <button
                onClick={onOpenLogin}
                className="p-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-md sm:hidden"
                title="Authorised Login"
              >
                <Lock className="w-4 h-4 text-teal-700" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {/* Mobile Auth Banner */}
          {authUser ? (
            <div className="p-3 bg-teal-50 rounded-lg border border-teal-200 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-xs font-bold">
                  {authUser.avatarInitials}
                </div>
                <div>
                  <div className="font-semibold text-xs text-slate-900">{authUser.name}</div>
                  <div className="text-[10px] text-teal-700">{authUser.role} · {authUser.institution}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-rose-700 font-semibold px-2 py-1 bg-white border border-rose-200 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="p-2.5 mb-2">
              <button
                onClick={() => {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-teal-900 bg-teal-50 border border-teal-200 rounded-md"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Authorised Evaluator Login</span>
              </button>
            </div>
          )}

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md font-medium ${
                currentTab === item.id
                  ? 'text-teal-800 bg-teal-50 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onLaunchDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-md"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              Demo Analysis
            </button>
            <button
              onClick={() => handleNavClick('screening')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-teal-700 rounded-md"
            >
              Start Screening
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
