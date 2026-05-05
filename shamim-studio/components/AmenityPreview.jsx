import {useClient} from 'sanity'
import {useCallback, useState, useEffect, createElement} from 'react'

export function AmenityPreview(props) {
  const client = useClient({apiVersion: '2024-04-29'})
  const isCurrentlyActive = props.subtitle?.includes('Active') && !props.subtitle?.includes('Inactive')
  const [active, setActive] = useState(isCurrentlyActive)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setActive(isCurrentlyActive)
  }, [isCurrentlyActive])

  const handleToggle = useCallback(async (e) => {
    e.stopPropagation()
    e.preventDefault()

    // Extract document ID from props
    const docId = props.documentId || props._id || props.value?._id
    if (!docId) return

    const cleanId = docId.replace(/^drafts\./, '')
    const newValue = !active

    setActive(newValue)
    setLoading(true)

    try {
      // Patch the published document directly
      await client
        .patch(cleanId)
        .set({isActive: newValue})
        .commit()
      
      // Also patch draft if it exists
      await client
        .patch(`drafts.${cleanId}`)
        .set({isActive: newValue})
        .commit()
        .catch(() => {}) // ignore if no draft exists
    } catch (err) {
      console.error('Toggle failed:', err)
      setActive(!newValue)
    } finally {
      setLoading(false)
    }
  }, [active, client, props.documentId, props._id, props.value])

  const toggleSwitch = createElement('div', {
    onClick: handleToggle,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 12px',
      cursor: loading ? 'wait' : 'pointer',
      opacity: loading ? 0.5 : 1,
      flexShrink: 0,
      userSelect: 'none',
    }
  }, [
    createElement('div', {
      key: 'track',
      style: {
        width: '40px',
        height: '22px',
        borderRadius: '11px',
        background: active ? '#43d675' : '#555',
        position: 'relative',
        transition: 'background 0.2s ease',
      }
    },
      createElement('div', {
        style: {
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: '#fff',
          position: 'absolute',
          top: '2px',
          left: active ? '20px' : '2px',
          transition: 'left 0.2s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }
      })
    ),
    createElement('span', {
      key: 'label',
      style: {
        fontSize: '12px',
        fontWeight: 600,
        color: active ? '#43d675' : '#888',
        letterSpacing: '0.5px',
      }
    }, active ? 'LIVE' : 'OFF')
  ])

  // Render default preview without the subtitle (we replace it with the toggle)
  const defaultPreview = props.renderDefault({
    ...props,
    subtitle: '', // hide the green dot subtitle
  })

  return createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    }
  }, [
    createElement('div', {key: 'preview', style: {flex: 1}}, defaultPreview),
    createElement('div', {key: 'toggle'}, toggleSwitch),
  ])
}
