import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="w-full min-h-screen flex items-center py-10 sm:py-20">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-8 w-full">
        <div className="pb-8">
          <p className="text-2xl sm:text-4xl font-bold inline border-b-4 border-pink-600">Contact</p>
          <p className="py-6 text-sm sm:text-base">Get in touch with me</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <MapPin className="text-pink-600" size={24} />
              <div>
                <h4 className="font-semibold text-sm sm:text-base">Location</h4>
                <p className="text-sm sm:text-base">Jalandhar, 14441</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Phone className="text-pink-600" size={24} />
              <div>
                <h4 className="font-semibold text-sm sm:text-base">Phone</h4>
                <p className="text-sm sm:text-base">+919090000930</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Mail className="text-pink-600" size={24} />
              <div>
                <h4 className="font-semibold text-sm sm:text-base">Email</h4>
                <p className="text-sm sm:text-base">arpanpnayak@gmail.com</p>
              </div>
            </div>
          </div>

          <form className="flex flex-col space-y-4">
            <input 
              className="p-3 bg-[#ccd6f6] text-gray-900 rounded text-sm sm:text-base"
              type="text" 
              placeholder="Name" 
              name="name"
            />
            <input 
              className="p-3 bg-[#ccd6f6] text-gray-900 rounded text-sm sm:text-base"
              type="email" 
              placeholder="Email" 
              name="email"
            />
            <textarea 
              className="p-3 bg-[#ccd6f6] text-gray-900 rounded text-sm sm:text-base"
              name="message" 
              rows={8} 
              placeholder="Message"
            ></textarea>
            <button className="text-white border-2 hover:bg-pink-600 hover:border-pink-600 px-6 py-3 my-8 mx-auto flex items-center rounded transition-all duration-300 text-sm sm:text-base">
              Let's Collaborate
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;