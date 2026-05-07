import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Sparkles, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55 } }),
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactItems = [
    { icon: MapPin, label: 'Location', value: 'Jalandhar, Punjab, India' },
    { icon: Phone, label: 'Phone', value: '+91 9090000930' },
    { icon: Mail, label: 'Email', value: 'arpanpnayak@gmail.com' },
  ];

  const socials = [
    { icon: Github, href: 'https://github.com/klzlykos9', label: 'GitHub', color: 'hover:border-white/50 hover:text-white' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/arpanpnayak/', label: 'LinkedIn', color: 'hover:border-blue-400/60 hover:text-blue-400' },
    { icon: Mail, href: 'mailto:arpanpnayak@gmail.com', label: 'Email', color: 'hover:border-cyan-400/60 hover:text-cyan-400' },
  ];

  const inputClass = "w-full px-4 py-3 bg-slate-800/80 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-500/20 transition-all text-sm";
  const labelClass = "block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen bg-[#080e1a] pt-16">
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles size={12} /> Get In Touch
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-4">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Connect</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-6" />
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
              Ready to collaborate on your next AI project? Let's discuss how we can bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Info column */}
            <motion.div
              custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="lg:col-span-2 space-y-5"
            >
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/60 border border-white/10 backdrop-blur-sm">
                <h2 className="text-xl font-black text-white mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  {contactItems.map(({ icon: Icon, label, value }, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/25 rounded-xl shrink-0">
                        <Icon className="text-cyan-400" size={18} />
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                        <p className="text-white text-sm font-semibold">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/8">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">Find me on</p>
                  <div className="flex gap-3">
                    {socials.map(({ icon: Icon, href, label, color }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className={`p-3 bg-slate-700/60 border border-white/10 rounded-xl text-slate-300 transition-all duration-300 hover:-translate-y-1 ${color}`}
                      >
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability tag */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/25 flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full" />
                  <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-40" />
                </div>
                <div>
                  <p className="text-emerald-300 font-black text-sm">Available for Work</p>
                  <p className="text-slate-400 text-xs mt-0.5">Open to AI engineering projects</p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="lg:col-span-3"
            >
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/60 border border-white/10 backdrop-blur-sm">
                <h2 className="text-xl font-black text-white mb-6">Send a Message</h2>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 gap-4 text-center"
                  >
                    <CheckCircle className="text-emerald-400" size={48} />
                    <h3 className="text-white font-black text-xl">Message Sent!</h3>
                    <p className="text-slate-300 text-sm">Thanks for reaching out. Arpan will get back to you soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Your name" />
                      </div>
                      <div>
                        <label className={labelClass}>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="your@email.com" />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Subject</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className={inputClass} placeholder="Project collaboration" />
                    </div>
                    <div>
                      <label className={labelClass}>Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className={`${inputClass} resize-none`} placeholder="Tell me about your project..." />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-black text-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Send size={17} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
