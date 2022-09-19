import React, { useEffect, useState } from 'react';
import CustomMenu from 'components/Menu';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Api } from 'services/api';
import Loading from 'components/atoms/loading';

const Role = (): JSX.Element => {
  const [columns, setColumns] = useState<GridColDef[]>();
  const [rows, setRows] = useState<GridColDef[]>();
  useEffect((): void => {
    (async (): Promise<void> => {
      const response = await Api.get('role');
      const column = Object.keys(response.data.data[0]).map(col => {
        return { field: col, headerName: col[0].toUpperCase() + col.slice(1), width: col.length * 15 };
      });
      const rows1 = response.data.data.map(
        (row: {
          id: number;
          name: string;
          description: string;
          role: string;
          created_at: string;
          updated_at: string;
        }) => {
          return {
            id: row.id,
            name: row.name,
            description: row.description,
            role: row.role,
            created_at: row.created_at,
            updated_at: row.updated_at,
          };
        },
      );
      setColumns(column);
      setRows(rows1);
      console.log(column);
      console.log(rows1);
    })();
  }, []);

  return (
    <>
      <CustomMenu />
      <div style={{ height: 400, width: '100%' }}>
        {columns?.length && rows?.length ? (
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection />
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default Role;
