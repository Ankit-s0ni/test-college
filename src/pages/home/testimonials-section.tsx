import React from 'react'

type Props = {}

const TestimonialsSection = (props: Props) => {
  return (
    <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Testimonial</h2>
            <p className="text-muted-foreground">Hear it from the people for yourself</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Raghav Singh', date: 'July 27, 2023', initial: 'R', color: 'bg-red-500' },
              { name: 'Sunil Kumar', date: 'July 27, 2023', initial: 'Y', color: 'bg-yellow-500' },
              { name: 'Shweta Shrivastav', date: 'July 27, 2023', initial: 'S', color: 'bg-purple-500' },
              { name: 'Ramandeep Singh', date: 'July 27, 2023', initial: 'R', color: 'bg-orange-500' },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {testimonial.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The level of customer support we received from Solid was exceptional. Their team was responsive, knowledgeable and went above...
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default TestimonialsSection