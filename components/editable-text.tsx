import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EditableText = ({
  text,
  onSave,
}: {
  text: string;
  onSave: (newText: string) => void;
}) => {
  const [inputValue, setInputValue] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const [originalText, setOriginalText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(true);
    setInputValue(text);
    setOriginalText(text);
  };

  const handleSave = () => {
    onSave(inputValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputValue(originalText);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col mt-4">
      {isEditing ? (
        <div className="flex flex-col w-full mt-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mb-3"
          />
          <div className="flex justify-end space-x-2">
            <Button
              onClick={handleCancel}
              variant="outline"
              aria-label="Cancel editing"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} aria-label="Save changes">
              OK
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center bg-gray-100 text-gray-700 p-4 rounded-lg">
          <p className="mr-2 flex-grow">{text}</p>
          <div
            className="border border-gray-700 p-2 rounded-full cursor-pointer"
            onClick={handleEditClick}
            aria-label="Edit text"
          >
            <Pencil className="size-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableText;
