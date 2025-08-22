'use client';

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactsSection() {
  // shared style to mimic light filled fields from the mock
  const filledField =
    'bg-rose-50 border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60';

  return (
    <section id="contact" className="py-20 bg-[#F7EEFD]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Left: Contact info */}
          <div>
            <h2 className="text-3xl font-bold mb-1">Get In Touch</h2>
            <p className="text-sm text-muted-foreground mb-10">Lorem ipsum learner support</p>

            <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Feel free to use the form or drop us an email. Old fashioned phone calls work too.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" aria-hidden />
                <span className="text-sm sm:text-base">9122100100</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" aria-hidden />
                <span className="text-sm sm:text-base">loremipsum@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" aria-hidden />
                <span className="text-sm sm:text-base">15 west 3rd st media road 230047</span>
              </li>
            </ul>
          </div>

          {/* Right: Form */}
          <form className="w-full space-y-5">
            {/* Name (First / Last) */}
            <div className="space-y-2">
              <Label htmlFor="first">Name</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="first"
                  name="first"
                  placeholder="First"
                  className={filledField}
                  autoComplete="given-name"
                />
                <Input
                  id="last"
                  name="last"
                  placeholder="Last"
                  className={filledField}
                  autoComplete="family-name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="abcd@gmail.com"
                className={filledField}
                autoComplete="email"
                required
              />
            </div>

            {/* Phone (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="xxx-xxx-xxxx"
                className={filledField}
                autoComplete="tel"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Type your message..."
                className={filledField + ' resize-none'}
              />
            </div>

            <Button type="submit" className="w-full h-11 text-base bg-[#0247D2] hover:bg-blue-700">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
