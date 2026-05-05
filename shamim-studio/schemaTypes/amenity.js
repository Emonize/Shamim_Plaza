export default {
  name: 'amenity',
  title: 'Amenity',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      description: 'Turn this on to display it on the live website.',
      initialValue: true
    },
    {
      name: 'iconName',
      title: 'Icon',
      type: 'string',
      description: 'Choose an icon that represents this amenity.',
      options: {
        list: [
          { title: '🛡️ Security / Shield', value: 'shield-check' },
          { title: '⚡ Power / Electricity', value: 'zap' },
          { title: '📶 WiFi / Internet', value: 'wifi' },
          { title: '🚗 Parking / Car', value: 'car' },
          { title: '🛗 Elevator / Lift', value: 'arrow-up-down' },
          { title: '❄️ Air Conditioning', value: 'wind' },
          { title: '📹 CCTV / Camera', value: 'camera' },
          { title: '🏠 Home / Residential', value: 'home' },
          { title: '🏢 Building / Office', value: 'building-2' },
          { title: '🛒 Store / Retail', value: 'store' },
          { title: '🛏️ Bedroom / Furnished', value: 'bed-double' },
          { title: '💎 Premium / Gem', value: 'gem' },
          { title: '📍 Location / Map Pin', value: 'map-pin' },
          { title: '📞 Phone / Call', value: 'phone' },
          { title: '✉️ Mail / Email', value: 'mail' },
          { title: '🔑 Key / Access', value: 'key-round' },
          { title: '🚿 Water / Droplets', value: 'droplets' },
          { title: '🔥 Fire Safety', value: 'flame' },
          { title: '🧹 Cleaning / Maintenance', value: 'sparkles' },
          { title: '🕐 24/7 Service / Clock', value: 'clock' },
          { title: '📦 Storage / Box', value: 'package' },
          { title: '🌳 Garden / Tree', value: 'tree-pine' },
          { title: '☀️ Sun / Natural Light', value: 'sun' },
          { title: '🔒 Lock / Security', value: 'lock' },
          { title: '✅ Checkmark / General', value: 'check' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive'
    },
    prepare(selection) {
      const {title, isActive} = selection
      return {
        title: title,
        subtitle: `${isActive !== false ? '🟢 Active' : '⚪ Inactive'}`
      }
    }
  }
}
