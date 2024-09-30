const VariantPicker = ({ variants, ...props }: any) => {

  if (variants.length === (0 || 1)) return null;

  return (
    <select
      {...props}
      className="form-select appearance-none w-full relative sm:mb-0 flex-grow pl-3 py-2 bg-white border border-gray-300 focus:border-gray-500 shadow-sm text-gray-500 text-sm focus:outline-none focus:text-gray-900 rounded ring-0 focus:ring-0"
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
