export default {
  name: 'aboutSettings',
  title: 'About Settings',
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
        title: 'About Settings',
        subtitle: 'Edit about content'
      }
    }
  }
}
