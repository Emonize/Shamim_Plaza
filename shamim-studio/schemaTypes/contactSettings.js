export default {
  name: 'contactSettings',
  title: 'Contact Settings',
  type: 'document',
  fields: [
    {
      name: 'contactAddress',
      title: 'Address Line 1',
      type: 'string'
    },
    {
      name: 'contactCity',
      title: 'Address Line 2',
      type: 'string'
    },
    {
      name: 'contactPhone',
      title: 'Phone',
      type: 'string'
    },
    {
      name: 'contactEmail',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'footerText',
      title: 'Footer Copyright Text',
      type: 'string'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Settings',
        subtitle: 'Edit contact info & footer'
      }
    }
  }
}
