import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableHeadSelect from "./table-head-select";

interface ImportTableProps {
  headers: string[];
  body: string[][];
  selectedColumn: Record<string, string | undefined | null>;
  onTableHeadSelectChange: (columnIndex: number, value: string | null) => void;
}

const ImportTable: React.FC<ImportTableProps> = ({
  headers,
  body,
  selectedColumn,
  onTableHeadSelectChange,
}) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          {headers.map((_item, index) => (
            <TableHead key={index}>
              <TableHeadSelect
                columnIndex={index}
                selectedColumn={selectedColumn}
                onChange={onTableHeadSelectChange}
              />
            </TableHead>
          ))}
        </TableHeader>
        <TableBody>
          {body.map((item, index) => (
            <TableRow key={index}>
              {item.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ImportTable;
