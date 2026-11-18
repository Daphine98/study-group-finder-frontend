import { Link } from 'react-router-dom'
import { FiBookOpen, FiMapPin, FiUsers } from 'react-icons/fi'

export default function GroupCard({ group }) {
  return (
    <article className="card group-card">
      <span className="badge">{group.course_code}</span>
      <h3>{group.name}</h3>
      <p className="muted"><FiBookOpen /> {group.course_name}</p>
      <p className="group-description">{group.description}</p>
      <div className="group-meta">
        <span><FiUsers /> {group.member_count} members</span>
        <span><FiMapPin /> {group.meeting_location}</span>
      </div>
      <Link className="btn btn-outline btn-block" to={`/groups/${group.id}`}>View group</Link>
    </article>
  )
}
