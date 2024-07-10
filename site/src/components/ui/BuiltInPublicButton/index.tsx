import Link from 'next/link';
import { Github } from 'lucide-react';

export function BuiltInPublicButton() {
    return (
      <Link href="https://github.com/ebowwa/solana_next_example" passHref>
        <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gray-800 px-8 py-3 font-medium text-white transition-all duration-300 ease-out hover:ring-2 hover:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500">
          <span className="absolute inset-0 h-full w-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out group-hover:w-full" />
          <span className="relative flex items-center gap-2">
            <Github className="h-5 w-5" />
            <span>Built in Public</span>
          </span>
        </button>
      </Link>
    );
  }