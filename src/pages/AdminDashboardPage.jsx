import { useEffect, useState } from 'react'
import { FiUsers, FiLayers, FiCalendar } from 'react-icons/fi'
import { api } from '../services/api.js'
import { Loader, ErrorMessage } from '../components/Feedback.jsx'
import StatCard from '../components/StatCard.jsx'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    api.get('/admin/dashboard').then(setStats).catch((error) => setErrorMessage(error.message))
  }, [])

  if (errorMessage) return <ErrorMessage message={errorMessage} />
  if (!stats) return <Loader />

  // The longest bar is 100% wide, the others are scaled against it
  const largestCount = Math.max(...stats.activeCourses.map((course) => course.group_count), 1)

  return (
    <>
      <div className="page-head"><h1>Administrator dashboard</h1><p>Platform activity at a glance.</p></div>
      <div className="stats-grid">
        <StatCard icon={<FiUsers />} label="Registered users" value={stats.totalUsers} tone="indigo" />
        <StatCard icon={<FiLayers />} label="Study groups" value={stats.totalGroups} tone="coral" />
        <StatCard icon={<FiCalendar />} label="Study sessions" value={stats.totalSessions} tone="teal" />
      </div>

      <div className="two-column">
        <section className="card">
          <h2>Most active courses</h2>
          {stats.activeCourses.length === 0 && <p className="muted">No groups yet.</p>}
          {stats.activeCourses.map((course) => (
            <div key={course.course_code} className="bar-row">
              <div className="bar-label"><span>{course.course_name}</span><b>{course.group_count}</b></div>
              <div className="bar-track"><div className="bar-fill" style={{ width: `${(course.group_count / largestCount) * 100}%` }} /></div>
            </div>
          ))}
        </section>

        <section className="card">
          <h2>Newest users</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Name</th><th>Program</th><th>Role</th></tr></thead>
              <tbody>
                {stats.recentUsers.map((person) => (
                  <tr key={person.id}><td>{person.name}</td><td>{person.program}</td><td><span className="badge">{person.role}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}
