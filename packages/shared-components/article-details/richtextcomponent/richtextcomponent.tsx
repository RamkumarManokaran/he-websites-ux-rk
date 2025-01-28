"use client";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
import { logClickstreamEvent } from "@packages/lib/utlils/clickstream";
export default function Richtextcomponent({ propsdata, key, preview }: any) {
  const data = useContentfulLiveUpdates(propsdata);
  
  function handleRichTextVideoTracking(){
    logClickstreamEvent({
      sectionName: "rich text",
      pageName: localStorage.getItem("gaPageName"),
      eventType: "videoPlayed",

    })
  }
  const customOptions = {
    renderNode: {
      paragraph: (node: any, children: any) => <p>{children}</p>,
      "heading-1": (node: any, children: any) => <h1>{children}</h1>,
      "heading-2": (node: any, children: any) => <h2>{children}</h2>,
      "heading-3": (node: any, children: any) => <h3>{children}</h3>,
      "unordered-list": (node: any, children: any) => <ul>{children}</ul>,
      "ordered-list": (node: any, children: any) => <ol>{children}</ol>,
      "list-item": (node: any, children: any) => <li>{children}</li>,
      video: (node: any) => (
        <video width="100%" style={{ maxWidth: "600px", display: "block", margin: "0 auto" }}
        onClick={() => handleRichTextVideoTracking()}
        >
        <source src={node.data.uri} type="video/mp4" />Your browser does not support the video tag.    
        </video>),
      hyperlink: (node: any, children: any) => (
        <a
          onClick={() => console.log("clicking  clicking  clicking clicking")}
          href={node.data.uri}
        >
          {children}
        </a>
      ),
      
    },
    renderMark: {
      bold: (text: any) => <strong>{text}</strong>,
      italic: (text: any) => <em>{text}</em>,
      underline: (text: any) => <u>{text}</u>,
    },
    renderText: (text: any) => {
      return (
        text
          // Replace `<br>` with a special marker for processing
          .replace(/<br>/g, "__BR__")
          // Split on newlines or markers
          .split(/(\n\n|__BR__)/)
          .flatMap((part: any, index: any) => {
            if (part === "\n\n") {
              // Add an empty line for double newlines
              return [
                <br key={`br-double-${index}`} />,
                <br key={`br-empty-${index}`} />,
              ];
            } else if (part === "__BR__") {
              // Add a single line break for `<br>`
              return <br key={`br-${index}`} />;
            } else {
              // Regular text
              return part;
            }
          })
      );
    },
  };

  return (
    <>
      {preview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: data?.sys?.id,
              fieldId: "paragraphTitle",
              targetSelector: "#artilce-page-paragraph-title",
            },
            {
              entryId: data?.sys?.id,
              fieldId: "media",
              targetSelector: "#artilce-page-media",
            },
            {
              entryId: data?.sys?.id,
              fieldId: "paragraphBodyRichText",
              targetSelector: `#${data?.skipLinkId}`,
            },
            {
              entryId: data?.sys?.id,
              fieldId: "paragraphBodyRichText",
              targetSelector: `#richtextjson${key}`,
            },
          ]}
        />
      )}
      <div id={data?.skipLinkId}>
        {data?.paragraphTitle && (
          <h2 id="artilce-page-paragraph-title">{data?.paragraphTitle}</h2>
        )}
        {data?.media?.url && (
          <Image
            id="artilce-page-media"
            priority={true}
            alt="Image"
            src={data?.media?.url}
            width={700}
            height={700}
            className="mb-4 w-full"
          />
        )}
        <div id={`richtextjson${key}`}>
          {data?.paragraphBodyRichText?.json &&
            documentToReactComponents(
              data?.paragraphBodyRichText.json,
              customOptions
            )}
        </div>
      </div>
    </>
  );
}
