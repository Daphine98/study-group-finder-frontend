// Small reusable pieces: loading spinner, error box and empty state
import { FiAlertCircle, FiInbox } from 'react-icons/fi'

export function Loader() {
  return <div className="loader-wrap"><div className="spinner" /></div>
}

export function ErrorMessage({ message }) {
  if (!message) return null
  return <div className="alert alert-error"><FiAlertCircle /> {message}</div>
}

export function EmptyState({ title, text, children }) {
  return (
    <div className="empty-state">
      <FiInbox size={36} />
      <h4>{title}</h4>
      <p>{text}</p>
      {children}
    </div>
  )
}
