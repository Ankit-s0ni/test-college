import React from 'react';
import Link from 'next/link';

const FooterSection = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-primary/80 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-lg">College Cosmos</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Your trusted guide to exploring top universities and online degree programs across India. 
              We help students discover the perfect educational path for their career aspirations.
            </p>
            <p className="text-gray-400 text-sm mb-4">
              From prestigious institutions like Amity Online and Manipal Online to comprehensive 
              program guides, we provide all the information you need to make informed decisions 
              about your future.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">CC</span>
              </div>
              <div>
                <p className="text-sm font-medium">College Cosmos</p>
                <p className="text-sm text-gray-400">
                  Your Education Journey Starts Here
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/universities" className="hover:text-white transition-colors">Top Universities</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Popular Programs */}
          <div>
            <h4 className="font-semibold mb-4">Popular Programs</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/courses" className="hover:text-white transition-colors">MBA Programs</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">BBA Programs</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">MCA Programs</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">BCA Programs</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">B.Tech Programs</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">M.Tech Programs</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">BA Programs</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">MA Programs</Link></li>
            </ul>
          </div>

          {/* Universities */}
          <div>
            <h4 className="font-semibold mb-4">Universities</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/amityonline" className="hover:text-white transition-colors">Amity Online University</Link></li>
              <li><Link href="/manipalonline" className="hover:text-white transition-colors">Manipal Online University</Link></li>
              <li><Link href="/universities" className="hover:text-white transition-colors">View All Universities</Link></li>
              <li><Link href="/universities" className="hover:text-white transition-colors">UGC Approved</Link></li>
              <li><Link href="/universities" className="hover:text-white transition-colors">NAAC Accredited</Link></li>
              <li><Link href="/universities" className="hover:text-white transition-colors">Distance Learning</Link></li>
              <li><Link href="/universities" className="hover:text-white transition-colors">Online Degrees</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/blog" className="hover:text-white transition-colors">Education Blog</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Career Guidance</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Admission Support</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Talk to Expert</Link></li>
              <li><Link href="/universities" className="hover:text-white transition-colors">Compare Universities</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">Program Finder</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} College Cosmos. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
