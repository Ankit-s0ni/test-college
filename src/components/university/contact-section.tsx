import React from 'react';

const ContactSection = ({ contact }: { contact: { phone?: string | null; email?: string | null; fax?: string | null; tollFree?: string | null } }) => {
  if (!contact) return null;

  return (
    <section id="contact-details" className="space-y-4 p-6 rounded-lg border border-border bg-white">
      <h2 className="text-xl font-semibold">Contact Details</h2>

      <div className="text-sm space-y-1">
        {contact.phone && <div>Phone: <a href={`tel:${contact.phone}`}>{contact.phone}</a></div>}
        {contact.tollFree && <div>Toll Free: <a href={`tel:${contact.tollFree}`}>{contact.tollFree}</a></div>}
        {contact.email && <div>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></div>}
        {contact.fax && <div>Fax: {contact.fax}</div>}
      </div>
    </section>
  );
};

export default ContactSection;
