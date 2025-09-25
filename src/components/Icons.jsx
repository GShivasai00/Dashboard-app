import React from 'react'

export function CloudIcon({ size=48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 19a4 4 0 0 1 0-8 6 6 0 1 1 11.6 2" stroke="#2b6cb0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function GaugeIcon({ size=48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12a9 9 0 1 1 18 0" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12l3-3" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function RegistryIcon({ size=48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="7" width="18" height="10" rx="2" stroke="#d97706" strokeWidth="1.6" />
      <path d="M7 11h10" stroke="#d97706" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
