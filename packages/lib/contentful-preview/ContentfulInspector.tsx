"use client";
import { useEffect } from "react";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";

interface InspectorField {
  entryId: string | undefined;
  fieldId: string;
  targetSelector: string;
}

export function ContentfulInspectorManager({
  fields,
}: {
  fields: InspectorField[];
}) {
  const inspectorMode = useContentfulInspectorMode();

  useEffect(() => {
    if (!inspectorMode) return;

    

    const cleanup: (() => void)[] = [];

    fields.forEach(({ entryId, fieldId, targetSelector }) => {
      if (!entryId || !fieldId) return;
      const element = document.querySelector(targetSelector);
      if (element) {
        const props: any = inspectorMode({ entryId, fieldId });

        Object.entries(props).forEach(([key, value]) => {
          if (typeof value === "string") {
            element.setAttribute(key, value);
          }
        });

        cleanup.push(() => {
          Object.keys(props).forEach((key) => {
            element.removeAttribute(key);
          });
        });
      }
    });

    return () => {
      cleanup.forEach((fn) => fn());
    };
  }, [fields, inspectorMode]);

  return null;
}
