import { Button } from '@/components/ui/button'
import React from 'react'

const ProgramsSection = () => {
  return (
    <div id="programs" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Top-Ranked Online Programs</h2>
          
          {/* Program Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {['Executive Programs', 'PG Courses', 'UG Courses', 'Doctorate/Ph.D', 'Certification'].map((category) => (
              <Button key={category} variant="outline" size="sm" className="rounded-full">
                📚 {category}
              </Button>
            ))}
          </div>

          {/* Program Section */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { name: 'MCA', duration: '3 Years', icon: '💻' },
              { name: 'MBA', duration: '2 Years', icon: '🎓' },
              { name: 'M.A/M.C', duration: '2 Years', icon: '📖' },
              { name: 'M.TECH', duration: '2 Years', icon: '⚙️' },
              { name: 'Dual MBA', duration: '2 Years', icon: '🎯' },
              { name: 'M.Sc', duration: '2 Years', icon: '🔬' },
              { name: 'Online MBA', duration: '2 Years', icon: '💼' },
              { name: 'PGDBA', duration: '1 Year', icon: '📊' },
              { name: '1-Year MBA', duration: '1 Year', icon: '⏱️' },
              { name: 'PGDM', duration: '2 Years', icon: '📈' },
              { name: 'PGDM(+H)', duration: '2 Years', icon: '🏥' },
              { name: 'Executive MBA', duration: '2 Years', icon: '👔' },
              { name: 'LLM', duration: '2 Years', icon: '👔' },
              { name: 'Distance MBA', duration: '2 Years', icon: '👔' },
            ].map((program) => (
              <div key={program.name} className="w-[180px] bg-card rounded-lg p-3 text-center border border-border hover:shadow-lg transition-shadow">
                <p className="text-xs text-muted-foreground mb-4 border rounded">Course Duration: {program.duration}</p>
                <div className="text-3xl mb-3">{program.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{program.name}</h3>
                <Button size="sm" className="w-full">
                  View Program
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default ProgramsSection