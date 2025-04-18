import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { ArrowLeft } from 'lucide-react'


export default function AddBookmark() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const [bookmarkId, setBookmarkId] = useState(null)
  const location = useLocation()

  // Check for query parameter to prepopulate
  const queryParams = new URLSearchParams(location.search)
  const editId = queryParams.get('edit')

  useEffect(() => {
    if (editId) {
      // If there's an edit ID in the query, fetch the bookmark
      const fetchBookmark = async () => {
        setLoading(true)
        const { data, error } = await supabase
          .from('bookmarks')
          .select('*')
          .eq('id', editId)
          .single()

        if (error) {
          console.error('Error fetching bookmark', error)
        } else {
          // Set state to the fetched data
          setTitle(data.title || '')
          setUrl(data.url || '')
          setDescription(data.description || '')
          setTags(data.tags || '')
          setBookmarkId(data.id)
        }

        setLoading(false)
      }

      fetchBookmark()
    }
  }, [editId])

  const fetchPreviewImage = async (url) => {
    try {
      const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`)
      const json = await res.json()
      return json?.data?.image?.url || null
    } catch (err) {
      console.error('Failed to fetch preview image', err)
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const preview_image = await fetchPreviewImage(url)

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      alert('You must be logged in to add a bookmark.')
      return
    }

    if (bookmarkId) {
      // Update existing bookmark
      const { error } = await supabase
        .from('bookmarks')
        .update({ title, url, tags, description, preview_image })
        .eq('id', bookmarkId)

      if (error) {
        console.error('Error updating bookmark:', error)
        alert('Error updating bookmark. Try again.')
      } else {
        navigate('/home')
      }
    } else {
      // Add new bookmark
      const { error } = await supabase.from('bookmarks').insert([
        {
          title,
          url,
          tags,
          description,
          user_id: user.id,
          preview_image,
        },
      ])

      if (error) {
        console.error('Error adding bookmark:', error)
        alert('Error adding bookmark. Try again.')
      } else {
        navigate('/home')
      }
    }
  }

  return (
    <div className="bg-[#121212] relative h-[100vh] flex items-center justify-center p-6">
        <Link to="/home" className="absolute flex align-middle top-4 left-4 text-gray-300 hover:text-gray-200 transition">
            <ArrowLeft/> <p>Back</p>
        </Link>
      <div className="w-full max-w-3xl bg-[#121212] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-200 mb-6">{bookmarkId ? 'Edit Bookmark' : 'Add Bookmark'}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-700 rounded-md bg-[#121212] text-white"
              placeholder="Enter bookmark title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300" htmlFor="url">
              URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-700 rounded-md bg-[#121212] text-white"
              placeholder="Enter the bookmark URL"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300" htmlFor="tags">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-700 rounded-md bg-[#121212] text-white"
              placeholder="Enter tags (comma separated)"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300" htmlFor="description">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-700 rounded-md bg-[#121212] text-white"
              placeholder="Enter a description (optional)"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition"
            >
              {bookmarkId ? 'Save Changes' : 'Add Bookmark'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
