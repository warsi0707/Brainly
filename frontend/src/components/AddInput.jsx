import { memo } from "react";

function AddInput({refs,type,placeholder}) {
  return (
    <input
     ref={refs}
      className="p-2 rounded-md"
      type={type}
      placeholder={placeholder}
    />
  );
}
export default memo(AddInput);
