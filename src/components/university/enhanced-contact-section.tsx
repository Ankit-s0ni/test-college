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
    <section id="contact" className="py-6 sm:py-8">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold">Contact Information</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Get in touch with different departments</p>
      </div>

      {hasDetailedContacts ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {contactDetails!.map((contact) => (
            <Card key={contact.id} className="p-4 sm:p-6 hover:shadow-md transition-shadow">
              <div className="space-y-3 sm:space-y-4">
                {/* Department Name */}
                <div className="flex items-center gap-2 pb-2 sm:pb-3 border-b">
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                  <h4 className="font-semibold text-base sm:text-lg truncate">{contact.department}</h4>
                </div>

                {/* Contact Person */}
                {contact.contactPerson && (
                  <div className="flex items-start gap-2 sm:gap-3">
                    <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Contact Person</p>
                      <p className="text-xs sm:text-sm font-medium truncate">{contact.contactPerson}</p>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {contact.phone && (
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Phone</p>
                      <a 
                        href={`tel:${contact.phone}`}
                        className="text-xs sm:text-sm font-medium text-primary hover:underline block truncate"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Email */}
                {contact.email && (
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Email</p>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-xs sm:text-sm font-medium text-primary hover:underline break-all"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Working Hours */}
                {contact.workingHours && (
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-xs text-muted-foreground">Working Hours</p>
                      <p className="text-xs sm:text-sm font-medium">{contact.workingHours}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        // Fallback to general contact
        <Card className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {generalContact?.phone && (
              <div className="flex items-start gap-2 sm:gap-3">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Phone</p>
                  <a 
                    href={`tel:${generalContact.phone}`}
                    className="text-xs sm:text-sm font-medium text-primary hover:underline"
                  >
                    {generalContact.phone}
                  </a>
                </div>
              </div>
            )}

            {generalContact?.email && (
              <div className="flex items-start gap-2 sm:gap-3">
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Email</p>
                  <a 
                    href={`mailto:${generalContact.email}`}
                    className="text-xs sm:text-sm font-medium text-primary hover:underline break-all"
                  >
                    {generalContact.email}
                  </a>
                </div>
              </div>
            )}

            {generalContact?.tollFree && (
              <div className="flex items-start gap-2 sm:gap-3">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Toll Free</p>
                  <a 
                    href={`tel:${generalContact.tollFree}`}
                    className="text-xs sm:text-sm font-medium text-primary hover:underline"
                  >
                    {generalContact.tollFree}
                  </a>
                </div>
              </div>
            )}

            {generalContact?.fax && (
              <div className="flex items-start gap-2 sm:gap-3">
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Fax</p>
                  <p className="text-xs sm:text-sm font-medium">{generalContact.fax}</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </section>
  );
}
