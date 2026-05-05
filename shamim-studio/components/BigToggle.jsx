import {useCallback, createElement} from 'react'
import {set} from 'sanity'

export function BigToggle(props) {
  const {value, onChange} = props
  const isActive = value === true

  const handleToggle = useCallback(() => {
    onChange(set(!isActive))
  }, [isActive, onChange])

  return createElement('div', {
    onClick: handleToggle,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      cursor: 'pointer',
      userSelect: 'none',
      padding: '12px 0',
    }
  }, [
    // Toggle track
    createElement('div', {
      key: 'track',
      style: {
        width: '64px',
        height: '34px',
        borderRadius: '17px',
        background: isActive
          ? 'linear-gradient(135deg, #34c759, #30d158)'
          : 'linear-gradient(135deg, #555, #666)',
        position: 'relative',
        transition: 'background 0.3s ease',
        boxShadow: isActive
          ? '0 2px 8px rgba(52, 199, 89, 0.4)'
          : '0 2px 8px rgba(0,0,0,0.2)',
        flexShrink: 0,
      }
    },
      // Toggle knob
      createElement('div', {
        style: {
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: '3px',
          left: isActive ? '33px' : '3px',
          transition: 'left 0.3s ease',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        }
      })
    ),
    // Label
    createElement('span', {
      key: 'label',
      style: {
        fontSize: '15px',
        fontWeight: 700,
        color: isActive ? '#34c759' : '#999',
        letterSpacing: '0.5px',
        transition: 'color 0.3s ease',
      }
    }, isActive ? '● LIVE ON WEBSITE' : '○ HIDDEN FROM WEBSITE')
  ])
}
