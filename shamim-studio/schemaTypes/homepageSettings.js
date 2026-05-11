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
    },
    {
      name: 'bookStayLink',
      title: 'Book a Stay URL',
      type: 'url',
      description: 'Optional. The link for the "Book a Stay" button on the hero section (e.g. Airbnb profile).'
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
