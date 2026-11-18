// Everything about one group: overview, sessions, discussion and members.
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiBookOpen, FiMapPin, FiUsers, FiEdit2, FiTrash2, FiCalendar, FiClock, FiUserX } from 'react-icons/fi'
import { api } from '../services/api.js'
import { POST_TYPES } from '../constants.js'
import { Loader, ErrorMessage, EmptyState } from '../components/Feedback.jsx'
import { formatDate, formatTime, formatDateTime, getInitials } from '../utils.js'

const emptySession = { title: '', sessionDate: '', sessionTime: '', locationOrLink: '', description: '' }

export default function GroupDetailsPage() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const [details, setDetails] = useState(null)      // { group, members, myRole }
  const [sessions, setSessions] = useState([])
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('sessions')
  const [sessionForm, setSessionForm] = useState(emptySession)
  const [postForm, setPostForm] = useState({ type: 'announcement', content: '' })
  const [errorMessage, setErrorMessage] = useState('')

  // Loads the group, and (only for members) its sessions and posts
  const loadGroup = useCallback(async () => {
    try {
      const groupData = await api.get(`/groups/${groupId}`)
      setDetails(groupData)
      if (groupData.myRole) {
        const [sessionData, postData] = await Promise.all([
          api.get(`/groups/${groupId}/sessions`),
          api.get(`/groups/${groupId}/posts`),
        ])
        setSessions(sessionData.sessions)
        setPosts(postData.posts)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }, [groupId])

  useEffect(() => { loadGroup() }, [loadGroup])

  // Small helper: run an API action, then reload the page data
  async function runAction(action) {
    setErrorMessage('')
    try {
      await action()
      await loadGroup()
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  if (!details) return errorMessage ? <ErrorMessage message={errorMessage} /> : <Loader />

  const { group, members, myRole } = details
  const isLeader = myRole === 'leader'
  const isMember = Boolean(myRole)

  async function handleDeleteGroup() {
    if (!window.confirm('Delete this group permanently?')) return
    await api.delete(`/groups/${groupId}`)
    navigate('/my-groups')
  }

  function handleScheduleSession(event) {
    event.preventDefault()
    runAction(async () => {
      await api.post(`/groups/${groupId}/sessions`, sessionForm)
      setSessionForm(emptySession)
    })
  }

  function handleAddPost(event) {
    event.preventDefault()
    runAction(async () => {
      await api.post(`/groups/${groupId}/posts`, postForm)
      setPostForm({ ...postForm, content: '' })
    })
  }

  return (
    <>
      <section className="group-hero">
        <div>
          <span className="badge badge-light">{group.course_code}</span>
          <h1>{group.name}</h1>
          <p><FiBookOpen /> {group.course_name} · {group.faculty}</p>
          <p><FiMapPin /> {group.meeting_location} · <FiUsers /> {group.member_count} members</p>
          <p className="hero-description">{group.description}</p>
        </div>
        <div className="hero-actions">
          {!isMember && <button className="btn btn-accent" onClick={() => runAction(() => api.post(`/groups/${groupId}/join`))}>Join group</button>}
          {myRole === 'member' && <button className="btn btn-ghost-light" onClick={() => runAction(() => api.delete(`/groups/${groupId}/leave`))}>Leave group</button>}
          {isLeader && (
            <>
              <Link to={`/groups/${groupId}/edit`} className="btn btn-ghost-light"><FiEdit2 /> Edit</Link>
              <button className="btn btn-ghost-light" onClick={handleDeleteGroup}><FiTrash2 /> Delete</button>
            </>
          )}
        </div>
      </section>

      <ErrorMessage message={errorMessage} />

      {!isMember ? (
        <EmptyState title="Join to see more" text="Sessions, discussions and the member list are visible to group members." />
      ) : (
        <>
          <div className="tabs">
            {['sessions', 'discussion', 'members'].map((tab) => (
              <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>
            ))}
          </div>

          {activeTab === 'sessions' && (
            <div className="two-column">
              <section className="card">
                <h2>Study sessions</h2>
                {sessions.length === 0 && <p className="muted">No sessions scheduled yet.</p>}
                <ul className="session-list">
                  {sessions.map((session) => (
                    <li key={session.id}>
                      <div className="date-chip"><FiCalendar /></div>
                      <div className="grow">
                        <strong>{session.title}</strong>
                        <small>{formatDate(session.session_date)} · <FiClock /> {formatTime(session.session_time)}</small>
                        <small><FiMapPin /> {session.location_or_link}</small>
                        {session.description && <small>{session.description}</small>}
                      </div>
                      {isLeader && (
                        <button className="icon-btn danger" aria-label="Cancel session" onClick={() => runAction(() => api.delete(`/sessions/${session.id}`))}><FiTrash2 /></button>
                      )}
                    </li>
                  ))}
                </ul>
              </section>

              {isLeader && (
                <form className="card" onSubmit={handleScheduleSession}>
                  <h2>Schedule a session</h2>
                  <label className="field">Title<input value={sessionForm.title} onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })} required /></label>
                  <div className="row-2">
                    <label className="field">Date<input type="date" value={sessionForm.sessionDate} onChange={(e) => setSessionForm({ ...sessionForm, sessionDate: e.target.value })} required /></label>
                    <label className="field">Time<input type="time" value={sessionForm.sessionTime} onChange={(e) => setSessionForm({ ...sessionForm, sessionTime: e.target.value })} required /></label>
                  </div>
                  <label className="field">Location or meeting link<input value={sessionForm.locationOrLink} onChange={(e) => setSessionForm({ ...sessionForm, locationOrLink: e.target.value })} required /></label>
                  <label className="field">Brief description<textarea rows="3" value={sessionForm.description} onChange={(e) => setSessionForm({ ...sessionForm, description: e.target.value })} /></label>
                  <button className="btn btn-primary btn-block">Add session</button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="two-column">
              <section className="card">
                <h2>Group discussion</h2>
                {posts.length === 0 && <p className="muted">Be the first to post.</p>}
                <ul className="post-list">
                  {posts.map((post) => (
                    <li key={post.id}>
                      <div className="avatar small">{getInitials(post.author_name)}</div>
                      <div>
                        <strong>{post.author_name}</strong> <span className={`badge type-${post.type}`}>{post.type}</span>
                        <p>{post.content}</p>
                        <small className="muted">{formatDateTime(post.created_at)}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
              <form className="card" onSubmit={handleAddPost}>
                <h2>New post</h2>
                <label className="field">Type
                  <select value={postForm.type} onChange={(e) => setPostForm({ ...postForm, type: e.target.value })}>
                    {POST_TYPES.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                  </select>
                </label>
                <label className="field">Message
                  <textarea rows="4" value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} required />
                </label>
                <button className="btn btn-primary btn-block">Post</button>
              </form>
            </div>
          )}

          {activeTab === 'members' && (
            <section className="card">
              <h2>Members ({members.length})</h2>
              <ul className="member-list">
                {members.map((member) => (
                  <li key={member.id}>
                    <div className="avatar">{getInitials(member.name)}</div>
                    <div className="grow">
                      <strong>{member.name}</strong> {member.role === 'leader' && <span className="badge">Leader</span>}
                      <small>{member.program} · Year {member.year_of_study}</small>
                    </div>
                    {isLeader && member.role !== 'leader' && (
                      <button className="icon-btn danger" aria-label="Remove member" onClick={() => runAction(() => api.delete(`/groups/${groupId}/members/${member.id}`))}><FiUserX /></button>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </>
  )
}
