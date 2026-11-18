import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api.js'
import { Loader, ErrorMessage, EmptyState } from '../components/Feedback.jsx'
import GroupCard from '../components/GroupCard.jsx'

export default function MyGroupsPage() {
  const [groups, setGroups] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    api.get('/dashboard').then((data) => setGroups(data.myGroups)).catch((error) => setErrorMessage(error.message))
  }, [])

  if (errorMessage) return <ErrorMessage message={errorMessage} />
  if (!groups) return <Loader />

  return (
    <>
      <div className="page-head"><h1>My groups</h1><p>Groups you lead or belong to.</p></div>
      {groups.length === 0 ? (
        <EmptyState title="Nothing here yet" text="Join a group or start your own.">
          <Link to="/groups" className="btn btn-primary">Browse groups</Link>
        </EmptyState>
      ) : (
        <div className="cards-grid">{groups.map((group) => <GroupCard key={group.id} group={group} />)}</div>
      )}
    </>
  )
}
