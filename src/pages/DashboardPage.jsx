import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiUsers, FiCalendar, FiClock, FiMapPin } from 'react-icons/fi'
import { api } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { Loader, ErrorMessage, EmptyState } from '../components/Feedback.jsx'
import StatCard from '../components/StatCard.jsx'
import GroupCard from '../components/GroupCard.jsx'
import { formatDate, formatTime } from '../utils.js'

export default function DashboardPage() {
  const { user } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    api.get('/dashboard').then(setDashboard).catch((error) => setErrorMessage(error.message))
  }, [])

  if (errorMessage) return <ErrorMessage message={errorMessage} />
  if (!dashboard) return <Loader />

  return (
    <>
      <section className="welcome-banner">
        <div>
          <h1>Hello, {user.name.split(' ')[0]} 👋</h1>
          <p>Here is what is happening in your study groups.</p>
        </div>
        <Link to="/groups/new" className="btn btn-accent">Create a group</Link>
      </section>

      <div className="stats-grid">
        <StatCard icon={<FiUsers />} label="My groups" value={dashboard.myGroups.length} tone="indigo" />
        <StatCard icon={<FiCalendar />} label="Upcoming sessions" value={dashboard.upcomingSessions.length} tone="coral" />
        <StatCard icon={<FiClock />} label="New groups" value={dashboard.recentGroups.length} tone="teal" />
      </div>

      <div className="two-column">
        <section className="card">
          <h2>Upcoming study sessions</h2>
          {dashboard.upcomingSessions.length === 0 ? (
            <EmptyState title="No sessions yet" text="Sessions scheduled by your group leaders appear here." />
          ) : (
            <ul className="session-list">
              {dashboard.upcomingSessions.map((session) => (
                <li key={session.id}>
                  <div className="date-chip"><b>{formatDate(session.session_date).split(' ').slice(1, 3).join(' ')}</b></div>
                  <div>
                    <strong>{session.title}</strong>
                    <small>{session.group_name}</small>
                    <small><FiClock /> {formatTime(session.session_time)} · <FiMapPin /> {session.location_or_link}</small>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <h2>My study groups</h2>
          {dashboard.myGroups.length === 0 ? (
            <EmptyState title="You have not joined a group" text="Browse groups to find one that matches your courses.">
              <Link to="/groups" className="btn btn-primary">Browse groups</Link>
            </EmptyState>
          ) : (
            <ul className="mini-list">
              {dashboard.myGroups.slice(0, 5).map((group) => (
                <li key={group.id}>
                  <Link to={`/groups/${group.id}`}>{group.name}</Link>
                  <small>{group.course_code} · {group.member_count} members</small>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <h2 className="section-title">Recently created groups</h2>
      <div className="cards-grid">
        {dashboard.recentGroups.map((group) => <GroupCard key={group.id} group={group} />)}
      </div>
    </>
  )
}
