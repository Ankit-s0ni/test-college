import React from 'react';
import { Card } from '@/components/ui/card';
import { Phone, Mail, Clock, User, Building2 } from 'lucide-react';

interface ContactDetail {
  id: number;
  department: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  workingHours?: string;
}

interface EnhancedContactSectionProps {
  contactDetails?: ContactDetail[];
  generalContact?: {
    phone?: string | null;
    email?: string | null;
    fax?: string | null;
    tollFree?: string | null;
  };
}

export default function EnhancedContactSection({
  contactDetails,
  generalContact,
}: EnhancedContactSectionProps) {
  // Show general contact if we don't have detailed contacts
  const hasDetailedContacts = contactDetails && contactDetails.length > 0;
  const hasGeneralContact = generalContact && (generalContact.phone || generalContact.email);

  if (!hasDetailedContacts && !hasGeneralContact) return null;

  return (
    <section id="contact" className="py-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Contact Information</h3>
        <p className="text-sm text-muted-foreground mt-1">Get in touch with different departments</p>
      </div>

      {hasDetailedContacts ? (
        <div className="grid md:grid-cols-2 gap-4">
          {contactDetails!.map((contact) => (
            <Card key={contact.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                {/* Department Name */}
                <div className="flex items-center gap-2 pb-3 border-b">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold text-lg">{contact.department}</h4>
                </div>

                {/* Contact Person */}
                {contact.contactPerson && (
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Contact Person</p>
                      <p className="text-sm font-medium">{contact.contactPerson}</p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {contact.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <a 
                        href={`tel:${contact.phone}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {contact.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-sm font-medium text-primary hover:underline break-all"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Working Hours */}
                {contact.workingHours && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Working Hours</p>
                      <p className="text-sm font-medium">{contact.workingHours}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        // Fallback to general contact
        <Card className="p-6">
          <div className="space-y-4">
            {generalContact?.phone && (
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <a 
                    href={`tel:${generalContact.phone}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {generalContact.phone}
                  </a>
                </div>
              </div>
            )}

            {generalContact?.email && (
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a 
                    href={`mailto:${generalContact.email}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {generalContact.email}
                  </a>
                </div>
              </div>
            )}

            {generalContact?.tollFree && (
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Toll Free</p>
                  <a 
                    href={`tel:${generalContact.tollFree}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {generalContact.tollFree}
                  </a>
                </div>
              </div>
            )}

            {generalContact?.fax && (
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Fax</p>
                  <p className="text-sm font-medium">{generalContact.fax}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </section>
  );
}
