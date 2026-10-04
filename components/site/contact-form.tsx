'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { WhatsAppIcon } from './brand-icons';
import { hasWhatsApp, waLink } from '@/lib/whatsapp';
import { site } from '@/lib/site';

/** No backend: the message is handed to WhatsApp, so nothing is stored on a server. */
export function ContactForm() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState<{ name?: string; msg?: string }>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof err = {};
    if (name.trim().length < 2) next.name = 'Enter your name.';
    if (msg.trim().length < 5) next.msg = 'Write a short message so we know how to help.';
    setErr(next);
    if (Object.keys(next).length || !hasWhatsApp) return;
    window.open(waLink(`Hi ${site.name}, this is ${name.trim()}.\n\n${msg.trim()}`), '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={submit} noValidate className="sticker space-y-5 rounded-[2rem] bg-white p-6 md:p-8">
      <h2 className="font-display text-2xl text-ink">Send us a message</h2>
      <div className="space-y-2">
        <label htmlFor="c-name" className="block font-bold text-ink">Your name</label>
        <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="field" aria-invalid={!!err.name} aria-describedby={err.name ? 'c-name-error' : undefined} />
        {err.name && <p id="c-name-error" className="text-sm font-bold text-beet">{err.name}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="c-msg" className="block font-bold text-ink">Message</label>
        <textarea id="c-msg" rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Bulk orders, parties, questions…" className="field resize-y" aria-invalid={!!err.msg} aria-describedby={err.msg ? 'c-msg-error' : undefined} />
        {err.msg && <p id="c-msg-error" className="text-sm font-bold text-beet">{err.msg}</p>}
      </div>
      <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={!hasWhatsApp} className="btn btn-wa w-full">
        <WhatsAppIcon className="size-5" /> Send on WhatsApp
      </motion.button>
      {!hasWhatsApp && <p className="text-sm text-muted-foreground">Messaging switches on once the café&rsquo;s WhatsApp number is added to the site.</p>}
    </form>
  );
}
