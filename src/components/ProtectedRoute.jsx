import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Loader } from './Feedback.jsx'

// Sends visitors to /login when they are not signed in (or not an admin when required)
export default function ProtectedRoute({ adminOnly = false }) {
  const { user, checkingSession } = useAuth()
  if (checkingSession) return <Loader />
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" replace />
  return <Outlet />
}
