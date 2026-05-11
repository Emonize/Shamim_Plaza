export default {
  name: 'homepageSettings',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string'
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text'
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'The large building image displayed on the home page.'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Settings',
        subtitle: 'Edit homepage hero content'
      }
    }
  }
}
