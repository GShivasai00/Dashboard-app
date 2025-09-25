import React, { useState, useMemo } from 'react'

export default function GlobalAddPanel({ navTabs, allWidgets, categories, onAddToCategory, onCreate, onClose }) {
  const [active, setActive] = useState(navTabs[0]?.id || 'cspm')
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || '')

  const filtered = useMemo(() => allWidgets.filter(w => w.type === active && w.name.toLowerCase().includes(query.toLowerCase())), [allWidgets, active, query])

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, padding: '12px 0' }}>
        {navTabs.map(t => (
          <button key={t.id} className={`btn ${active===t.id? 'primary': ''}`} onClick={() => setActive(t.id)}>{t.label}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <input className="topbar-search" placeholder="Search widgets..." value={query} onChange={e => setQuery(e.target.value)} />
          <div className="available-list" style={{ marginTop: 8 }}>
            {filtered.map(w => (
              <div key={w.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 10, borderBottom: '1px solid #f3f6f9' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{w.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{w.text}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                  <button className="btn primary" onClick={() => onAddToCategory(selectedCategory, w)}>Add</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div style={{ padding: 12, color: 'var(--muted)' }}>No widgets for this type</div>}
          </div>
        </div>

        <div style={{ width: 300 }}>
          <h4>Create New Widget</h4>
          <input placeholder="Widget name" />
          <textarea placeholder="Widget text" />
          <div style={{ marginTop: 8 }}>
            <button className="btn primary" onClick={() => alert('Use the per-category modal to create and add, or use the widget list add on right')}>Create & Add</button>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn ghost" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
