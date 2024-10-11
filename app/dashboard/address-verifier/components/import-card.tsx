import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import ImportTable from "./import-table";

interface ImportCardProps {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: string[]) => void;
}

const requiredOptions = ["address"];

interface Selected_Column_State {
  [key: string]: string | undefined | null;
}

const ImportCard: React.FC<ImportCardProps> = ({
  data,
  onCancel,
  onSubmit,
}) => {
  const [selectedColumn, setSelectedColumn] = useState<Selected_Column_State>(
    {}
  );

  const headers = data[0];
  const body = data.slice(1);

  const progress = Object.values(selectedColumn).filter(
    (value) => value
  ).length;

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    const newSelectedColumn = {
      ...selectedColumn,
    };

    for (const key in newSelectedColumn) {
      if (newSelectedColumn[key] == value) {
        newSelectedColumn[key] = null;
      }
    }

    if (value == "skip") {
      value = null;
    }

    newSelectedColumn[`column_${columnIndex}`] = value;

    setSelectedColumn(newSelectedColumn);
  };

  const handleContinue = () => {
    const header = Object.keys(selectedColumn).find(
      (key) => selectedColumn[key] == requiredOptions[0]
    );

    if (!header) return;

    const columnIndex = header.split("_")[1];

    const columnData = body.map((row) => {
      const transformedRow = row.filter(
        (_, index) => index == Number(columnIndex)
      );
      return transformedRow
        .filter((row) => row != null || undefined)
        .join(",")
        .trim();
    });
    console.log(columnData);
  };

  return (
    <div>
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="lg:flex-row lg:items-center gap-y-2 lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Addresses
          </CardTitle>
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleContinue}
              disabled={progress != requiredOptions.length}
            >
              Continue
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumn={selectedColumn}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportCard;
