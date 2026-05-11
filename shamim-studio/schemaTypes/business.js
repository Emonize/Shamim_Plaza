import {BigToggle} from '../components/BigToggle'

export default {
  name: 'business',
  title: 'Tenants',
  type: 'document',
  fieldsets: [
    {
      name: 'header',
      title: 'Business Information',
      options: { columns: 2 }
    }
  ],
  fields: [
    {
      name: 'name',
      title: 'Business Name',
      type: 'string',
      fieldset: 'header',
      validation: Rule => Rule.required()
    },
    {
      name: 'isActive',
      title: ' ',
      type: 'boolean',
      fieldset: 'header',
      initialValue: true,
      components: {
        input: BigToggle
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'E.g., Finance & Consulting, Creative Agency, etc.',
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Choose a Lucide icon for the business card.',
      options: {
        list: [
          { title: '💼 Briefcase / Business', value: 'briefcase' },
          { title: '🖋️ Pen Tool / Design', value: 'pen-tool' },
          { title: '⚖️ Scale / Law', value: 'scale' },
          { title: '💻 Monitor / Tech', value: 'monitor' },
          { title: '🏢 Building / Corporate', value: 'building-2' },
          { title: '🛒 Storefront / Retail', value: 'store' },
          { title: '☕ Coffee / Cafe', value: 'coffee' },
          { title: '🍽️ Utensils / Restaurant', value: 'utensils' },
          { title: '✂️ Scissors / Salon', value: 'scissors' },
          { title: '🏥 Cross / Clinic', value: 'activity' },
          { title: '💎 Diamond / Luxury', value: 'gem' },
          { title: '🌐 Globe / Web', value: 'globe' },
          { title: '⭐ Star / Featured', value: 'star' },
          { title: '🎓 Graduation Cap / Education', value: 'graduation-cap' },
          { title: '🏋️ Dumbbell / Gym & Fitness', value: 'dumbbell' },
          { title: '🚗 Car / Automotive', value: 'car' },
          { title: '📦 Package / Logistics', value: 'package' },
          { title: '🛒 Shopping Cart / Grocery', value: 'shopping-cart' },
          { title: '🏦 Landmark / Bank & Finance', value: 'landmark' },
          { title: '✈️ Plane / Travel', value: 'plane' },
          { title: '🎨 Palette / Creative', value: 'palette' },
          { title: '📷 Camera / Photography', value: 'camera' }
        ]
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used to sort businesses on the portal page (lower numbers appear first).',
      initialValue: 0
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      isActive: 'isActive'
    },
    prepare(selection) {
      const {title, subtitle, isActive} = selection
      return {
        title: title,
        subtitle: `${isActive !== false ? '🟢 Active' : '⚪ Inactive'} | ${subtitle}`
      }
    }
  }
}
