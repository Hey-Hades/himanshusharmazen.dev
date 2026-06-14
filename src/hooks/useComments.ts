'use client'

import { useEffect, useState } from 'react'
import {
  fetchCommentsService,
  createCommentService,
  likeCommentService,
  uploadCommentImageService,
} from '@/lib/commentService'

export default function useComments() {
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Initial fetch
  useEffect(() => {
    refreshComments()
  }, [])

  // Explicit refresh function
  const refreshComments = async () => {
    try {
      const data = await fetchCommentsService()
      setComments(data || [])
    } catch (err) {
      console.error("Error fetching comments:", err)
    }
  }

  const addComment = async ({
    name,
    comment,
    image,
  }: {
    name: string
    comment: string
    image: File | null
  }) => {
    if (!name.trim() || !comment.trim()) return

    setLoading(true)

    try {
      let imageUrl: string | null = null

      if (image) {
        imageUrl = await uploadCommentImageService(image)
      }

      const newComment = await createCommentService({
        name,
        comment,
        imageUrl,
      })

      // Update UI manually
      if (newComment) {
        setComments((prev) => [newComment, ...prev])
      }
    } catch (err) {
      console.error("Error adding comment:", err)
    } finally {
      setLoading(false)
    }
  }

  const likeComment = async (id: number, currentLikes: number) => {
    const liked = localStorage.getItem(`liked-${id}`)
    if (liked) return

    try {
      const newLikes = await likeCommentService(id, currentLikes)
      localStorage.setItem(`liked-${id}`, 'true')

      setComments((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, likes: newLikes } : item
        )
      )
    } catch (err) {
      console.error("Error liking comment:", err)
    }
  }

  return {
    comments,
    loading,
    addComment,
    likeComment,
    refreshComments
  }
}