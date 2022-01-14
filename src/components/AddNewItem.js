import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { setData } from '../utilities/firebase';

const AddNewItem = ({ items }) => {
	return (
		<>
			<TextField id='item-name-input' variant='outlined' />
			<Button
				variant='contained'
				onClick={() =>
					addItem(items, 'testName', 'Alex', 'Notes testing.')
				}
			>
				Add
			</Button>
		</>
	);
};

const addItem = (items, itemName, userName, note) => {
	const newItem = {
		name: itemName,
		quantity: { userName: 1 },
		total_quantity: 1,
		purchased: false,
		notes: note,
	};
	setData(`/items/`, [...items, newItem]);
};

export default AddNewItem;
