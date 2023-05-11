import { useArtQuery } from "@framework/category/get-all-categories";
import { CheckBox } from "@components/ui/checkbox"; // custom checkbox component
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";

export const ArtFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router; // Extracting the current pathname and query parameters

  const { data, isLoading } = useArtQuery({
    limit: 10,
  });
  // Extracting the currently selected categories from the query parameters
  // When checked the url looks like this: /search?category=man%2Cwoman%2Ckids
  const selectedCategories = query?.category
    ? (query.category as string).split(",")
    : [];

  // console.log("selectedCategories", selectedCategories);

  const [formState, setFormState] =
    React.useState<string[]>(selectedCategories);

  // Updating the form state whenever the category query parameters change
  React.useEffect(() => {
    setFormState(selectedCategories);
  }, [query?.category]);

  if (isLoading) return <p>Loading...</p>;

  // Function to handle checkbox clicks and update the URL accordingly
  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    // Get the value of the clicked checkbox
    const { value } = e.currentTarget;

    // Determine the new form state based on whether the clicked checkbox was already checked or not
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];

    // Extract the 'category' query parameter from the current query object
    const { category, ...restQuery } = query;

    // Construct a new query object with the updated 'category' parameter
    const newQuery = {
      ...restQuery,
      ...(!!currentFormState.length // Only include the 'category' parameter if the form state is not empty
        ? { category: currentFormState.join(",") } // Join the selected categories into a comma-separated string and include it in the query object
        : {}),
    };

    // Use Next.js router to update the URL with the new query object, with the new formSate
    router.push(
      {
        pathname,
        query: newQuery,
      },
      undefined,
      { scroll: false }
    );
  }

  // Extracting categories from the fetched data
  const items = data?.categories.data;

  // Rendering a list of checkboxes for each category
  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        {t("Art")}
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        {items?.map((item: any) => (
          <CheckBox
            key={item.id}
            label={item.name}
            name={item.name.toLowerCase()}
            checked={formState.includes(item.slug)}
            value={item.slug}
            onChange={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};
