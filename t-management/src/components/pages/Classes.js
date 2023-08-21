import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialFormData = {
  categoryName: '',
  categoryCode: '',
};

const rowsPerPageOptions = [5, 10, 25];

const CategoryTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState([
    { categoryName: 'Category 1', categoryCode: 'C1' },
    { categoryName: 'Category 2', categoryCode: 'C2' },
    { categoryName: 'Category 3', categoryCode: 'C3' },
    // Add more categories as needed
  ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleFormOpen = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setFormData(initialFormData);
    setSelectedCategoryId(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedCategoryId !== null) {
      // Update existing category
      const updatedData = data.map((category, index) =>
        index === selectedCategoryId ? formData : category
      );
      setData(updatedData);
    } else {
      // Add new category
      setData((prevData) => [...prevData, formData]);
    }
    handleFormClose();
  };

  const handleEditClick = (index) => {
    setSelectedCategoryId(index);
    setFormData(data[index]);
    handleFormOpen();
  };

  const handleDeleteClick = (index) => {
    const updatedData = data.filter((_, dataIndex) => dataIndex !== index);
    setData(updatedData);
  };



  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };



  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <Button variant="contained" color="primary" onClick={handleFormOpen}>
          Add New Category
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="category table">
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Category Code</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category, index) => (
                <TableRow key={index}>
                  <TableCell>{category.categoryName}</TableCell>
                  <TableCell>{category.categoryCode}</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={() => handleEditClick(index)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => handleDeleteClick(index)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
      <Dialog open={showForm} onClose={handleFormClose}>
        <DialogTitle>
          {selectedCategoryId !== null ? 'Edit' : 'Add'} Category
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Category Name"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Category Code"
              name="categoryCode"
              value={formData.categoryCode}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            {selectedCategoryId !== null ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryTable;
