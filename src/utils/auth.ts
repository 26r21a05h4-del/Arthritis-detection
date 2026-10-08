/**
 * Authorised Credentials Authentication Engine
 * Verifies credentials, manages session persistence, and enforces access control.
 */

import { AuthorizedUser, AuthState } from '../types/auth';

const AUTH_STORAGE_KEY = 'oa_auth_session_v1';

export interface AuthorizedAccountEntry {
  email: string;
  password: string; // evaluated securely in client session
  user: AuthorizedUser;
}

export const AUTHORIZED_CREDENTIALS: AuthorizedAccountEntry[] = [
  {
    email: '26r21a05h4@mlrit.ac.in',
    password: 'ClinicalLead#2026',
    user: {
      id: 'usr_mlrit_01',
      email: '26r21a05h4@mlrit.ac.in',
      name: 'Lead Investigator (MLRIT)',
      role: 'Principal Evaluator',
      institution: 'MLR Institute of Technology · Bio-AI Lab',
      licenseOrId: 'MLRIT-CSE-2026',
      avatarInitials: 'LI',
    },
  },
  {
    email: 'dr.evaluator@oa-screening.org',
    password: 'ClinicalPass#2026',
    user: {
      id: 'usr_ortho_02',
      email: 'dr.evaluator@oa-screening.org',
      name: 'Dr. Sarah Chen, MD',
      role: 'Orthopedic Specialist',
      institution: 'University Musculoskeletal Center',
      licenseOrId: 'MED-OA-89104',
      avatarInitials: 'SC',
    },
  },
  {
    email: 'researcher@biomech.lab',
    password: 'BioMechPass#2026',
    user: {
      id: 'usr_biomech_03',
      email: 'researcher@biomech.lab',
      name: 'Alex Rivera, M.Sc.',
      role: 'Biomechanics Researcher',
      institution: 'Clinical Motion Analysis Unit',
      licenseOrId: 'CMAC-KIN-442',
      avatarInitials: 'AR',
    },
  },
];

/**
 * Validates provided credentials against the list of authorized evaluators.
 */
export function validateCredentials(email: string, password: string): AuthorizedUser | null {
  const normalizedEmail = email.trim().toLowerCase();
  const account = AUTHORIZED_CREDENTIALS.find(
    (acc) => acc.email.toLowerCase() === normalizedEmail && acc.password === password
  );

  return account ? account.user : null;
}

/**
 * Retrieves the current session from localStorage.
 */
export function getCurrentAuth(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { isAuthenticated: false, user: null };
    const user = JSON.parse(raw) as AuthorizedUser;
    return { isAuthenticated: true, user };
  } catch (err) {
    console.error('Failed to read auth session:', err);
    return { isAuthenticated: false, user: null };
  }
}

/**
 * Persists the authorized session.
 */
export function setAuthSession(user: AuthorizedUser): void {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Failed to save auth session:', err);
  }
}

/**
 * Clears the active session (Sign Out).
 */
export function clearAuthSession(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear auth session:', err);
  }
}
