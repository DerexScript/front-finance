import { Tooltip, Zoom } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import React, { useState } from 'react';

const TooltipCell = ({
  ...props
}: {
  children?: JSX.Element;
  params: GridRenderCellParams;
  collumns: string;
}): JSX.Element => {
  const [openTooltip, setOpenTooltip] = useState<{ id: number; cell: string; state: boolean }[]>([
    { id: 0, cell: '', state: false },
  ]);

  const handleTooltipClose = (id: number): void => {
    setOpenTooltip(openTooltip.filter(x => x.id !== id));
  };

  const handleTooltipIsOpen = (id: number, cell: string): boolean => {
    const isOPen = openTooltip.find(x => x.id === id && x.cell === cell);
    return isOPen !== undefined;
  };

  const handleTooltipOpen = (id: number, cell: string): void => {
    setOpenTooltip([...openTooltip, { id: id, cell: cell, state: true }]);
  };

  return (
    <Tooltip
      open={handleTooltipIsOpen(props.params.row.id, props.collumns)}
      onClose={(): void => {
        handleTooltipClose(props.params.row.id);
      }}
      disableInteractive
      title={props.params.row[props.collumns]}
      arrow
      TransitionComponent={Zoom}
    >
      <span
        onClick={(): void => {
          handleTooltipOpen(props.params.row.id, props.collumns);
        }}
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        {props.params.row[props.collumns]}
      </span>
    </Tooltip>
  );
};

export default TooltipCell;
