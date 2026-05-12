import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {myStructure} from './deskStructure'
import {analyticsPlugin} from './plugins/analyticsPlugin'

export default defineConfig({
  name: 'default',
  title: 'Shamim Plaza',

  projectId: '2za38opa',
  dataset: 'production',

  plugins: [structureTool({structure: myStructure}), visionTool(), analyticsPlugin()],

  schema: {
    types: schemaTypes,
  },
})
