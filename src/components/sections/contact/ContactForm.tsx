'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { Send, User, Mail, MessageSquare, ArrowUpRight, Loader2 } from 'lucide-react'
import { FaLinkedinIn, FaGithub, FaEnvelope, FaPhoneAlt, FaCode } from 'react-icons/fa'
import Swal from 'sweetalert2'

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } },
}

const socialLinks = [
  {
    title: 'GitHub',
    user: 'Hey-Hades',
    icon: FaGithub,
    link: 'https://github.com/Hey-Hades',
  },
  {
    title: 'Email',
    user: 'himanshusharmazen',
    icon: FaEnvelope,
    link: 'mailto:himanshusharmazen@gmail.com',
  },
  {
    title: 'Phone',
    user: '+91 9555839597',
    icon: FaPhoneAlt,
    link: 'tel:+919555839597',
  },
  {
    title: 'LeetCode',
    user: 'Himanshuzen',
    icon: FaCode,
    link: 'https://leetcode.com/u/Himanshuzen/',
  },
]

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill out all fields before sending.',
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#333'
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "52a80142-0ad8-4c90-8d80-40d27fa94419",
          subject: `New Portfolio Message from ${formData.name}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: "Thanks for reaching out. I'll check my inbox and get back to you soon.",
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#333'
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later or email me directly.',
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#333'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: smoothEase }}
      viewport={{ once: false, amount: 0.2 }}
      className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 md:p-8 flex flex-col h-full"
    >
      <motion.div variants={fieldVariants} initial="hidden" whileInView="show" viewport={{ once: false }} transition={{ delay: 0.05 }}>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Get In Touch</h2>
        <p className="text-sm text-white/50 mb-7">
          Feel free to reach out if you want to collaborate on a project, discuss software engineering roles, or simply say hello.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div variants={fieldVariants} initial="hidden" whileInView="show" viewport={{ once: false }} transition={{ delay: 0.1 }}>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              disabled={isSubmitting}
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40 disabled:opacity-50"
            />
          </div>
        </motion.div>

        <motion.div variants={fieldVariants} initial="hidden" whileInView="show" viewport={{ once: false }} transition={{ delay: 0.16 }}>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              disabled={isSubmitting}
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40 disabled:opacity-50"
            />
          </div>
        </motion.div>

        <motion.div variants={fieldVariants} initial="hidden" whileInView="show" viewport={{ once: false }} transition={{ delay: 0.22 }}>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-5 text-white/40" />
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              disabled={isSubmitting}
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none resize-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40 disabled:opacity-50"
            />
          </div>
        </motion.div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.28 }}
          whileHover={{ scale: 1.06, transition: { duration: 0.12 } }}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-2xl py-4 bg-white/10 border border-white/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>

      <div className="border-t border-white/10 pt-5 mt-6">
        <motion.p variants={fieldVariants} initial="hidden" whileInView="show" viewport={{ once: false }} transition={{ delay: 0.34 }} className="text-sm text-white/55 mb-4">
          Connect With Me
        </motion.p>

        <motion.a
          href="https://www.linkedin.com/in/himanshu-s-b98b62256"
          target="_blank"
          rel="noopener noreferrer"
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.36 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.12 } }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4 mb-3 flex items-center justify-between"
        >
          <div className="absolute inset-0 bg-white/[0.04] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
          <div className="relative z-10 flex items-center gap-3">
            <FaLinkedinIn />
            <div>
              <p className="text-sm font-medium">LinkedIn</p>
              <p className="text-xs text-white/35">himanshu-s-b98b62256</p>
            </div>
          </div>
          <div className="relative z-10 opacity-0 group-hover:opacity-100 transition">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </motion.a>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socialLinks.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fieldVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                transition={{ delay: 0.42 + i * 0.05 }}
                whileHover={{ scale: 1.06, transition: { duration: 0.12 } }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-3 flex items-center justify-between"
              >
                <div className="absolute inset-0 bg-white/[0.04] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                <div className="relative z-10 flex items-center gap-3">
                  <Icon />
                  <div>
                    <p className="text-sm">{item.title}</p>
                    <p className="text-[11px] text-white/35">{item.user}</p>
                  </div>
                </div>
                <div className="relative z-10 opacity-0 group-hover:opacity-100 transition">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}