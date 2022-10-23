import { GridRowModesModel, GridRowsProp } from '@mui/x-data-grid';

interface IEditToolbar {
  props: {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
    setPage: React.Dispatch<React.SetStateAction<number>>;
  };
}

export default IEditToolbar;
