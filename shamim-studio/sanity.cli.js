import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '2za38opa',
    dataset: 'production'
  },
  studioHost: 'shamimplaza',
  deployment: {
    appId: 'gemn800y7nfmep2vqxblamlu',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
