import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

const UniversitiesSection = (props: Props) => {
  return (
    <div id="universities" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Discover Leading Universities</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { name: 'Amity University', type: 'Online', color: 'bg-yellow-500' },
              { name: 'DPU University', type: 'Online', color: 'bg-orange-500' },
              { name: 'Lovely University', type: 'Online', color: 'bg-blue-500' },
              { name: 'Sharda University', type: 'Online', color: 'bg-green-500' },
            ].map((university) => (
              <div key={university.name} className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
                <div className={`h-32 ${university.color} relative`}>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">{university.name.charAt(0)}</span>
                    </div>
                    <div className="text-white">
                      <p className="font-semibold text-sm">{university.name}</p>
                      <p className="text-xs opacity-90">{university.type}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <Button size="sm" className="w-full">
                    Explore The Courses →
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* DBA Programs Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Leading Top Online DBA Universities</h3>
                <p className="text-muted-foreground mb-6">
                  Explore the top authorised universities offering DBA programs. These universities are trusted by top recruiters and are recognized for their academic excellence.
                </p>
                <Button size="lg">
                  Explore Universities →
                </Button>
              </div>
              <div className="grid gap-4">
                {[
                  { title: 'Product Management Fellowship', date: 'May 31, 2025' },
                  { title: 'Product Management Fellowship', date: 'May 31, 2025' },
                ].map((course, index) => (
                  <div key={index} className="bg-card rounded-lg p-6 border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Courses starts in: {course.date}</p>
                    <div className="h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg mb-4"></div>
                    <h4 className="font-semibold mb-2">{course.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Accelerate your career with confidence. Learn by doing, build your portfolio, and enhance your skills with AI tools that every modern PM needs to know.
                    </p>
                    <Button variant="outline" size="sm">
                      See all details →
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default UniversitiesSection