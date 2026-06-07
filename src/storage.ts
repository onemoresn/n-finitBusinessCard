import { CardProfile, DEFAULT_PROFILE } from './types'

const STORAGE_KEY = 'digital-business-card-3d-profile'
const PASSWORD_KEY = 'digital-business-card-3d-password'
const WIZARD_KEY = 'digital-business-card-3d-wizard-complete'

export function loadProfile(): CardProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_PROFILE }
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_PROFILE }
  }
}

export function saveProfile(profile: CardProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

export function isPasswordConfigured(): boolean {
  try {
    return localStorage.getItem(PASSWORD_KEY) !== null
  } catch {
    return false
  }
}

export function loadPassword(): string | null {
  try {
    return localStorage.getItem(PASSWORD_KEY)
  } catch {
    return null
  }
}

export function savePassword(password: string): void {
  localStorage.setItem(PASSWORD_KEY, password)
}

export function verifyPassword(input: string): boolean {
  const stored = loadPassword()
  return stored !== null && input === stored
}

export function isWizardComplete(): boolean {
  try {
    return localStorage.getItem(WIZARD_KEY) === 'true'
  } catch {
    return false
  }
}

export function markWizardComplete(): void {
  localStorage.setItem(WIZARD_KEY, 'true')
}
