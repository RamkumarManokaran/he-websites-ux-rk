import FilterWrapper from "@packages/shared-components/sr-page/filterWrapper/filterWrapper";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <FilterWrapper />
    </>
  );
}
