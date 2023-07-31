import { UnitButton } from "./UnitButton";
import { TimeUnit } from "../pages/Overview";

interface Props {
  selectedUnit: TimeUnit;
  setSelectedUnit: (unit: TimeUnit) => void;
}

export function UnitSelector({ selectedUnit, setSelectedUnit }: Props) {
  return (
    <div className="flex flex-row justify-center items-center bg-gray-900 rounded-lg border-gray-700 border-2">
      <UnitButton
        label="H"
        selectedUnit={selectedUnit}
        position="left"
        onPress={setSelectedUnit}
      />
      <UnitButton
        label="M"
        selectedUnit={selectedUnit}
        onPress={setSelectedUnit}
      />
      <UnitButton
        label="S"
        selectedUnit={selectedUnit}
        position="right"
        onPress={setSelectedUnit}
      />
    </div>
  );
}
