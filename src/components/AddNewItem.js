import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const AddNewItem = () => {
return (
<>
    <TextField id="item-name-input" variant="outlined" />
    <Button variant="contained">Add</Button>
    </>
);

}

export default AddNewItem;

