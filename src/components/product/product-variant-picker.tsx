import cn from "classnames"
const VariantPicker = ({ variants, className, ...props }: any) => {

  if (variants.length === (0 || 1)) return null;

  return (
    <select
      {...props}
      className={cn(
        `relative flex-grow form-select appearance-none w-full  
        sm:mb-0 pl-3 py-2 rounded shadow-sm 
        bg-white border border-gray-300 text-gray-500 text-sm ring-0 
        focus:border-gray-500 focus:outline-none focus:text-gray-900 focus:ring-0`,
        className
      )}
    >
      {variants.map(({ external_id, size }: any) => (
        <option key={external_id} value={external_id}>
          {size}
        </option>
      ))}
    </select>
  );
};

export default VariantPicker;
