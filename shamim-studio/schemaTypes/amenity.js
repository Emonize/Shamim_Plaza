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
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      description: 'The Lucide icon name (e.g., shield-check, wifi, car)'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    }
  ]
}
