import React, { isValidElement, Fragment } from "react";
// import store from "../store";
// import { isWithinInterval, isAfter, isBefore, parseISO } from "date-fns";

export const checkLinkIsExternal = (link) => {
  return link.includes("https://") || link.includes("http://");
};

// For unique sub-components (can only render one of type
export function subcomponent(
  children,
  components,
  singular = false,
  props = {}
) {
  if (!Array.isArray(components)) components = [components];
  const results = [];

  const renderSubComponentChildren = (children) => {
    React.Children.forEach(children, (child, index) => {
      if (!isValidElement(child)) return;

      components.forEach((component) => {
        /* We can store the actual name of the component through the displayName or name property of our sub-component */
        const childType = child?.type?.displayName || child?.type?.name;
        const componentType = component?.displayName || component?.name;
        const isComponent = componentType === childType;

        // support sub components inside fragments (recursively loop the same method to add results)
        if (child?.type === Fragment && child?.props?.children) {
          renderSubComponentChildren(child.props.children);
          return;
        }

        if (isComponent) {
          const key =
            child?.key ||
            child?.props?.id ||
            child?.props?.value ||
            child?.props?.name ||
            index;

          results.push(
            React.cloneElement(child, {
              index,
              id: key,
              key,
              ...props,
            })
          );
        }
      });
    });
  };

  renderSubComponentChildren(children);

  if (singular) {
    return results[0];
  }

  /* Then we go through each React children, if one of matches the name of the sub-component we’re looking for we put it in the result array */
  return results;
}

// capitalised the first letter of a sentence, useful for Formik form errors
export const capitalise = (str) =>
  `${str?.charAt(0)?.toUpperCase() ?? ""}${str?.slice(1) ?? ""}`;
export const camelCase = (str) =>
  str?.replace(/-([a-z])/g, (g) => g[1]?.toUpperCase()) ?? "";
export const pascalCase = (str) =>
  str?.replace(/(^\w|-\w)/g, (g) => g?.replace(/-/, "")?.toUpperCase()) ?? "";

// Common methods
export function isValidJSON(string) {
  return /^[\],:{}\s]*$/.test(
    string
      .replace(/\\["\\\/bfnrtu]/g, "@")
      .replace(
        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        "]"
      )
      .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
  );
}

export function isValidStringify(value) {
  return (typeof value === "object" && value !== null) || Array.isArray(value);
}

export function filterInternalChildren(children, components = []) {
  if (!Array.isArray(components)) components = [components];
  const results = [];
  const componentDisplayNames = components.map(
    (component) => component.displayName || component.name
  );
  /* This is the array of result since Article can have multiple times the same sub-component */
  // const type = (component.displayName && [component.displayName]) || (component.name && [component.name]);
  /* We can store the actual name of the component through the displayName or name property of our sub-component */
  React.Children.forEach(children, (child) => {
    const childType =
      child && child.type && (child.type.displayName || child.type.name);
    if (!componentDisplayNames.includes(childType)) {
      results.push(child);
    }
  });

  if (!results.length) return null;

  /* Then we go through each React children, if one of matches the name of the sub-component we’re looking for we put it in the result array */
  return results;
}

export function shuffleArray(array) {
  // immutable
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
