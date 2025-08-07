import React from 'react'

type Props = {}

const ReasonsSection = (props: Props) => {
  return (
    <div className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Reason To Choose Us</h2>
              <p className="text-muted-foreground mb-8">
                At Lorem, we provide exceptional technology solutions and services. We leverage our large base to deliver solutions that meet modern business and budget expectations.
              </p>
              <div className="space-y-4">
                {[
                  '50+ Universities at one platform',
                  'Fast check admission eligibility criteria',
                  'Choose your favourite university',
                  '24*7 customer support'
                ].map((reason) => (
                  <div key={reason} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="font-medium">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center">
                <div className="text-8xl">📚</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ReasonsSection