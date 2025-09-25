import { createSlice } from '@reduxjs/toolkit'

// Initial JSON config: categories with widgets
const initialState = {
  navTabs: [
    { id: 'cspm', label: 'CSPM' },
    { id: 'cwpp', label: 'CWPP' },
    { id: 'image', label: 'Image' },
    { id: 'ticket', label: 'Ticket' }
  ],
  categories: [
    {
      id: 'cspm',
      title: 'CSPM Executive Dashboard',
      widgets: [
        { id: 'w1', name: 'Cloud Accounts', type: 'cspm', icon: 'cloud', text: 'Connected (2)\nNot Connected (2)' },
        { id: 'w2', name: 'Cloud Account Risk Assessment', type: 'cspm', icon: 'risk', text: 'Passed: 7253\nFailed: 1689' }
      ]
    },
    {
      id: 'cwpp',
      title: 'CWPP Dashboard',
      widgets: [
        { id: 'w3', name: 'Top 5 Namespace Specific Alerts', type: 'cwpp', icon: 'alerts', text: 'No Graph data available' },
        { id: 'w4', name: 'Workload Alerts', type: 'cwpp', icon: 'workload', text: 'No Graph data available' }
      ]
    },
    {
      id: 'registry',
      title: 'Registry Scan',
      widgets: [
        { id: 'w5', name: 'Image Risk Assessment', type: 'image', icon: 'bar', text: '1470 Total Vulnerabilities' },
        { id: 'w6', name: 'Image Security Issues', type: 'image', icon: 'images', text: '2 Total images' }
      ]
    }
  ],
  // master list of all widgets to support searching and add/remove across categories
  allWidgets: [
    { id: 'w1', name: 'Cloud Accounts', type: 'cspm', icon: 'cloud', text: 'Connected (2)\nNot Connected (2)' },
    { id: 'w2', name: 'Cloud Account Risk Assessment', type: 'cspm', icon: 'risk', text: 'Passed: 7253\nFailed: 1689' },
    { id: 'w3', name: 'Top 5 Namespace Specific Alerts', type: 'cwpp', icon: 'alerts', text: 'No Graph data available' },
    { id: 'w4', name: 'Workload Alerts', type: 'cwpp', icon: 'workload', text: 'No Graph data available' },
    { id: 'w5', name: 'Image Risk Assessment', type: 'image', icon: 'bar', text: '1470 Total Vulnerabilities' },
    { id: 'w6', name: 'Image Security Issues', type: 'image', icon: 'images', text: '2 Total images' }
  ]
}

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidgetToCategory(state, action) {
      const { categoryId, widget } = action.payload
      const cat = state.categories.find(c => c.id === categoryId)
      if (cat && !cat.widgets.find(w => w.id === widget.id)) {
        cat.widgets.push(widget)
      }
      // ensure master list contains it
      if (!state.allWidgets.find(w => w.id === widget.id)) {
        state.allWidgets.push(widget)
      }
    },
    removeWidgetFromCategory(state, action) {
      const { categoryId, widgetId } = action.payload
      const cat = state.categories.find(c => c.id === categoryId)
      if (cat) {
        cat.widgets = cat.widgets.filter(w => w.id !== widgetId)
      }
    },
    createNewWidget(state, action) {
      const widget = action.payload
      state.allWidgets.push(widget)
    },
    // add a new category (not required but handy)
    addCategory(state, action) {
      state.categories.push(action.payload)
    },
    // update widget selection bulk (checkboxes from modal)
    setCategoryWidgets(state, action) {
      const { categoryId, widgetIds } = action.payload
      const cat = state.categories.find(c => c.id === categoryId)
      if (cat) {
        cat.widgets = widgetIds.map(id => state.allWidgets.find(w => w.id === id)).filter(Boolean)
      }
    }
  }
})

export const { addWidgetToCategory, removeWidgetFromCategory, createNewWidget, addCategory, setCategoryWidgets } = widgetsSlice.actions
export default widgetsSlice.reducer
