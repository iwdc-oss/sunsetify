/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unescaped-entities */
import { FormCalc } from '@/src/components/FormCalc'
import { GradeView } from '@/src/components/GradeView'
import { useSelector } from 'react-redux'
import { InboxInIcon } from '@heroicons/react/outline'
import { Link } from 'next/link'

export default function Home() {
  const gradePoint = useSelector((state) => state.calculation.gradePoint)
  return (
    <div className='py-10 px-3'>
      <div className='mb-12'>
        <h1 className='text-center text-6xl font-poppins'>Sunsetify</h1>
        <h2 className='text-center font-poppins italic mt-1'>
          <span className='font-bold'>from</span> <span className='underline'>IPB Web Development Community</span>
        </h2>
        <h2 className='mt-6 text-center text-lg font-poppins'>
          "Berapakah kadar <span className='text-yellow-600 font-medium'>Senja</span> Anda pada semester ini?"
        </h2>
      </div>
      {/* Grade View */}
      <div>
        <GradeView gradePoint={gradePoint} />
      </div>
      {/* Header */}
      <div className='overflow-auto'>
        <div className='w-[960px] grid grid-cols-4 gap-2 my-8 mx-auto'>
          <h1 className='text-center font-poppins text-xl font-medium'>Mata Kuliah</h1>
          <h1 className='text-center font-poppins text-xl font-medium'>Kredit SKS</h1>
          <h1 className='text-center font-poppins text-xl font-medium'>Nilai Mutu</h1>
        </div>
      </div>
      <FormCalc />
      {/* Footer */}
      <div className='my-12'>
        <h1 className='text-center'>
          <a href='/feedback'>
            {'Saran & Masukan : '}
            <InboxInIcon className='w-6 h-6 inline-block text-gray-600 mx-2' />
          </a>
        </h1>
      </div>
    </div>
  )
}
