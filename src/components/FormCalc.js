import React, { useEffect, useRef, useState } from 'react'
import { FieldArray, Form, Formik, Field, ErrorMessage, useFormikContext } from 'formik'
import { PlusCircleIcon, MinusCircleIcon, CubeIcon } from '@heroicons/react/outline'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { calculation } from '@/src/app/features/calculationSlice'

// Notes: Store values to local storage for memorizing
const StoreValues = () => {
  const { values } = useFormikContext()
  const isFirstReloadPage = useRef(0)
  useEffect(() => {
    const { courses } = values
    if (!isFirstReloadPage.current) {
      const restoredValues = JSON.parse(localStorage.getItem('courses')) ?? [{ name: '', credit: 4, value: 4 }]
      values.courses = restoredValues
    }
    if (isFirstReloadPage.current++) localStorage.setItem('courses', JSON.stringify(courses))
  }, [values])
  return null
}
export const FormCalc = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState(false)
  const initialValues = {
    courses: [{ name: '', credit: 4, value: 4 }],
  }
  useEffect(() => {
    setTimeout(() => {
      setState(true)
    }, 1200)
  }, [])
  const validationSchema = Yup.object().shape({
    courses: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Tidak boleh kosong'),
      }),
    ),
  })
  const handleAddCourse = (callback) => {
    callback({ name: '', credit: 4, value: 4 })
  }
  const handleRemoveCourse = (callback, index) => {
    callback(index)
  }
  const handleSubmit = (values, { setSubmitting }) => {
    const { courses } = values
    dispatch(calculation(courses))
    setSubmitting(false)
  }
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {(props) => (
        <Form>
          <FieldArray name='courses'>
            {(fieldArrayHelpers) => (
              <div className='overflow-auto mt-4'>
                {props.values.courses.length > 0 && state ? (
                  props.values.courses.map((course, index) => (
                    // Field
                    <div className='w-[960px] grid grid-cols-4 gap-2 px-4 mb-6 mx-auto' key={index}>
                      {/* Mata Kuliah */}
                      <div className='text-center'>
                        <Field
                          className='border-2 border-gray-400 py-2 px-4 rounded-md'
                          name={`courses.${index}.name`}
                          placeholder='Nama mata kuliah'
                          type='text'
                        />
                        <ErrorMessage
                          className='text-left ml-2 text-red-600'
                          name={`courses.${index}.name`}
                          component='div'
                        />
                      </div>
                      {/* Kredit */}
                      <div className='text-center'>
                        <Field
                          component='select'
                          className='border-2 border-gray-400 py-2 px-16 rounded-md'
                          name={`courses.${index}.credit`}
                          placeholder='Kredit SKS'
                          type='text'
                        >
                          <option value='4'>4 SKS</option>
                          <option value='3'>3 SKS</option>
                          <option value='2'>2 SKS</option>
                          <option value='1'>1 SKS</option>
                        </Field>
                        <ErrorMessage name={`courses.${index}.credit`} component='div' />
                      </div>
                      {/* Nilai Mutu */}
                      <div className='text-center'>
                        <Field
                          component='select'
                          className='border-2 border-gray-400 py-2 px-16 rounded-md'
                          name={`courses.${index}.value`}
                          placeholder='Nilai Mutu Mata Kuliah'
                          type='text'
                        >
                          <option value={4.0}>A (4.00)</option>
                          <option value={3.5}>AB (3.50)</option>
                          <option value={3.0}>B (3.00)</option>
                          <option value={2.5}>BC (2.50)</option>
                          <option value={2.0}>C (2.00)</option>
                          <option value={1.0}>D (1.00)</option>
                          <option value={0.0}>E (0.00)</option>
                        </Field>
                        <ErrorMessage name={`courses.${index}.value`} component='div' />
                      </div>
                      <div className='flex justify-center items-center //w-28'>
                        <button
                          className='flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50'
                          type='button'
                          onClick={() => handleRemoveCourse(fieldArrayHelpers.remove, index)}
                        >
                          <MinusCircleIcon className='h-10 w-10 text-red-400 font-light' />
                        </button>
                      </div>
                    </div>
                  ))
                ) : state ? (
                  <h1 className='text-center italic text-lg'>Tidak ada data, tekan tombol (+) untuk menambah data</h1>
                ) : (
                  <div className='flex justify-center flex-col items-center'>
                    <CubeIcon className='h-10 w-10 text-center animate-spin' />
                    <h1 className='mt-2'>Loading...</h1>
                  </div>
                )}
                <div className='my-8 flex justify-center'>
                  <button
                    className='flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50'
                    type='button'
                    onClick={() => handleAddCourse(fieldArrayHelpers.push)}
                  >
                    {state && <PlusCircleIcon className='h-10 w-10 text-green-400 font-light' />}
                  </button>
                </div>
              </div>
            )}
          </FieldArray>
          <div className='text-center mt-6'>
            <button
              className='py-2 px-4 rounded-md text-xl font-medium border-2  font-poppins bg-gray-600 text-white'
              type='submit'
            >
              Periksa IP
            </button>
          </div>
          <StoreValues />
        </Form>
      )}
    </Formik>
  )
}
