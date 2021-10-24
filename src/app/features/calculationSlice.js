import { createSlice } from '@reduxjs/toolkit'

export const calculationSlice = createSlice({
  name: 'calculation',
  initialState: {
    gradePoint: 0,
  },
  reducers: {
    calculation: (state, { payload }) => {
      const numberOfCourses = payload.reduce((prev, curr) => prev + Number(curr.credit), 0)
      const weightOfCourses = payload.reduce((prev, curr) => prev + Number(curr.credit) * Number(curr.value), 0)
      const result = weightOfCourses / numberOfCourses
      state.gradePoint = Number(result).toFixed(2)
    },
  },
})

export const { calculation } = calculationSlice.actions
export default calculationSlice.reducer
