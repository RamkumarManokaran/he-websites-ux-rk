"use server";
import { NewsletterQuery } from "@packages/lib/graphQL/article-landing";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import Dontmissout from "./dontmissout";
export default async function Dontmissoutwrapper({
  key,
  propsdata,
  preview,
}: any) {
  const data = await graphQlFetchFunction(
    NewsletterQuery(preview, "Article - Newsletter - Whatuni newsInternal"),
    preview
  );
  const propsdt = data?.data?.newsLetterData?.items[0];
  return <Dontmissout key={key} data={propsdt} preview={preview} />;
}
