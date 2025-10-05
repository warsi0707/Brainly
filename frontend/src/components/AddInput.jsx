import { memo } from "react";

function AddInput({vale, handleChange, label,type,placeholder}) {
  return (
    <div className="flex flex-col gap-2 rounded-md">
      <label htmlFor="">{label}</label>
      <input value={vale} onChange={handleChange} type={type} className="w-full p-2 border outline rounded-md" placeholder={placeholder} />
    </div>
  );
}
export default memo(AddInput);
