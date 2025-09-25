import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addWidgetToCategory, removeWidgetFromCategory, createNewWidget, setCategoryWidgets } from './store/widgetsSlice'
import Modal from './components/Modal'
import AddWidgetPanel from './components/AddWidgetPanel'
import GlobalAddPanel from './components/GlobalAddPanel'

export default function App() {
  const categories = useSelector(s => s.widgets.categories)
  const allWidgets = useSelector(s => s.widgets.allWidgets)
  const dispatch = useDispatch()

  const [openModalFor, setOpenModalFor] = useState(null)
  const [showAllWidgets, setShowAllWidgets] = useState(false)
  const navTabs = useSelector(s => s.widgets.navTabs)

  return (
    <div className="app">
      <header className="header">
        <h1>CNAPP Dashboard</h1>
        <div className="actions">
          <input className="topbar-search" placeholder="Search anything..." />
          <div className="top-controls">
            <button className="control-btn" onClick={() => setOpenModalFor('global')}>Add Widget +</button>
            <button className="icon-btn" title="Refresh">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12a9 9 0 10-2.1 5.7l1.6 1.6" stroke="#374151" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v-4h-4" stroke="#374151" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="icon-btn" title="More">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="12" r="1.5" fill="#374151"/><circle cx="12" cy="12" r="1.5" fill="#374151"/><circle cx="19" cy="12" r="1.5" fill="#374151"/></svg>
            </button>
            <button className="time-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 7v6l4 2" stroke="#2f5fb7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#2f5fb7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Last 2 days</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {categories.map(cat => (
          <section key={cat.id} className={`category ${cat.id}`}>
            <div className="category-frame">
              <div className="category-header">
                <h2>{cat.title}</h2>
                <div>
                  <button className="btn" onClick={() => setOpenModalFor(cat.id)}>Add Widget +</button>
                </div>
              </div>

              <div className="widgets-row">
                {cat.widgets.map(w => {
                  const isCWPP = cat.id === 'cwpp'
                  return (
                    <div key={w.id} className="widget">
                      <button className="remove" onClick={() => dispatch(removeWidgetFromCategory({ categoryId: cat.id, widgetId: w.id }))}>×</button>

                      {isCWPP ? (
                        // Large centered placeholder card for CWPP graphs (match screenshot)
                        <div className="cwpp-graph">
                          <div className="cwpp-inner">
                            <svg width="68" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3v18h18" stroke="#c1c8cf" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 13l3-4 4 6 3-8 2 5" stroke="#c1c8cf" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            <div className="cwpp-text">{w.text}{w.text.endsWith('!') ? '' : '!'}</div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <div style={{ width: 120, height: 120, borderRadius: 12, background: '#fbfdff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Special visuals for some known widgets to match screenshot */}
                            {w.id === 'w1' && (
                              // Cloud Accounts donut
                              <svg width="100" height="100" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="30" stroke="#dbeafe" strokeWidth="20" fill="none"/>
                                <path d="M50 20 A30 30 0 0 1 80 50" stroke="#3b82f6" strokeWidth="20" fill="none" strokeLinecap="round"/>
                                <text x="50" y="55" textAnchor="middle" fontSize="14" fill="#0b3b7a">2</text>
                              </svg>
                            )}
                            {w.id === 'w2' && (
                              // Risk donut with multiple colors
                              <svg width="100" height="100" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="30" stroke="#e6eef8" strokeWidth="20" fill="none"/>
                                <path d="M50 20 A30 30 0 0 1 72 34" stroke="#ef4444" strokeWidth="20" fill="none" strokeLinecap="round"/>
                                <path d="M72 34 A30 30 0 0 1 68 68" stroke="#f59e0b" strokeWidth="20" fill="none" strokeLinecap="round"/>
                                <path d="M68 68 A30 30 0 0 1 50 80" stroke="#10b981" strokeWidth="20" fill="none" strokeLinecap="round"/>
                                <text x="50" y="55" textAnchor="middle" fontSize="12" fill="#0b3b7a">9659</text>
                              </svg>
                            )}
                            {w.id === 'w5' && (
                              // Registry scan horizontal segmented bar (Image Risk Assessment)
                              <svg width="140" height="48" viewBox="0 0 140 48">
                                <rect x="6" y="20" width="128" height="12" rx="6" fill="#f1f5f9"/>
                                <rect x="6" y="20" width="40" height="12" rx="6" fill="#ef4444"/>
                                <rect x="46" y="20" width="44" height="12" rx="6" fill="#f59e0b"/>
                                <rect x="90" y="20" width="34" height="12" rx="6" fill="#facc15"/>
                                <rect x="124" y="20" width="10" height="12" rx="6" fill="#9ca3af"/>
                              </svg>
                            )}
                            {w.id === 'w6' && (
                              // Registry scan visual for Image Security Issues (similar style)
                              <svg width="140" height="48" viewBox="0 0 140 48">
                                <rect x="6" y="20" width="128" height="12" rx="6" fill="#f1f5f9"/>
                                <rect x="6" y="20" width="28" height="12" rx="6" fill="#ef4444"/>
                                <rect x="34" y="20" width="36" height="12" rx="6" fill="#ef4444"/>
                                <rect x="70" y="20" width="28" height="12" rx="6" fill="#f59e0b"/>
                                <rect x="98" y="20" width="26" height="12" rx="6" fill="#facc15"/>
                                <rect x="124" y="20" width="10" height="12" rx="6" fill="#9ca3af"/>
                              </svg>
                            )}
                            {(!['w1','w2','w5','w6'].includes(w.id)) && (
                              <div style={{ width: 56, height: 56, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {w.icon === 'cloud' && (<svg width="36" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 18H6a4 4 0 010-8c.3 0 .6.03.88.1A6 6 0 1120 12a4 4 0 010 6z" stroke="#0b3b7a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>)}
                                {w.icon === 'risk' && (<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 9v4" stroke="#0b3b7a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 17h.01" stroke="#0b3b7a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#0b3b7a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>)}
                                {w.icon === 'bar' && (<svg width="36" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="10" width="3" height="9" rx="1" fill="#ff7a52"/><rect x="10" y="6" width="3" height="13" rx="1" fill="#ffbe52"/><rect x="17" y="2" width="3" height="17" rx="1" fill="#4ecb7f"/></svg>)}
                                {w.icon === 'images' && (<svg width="36" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="14" rx="2" stroke="#0b3b7a" strokeWidth="1.2"/><circle cx="8.5" cy="9.5" r="1.5" fill="#0b3b7a"/><path d="M21 18l-5-5-4 4-3-3-5 5" stroke="#0b3b7a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>)}
                              </div>
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <h3 style={{ marginBottom: 6 }}>{w.name}</h3>
                            <p>{w.text}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}

                <div className="widget add-slot" onClick={() => setOpenModalFor(cat.id)}>+ Add Widget</div>
              </div>
            </div>

            {openModalFor === cat.id && (
              <Modal onClose={() => setOpenModalFor(null)} title={`Add Widgets — ${cat.title}`}>
                <AddWidgetPanel
                  category={cat}
                  allWidgets={allWidgets}
                  onAdd={(widget) => { dispatch(addWidgetToCategory({ categoryId: cat.id, widget })); setOpenModalFor(null) }}
                  onCreate={(widget) => { dispatch(createNewWidget(widget)); dispatch(addWidgetToCategory({ categoryId: cat.id, widget })); setOpenModalFor(null) }}
                  onSetSelection={(widgetIds) => { dispatch(setCategoryWidgets({ categoryId: cat.id, widgetIds })); setOpenModalFor(null) }}
                  onClose={() => setOpenModalFor(null)}
                />
              </Modal>
            )}

          </section>
        ))}

        {showAllWidgets && (
          <aside className="all-widgets">
            <h3>All Widgets</h3>
            <WidgetSearch allWidgets={allWidgets} onAdd={(catId, widget) => dispatch(addWidgetToCategory({ categoryId: catId, widget }))} categories={categories} />
          </aside>
        )}

        {openModalFor === 'global' && (
          <Modal onClose={() => setOpenModalFor(null)} title={`Add Widgets`}>
            <GlobalAddPanel
              navTabs={navTabs}
              allWidgets={allWidgets}
              categories={categories}
              onAddToCategory={(categoryId, widget) => { dispatch(addWidgetToCategory({ categoryId, widget })) }}
              onCreate={(widget) => { dispatch(createNewWidget(widget)) }}
              onClose={() => setOpenModalFor(null)}
            />
          </Modal>
        )}
      </main>
    </div>
  )
}

function WidgetSearch({ allWidgets, onAdd, categories }) {
  const [query, setQuery] = useState('')
  const filtered = allWidgets.filter(w => w.name.toLowerCase().includes(query.toLowerCase()))
  const [selectedCat, setSelectedCat] = useState(categories[0]?.id || '')

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input placeholder="Search widgets..." value={query} onChange={e => setQuery(e.target.value)} />
        <select value={selectedCat} onChange={e => setSelectedCat(e.target.value)}>
          {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      </div>
      <ul className="widget-list">
        {filtered.map(w => (
          <li key={w.id}>
            <strong>{w.name}</strong>
            <div className="widget-list-actions">
              <button onClick={() => onAdd(selectedCat, w)}>Add to selected category</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
