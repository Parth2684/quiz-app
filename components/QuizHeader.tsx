import { Card } from "./Card";
import { InputBar } from "./InputBar";

interface QuizHeaderProps {
    name: string;
    description?: string;
    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
}


export const QuizHeader = ({ name, description, onNameChange, onDescriptionChange }: QuizHeaderProps) => {
    return (
      <Card className="mb-5 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
        <div className="space-y-6">
          <InputBar
            placeholder="Quiz Name..."
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="text-lg font-bold"
          />
          <InputBar
            placeholder="Quiz Description (optional)..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="text-sm"
          />
        </div>
      </Card>
    );
};