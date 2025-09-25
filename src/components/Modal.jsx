import React from 'react'

export default function Modal({ children, onClose, title }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title || 'Add Widget'}</h3>
          <div className="modal-close"><button onClick={onClose}>×</button></div>
        </div>
        <div className="add-panel">{children}</div>
      </div>
    </div>
  )
}
