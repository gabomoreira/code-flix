import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';

import { useAppSelector } from '../../app/hooks';
import { selectCategories } from './CategorySlice';

export const CategoryList = () => {
  const categories = useAppSelector(selectCategories);

  const rows: GridRowsProp = categories!.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
  }));

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
  ];

  console.log(rows);

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/category/create"
          style={{ marginBottom: '1rem' }}
        >
          New Category
        </Button>
      </Box>

      {categories && (
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      )}
    </Box>
  );
};
