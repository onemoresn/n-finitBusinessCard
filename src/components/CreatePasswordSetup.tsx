import { FormEvent, useState } from 'react'
import { savePassword } from '../storage'

interface Props {
  onSuccess: () => void
  onClose: () => void
}

export default function CreatePasswordSetup({ onSuccess, onClose }: Props) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 4) {
      setError('Password must be at least 4 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    savePassword(password)
    onSuccess()
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal modal--compact"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="create-password-title"
        aria-modal="true"
      >
        <div className="modal__header">
          <h2 id="create-password-title" className="modal__title">Create Password</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <p className="password-gate__hint">
            Create a password to protect your settings. You can change it later in Settings.
          </p>

          <label className="field">
            <span className="field__label">New Password</span>
            <input
              type="password"
              className="field__input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError('')
              }}
              placeholder="At least 4 characters"
              autoFocus
              autoComplete="new-password"
            />
          </label>

          <label className="field">
            <span className="field__label">Confirm Password</span>
            <input
              type="password"
              className="field__input"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value)
                if (error) setError('')
              }}
              placeholder="Re-enter password"
              autoComplete="new-password"
            />
          </label>

          {error && <p className="field__error" role="alert">{error}</p>}

          <div className="settings-form__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Create &amp; Open Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
