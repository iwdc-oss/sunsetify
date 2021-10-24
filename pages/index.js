/* eslint-disable react/no-unescaped-entities */
import { FormCalc } from '@/src/components/FormCalc'
import { useSelector } from 'react-redux'

export default function Home() {
  const gradePoint = useSelector((state) => state.calculation.gradePoint)
  return (
    <div className='py-10'>
      <div className='mb-12'>
        <h1 className='text-center text-6xl font-poppins'>Sunsetify</h1>
        <h2 className='mt-4 text-center text-lg font-poppins'>
          "Berapakah kadar <span className='text-yellow-600 font-medium'>Senja</span> Anda pada semester ini?"
        </h2>
      </div>
      {/* Grade View */}
      <div>
        <div className='flex justify-center items-center border-4 bg-gray-600 border-gray-300 rounded-full w-28 h-28 mx-auto'>
          <h1 className='text-4xl font-poppins font-medium text-white'>{gradePoint}</h1>
        </div>
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
    </div>
  )
}
