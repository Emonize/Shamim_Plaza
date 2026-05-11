export const myStructure = (S) =>
  S.list()
    .title('Shamim Plaza Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Homepage Settings')
                .child(S.document().schemaType('homepageSettings').documentId('f31314de-af0c-4673-a79c-f6b4764043b9')),
              S.listItem()
                .title('About Settings')
                .child(S.document().schemaType('aboutSettings').documentId('c1f96aa0-3630-4f06-8672-c5d9d0ebffc1')),
              S.listItem()
                .title('Contact Settings')
                .child(S.document().schemaType('contactSettings').documentId('25f11050-d7f8-4af9-aea6-e67fe9b7bb98')),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(listItem => 
        !['homepageSettings', 'aboutSettings', 'contactSettings'].includes(listItem.getId())
      )
    ])
