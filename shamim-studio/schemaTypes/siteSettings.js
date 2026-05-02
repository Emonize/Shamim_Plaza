export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Homepage Hero Title',
      type: 'string'
    },
    {
      name: 'heroSubtitle',
      title: 'Homepage Hero Subtitle',
      type: 'text'
    },
    {
      name: 'aboutVision',
      title: 'About Us - Our Vision',
      type: 'text'
    },
    {
      name: 'aboutFundamentals',
      title: 'About Us - The Fundamentals',
      type: 'text'
    },
    {
      name: 'aboutStructure',
      title: 'About Us - The Structure',
      type: 'text'
    },
    {
      name: 'aboutConclusion',
      title: 'About Us - Conclusion',
      type: 'text'
    },
    {
      name: 'contactAddress',
      title: 'Contact - Address Line 1',
      type: 'string'
    },
    {
      name: 'contactCity',
      title: 'Contact - Address Line 2',
      type: 'string'
    },
    {
      name: 'contactPhone',
      title: 'Contact - Phone',
      type: 'string'
    },
    {
      name: 'contactEmail',
      title: 'Contact - Email',
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
        title: 'Site Settings (Master Control)',
        subtitle: 'Edit global website content here'
      }
    }
  }
}
