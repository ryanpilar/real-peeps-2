// groupBy is a function that takes an array or object and groups its elements based on a given key.
import groupBy from "lodash/groupBy";

export function getVariations(variations: object | undefined) {
  if (!variations) return {};
  const grouped = groupBy(variations, "attribute.slug");
  console.log("grouped", grouped);

  return grouped;
}
