import { useState } from 'react'

interface Props {
  onComplete: () => void
  onGetStarted: () => void
}

const STEPS = [
  {
    title: 'Welcome to Your Digital Business Card',
    body: 'Share your professional identity in one beautiful, mobile-friendly page — no paper cards needed.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M12 12h.01" />
        <path d="M17 12h.01" />
        <path d="M7 12h.01" />
      </svg>
    ),
  },
  {
    title: 'Customize Your Profile',
    body: 'Tap the gear icon in the top-right corner to add your name, photo, job title, company, and bio.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    title: 'One-Tap Contact Actions',
    body: 'Visitors can call, email, message, or visit your website directly from the action buttons on your card.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
        <path d="M8 6h8" />
        <path d="M8 10h8" />
      </svg>
    ),
  },
  {
    title: 'Share with a QR Code',
    body: 'The QR code at the bottom lets anyone scan and open your card instantly — perfect for networking events.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <path d="M14 14h2v2h-2z" />
        <path d="M18 14h3v3h-3z" />
        <path d="M14 18h2v3h-2z" />
        <path d="M18 18h3v3h-3z" />
      </svg>
    ),
  },
  {
    title: "You're All Set!",
    body: 'Set up your password and customize your card now. Your changes save automatically in this browser.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m22 4-10 10.01-3-3" />
      </svg>
    ),
  },
]

export default function OnboardingWizard({ onComplete, onGetStarted }: Props) {
  const [step, setStep] = useState(0)
  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  const handleNext = () => {
    if (isLast) {
      onComplete()
      onGetStarted()
      return
    }
    setStep((s) => s + 1)
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="modal-overlay wizard-overlay" role="presentation">
      <div
        className="modal wizard"
        role="dialog"
        aria-labelledby="wizard-title"
        aria-modal="true"
      >
        <div className="wizard__progress" aria-hidden="true">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`wizard__dot${i === step ? ' wizard__dot--active' : ''}${i < step ? ' wizard__dot--done' : ''}`}
            />
          ))}
        </div>

        <div className="wizard__icon" aria-hidden="true">{current.icon}</div>

        <p className="wizard__step-label">Step {step + 1} of {STEPS.length}</p>
        <h2 id="wizard-title" className="wizard__title">{current.title}</h2>
        <p className="wizard__body">{current.body}</p>

        <div className="wizard__actions">
          {!isLast && (
            <button type="button" className="btn btn--ghost" onClick={handleSkip}>
              Skip Tour
            </button>
          )}
          <div className="wizard__actions-main">
            {step > 0 && (
              <button type="button" className="btn btn--secondary" onClick={() => setStep((s) => s - 1)}>
                Back
              </button>
            )}
            <button type="button" className="btn btn--primary" onClick={handleNext}>
              {isLast ? 'Set Up My Card' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
