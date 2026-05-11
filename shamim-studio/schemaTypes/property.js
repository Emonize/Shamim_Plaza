export default {
  name: 'property',
  title: 'Property Listing',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'Retail Space', value: 'retail' },
          { title: 'Office Space', value: 'office' },
          { title: 'Residential Apartment', value: 'residential' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'furnishedStatus',
      title: 'Furnished Status',
      type: 'string',
      description: 'Only applies if Property Type is Residential Apartment',
      options: {
        list: [
          { title: 'Furnished', value: 'furnished' },
          { title: 'Unfurnished', value: 'unfurnished' }
        ]
      },
      hidden: ({document}) => document?.type !== 'residential'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'E.g., BDT 1.5 Lakh/mo or Upon Request'
    },
    {
      name: 'size',
      title: 'Square Footage',
      type: 'string',
      description: 'E.g., 2,500 sq ft'
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Leased', value: 'leased' },
          { title: 'Reserved', value: 'reserved' }
        ]
      },
      initialValue: 'available',
      validation: Rule => Rule.required()
    },
    {
      name: 'images',
      title: 'Image Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'videoFile',
      title: 'Video Walkthrough (MP4)',
      type: 'file',
      description: 'Upload an MP4 video. If provided, this will play in the property card.',
      options: { accept: 'video/*' }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'airbnbLink',
      title: 'Airbnb Link',
      type: 'url',
      description: 'Optional. If provided, a "Book on Airbnb" button will appear for this property.'
    },
    {
      name: 'floorPlan',
      title: 'Floor Plan Image',
      type: 'image',
      options: { hotspot: true }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'images.0'
    }
  }
}
