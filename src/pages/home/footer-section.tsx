import React from 'react';

const FooterSection = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">L</span>
              </div>
              <span className="font-bold text-lg">Lorem ipsum</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Connect with Lorem ipsum and start your career transformation. We enable everyone to
              create professional videos without experience or staff skills.
            </p>
            <p className="text-gray-400 text-sm mb-4">
              Using AI, we&apos;re radically changing the process of content creation, making it
              scalable and affordable while maintaining high quality.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Synthesis Ltd, Synthesis, Kent House,</p>
                <p className="text-sm text-gray-400">
                  14-17 Market Place, London, W1W 8AJ, United Kingdom
                </p>
              </div>
            </div>
          </div>

          {/* Home */}
          <div>
            <h4 className="font-semibold mb-4">Home</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>160+ Video Avatars</li>
              <li>140+ Languages</li>
              <li>60+ Video Templates</li>
              <li>Custom Avatars</li>
              <li>Free AI Video Generator</li>
              <li>AI Video Editor</li>
              <li>AI Video Maker</li>
              <li>AI Voice Generator</li>
              <li>Text To Video</li>
              <li>Text To Speech</li>
              <li>Script to Video</li>
            </ul>
          </div>

          {/* Lorem ipsum */}
          <div>
            <h4 className="font-semibold mb-4">Lorem ipsum</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Learning & Development</li>
              <li>Sales Enablement</li>
              <li>Information Technology</li>
              <li>Customer Service</li>
              <li>Marketing</li>
              <li>Training Videos</li>
              <li>Educational Videos</li>
              <li>Employee Training Videos</li>
              <li>Instructional Videos</li>
              <li>Video Production</li>
            </ul>
          </div>

          {/* Universities */}
          <div>
            <h4 className="font-semibold mb-4">Universities</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Pricing</li>
              <li>Enterprise</li>
              <li>Case Studies</li>
              <li>Video Examples</li>
              <li>Academy</li>
              <li>Webinars</li>
              <li>Help Center</li>
              <li>Product Updates</li>
              <li>Synthesis Automations</li>
              <li>Integrations</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Other */}
          <div>
            <h4 className="font-semibold mb-4">Other</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>About Us</li>
              <li>Ethics Guidelines</li>
              <li>AI Research</li>
              <li>Jobs</li>
              <li>Press</li>
              <li>Security</li>
              <li>Legal</li>
              <li>Contact Sales</li>
              <li>Affiliates</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 product space Limited. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="text-gray-400">𝕏</span>
              <span className="text-gray-400">in</span>
              <span className="text-gray-400">📧</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
