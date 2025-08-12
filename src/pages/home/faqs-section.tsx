import React from 'react'

type Props = {}

const FaqsSection = (props: Props) => {
  return (
    <div className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-2">FAQs</h2>
              <p className="text-muted-foreground">List of questions that are generally asked</p>
            </div>
            
            {/* <div className="space-y-4">
              {[
                {
                  question: "What is Lorem ipsum?",
                  answer: "Lorem ipsum is a placeholder text commonly used in the printing and typesetting industry to demonstrate content layout without being distracted by readable content."
                },
                {
                  question: "Do Lorem ipsum charge for counselling?",
                  answer: "Yes/No, all need student ticket through forms are required. We offer comprehensive instant insurance to ensure your belongings are covered during the purchase."
                },
                {
                  question: "How can Lorem ipsum help students to apply to the best university?",
                  answer: "We provide personalized guidance, eligibility checking, university matching, and application support to help students find and apply to their ideal universities."
                },
                {
                  question: "Can I get one-two-one personalized advice from Lorem ipsum?",
                  answer: "Yes, we offer personalized one-on-one counseling sessions with our expert advisors to help you make informed decisions about your education."
                },
                {
                  question: "How can I compare multiple courses at once?",
                  answer: "Our platform allows you to compare multiple courses side by side, including curriculum, fees, duration, and career prospects to make the best choice."
                }
              ].map((faq, index) => (
                <Collapsible 
                  key={index} 
                  open={openFAQ === index}
                  onOpenChange={(isOpen) => setOpenFAQ(isOpen ? index : null)}
                  className="border border-border rounded-lg"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors">
                    <span className="font-medium">{faq.question}</span>
                    <span className={`text-muted-foreground transition-transform duration-200 ${openFAQ === index ? 'rotate-90' : ''}`}>
                      ↓
                    </span>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div> */}
          </div>
        </div>
  )
}

export default FaqsSection