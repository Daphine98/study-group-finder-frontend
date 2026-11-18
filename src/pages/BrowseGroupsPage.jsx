import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { api } from '../services/api.js'
import { FACULTIES } from '../constants.js'
import { Loader, ErrorMessage, EmptyState } from '../components/Feedback.jsx'
import GroupCard from '../components/GroupCard.jsx'

export default function BrowseGroupsPage() {
  const [filters, setFilters] = useState({ course: '', faculty: '', title: '' })
  const [groups, setGroups] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // Re-run the search shortly after the user stops typing
  useEffect(() => {
    const searchTimer = setTimeout(() => {
      const queryString = new URLSearchParams(filters).toString()
      api.get(`/groups?${queryString}`)
        .then((data) => setGroups(data.groups))
        .catch((error) => setErrorMessage(error.message))
    }, 300)
    return () => clearTimeout(searchTimer)
  }, [filters])

  function handleChange(event) {
    setFilters({ ...filters, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className="page-head">
        <h1>Browse study groups</h1>
        <p>Search by course, faculty or group title.</p>
      </div>

      <div className="card filter-bar">
        <label className="input-icon"><FiSearch />
          <input name="title" placeholder="Group title" value={filters.title} onChange={handleChange} />
        </label>
        <input name="course" placeholder="Course name or code" value={filters.course} onChange={handleChange} />
        <select name="faculty" value={filters.faculty} onChange={handleChange}>
          <option value="">All faculties</option>
          {FACULTIES.map((faculty) => <option key={faculty} value={faculty}>{faculty}</option>)}
        </select>
      </div>

      <ErrorMessage message={errorMessage} />
      {!groups ? <Loader /> : groups.length === 0 ? (
        <EmptyState title="No groups found" text="Try different filters, or create the first group for that course." />
      ) : (
        <div className="cards-grid">{groups.map((group) => <GroupCard key={group.id} group={group} />)}</div>
      )}
    </>
  )
}
