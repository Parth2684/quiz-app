import { Search } from "lucide-react";
import { InputBar } from "./InputBar";
import { Button } from "./Button";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  searchTerm: string
  onSearchChange: (term: string) => void
}

export const FilterBar = ({ activeFilter, onFilterChange, searchTerm, onSearchChange }: FilterBarProps) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-8">
    <div className="flex-1">
      <InputBar
        placeholder="Search quizzes..."
        icon={<Search className="w-4 h-4" />}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
    <div className="flex gap-2 flex-wrap">
      {['All', 'Popular', 'Recent'].map((filter) => (
        <Button
          key={filter}
          variant={activeFilter === filter ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  </div>
);