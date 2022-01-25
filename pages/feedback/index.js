/* eslint-disable react/no-unescaped-entities */
import { FeedbackForm } from '@/src/components/FeedbackForm'

export default function Feedback() {
  return (
    <div className='py-10 px-3'>
      <div className='mb-12'>
        <h1 className='text-center text-6xl font-poppins'>Sunsetify</h1>
        <h2 className='text-center font-poppins italic mt-1'>
          <span className='font-bold'>from</span> <span className='underline'>IPB Web Development Community</span>
        </h2>
        <h2 className='mt-6 text-center text-lg font-poppins'>We would like your feedback to improve our service.</h2>
      </div>
      <div
        className='overflow-auto'
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <FeedbackForm />
      </div>
    </div>
  )
}
