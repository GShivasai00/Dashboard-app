import { configureStore } from '@reduxjs/toolkit'
import widgetsReducer from './widgetsSlice'

export default configureStore({
  reducer: {
    widgets: widgetsReducer
  }
})
