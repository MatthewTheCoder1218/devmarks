import { useEffect, useState } from 'react'
import { fetchBookmarks, deleteBookmark } from '../lib/supabase'
import BookmarkCard from '../components/BookmarkCard'
import Header from '../components/Header'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

function Home() {
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchBookmarks()
        setBookmarks(data)
      } catch (err) {
        console.error('Failed to load bookmarks', err)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteBookmark(id)
      setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id))
    } catch (err) {
      console.error('Error deleting bookmark:', err)
    }
  }

  return (
    <div>
    <Header/>
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">📚 Your Dev Bookmarks</h1>

        {loading ? (
          <p className="text-gray-400">Loading bookmarks...</p>
        ) : bookmarks.length === 0 ? (
          <p className="text-gray-400">No bookmarks yet. Start by adding one!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

        <Link
            to="/add"
            className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition z-50"
            title="Add Bookmark"
            >
            <Plus className="w-6 h-6" />
        </Link>
      </div>
    </div>
  )
}

export default Home
