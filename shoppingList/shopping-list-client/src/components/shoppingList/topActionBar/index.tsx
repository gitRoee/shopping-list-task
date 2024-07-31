import { useState } from 'react';
import { Button, Select, MenuItem, TextField, Typography, useMediaQuery, Grid } from '@mui/material';
import { useAtom } from 'jotai';
import { totalItemsAtom } from '../../../atom/items';
import { category } from '../../../types/categories';

type props = {
    addItem(itemName: string, categoryId: string): void;
    categories?: category[];
    saveList(): void;
}

export default function TopActionBar({ addItem, categories, saveList }: props) {
    const [selectedCategoryId, setSelectedCategory] = useState<string>();
    const [newItem, setNewItem] = useState("");
    const [totalItems, setTotalItems] = useAtom(totalItemsAtom);
    const matches = useMediaQuery('(max-width:600px)');

    const onAddItem = () => {
        if (newItem.trim() !== '' && selectedCategoryId) {
            setTotalItems(totalItems + 1);
            addItem(newItem, selectedCategoryId);
            setNewItem("");
        }
    };

    return (
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Typography>מוצרים: סה"כ {totalItems}</Typography>
            </Grid>
            <Grid container justifyContent={"flex-end"} alignItems={"center"} spacing={5}>
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={saveList}>שמור</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={onAddItem}>הוסף</Button>
                </Grid>
                {categories && <Grid item>
                    <Select
                        sx={{ width: matches ? 120 : 150, fontSize: 15 }}
                        value={selectedCategoryId}
                        onChange={(e) => setSelectedCategory(e.target.value)}>
                        {categories.map(category => (
                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                </Grid>}
                <Grid item>
                    <TextField
                        sx={{ width: matches ? 90 : 150, fontSize: matches ? 15 : 20 }}
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="מוצר"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}