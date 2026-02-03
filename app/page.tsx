import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-400/20 blur-[120px]" />
            </div>

            <div className="z-10 w-full max-w-4xl px-6 text-center">
                {/* Badge */}
                <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300 tracking-wide uppercase">
                        Under Construction
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                    Building Something <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Extraordinary
                    </span>
                </h1>

                {/* Description */}
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Our new official website is currently in the works. In the meantime, our administrative dashboard is partially operational and ready for use.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/dashboard"
                        className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 bg-gray-900 rounded-full hover:bg-gray-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                    >
                        Access Dashboard
                        <svg
                            className="w-5 h-5 ml-2 -mr-1 transition-transform duration-200 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>

                {/* Footer info */}
                <div className="mt-16 text-sm text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} Proshosto. All rights reserved.</p>
                </div>
            </div>
        </main>
    );
}
