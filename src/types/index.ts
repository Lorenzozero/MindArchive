export interface Paper {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  source: {
    type: 'link' | 'video' | 'file';
    url: string;
  };
}

export interface PaperCardProps {
  paper: Paper;
  onClick: (paper: Paper) => void;
}

export interface EditModalProps {
  paper: Paper | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (paper: Paper) => void;
}

export interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onSelectCategory: (category: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}