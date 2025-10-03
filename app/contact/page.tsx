'use client';

import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Card } from "@/components/Card";
import { SocialLinks } from "@/components/SocialLinks";
import { Mail, Send, Calendar, Lightbulb, Users, Presentation } from "lucide-react";

export default function ContactPage() {
  // [NEW] State to manage the form's subject line
  const [subject, setSubject] = useState('');

  const contactTopics = [
    { label: "Research Collaboration", icon: Lightbulb },
    { label: "Student Mentorship", icon: Users },
    { label: "Speaking Engagement", icon: Presentation },
  ];

  return (
    <div className="space-y-12">
      <PageHero
        title="Get in Touch"
        subtitle="I'm always open to discussing new research projects, collaborations, and opportunities. Please feel free to reach out using the form below."
      />

      <Card className="hover:shadow-sm hover:translate-y-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* --- Left Column: Contact Points --- */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold">Contact Points</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                For direct inquiries, you can use the details below. For general messages, please use the form.
              </p>
            </div>
            <div className="space-y-4">
              <ContactLink icon={Mail} href="mailto:lkouao@csu.edu.cn" text="lkouao [at] csu.edu.cn" />
              {/* Suggestion: Add a Calendly or other scheduling link here */}
              <ContactLink icon={Calendar} href="#" text="Schedule a Call" />
            </div>
            <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
               <h3 className="text-lg font-semibold mb-4">Find Me Online</h3>
               <SocialLinks />
            </div>
          </div>

          {/* --- Right Column: Contact Form --- */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold">How Can I Help?</h3>
            {/* [NEW] Interactive subject pills */}
            <div className="my-4 flex flex-wrap gap-2">
              {contactTopics.map(({ label, icon: Icon }) => (
                 <button key={label} onClick={() => setSubject(label)} className="action-badge">
                   <Icon className="h-4 w-4" />
                   <span>{label}</span>
                 </button>
              ))}
            </div>

            <form action="https://formspree.io/f/xwprbvdd" method="POST" className="space-y-6 border-t dark:border-gray-800 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField id="name" name="name" label="Your Name" placeholder="Jane Doe" required />
                <InputField id="email" name="email" type="email" label="Your Email" placeholder="jane.doe@example.com" required />
              </div>
              
              {/* [NEW] Subject field pre-filled by the buttons */}
              <InputField
                id="subject" name="_subject" label="Subject" placeholder="Regarding..."
                value={subject} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)} required
              />

              <div>
                <label htmlFor="message" className="input-label">Message</label>
                <textarea
                  id="message" name="message" rows={5} required
                  className="input-field"
                  placeholder="Your message here..."
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-brand/90 focus:ring-4 focus:ring-brand/50"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
}

// --- Helper Components for the new design ---

function ContactLink({ icon: Icon, href, text }: { icon: React.ElementType, href: string, text: string }) {
  return (
    <a href={href} className="group flex items-center gap-3 text-lg transition-colors hover:text-brand">
      <Icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-brand" />
      <span className="text-gray-700 dark:text-gray-300">{text}</span>
    </a>
  );
}

function InputField({ id, label, ...props }: any) {
  return (
    <div>
      <label htmlFor={id} className="input-label">{label}</label>
      <input id={id} {...props} className="input-field" />
    </div>
  );
}