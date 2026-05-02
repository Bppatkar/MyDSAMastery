import React from 'react';
import { Mail, Code, Share2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`w-full flex-shrink-0 transition-colors ${isDark ? 'bg-[#1a1a1a] border-t border-[#333]' : 'bg-white border-t border-[#e4e2db]'}`}
    >
      {/* Contact Links - Compact */}
      <div className="py-5 px-4 md:px-8">
        <div className="mb-3 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* Email */}
          <a
            href="mailto:bhanupratappatkar777@gmail.com"
            className={`flex flex-col items-center text-center group transition-all p-2 rounded-lg`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full mb-2 transition-all ${
                isDark
                  ? 'bg-blue-900/30 group-hover:bg-blue-800/50'
                  : 'bg-blue-100 group-hover:bg-blue-200'
              }`}
            >
              <Mail
                className={`transition-colors ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                size={18}
              />
            </div>
            <h4
              className={`font-medium text-xs md:text-sm transition-colors ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
            >
              Email
            </h4>
            <p
              className={`text-xs transition-colors ${isDark ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'}`}
            >
              bhanupratappatkar777@gmail.com
            </p>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Bppatkar"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center text-center group transition-all p-2 rounded-lg`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full mb-2 transition-all ${
                isDark
                  ? 'bg-gray-800/50 group-hover:bg-gray-700'
                  : 'bg-gray-100 group-hover:bg-gray-200'
              }`}
            >
              <Code
                className={`transition-colors ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                size={18}
              />
            </div>
            <h4
              className={`font-medium text-xs md:text-sm transition-colors ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
            >
              GitHub
            </h4>
            <p
              className={`text-xs transition-colors ${isDark ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-gray-800'}`}
            >
              github.com/Bppatkar
            </p>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/bhanu-pratap-patkar/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center text-center group transition-all p-2 rounded-lg`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full mb-2 transition-all ${
                isDark
                  ? 'bg-blue-900/30 group-hover:bg-blue-800/50'
                  : 'bg-blue-50 group-hover:bg-blue-100'
              }`}
            >
              <Share2
                className={`transition-colors ${isDark ? 'text-blue-300' : 'text-blue-700'}`}
                size={18}
              />
            </div>
            <h4
              className={`font-medium text-xs md:text-sm transition-colors ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
            >
              LinkedIn
            </h4>
            <p
              className={`text-xs transition-colors ${isDark ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'}`}
            >
              in/bhanu-pratap-patkar
            </p>
          </a>
        </div>
      </div>

      {/* Bottom Info */}
      <div
        className={`py-2 px-4 md:px-8 text-center text-[10px] md:text-xs transition-colors ${isDark ? 'bg-[#1a1a1a] text-gray-500' : 'bg-white text-gray-500'}`}
      >
        <p>Made with ❤️ by Bhanu Pratap Patkar • 2024 DSA Universe</p>
      </div>
    </footer>
  );
}
