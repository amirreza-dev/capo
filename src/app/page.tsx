'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
 const [count, setCount] = useState<number | null>(null);
 const [remainingNames, setRemainingNames] = useState<string[]>([]);
 const [currentName, setCurrentName] = useState<string | null>(null);
 const [isShowing, setIsShowing] = useState(false);

 const allNames = [
  'دن مافیا',
  'جلاد',
  'جادوگر',
  'کارآگاه',
  'زره ساز',
  'شهروند ساده',
  'عطار',
  'مظنون',
  'وارث',
  'شهروند ساده',
  'جاسوس',
  'کدخدا',
  'شهروند ساده',
  'شهروند ساده',
  'شهروند ساده',
 ];

 const shuffleArray = (arr: string[]) =>
  [...arr].sort(() => Math.random() - 0.5);

 const handleCountSelection = (selectedCount: number) => {
  const selectedNames = allNames.slice(0, selectedCount);
  setCount(selectedCount);
  setRemainingNames(shuffleArray(selectedNames));
  setCurrentName(null);
  setIsShowing(false);
 };

 const handleButtonClick = () => {
  if (isShowing) {
   setIsShowing(false);
   setCurrentName(null);
  } else {
   if (remainingNames.length === 0) return;
   const [next, ...rest] = remainingNames;
   setCurrentName(next);
   setRemainingNames(rest);
   setIsShowing(true);
  }
 };

 return (
  <main className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-gray-900 text-white p-6'>
   <h1 className='text-4xl font-extrabold mb-8 text-center'>
    سناریو کاپو {count === null ? null : `${count} ${'نفره'}`}
   </h1>

   <h2 className='text-2xl font-semibold mb-4'>تعداد نقش ها رو انتخاب کن:</h2>

   <div className='flex gap-4 mb-10'>
    {[10, 13, 15].map((num) => (
     <button
      key={num}
      onClick={() => handleCountSelection(num)}
      disabled={count === num}
      className={`px-5 py-2 rounded-lg transition-all duration-200 font-semibold ${
       count === num
        ? 'bg-blue-700 cursor-not-allowed text-white'
        : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
     >
      {num}
     </button>
    ))}
   </div>

   {count !== null && (
    <>
     <button
      onClick={handleButtonClick}
      disabled={remainingNames.length === 0 && !isShowing}
      className='mb-8 px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-lg font-bold shadow-md transition-all duration-200'
     >
      {isShowing ? 'بعدی' : 'نمایش نقش'}
     </button>

     <div className='perspective-1000'>
      <div className={`flip-card ${isShowing ? 'flipped' : ''}`}>
       <div className='flip-card-inner'>
        <div className='flip-card-front bg-gray-700 rounded-2xl shadow-lg' />
        <div className='flip-card-back bg-purple-700 rounded-2xl shadow-xl flex items-center justify-center text-3xl font-bold'>
         {currentName}
        </div>
       </div>

       <p className='text-center rotate-180 mt-12 text-3xl'>{currentName}</p>
      </div>
     </div>

     {remainingNames.length === 0 && !isShowing && (
      <p className='mt-6 px-6 py-3 bg-red-500 text-white rounded-xl shadow-md text-lg font-medium'>
       تمام نقش‌ها نمایش داده شدند!
      </p>
     )}
    </>
   )}

   <footer className='mt-36 text-sm text-gray-300'>
    طراحی و توسعه توسط{' '}
    <Link
     href='https://amirreza.dev'
     target='_blank'
     className='hover:text-white'
    >
     امیررضا
    </Link>
   </footer>
  </main>
 );
}
