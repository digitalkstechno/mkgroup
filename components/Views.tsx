'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Phone, MapPin, Clock, Globe, Share2, Edit, User, Info, Calendar, 
  Image as ImageIcon, Video, HelpCircle, FileText, MessageSquare, 
  Star, ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight, Box, 
  Mail, Mic, Plus, Download, Bell 
} from 'lucide-react';

type View = 
  | 'home' 
  | 'dashboard' 
  | 'contact-person' 
  | 'about-us' 
  | 'appointment' 
  | 'location' 
  | 'photo-gallery' 
  | 'video-gallery' 
  | 'brochure' 
  | 'inquiry' 
  | 'dropbox' 
  | 'popup';

interface ViewProps {
  setView: (v: View) => void;
}

export const HomeView = ({ setView }: ViewProps) => (
  <div className="flex flex-col items-center px-6 space-y-4">
    <div className="relative w-48 h-48 rounded-full border-4 border-white/50 overflow-hidden shadow-lg mt-4">
      <Image 
        src="https://picsum.photos/seed/hirenbhai/400/400" 
        alt="HIRENBHAI K. PATEL" 
        fill
        className="object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="w-full space-y-2">
      <div className="bg-white/80 rounded-full py-2 px-4 flex items-center shadow-sm border border-gray-200">
        <div className="bg-gray-800 p-1.5 rounded-full mr-3 text-white"><User size={14} /></div>
        <span className="font-bold text-gray-800 text-sm">HIRENBHAI K. PATEL</span>
      </div>
      <div className="bg-white/80 rounded-full py-2 px-4 flex items-center shadow-sm border border-gray-200">
        <div className="bg-gray-800 p-1.5 rounded-full mr-3 text-white"><Phone size={14} /></div>
        <span className="font-medium text-gray-800 text-sm">9825222223</span>
      </div>
      <div className="bg-white/80 rounded-2xl py-2 px-4 flex items-start shadow-sm border border-gray-200">
        <div className="bg-gray-800 p-1.5 rounded-full mr-3 text-white mt-0.5"><MapPin size={14} /></div>
        <span className="text-xs text-gray-700 leading-tight">
          B-86 Trikam Nagar Society, Near V-1<br />
          Bombay Market, L.H Road, Surat -395003
        </span>
      </div>
      <div className="bg-white/80 rounded-full py-2 px-4 flex items-center shadow-sm border border-gray-200">
        <div className="bg-gray-800 p-1.5 rounded-full mr-3 text-white"><Clock size={14} /></div>
        <span className="text-xs text-gray-700">10 am to 2 pm & 5 pm to 7 pm</span>
      </div>
      <div className="bg-white/80 rounded-full py-2 px-4 flex items-center shadow-sm border border-gray-200">
        <div className="bg-gray-800 p-1.5 rounded-full mr-3 text-white"><Globe size={14} /></div>
        <span className="text-xs text-gray-700">www.mkgroup.com</span>
      </div>
    </div>
    <div 
      className="w-full bg-[#003B46] rounded-2xl p-6 flex flex-col items-center justify-center text-white cursor-pointer hover:opacity-90 transition-opacity"
      onClick={() => setView('dashboard')}
    >
      <div className="text-3xl font-bold tracking-widest mb-1">I&apos;H</div>
      <div className="text-2xl font-bold tracking-[0.2em]">MK GROUP</div>
    </div>
    <div className="w-full flex justify-between items-center px-4 pt-2">
      <div className="flex flex-col items-center">
        <div className="bg-white p-2 rounded-xl shadow-md mb-1"><Share2 size={24} className="text-blue-500" /></div>
        <span className="text-[10px] font-bold text-gray-700">Share</span>
      </div>
      <div className="flex items-center bg-white rounded-full p-1 shadow-md w-32">
        <div className="w-1/2 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-full shadow-sm"></div>
        </div>
        <div className="w-1/2 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">ON</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-white p-2 rounded-xl shadow-md mb-1"><Edit size={24} className="text-purple-500" /></div>
        <span className="text-[10px] font-bold text-gray-700">Edit</span>
      </div>
    </div>
  </div>
);

