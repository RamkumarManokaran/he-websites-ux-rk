"use server";

import Header from "./headercomponents";
import {
  graphQlFetchFunction,
  searchAjaxFecthFunction,
} from "@packages/lib/server-actions/server-action";
import { Headerquery } from "@packages/lib/graphQL/graphql-query";
export default async function HeaderWrapper() {
  //header search fetching data is here not required for the current sprint
  // const body = {
  //   affiliateId: 220703,
  //   actionType: "subject",
  //   keyword: "",
  //   qualCode: "",
  //   networkId: 2,
  // };
  // const unibody = {
  //   affiliateId: 220703,
  //   actionType: "institution",
  //   keyword: "",
  //   qualCode: "",
  //   networkId: 2,
  // };
  let course_data = null,
    uni_data = null,
    topnav_data = null;
  // try {
  //   const results = await Promise.allSettled([
  //     searchAjaxFecthFunction(body),
  //     searchAjaxFecthFunction(unibody),
  //     graphQlFetchFunction(Headerquery),
  //   ]);
  //   course_data = results[0].status === "fulfilled" ? results[0].value : null;
  //   uni_data = results[1].status === "fulfilled" ? results[1].value : null;
  //   topnav_data = results[2].status === "fulfilled" ? results[2].value : null;
  // } catch (error) {
  //   console.error("Unexpected error:", error);
  // }
  try {
    const results = await graphQlFetchFunction(Headerquery);
    course_data = null;
    uni_data = null;
    topnav_data = results;
  } catch (error) {
    console.error("Unexpected error:", error);
  }
  return (
    <>
      <Header topnav_data={topnav_data} />
    </>
  );
}
