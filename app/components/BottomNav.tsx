import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, History, Users } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="bg-background/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 shadow-2xl flex items-center justify-around relative overflow-hidden">
        {/* Active Indicator Background */}
        <motion.div 
          className="absolute h-12 w-[30%] bg-white/5 rounded-2xl border border-white/5"
          initial={false}
          animate={{ x: pathname === '/' ? '-110%' : pathname === '/timeline' ? '0%' : '110%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        <Link href="/" className={`relative z-10 flex flex-col items-center gap-1 py-1.5 px-4 rounded-2xl transition-all ${pathname === '/' ? 'text-white' : 'text-white/30 hover:text-white/50'}`}>
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Archive</span>
        </Link>

        <Link href="/timeline" className={`relative z-10 flex flex-col items-center gap-1 py-1.5 px-4 rounded-2xl transition-all ${pathname === '/timeline' ? 'text-white' : 'text-white/30 hover:text-white/50'}`}>
          <History className="w-5 h-5" />
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Timeline</span>
        </Link>
        
        <Link href="/heroes" className={`relative z-10 flex flex-col items-center gap-1 py-1.5 px-4 rounded-2xl transition-all ${pathname === '/heroes' ? 'text-white' : 'text-white/30 hover:text-white/50'}`}>
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Heroes</span>
        </Link>
      </div>
    </nav>
  );
}
