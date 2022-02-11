import { ImSpinner3 } from "react-icons/im";

export const Loading = () => {
  return (
    <div className="w-[40vw] pt-10 pl-20 h-28">
      <ImSpinner3 className="animate-spin text-2xl" />
    </div>
  );
};
