import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TableHeadSelectProps {
  columnIndex: number;
  selectedColumn: Record<string, string | null | undefined>;
  onChange: (columnIndex: number, value: string) => void;
}

const option = "address";

const TableHeadSelect: React.FC<TableHeadSelectProps> = ({
  columnIndex,
  selectedColumn,
  onChange,
}) => {
  const currentSelection = selectedColumn[`column_${columnIndex}`];
  const disabled =
    Object.values(selectedColumn).includes(option) &&
    selectedColumn[`column_${columnIndex}`] !== option;

  return (
    <Select
      value={currentSelection || ""}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
          currentSelection && "text-purple-500"
        )}
      >
        <SelectValue placeholder="skip" />
        <SelectContent>
          <SelectItem value="skip">Skip</SelectItem>
          <SelectItem value={option} disabled={disabled} className="capitalize">
            {option}
          </SelectItem>
        </SelectContent>
      </SelectTrigger>
    </Select>
  );
};

export default TableHeadSelect;
