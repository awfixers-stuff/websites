import { type ReactNode } from 'react';
import CardNav from './CardNav';
import { Button } from './ui/button';
import { NAV_ITEMS, FOOTER_LINKS, SITE_CONFIG } from '../constants';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black z-0" />
      <div className="fixed inset-0 opacity-30 z-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      
      {/* Gradient Orbs for depth */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl z-0 animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Navigation */}
      <CardNav
        logo={SITE_CONFIG.logo}
        logoAlt={SITE_CONFIG.name}
        items={NAV_ITEMS}
        baseColor="rgba(26, 26, 26, 0.95)"
        menuColor="#ff006e"
        buttonBgColor="#ff006e"
        buttonTextColor="#000000"
      />

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer - Enhanced */}
      <footer className="relative bg-gradient-to-b from-black via-gray-950 to-black border-t border-gray-800/50 py-16 px-4 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4 animate-in fade-in duration-700">
            {SITE_CONFIG.fullName}
          </h3>
          <p className="text-gray-400 mb-10 font-light tracking-wider text-lg">
            PREMIUM EXCLUSIVE ACCESS • VIP MEMBERSHIP ONLY
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {FOOTER_LINKS.map((link) => (
              <Button 
                key={link.label} 
                asChild
                variant="ghost" 
                className="text-gray-400 hover:text-pink-400 border-transparent hover:border-pink-500/30 rounded-lg px-6 py-2 transition-all duration-300 hover:bg-pink-500/5"
              >
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </div>
          <p className="text-gray-600 text-sm tracking-wider">
            © 2024 {SITE_CONFIG.fullName} • ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </div>
  );
}

