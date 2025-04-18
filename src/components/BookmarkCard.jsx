import { Link } from 'react-router-dom'
import { Trash2, Edit } from 'lucide-react'

export default function BookmarkCard({ bookmark, onDelete }) {
  return (
    <div className="bg-[#1f1f1f] border relative border-[#2a2a2a] rounded-2xl p-4 shadow hover:shadow-lg transition">
      <h3 className="text-white text-lg font-semibold mb-1">

      {bookmark.preview_image && (
        <img
            src={bookmark.preview_image}
            alt={bookmark.title}
            className="w-full h-40 object-cover rounded-md mb-2"
        />
        )}

        <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {bookmark.title}
        </a>
      </h3>

      <div className="flex flex-wrap gap-2 mt-2">
      {bookmark.tags && Array.isArray(bookmark.tags)
        ? bookmark.tags.map((tag, idx) => (
            <span key={idx} className="text-xs text-gray-500 mr-2">#{tag}</span>
            ))
        : typeof bookmark.tags === 'string' && bookmark.tags.trim() !== ''
        ? bookmark.tags.split(',').map((tag, idx) => (
            <span key={idx} className="text-xs text-gray-500 mr-2">#{tag.trim()}</span>
            ))
      : null}

      </div>

      <Link
        to={`/bookmark/${bookmark.id}`}
        className="text-sm text-indigo-400 hover:underline mt-2 block"
      >
        View Details
      </Link>

      <Link
        to={`/add?edit=${bookmark.id}`} // pass the bookmark id as a query param
        className="absolute bottom-2 right-12 text-white hover:text-grey-400 transition"
        title="Edit Bookmark"
      >
        <Edit className="w-5 h-5" />
      </Link>

      <button
        onClick={() => onDelete(bookmark.id)}
        className="absolute bottom-2 right-2 text-white hover:text-grey-400 transition"
        title="Delete Bookmark"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}
