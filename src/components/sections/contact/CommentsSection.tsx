'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Upload, Heart, Pin } from 'lucide-react'
import useComments from '@/hooks/useComments'
import { supabase } from '@/lib/supabase' // Moved below 'use client'

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

  // --- THE DIRECT WIRE TEST FUNCTION ---
  const handleTestDatabase = async () => {
    console.log("--- STARTING RAW DB TEST ---");
    console.log("1. Checking Environment Variables...");
    console.log("URL exists?", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Key exists?", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    try {
      console.log("2. Attempting to insert test comment directly...");
      const { data, error } = await supabase
        .schema('public')
        .from('comments')
        .insert([{ 
          name: 'Direct Test User', 
          comment: 'This bypassed the hooks!', 
          likes: 0, 
          is_pinned: false,
          replies: []
        }])
        .select();

      if (error) {
        console.error("❌ SUPABASE REJECTED IT:", JSON.stringify(error, null, 2));
      } else {
        console.log("✅ SUCCESS! Data saved:", data);
      }
    } catch (err) {
      console.error("❌ CRITICAL CRASH:", err);
    }
  };

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

      {/* TEST BUTTON (Remove this after we fix the issue) */}
      

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
        {comments.map((item, i) => (
          <div key={item.id || i} className="p-3 border-b border-white/10 mb-2 rounded-xl bg-white/5">
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-white/70 mt-1">{item.comment}</p>
            <button onClick={() => likeComment(item.id, item.likes)} className="flex items-center gap-1 mt-2 text-xs text-white/40 hover:text-red-400 transition-colors">
              <Heart size={13} /> {item.likes || 0}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  )
}