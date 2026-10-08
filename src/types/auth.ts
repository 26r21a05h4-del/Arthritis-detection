/**
 * Authentication and Authorised Credentials Types
 */

export interface AuthorizedUser {
  id: string;
  email: string;
  name: string;
  role: 'Principal Evaluator' | 'Orthopedic Specialist' | 'Biomechanics Researcher';
  institution: string;
  licenseOrId: string;
  avatarInitials: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthorizedUser | null;
}
