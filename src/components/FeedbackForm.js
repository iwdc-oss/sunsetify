import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { FieldArray, Form, Formik, Field, ErrorMessage, useFormikContext } from 'formik'
import * as Yup from 'yup'

export const FeedbackForm = () => {
  const refInput = useRef(null)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    success: false,
    error: false,
    message: '',
  })

  const feedbackSubmitHandler = async (data) => {
    setLoading(true)
    const response = await fetch('/api/sheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res = await response.json()
    setLoading(false)
    if (res.response.status === 200) {
      setAlert({
        success: true,
        error: false,
        message: 'Thank you for your feedback!',
      })
      router.push('/')
    }
  }

  return (
    <>
      {alert?.success && !alert?.error && (
        <div
          className='bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center w-full max-w-32rem'
          role='alert'
        >
          <svg
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='check-circle'
            className='w-4 h-4 mr-2 fill-current'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
          >
            <path
              fill='currentColor'
              d='M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z'
            ></path>
          </svg>
          {alert?.message}
        </div>
      )}
      <Formik
        initialValues={{
          content: '',
        }}
        validationSchema={Yup.object({
          content: Yup.string().required('Feedback is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const datetime = new Date().toISOString()
          const data = {
            message: values.content,
            datetime,
          }
          // console.log(refInput.current)
          feedbackSubmitHandler(data)
          // refInput.current.getElementsByTagName('textarea')[0].value = ''
          // console.log("masuk", refInput.current)
          setSubmitting(false)
        }}
      >
        <Form className='w-full max-w-lg'>
          <Field
            name='content'
            render={({ field }) => (
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='content'>
                  Please leave your feedback here
                </label>
                <textarea
                  className='shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='content'
                  rows='6'
                  ref={refInput}
                  {...field}
                />
                <ErrorMessage name='content' component='div' className='text-red-500 text-sm' />
              </div>
            )}
          />
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </>
  )
}
