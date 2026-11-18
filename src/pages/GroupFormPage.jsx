// Used for both "Create group" (/groups/new) and "Edit group" (/groups/:groupId/edit)
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../services/api.js'
import { FACULTIES } from '../constants.js'
import { ErrorMessage, Loader } from '../components/Feedback.jsx'

const emptyGroup = { name: '', courseName: '', courseCode: '', faculty: FACULTIES[0], description: '', meetingLocation: '' }

export default function GroupFormPage() {
  const { groupId } = useParams()
  const isEditing = Boolean(groupId)
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(emptyGroup)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(isEditing)

  // When editing, load the existing group into the form
  useEffect(() => {
    if (!isEditing) return
    api.get(`/groups/${groupId}`).then(({ group }) => {
      setFormValues({
        name: group.name, courseName: group.course_name, courseCode: group.course_code,
        faculty: group.faculty, description: group.description, meetingLocation: group.meeting_location,
      })
      setIsLoading(false)
    }).catch((error) => setErrorMessage(error.message))
  }, [groupId, isEditing])

  function handleChange(event) {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')
    try {
      const data = isEditing
        ? await api.put(`/groups/${groupId}`, formValues)
        : await api.post('/groups', formValues)
      navigate(`/groups/${data.group.id}`)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  if (isLoading) return <Loader />

  return (
    <>
      <div className="page-head">
        <h1>{isEditing ? 'Edit group' : 'Create a study group'}</h1>
        <p>{isEditing ? 'Update your group information.' : 'You will automatically become the group leader.'}</p>
      </div>
      <form className="card form-grid" onSubmit={handleSubmit}>
        <ErrorMessage message={errorMessage} />
        <label className="field">Group name
          <input name="name" value={formValues.name} onChange={handleChange} required />
        </label>
        <label className="field">Course name
          <input name="courseName" value={formValues.courseName} onChange={handleChange} required />
        </label>
        <label className="field">Course code
          <input name="courseCode" value={formValues.courseCode} onChange={handleChange} required />
        </label>
        <label className="field">Faculty
          <select name="faculty" value={formValues.faculty} onChange={handleChange}>
            {FACULTIES.map((faculty) => <option key={faculty}>{faculty}</option>)}
          </select>
        </label>
        <label className="field full">Meeting location (physical or online)
          <input name="meetingLocation" value={formValues.meetingLocation} onChange={handleChange} required />
        </label>
        <label className="field full">Study focus
          <textarea name="description" rows="4" value={formValues.description} onChange={handleChange} required />
        </label>
        <div className="full form-actions">
          <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>Cancel</button>
          <button className="btn btn-primary">{isEditing ? 'Save changes' : 'Create group'}</button>
        </div>
      </form>
    </>
  )
}
