
import { useState } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editId, setEditId] = useState(null)

  function saveNote() {
    if (!title.trim() || !content.trim()) {
      alert('Please enter a title and note!')
      return
    }

    if (editId !== null) {
      setNotes(notes.map(note =>
        note.id === editId ? { ...note, title, content } : note
      ))
      setEditId(null)
    } else {
      setNotes([...notes, { id: Date.now(), title, content }])
    }

    setTitle('')
    setContent('')
  }

  function editNote(note) {
    setTitle(note.title)
    setContent(note.content)
    setEditId(note.id)
  }

  function deleteNote(id) {
    setNotes(notes.filter(note => note.id !== id))
    if (editId === id) {
      setEditId(null)
      setTitle('')
      setContent('')
    }
  }

  return (
    <div className="app">
      <h1>📝 My Notes Manager</h1>
      <p className="subtitle">Create, view, update and delete your notes</p>

      <div className="note-form">
        <input
          placeholder="Enter note title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button onClick={saveNote}>
          {editId !== null ? 'Update Note' : 'Add Note'}
        </button>
        {editId !== null && (
          <button className="cancel" onClick={() => {
            setEditId(null)
            setTitle('')
            setContent('')
          }}>
            Cancel Edit
          </button>
        )}
      </div>

      <h2>My Saved Notes ({notes.length})</h2>

      <div className="notes-list">
        {notes.map(note => (
          <div className="note-card" key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => editNote(note)}>Edit</button>
            <button className="delete" onClick={() => deleteNote(note.id)}>
              Delete
            </button>
          </div>
        ))}
        {notes.length === 0 && <p>No notes yet. Add your first note!</p>}
      </div>
    </div>
  )
}

export default App