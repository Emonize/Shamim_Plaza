export default {
  name: 'siteVisit',
  title: 'Site Visit',
  type: 'document',
  fields: [
    {
      name: 'visitedAt',
      title: 'Visited At',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'device',
      title: 'Device Type',
      type: 'string',
    },
    {
      name: 'path',
      title: 'Path',
      type: 'string',
    }
  ],
  preview: {
    select: {
      title: 'country',
      subtitle: 'visitedAt'
    }
  }
}
