export const homePageComponentQueryFormation = (
  internalName: string | undefined,
  componentQuery: string,
  urlpath: string,
  contentModelName: string,
  iscontentPreview?: boolean
) => {
  const query = `
      {
        contentData: ${contentModelName}(
          limit: 1
          where: {urlSlug: "${urlpath}", website: {websiteName: "${process.env.PROJECT}"}}
            ${iscontentPreview ? `preview : ${iscontentPreview}` : ""}
        ) {
          items {
            bodyContentCollection(
              limit: 1
              where: {internalName: "${internalName}"}
            ) {
              items {
                __typename
                ... on MultipleCardContainer {
                  mediaCardsCollection(limit:10) {
                    items {
                      __typename
                      ${componentQuery}
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

  return query;
};
