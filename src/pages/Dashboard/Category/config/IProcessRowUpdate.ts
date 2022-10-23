import { GridRowModel, GridValidRowModel } from '@mui/x-data-grid';
import { IContext } from 'context/AuthProvider/type';

interface IProcessRowUpdate {
  newRow: GridRowModel;
  props: {
    rows: readonly GridValidRowModel[];
    setRows: React.Dispatch<React.SetStateAction<readonly GridValidRowModel[]>>;
    auth: IContext;
  };
}
export default IProcessRowUpdate;
