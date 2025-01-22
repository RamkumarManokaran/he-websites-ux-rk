"use server";
import { NewsletterQuery } from "@packages/lib/graphQL/article-landing";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import Dontmissout from "./dontmissout";
export default async function Dontmissoutwrapper({
  key,
  propsdata,
  preview,
}: any) {
  const data = await graphQlFetchFunction(NewsletterQuery(preview), preview);
  console.log(data, "Aaaaaaaaaaaaaaaaaaa");
  const propsdt = data?.data?.newsLetterData?.items[0];
  console.log(propsdt, "aaaaaaaaaaaaabbbbbb");
  return <Dontmissout key={key} data={propsdt} preview={preview} />;
}
