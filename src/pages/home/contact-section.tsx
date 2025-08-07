import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

const ContactsSection = (props: Props) => {
  return (
    <div id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">Lorem ipsum learner support</p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <p className="text-muted-foreground mb-6">
                  Feel free to use the form or drop us an email. Old fashioned phone calls work too.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">📞</span>
                    <span>9122100100</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">✉️</span>
                    <span>loremipsum@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">📍</span>
                    <span>15 west 3rd st media road 230047</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input 
                      type="text" 
                      placeholder="First" 
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-transparent">Last</label>
                    <input 
                      type="text" 
                      placeholder="Last" 
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="abc@gmail.com" 
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="xxx-xxx-xxxx" 
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    placeholder="Type your message..." 
                    rows={4}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none"
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ContactsSection