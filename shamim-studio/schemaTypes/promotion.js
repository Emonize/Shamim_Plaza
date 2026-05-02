export default {
  name: 'promotion',
  title: 'Promotions & Announcements',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Internal Name',
      type: 'string',
      description: 'Used to identify this promotion in the Studio (e.g. "Summer Retail Sale")',
      validation: Rule => Rule.required()
    },
    {
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      description: 'Turn this on to display it on the live website.',
      initialValue: false
    },

    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'The main text of the announcement/promotion',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Additional text (Used mainly for Featured Sections)'
    },
    {
      name: 'image',
      title: 'Flyer / Image',
      type: 'image',
      description: 'The promotional image (Used only for Featured Sections)',
      options: { hotspot: true }
    },
    {
      name: 'videoFile',
      title: 'Promotional Video (MP4)',
      type: 'file',
      description: 'Upload an MP4 video. If provided, this overrides the image and plays automatically.',
      options: { accept: 'video/*' }
    },
    {
      name: 'callToAction',
      title: 'Button Text',
      type: 'string',
      description: 'E.g., "Learn More" or "View Layouts"'
    },
    {
      name: 'linkUrl',
      title: 'Link URL',
      type: 'url',
      description: 'Where should the button/bar link to? (e.g. /portfolio.html#retail)',
      validation: Rule => Rule.uri({ allowRelative: true })
    }
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive',
      placement: 'placement'
    },
    prepare(selection) {
      const {title, isActive} = selection
      return {
        title: title,
        subtitle: `${isActive ? '🟢 Active' : '⚪ Inactive'}`
      }
    }
  }
}
