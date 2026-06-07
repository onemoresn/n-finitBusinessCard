import { FormEvent, useState } from 'react'
import { verifyPassword } from '../storage'

interface Props {
  onSuccess: () => void
  onClose: () => void
}

export default function PasswordGate({ onSuccess, onClose }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (verifyPassword(password)) {
      setError('')
      onSuccess()
      return
    }
    setError('Incorrect password. Please try again.')
    setPassword('')
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal modal--compact"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="password-gate-title"
        aria-modal="true"
      >
        <div className="modal__header">
          <h2 id="password-gate-title" className="modal__title">Enter Password</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <p className="password-gate__hint">Enter your password to access settings.</p>

          <label className="field">
            <span className="field__label">Password</span>
            <input
              type="password"
              className="field__input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError('')
              }}
              placeholder="Enter password"
              autoFocus
              autoComplete="current-password"
            />
          </label>

          {error && <p className="field__error" role="alert">{error}</p>}

          <div className="settings-form__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Unlock
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