export const DashboardView = ({ setView }: ViewProps) => (
  <div className="flex flex-col items-center px-4 space-y-6">
    <div className="flex items-center space-x-2 bg-white/50 px-3 py-1 rounded-full border border-white/30">
      <div className="bg-blue-100 p-1 rounded-full"><Bell size={14} className="text-blue-600" /></div>
      <div className="flex space-x-0.5">
        {[0, 0, 2, 3, 4, 5].map((n, i) => (
          <div key={i} className="bg-white border border-gray-300 w-5 h-7 flex items-center justify-center font-mono font-bold text-sm rounded-sm">{n}</div>
        ))}
      </div>
    </div>
    <div className="w-full bg-[#003B46] rounded-3xl p-8 flex flex-col items-center justify-center text-white relative overflow-hidden">
      <div className="text-3xl font-serif tracking-[0.3em] text-yellow-400">ANANTA</div>
      <div className="text-sm tracking-[0.5em] text-yellow-200 mt-1">HEIGHTS</div>
    </div>
    <div className="grid grid-cols-6 gap-2 w-full">
      {[Phone, MessageSquare, Globe, Mail, ImageIcon, Globe].map((Icon, i) => (
        <div key={i} className="bg-white/20 p-2.5 rounded-xl shadow-md flex items-center justify-center text-white cursor-pointer border border-white/30">
          <Icon size={20} />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-4 gap-4 w-full">
      {[
        { id: 'contact-person', label: 'Person', icon: User },
        { id: 'about-us', label: 'About us', icon: Info },
        { id: 'appointment', label: 'Appointment', icon: Calendar },
        { id: 'location', label: 'Location', icon: MapPin },
        { id: 'photo-gallery', label: 'Photo', icon: ImageIcon },
        { id: 'video-gallery', label: 'Videos', icon: Video },
        { id: 'inquiry', label: 'Inquiry', icon: HelpCircle },
        { id: 'brochure', label: 'Brochure', icon: FileText },
      ].map((item) => (
        <button key={item.id} onClick={() => setView(item.id as View)} className="flex flex-col items-center space-y-1">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-700">
            <item.icon size={24} />
          </div>
          <span className="text-[10px] font-medium text-gray-700">{item.label}</span>
        </button>
      ))}
    </div>
    <div className="flex space-x-4 w-full">
      <button className="flex-1 bg-[#6B849E] text-white py-2.5 rounded-full text-xs font-bold flex items-center justify-center space-x-2 shadow-md">
        <User size={16} />
        <span>Save Contact</span>
      </button>
      <button className="flex-1 bg-[#C85C31] text-white py-2.5 rounded-full text-xs font-bold flex items-center justify-center space-x-2 shadow-md">
        <span>Select Languages</span>
        <ChevronRight size={16} />
      </button>
    </div>
    <div className="grid grid-cols-5 gap-2 w-full pt-2">
      {[
        { label: 'Testimonials', icon: User },
        { label: 'Rating', icon: Star },
        { label: 'Popup', icon: Box, action: () => setView('popup') },
        { label: 'Feedback', icon: ThumbsDown },
        { label: 'Like', icon: ThumbsUp },
      ].map((item, i) => (
        <button key={i} onClick={item.action} className="flex flex-col items-center space-y-1">
          <div className="bg-yellow-100 p-2.5 rounded-xl shadow-sm border border-gray-200 flex items-center justify-center text-gray-700">
            <item.icon size={20} />
          </div>
          <span className="text-[8px] font-bold text-gray-600">{item.label}</span>
        </button>
      ))}
    </div>
  </div>
);

export const AboutUsView = () => (
  <div className="px-6 space-y-4 text-gray-800">
    <div className="bg-[#6B849E] text-white py-2 px-4 rounded-md text-center font-bold text-sm">M K GROUP</div>
    <div className="space-y-4 pt-2">
      <h2 className="text-xl font-bold border-b border-gray-300 pb-1">ABOUT MK Group</h2>
      <p className="text-sm leading-relaxed">Those wishing to own a piece of paradise rejoicing nature&apos;s tranquilly and modern day opulence have found the right address.</p>
      <p className="text-sm leading-relaxed">Every apartment of this splendid development gets to enjoy the breathtakingly beautiful views of the shimmering Tapi river. The cool breeze, ample sunlight and uninterrupted skyline views are the bonus.</p>
      <ul className="space-y-1 text-sm font-medium">
        <li>• Sky-Scaling Towers</li>
        <li>• All Apartments Riverside Facing</li>
        <li>• Around 3.5 mt. Floor Height</li>
        <li>• 2 Level Amenities & Clubhouse</li>
        <li>• Lush Green Landscape Area</li>
        <li>• Spacious Car Parking in Basement bonus.</li>
      </ul>
    </div>
  </div>
);

export const AppointmentView = () => (
  <div className="px-6 space-y-4">
    <div className="bg-[#6B849E] text-white py-2 px-4 rounded-md text-center font-bold text-sm">Make an appointment</div>
    <div className="space-y-3">
      <input type="text" placeholder="Name" className="w-full bg-white rounded-full py-2.5 px-4 text-sm border border-gray-200 outline-none" />
      <input type="text" placeholder="Mobile" className="w-full bg-white rounded-full py-2.5 px-4 text-sm border border-gray-200 outline-none" />
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-red-500 ml-4">Optional</label>
        <select className="w-full bg-white rounded-full py-2.5 px-4 text-sm border border-gray-200 outline-none appearance-none"><option>Select Person</option></select>
      </div>
      <div className="relative">
        <input type="text" value="8 May, 2025" readOnly className="w-full bg-white rounded-full py-2.5 px-4 text-sm border border-gray-200 outline-none" />
        <Calendar className="absolute right-4 top-2.5 text-purple-500" size={18} />
      </div>
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-red-500">First Half Meeting Time Hours - Select</p>
        <div className="grid grid-cols-4 gap-2">
          {['10:00-11:00', '11:00-12:00', '12:00-01:00', '01:00-02:00'].map((time) => (
            <div key={time} className="bg-white text-[8px] py-1 text-center rounded-md border border-gray-200">{time}</div>
          ))}
        </div>
      </div>
      <textarea placeholder="Text Message if any" className="w-full bg-white rounded-2xl py-3 px-4 text-sm border border-gray-200 outline-none h-24 resize-none" />
      <button className="w-full bg-white py-2 rounded-md font-bold text-gray-800 shadow-sm border border-gray-200">Submit</button>
    </div>
  </div>
);

export const PhotoGalleryView = () => (
  <div className="px-4 space-y-4">
    <div className="bg-[#6B849E] text-white py-2 px-4 rounded-md text-center font-bold text-sm">Photo Gallery</div>
    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
      <Image 
        src="https://picsum.photos/seed/building/600/800" 
        alt="Ananta Heights" 
        fill
        className="object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="flex justify-center space-x-4">
      <button className="bg-white px-6 py-1.5 rounded-md text-xs font-bold shadow-sm border border-gray-200">General</button>
      <button className="bg-white px-6 py-1.5 rounded-md text-xs font-bold shadow-sm border border-gray-200">Awarded</button>
    </div>
  </div>
);

export const ContactPersonView = () => (
  <div className="px-4 space-y-4">
    <div className="bg-[#6B849E] text-white py-2 px-4 rounded-md text-center font-bold text-sm mb-4">M K GROUP</div>
    {[1, 2].map((i) => (
      <div key={i} className="bg-white/50 rounded-xl p-3 flex space-x-4 border border-white/30">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <Image src="https://picsum.photos/seed/patel/200/200" alt="Hirenbhai" fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-bold text-gray-800">HIRENBHAI K. PATEL</h3>
          <p className="text-xs text-gray-600">Builder & Developer</p>
          <p className="text-xs text-gray-600">Director</p>
        </div>
      </div>
    ))}
  </div>
);

export const LocationView = () => (
  <div className="px-4 space-y-6">
    <div className="bg-[#6B849E] text-white py-2 px-4 rounded-md text-center font-bold text-sm">Location and Address</div>
    {[
      { title: 'MK GROUP', addr: 'Office : B-86 Trikam Nagar Society, Near V-1 Bombay Market, L.H Road, Surat -395003' },
      { title: 'MK GROUP', addr: 'Ananta Heights : Near, Savaji Korat Brg, Maruti Dham Society, Mota Varachha, Surat, Gujarat 394101' }
    ].map((loc, i) => (
      <div key={i} className="space-y-2">
        <h3 className="font-bold text-lg text-[#003B46]">{loc.title}</h3>
        <div className="space-y-1 text-xs text-gray-700">
          <div className="flex items-start space-x-2">
            <MapPin size={14} className="mt-0.5 flex-shrink-0" />
            <span>{loc.addr}</span>
          </div>
          <div className="flex items-center space-x-2"><Phone size={14} /><span>98252 22223</span></div>
          <div className="flex items-center space-x-2"><Mail size={14} /><span>hirenpatel@gmail.com</span></div>
          <div className="flex items-center space-x-2"><Globe size={14} /><span>www.mkgroup.com</span></div>
        </div>
        <div className="w-full h-32 bg-gray-200 rounded-xl overflow-hidden relative border border-gray-300">
          <Image src="https://picsum.photos/seed/map/400/200" alt="Map" fill className="object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="bg-white px-4 py-1.5 rounded-full flex items-center space-x-2 shadow-lg">
              <div className="bg-red-500 text-white p-1 rounded-full"><MapPin size={12} /></div>
              <span className="text-xs font-bold">Google Map</span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const VideoGalleryView = () => (
  <div className="px-4 space-y-4">
    <div className="bg-[#6B849E] text-white py-2 px-4 rounded-md text-center font-bold text-sm">Video Gallery</div>
    <div className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl">
      <Image src="https://picsum.photos/seed/video/600/1000" alt="Video Placeholder" fill className="object-cover opacity-80" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/50">
          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
        </div>
      </div>
      <div className="absolute bottom-10 left-6 right-6 text-white space-y-2">
        <div className="bg-orange-500/90 px-4 py-1 rounded-md inline-block text-sm font-bold">નવી અને શાનદાર જીવનશૈલી!</div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-full"></div>
          <span className="text-sm font-bold">Ananta Heights</span>
        </div>
      </div>
    </div>
    <div className="bg-[#6B849E] text-white py-2 px-4 rounded-md text-center font-bold text-sm flex items-center justify-between">
      <ChevronLeft /><span className="text-xs">Select and Play</span><ChevronRight />
    </div>
  </div>
);

export const BrochureView = () => (
  <div className="px-6 space-y-6">
    <div className="bg-[#6B849E] text-white py-2 px-4 rounded-md text-center font-bold text-sm">Brochures PDF File</div>
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
      <div className="bg-[#003B46] p-4 flex items-center justify-between">
        <div className="text-white">
          <div className="text-xs font-serif tracking-widest">ANANTA</div>
          <div className="text-[8px] tracking-[0.3em]">HEIGHTS</div>
        </div>
        <div className="relative w-12 h-12 rounded-md overflow-hidden">
          <Image src="https://picsum.photos/seed/mini/100/100" alt="Mini" fill className="object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>
      <div className="p-4 flex items-center space-x-4">
        <div className="bg-red-500 p-2 rounded-lg text-white"><FileText size={24} /></div>
        <div className="flex-1">
          <p className="text-[10px] text-gray-600 leading-tight">Ananta Heights offers a beautifully designed space that you&apos;ll love to call home.</p>
          <p className="text-[10px] font-bold text-gray-400 mt-1">40 pages • PDF • 18 MB</p>
        </div>
        <button className="bg-gray-100 p-2 rounded-full text-gray-400"><Download size={20} /></button>
      </div>
      <div className="px-4 pb-2 text-right text-[10px] text-gray-400">4:33 pm</div>
    </div>
    <textarea placeholder="Text Message if any" className="w-full bg-white rounded-2xl py-3 px-4 text-sm border border-gray-200 outline-none h-24 resize-none" />
    <button className="w-full bg-[#6B849E] py-3 rounded-md font-bold text-white shadow-md">Download Brochure</button>
  </div>
);

export const InquiryView = () => (
  <div className="px-6 space-y-4">
    <div className="bg-[#6B849E] text-white py-2 px-4 rounded-md text-center font-bold text-sm">INQUIRY</div>
    <div className="space-y-3">
      <input type="text" placeholder="Name" className="w-full bg-white rounded-full py-2.5 px-4 text-sm border border-gray-200 outline-none" />
      <input type="text" placeholder="Mobile" className="w-full bg-white rounded-full py-2.5 px-4 text-sm border border-gray-200 outline-none" />
      <input type="email" placeholder="Email" className="w-full bg-white rounded-full py-2.5 px-4 text-sm border border-gray-200 outline-none" />
      <textarea placeholder="Text Massage" className="w-full bg-white rounded-2xl py-3 px-4 text-sm border border-gray-200 outline-none h-32 resize-none" />
      <div className="bg-[#6B849E]/30 rounded-full p-2 flex items-center space-x-4">
        <button className="bg-blue-600 text-white p-2 rounded-full"><Video size={16} fill="currentColor" /></button>
        <div className="flex-1 h-8 flex items-center space-x-0.5">
          {[10, 40, 60, 30, 80, 20, 50, 90, 40, 70, 30, 60, 20, 50, 80, 40, 60, 30, 70, 20].map((h, i) => (
            <div key={i} className="bg-white w-0.5" style={{ height: `${h}%` }}></div>
          ))}
        </div>
        <span className="text-[10px] text-white font-bold pr-2">01:35</span>
      </div>
      <div className="flex justify-center py-4">
        <button className="bg-gradient-to-b from-pink-500 to-purple-600 text-white p-6 rounded-full shadow-xl"><Mic size={40} /></button>
      </div>
      <button className="w-full bg-white py-2 rounded-md font-bold text-gray-800 shadow-sm border border-gray-200">Submit</button>
    </div>
  </div>
);

export const DropboxView = () => (
  <div className="px-6 space-y-4">
    <div className="bg-[#6B849E] text-white py-2 px-4 rounded-md text-center font-bold text-sm">Dropbox for correction</div>
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <span className="text-xs font-bold text-gray-700 whitespace-nowrap">Name :</span>
        <input type="text" className="flex-1 bg-white rounded-full py-1.5 px-4 text-sm border border-gray-200 outline-none" />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs font-bold text-gray-700 whitespace-nowrap">Mobile :</span>
        <input type="text" className="flex-1 bg-white rounded-full py-1.5 px-4 text-sm border border-gray-200 outline-none" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-700 ml-1">Company Name</label>
        <input type="text" className="w-full bg-white rounded-xl py-2 px-4 text-sm border border-gray-200 outline-none" />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-700 ml-1">Mention Changes</label>
        <textarea className="w-full bg-white rounded-xl py-2 px-4 text-sm border border-gray-200 outline-none h-24 resize-none" />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 ml-1">Images</label>
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-20 h-20 bg-white rounded-xl border border-gray-200"></div>
          ))}
          <button className="w-10 h-20 flex items-center justify-center text-red-500"><Plus size={32} /></button>
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-700 ml-1">Video link</label>
        <div className="flex items-center space-x-2">
          <input type="text" className="flex-1 bg-white rounded-md py-1.5 px-4 text-sm border border-gray-200 outline-none" />
          <button className="text-red-500"><Plus size={24} /></button>
        </div>
      </div>
      <p className="text-[10px] text-gray-600 text-center pt-2">updates as son as possible from my side, <span className="font-bold">Thanks</span></p>
      <button className="w-full bg-white py-2 rounded-md font-bold text-gray-800 shadow-sm border border-gray-200">Submit</button>
    </div>
  </div>
);

export const PopupView = () => (
  <div className="px-6 space-y-4">
    <div className="bg-[#6B849E] text-white py-2 px-4 rounded-md text-center font-bold text-sm">Popup</div>
    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
      <Image 
        src="https://picsum.photos/seed/diwali/600/800" 
        alt="Diwali" 
        fill
        className="object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-900/40 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-white space-y-2">
          <div className="text-sm font-bold tracking-widest">HAPPY</div>
          <div className="text-4xl font-serif font-bold text-yellow-400">Diwali</div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl p-4 space-y-2 shadow-md border border-gray-100">
      <h4 className="text-xs font-bold text-gray-800">Important Message</h4>
      <p className="text-[10px] text-gray-600 leading-relaxed">Dear office is closed 12/11/2025 to 22/11/2025 during deepawali vocation.</p>
    </div>
  </div>
);
