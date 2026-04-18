"use client";
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin'); 
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[40px] shadow-2xl">
        <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tighter">Admin Portal</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="email" placeholder="Admin Email" 
            className="w-full p-4 bg-gray-50 rounded-2xl outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-yellow-500"
            onChange={(e) => setEmail(e.target.value)} required 
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-4 bg-gray-50 rounded-2xl outline-none ring-1 ring-gray-100 focus:ring-2 focus:ring-yellow-500"
            onChange={(e) => setPassword(e.target.value)} required 
          />
          <button className="w-full bg-yellow-500 text-white py-5 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl">
            LOGIN TO DASHBOARD
          </button>
        </form>
      </div>
    </div>
  );
}