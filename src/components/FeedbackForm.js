import React from 'react'
import { useRouter } from 'next/router'
import { FieldArray, Form, Formik, Field, ErrorMessage, useFormikContext } from 'formik'
import * as Yup from 'yup'

export const FeedbackForm = () => {
  const router = useRouter()

  const feedbackSubmitHandler = async (data) => {
    const response = await fetch('/api/sheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res = await response.json()
    if (res.response.status === 200) router.push('/')
  }

  return (
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
        feedbackSubmitHandler(data)
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
  )
}
