import React, { useState, useMemo } from 'react'

export default function AddWidgetPanel({ category, allWidgets, categories, onAdd, onCreate, onSetSelection, onClose }) {
  const [selected, setSelected] = useState(() => new Set((category?.widgets || []).map(w => w.id)))
  const [newName, setNewName] = useState('')
  const [newText, setNewText] = useState('')
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('cspm')
  const [targetCat, setTargetCat] = useState(category?.id || (categories && categories[0]?.id))

  const filtered = useMemo(() => allWidgets
    .filter(w => (!tab || w.type === tab))
    .filter(w => w.name.toLowerCase().includes(query.toLowerCase())), [allWidgets, query, tab])

  function toggle(id) {
    const s = new Set(selected)
    if (s.has(id)) s.delete(id)
    else s.add(id)
    setSelected(s)
  }

  return (
    <div className="add-panel">
      <h3 style={{ marginTop: 0 }}>Personalise your dashboard by adding the following widget</h3>

      <div className="add-panel-content">
        <div className="available">
          <div className="search"><input className="topbar-search" placeholder="Search widgets..." value={query} onChange={e => setQuery(e.target.value)} /></div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <button className={`btn ${tab==='cspm'?'primary':''}`} onClick={() => setTab('cspm')}>CSPM</button>
            <button className={`btn ${tab==='cwpp'?'primary':''}`} onClick={() => setTab('cwpp')}>CWPP</button>
            <button className={`btn ${tab==='image'?'primary':''}`} onClick={() => setTab('image')}>Image</button>
            <button className={`btn ${tab==='ticket'?'primary':''}`} onClick={() => setTab('ticket')}>Ticket</button>
          </div>
          <div className="available-list">
            {filtered.map(w => (
              <label key={w.id} className="available-item">
                <input type="checkbox" checked={selected.has(w.id)} onChange={() => toggle(w.id)} />
                <div>
                  <div style={{ fontWeight: 600 }}>{w.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{w.text}</div>
                </div>
              </label>
            ))}
            {filtered.length === 0 && <div style={{ padding: 12, color: 'var(--muted)' }}>No widgets match your search</div>}
          </div>
        </div>

        <div className="create">
          <h4 style={{ marginTop: 0 }}>Create New Widget</h4>
          <input placeholder="Widget name" value={newName} onChange={e => setNewName(e.target.value)} />
          <textarea placeholder="Widget text" value={newText} onChange={e => setNewText(e.target.value)} />
          <div style={{ marginTop: 8 }}>
            <button className="btn primary" onClick={() => {
              if (!newName) return alert('Enter name')
              const id = 'w' + Math.random().toString(36).slice(2, 9)
              const widget = { id, name: newName, text: newText, type: tab }
              // if opened for all categories, add to selected target category
              onCreate(widget)
              if (targetCat) onAddToCategory(targetCat, widget)
            }}>Create & Add</button>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <div style={{ marginRight: 'auto' }}>
          { (!category) && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Add selected to</div>
              <select value={targetCat} onChange={e => setTargetCat(e.target.value)}>
                {categories && categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
          )}
        </div>
        <button className="btn ghost" onClick={onClose}>Cancel</button>
        <button className="btn primary" onClick={() => {
          // if modal opened in global mode, apply to targetCat, else to current category
          const widgetIds = Array.from(selected)
          if (!category && targetCat) {
            // add each widget to target category
            widgetIds.forEach(id => {
              const w = allWidgets.find(x => x.id === id)
              if (w) onAddToCategory(targetCat, w)
            })
          } else {
            onSetSelection(widgetIds)
          }
        }}>Confirm</button>
      </div>
    </div>
  )
}

// helpers inside the module to avoid prop drilling
function onAddToCategoryWrapper(props, catId, widget) {
  // placeholder – will be replaced via binding in App when passing functions
}
