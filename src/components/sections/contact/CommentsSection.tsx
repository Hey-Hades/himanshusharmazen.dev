'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Upload, Heart, Pin } from 'lucide-react'
import useComments from '@/hooks/useComments'
import { supabase } from '@/lib/supabase'

// 1. PLACE THE HELPER FUNCTION HERE (Outside the main component)
const getSafeReplies = (repliesData: any) => {
  if (typeof repliesData === "string") {
    try {
      return JSON.parse(repliesData);
    } catch (e) {
      return [];
    }
  }
  if (Array.isArray(repliesData)) {
    return repliesData;
  }
  return [];
};

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
}

export default function CommentsSection() {
  const { comments, loading, addComment, likeComment, refreshComments } = useComments()

  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!name.trim() || !comment.trim()) return

    await addComment({
      name,
      comment,
      image,
    })

    await refreshComments()

    setName('')
    setComment('')
    setImage(null)
    setPreview(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: smoothEase }}
      viewport={{ once: false, amount: 0.2 }}
      className="rounded-[28px] md:rounded-[34px] border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-8 h-full"
    >
      <div className="mb-5 md:mb-6">
        <h3 className="text-xl md:text-2xl font-semibold mb-1">Comments</h3>
        <p className="text-xs md:text-sm text-white/40">Leave your thoughts here</p>
      </div>

      <div className="space-y-3 md:space-y-4 mb-5 md:mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 outline-none focus:border-white"
        />

        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your Comment"
          className="w-full rounded-2xl border border-white/15 bg-black/20 px-4 py-3 outline-none resize-none focus:border-white"
        />

        <label className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-4 flex items-center gap-3 cursor-pointer">
          <Upload size={16} />
          <span className="text-xs md:text-sm text-white/65">Upload Image</span>
          <input hidden type="file" accept="image/*" onChange={handleImage} />
        </label>

        <AnimatePresence>
          {preview && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={preview}
              alt="Preview"
              className="rounded-2xl h-36 w-full object-cover border border-white/10"
            />
          )}
        </AnimatePresence>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-2xl py-3 bg-white/10 border border-white/10 transition-all hover:bg-white/20"
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-black/20 p-3 h-[320px] overflow-y-auto">
        {/* 2. CHANGE THE MAP FUNCTION TO RENDER REPLIES */}
        {comments.map((item, i) => {
          const safeReplies = getSafeReplies(item.replies);

          return (
            <div key={item.id || i} className="p-4 border-b border-white/10 mb-2 rounded-2xl bg-white/5">
              
              {/* Main Comment */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-white/90">{item.name}</p>
                  {item.is_pinned && (
                    <span className="text-[9px] px-2 py-0.5 mt-1 inline-block rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-500/20">
                      PINNED
                    </span>
                  )}
                </div>
                {item.liked_by_admin && (
                  <Heart size={14} className="text-pink-400" fill="currentColor" />
                )}
              </div>
              
              <p className="text-xs text-white/70 mt-2">{item.comment}</p>
              
              {/* Display Image if they uploaded one */}
              {item.image_url && (
                <img src={item.image_url} alt="Attached" className="mt-3 w-full max-h-32 object-cover rounded-xl border border-white/10" />
              )}

              <button onClick={() => likeComment(item.id, item.likes)} className="flex items-center gap-1 mt-3 text-xs text-white/40 hover:text-red-400 transition-colors">
                <Heart size={13} /> {item.likes || 0}
              </button>

              {/* Display Replies safely */}
              {safeReplies.length > 0 && (
                <div className="mt-3 pl-3 border-l-2 border-white/10 space-y-2">
                  {safeReplies.map((reply: any, idx: number) => (
                    <div key={idx} className="bg-black/20 rounded-xl p-3 border border-white/5">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] font-bold text-white/90">{reply.username}</span>
                        <span className="text-[9px] text-white/30">
                          {new Date(reply.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-white/60">{reply.message}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )
        })}
      </div>
    </motion.div>
  )
}