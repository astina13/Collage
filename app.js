import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch notes
  useEffect(() => {
    axios.get('http://localhost:5000/api/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add a new note
  const addNote = () => {
    axios.post('http://localhost:5000/api/notes', { title, content })
      .then(res => setNotes([...notes, res.data]))
      .catch(err => console.error(err));
  };

  // Delete a note
  const deleteNote = (id) => {
    axios.delete(`http://localhost:5000/api/notes/${id}`)
      .then(() => setNotes(notes.filter(note => note._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple Notes App</h1>

      <div>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder="Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
        />
        <button onClick={addNote}>Add Note</button>
      </div>

      <div>
        {notes.map(note => (
          <div key={note._id} style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

