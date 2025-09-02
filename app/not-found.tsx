"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Illustration */}
        <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-green-50 to-white p-8">
          <div className="absolute top-6 left-6">
            <Image src="/alhub-logo.svg" alt="Alhub Logo" width={120} height={120} />
          </div>

          <div className="w-full px-6 py-10">
            <svg className="mx-auto" width="320" height="220" viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <rect x="10" y="40" width="140" height="120" rx="16" fill="#F0FFF4" stroke="#D1FAE5" />
              <rect x="170" y="20" width="120" height="160" rx="16" fill="#EFF6FF" stroke="#DBEAFE" />
              <circle cx="220" cy="140" r="18" fill="#FEF3C7" stroke="#FDE68A" />
              <path d="M36 160c22-28 46-40 84-28" stroke="#A7F3D0" strokeWidth="6" strokeLinecap="round" />
              <path d="M200 60c18 12 30 40 6 64" stroke="#BFDBFE" strokeWidth="6" strokeLinecap="round" />
            </svg>

            <p className="mt-6 text-center text-sm text-gray-500">
              Oops! Looks like you took a wrong turn. Don’t worry — we’ll help you get back on track.
            </p>
          </div>
        </div>

        {/* Right: Content */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-green-50">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 9v4" stroke="#16A34A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 17h.01" stroke="#16A34A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12c0 4.971-4.029 9-9 9s-9-4.029-9-9 4.029-9 9-9 9 4.029 9 9z" stroke="#16A34A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">404 — Page Not Found</h1>
              <p className="mt-2 text-sm text-gray-500">The page you are looking for doesn’t exist. Here are some helpful links:</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-600">You might want to try:</p>

            <ul className="mt-4 grid gap-3">
              <li className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">Home</p>
                  <p className="text-xs text-gray-500">Return to the homepage</p>
                </div>
                <Link href="/" className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 bg-green-primary text-[#FFF]">
                  Go Home
                </Link>
              </li>

 
            </ul>
          </div>
 

          <p className="mt-6 text-xs text-gray-400">If you believe this is an error, please contact us and include the URL you tried to visit.</p>

          <div className="mt-6 text-sm text-gray-500">Version: <span className="font-medium text-gray-700">1.0.0</span></div>
        </div>
      </div>
    </main>
  );
}