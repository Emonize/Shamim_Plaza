export default {
  name: 'aboutSettings',
  title: 'About Us Settings',
  type: 'document',
  fields: [
    {
      name: 'aboutVision',
      title: 'Our Vision',
      type: 'text'
    },
    {
      name: 'aboutFundamentals',
      title: 'The Fundamentals',
      type: 'text'
    },
    {
      name: 'aboutStructure',
      title: 'The Structure',
      type: 'text'
    },
    {
      name: 'aboutConclusion',
      title: 'Conclusion',
      type: 'text'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'About Us Settings',
        subtitle: 'Edit about us content'
      }
    }
  }
}
