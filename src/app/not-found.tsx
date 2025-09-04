import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#fdfbea] flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <Image 
              src="/images/logo.png" 
              alt="Readle Logo" 
              width={80} 
              height={80} 
              className="mx-auto"
            />
          </div>
          <h1 className="text-6xl font-bold mb-2">
            4<span className="text-blue-600">0</span>4
          </h1>
          <p className="text-3xl font-semibold mb-6">Page Not Found</p>
          
          <div className="w-full max-w-md mx-auto mb-8">
            <Image 
              src="/file.svg" 
              alt="Book with missing page" 
              width={200} 
              height={200} 
              className="mx-auto"
            />
          </div>
          
          <p className="text-gray-600 mb-8">
            Oops! It seems the page you&rsquo;re looking for has wandered off on its own reading adventure. 
            Let&rsquo;s get you back to a page that exists!
          </p>
          
          <Link 
            href="/" 
            className="inline-block bg-blue-900 hover:bg-blue-800 text-white font-medium py-3 px-8 rounded-full transition-all"
          >
            Go Back Home
          </Link>
        </div>
        
        <div className="text-gray-500 text-sm">
          <p>Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact Support</Link></p>
        </div>
      </div>
    </div>
  );
}