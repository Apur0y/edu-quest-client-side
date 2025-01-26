import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);
  const [updatedNote, setUpdatedNote] = useState({ title: "", description: "" });

  // Fetch all notes when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/notes");
        setNotes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);
console.log(notes);
  // Delete note function
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Update note function
  const updateNote = async () => {
    if (!updatedNote.title.trim() || !updatedNote.description.trim()) {
      alert("Title and Description cannot be empty!");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/notes/${editingNote._id}`, updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === editingNote._id
            ? { ...note, title: updatedNote.title, description: updatedNote.description }
            : note
        )
      );
      setEditingNote(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  if (isLoading) {
    return <div className="text-xl text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Manage Your Notes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className="p-6 bg-white shadow-md rounded-lg border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h2>
            <p className="text-gray-600 mb-4">{note.description}</p>
            <div className="flex justify-between">
              <button
                className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                onClick={() => {
                  setEditingNote(note);
                  setUpdatedNote({ title: note.title, description: note.description });
                }}
              >
                Update
              </button>
              <button
                className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                onClick={() => deleteNote(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {editingNote && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Update Note</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Title</label>
              <input
                type="text"
                value={updatedNote.title}
                onChange={(e) =>
                  setUpdatedNote((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                value={updatedNote.description}
                onChange={(e) =>
                  setUpdatedNote((prev) => ({ ...prev, description: e.target.value }))
                }
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                onClick={() => setEditingNote(null)}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                onClick={updateNote}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotes;
