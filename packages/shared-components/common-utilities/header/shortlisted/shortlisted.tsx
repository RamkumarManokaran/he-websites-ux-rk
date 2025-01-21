export default function Shortlisted({ topnav_data }: any) {
  const data =
    topnav_data?.data?.contentData?.items[0]?.shortlistMenu
      ?.navigationElementsCollection?.items[0]?.navChildC1Collection?.items;
  console.log("data shortlist icon", data);
  return (
    <>
      <div className="flex justify-between p-[16px] absolute z-10 top-[56px] right-[-5px] shadow-custom-5 bg-white min-w-[339px] rounded-[4px] md:top-[65px] lg:top-[62px]">
        <ul className="small">
          {data?.map((dt: any, index: any) => (
            <li className="mb-[16px] hover:underline" key={index}>
              <a href={dt?.navUrl}>
                {dt?.navTitle}
                {/* <span className="w-[16px] h-[16px] rounded-[8px] bg-success-400 ml-[8px] text-black font-semibold xs-small px-[5px] py-[2px]">
                 5
               </span> */}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/degrees/comparison"
          className="font-semibold small bg-primary-400 text-white px-[16px] py-[8px] rounded-[18px] self-start hover:bg-primary-500"
        >
          Compare
        </a>
      </div>
    </>
  );
}
