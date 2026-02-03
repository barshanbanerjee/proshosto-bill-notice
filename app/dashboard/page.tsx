import Link from 'next/link';
import Image from 'next/image';
import { NGO_DATA } from '@/lib/data';

export default function DashboardPage() {
  return (
    <div className="p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <Image
              src="/logo.webp"
              alt={NGO_DATA.name}
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {NGO_DATA.name}
          </h1>
          <p className="text-gray-600">Internal Document Management Tool</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/dashboard/notice"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-teal-500"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Create Notice
              </h2>
              <p className="text-gray-600">
                Generate official notices with bilingual support
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/bill"
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-500"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Create Receipt
              </h2>
              <p className="text-gray-600">
                Generate donation receipts with auto-numbering
              </p>
            </div>
          </Link>
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Auto-Save</h3>
            <p className="text-sm text-gray-600">
              All documents are automatically saved locally
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Email Tracking
            </h3>
            <p className="text-sm text-gray-600">
              Every document generation is tracked via email
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">A4 Format</h3>
            <p className="text-sm text-gray-600">
              Professional print-ready PDF exports
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
