export default {
  name: 'aboutSettings',
  title: 'About Settings',
  type: 'document',
  fields: [
    {
      name: 'aboutContent',
      title: 'About Content',
      type: 'text',
      rows: 15,
      description: 'Write your full about section here. Use blank lines to create new paragraphs.'
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
