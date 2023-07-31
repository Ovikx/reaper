import { TimeUnit } from "../pages/Overview";

interface Props {
  label: TimeUnit;
  selectedUnit: TimeUnit;
  position?: RowPosition;
  onPress: (unit: TimeUnit) => void;
}

export type RowPosition = "left" | "right";

export function UnitButton(props: Props) {
  return (
    <button
      className={`${
        props.selectedUnit == props.label
          ? "bg-gray-700 text-white"
          : "bg-gray-900 text-gray-400 hover:bg-gray-800"
      } ${
        props.position == "left"
          ? "rounded-l-md"
          : props.position == "right"
          ? "rounded-r-md"
          : ""
      } px-4 flex items-center justify-center`}
      onClick={() => props.onPress(props.label)}
    >
      {props.label}
    </button>
  );
}
