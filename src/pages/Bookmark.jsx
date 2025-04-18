import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { ArrowLeft } from 'lucide-react'

export default function ViewBookmark() {
  const { id } = useParams() // This will get the bookmark ID from the URL
  const [bookmark, setBookmark] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBookmark = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('bookmarks')
          .select('*')
          .eq('id', id)
          .single()

        if (error) {
          console.error('Error fetching bookmark:', error)
        } else {
          setBookmark(data)
        }
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookmark()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!bookmark) return <div>Bookmark not found</div>

  return (
    <div className="bg-[#121212] min-h-screen p-6">
              <button
          onClick={() => navigate('/home')}
          className="text-white hover:text-gray-400 flex p-3 mb-4"
        >
          <ArrowLeft/> Back to Bookmarks
        </button>
      <div className="max-w-2xl mt-[-20px] max-h-[100vh] mx-auto bg-[#1f1f1f] p-8 rounded-lg shadow-lg">


        <h2 className="text-3xl font-bold text-white">{bookmark.title}</h2>

        <div className="mt-4">
          {bookmark.preview_image ? (
            <img
              src={bookmark.preview_image}
              alt="Bookmark Preview"
              className="w-full h-64 object-cover rounded-md"
            />
          ) : (
            <div className="text-gray-400">No preview image available</div>
          )}
        </div>

        <div className="mt-6">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 text-lg"
          >
            Visit Bookmark
          </a>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white">Description</h3>
          <p className="text-gray-300">{bookmark.description || 'No description available.'}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white">Tags</h3>
          <p className="text-gray-300">{bookmark.tags || 'No tags available.'}</p>
        </div>
      </div>
    </div>
  )
}
