import { Typography, Divider, Stack, Grid, useMediaQuery } from '@mui/material';
import { itemsByCategory } from '../../../types/item';

type props = {
  shoppingList: itemsByCategory
}

export default function AddedItems({ shoppingList }: props) {
  const matches = useMediaQuery('(max-width:600px)');

  return (
    <Stack margin="auto" p={2} alignItems={"center"}>
      <Divider sx={{ my: 2, width: "95vw" }} />
      <Typography color="primary">
        יש לאסוף מוצרים אלו במחלקות המתאימות
      </Typography>

      <Grid container spacing={3} direction={"row"} justifyContent={"center"} marginTop={5}>
        {Object.keys(shoppingList).map(key => {
          const categoryWithItems = shoppingList[key];

          return (
            <Grid item key={key} xs={6} md={3}>
              <Typography noWrap sx={{fontSize: matches ? 15 : 18}}>
                {categoryWithItems.name} - {categoryWithItems.items.reduce((itemsSum, item) => itemsSum + item.count, 0)} מוצרים
              </Typography>
              <Divider sx={{ my: 2 }} />
              {categoryWithItems.items.map((item) => (
                <Typography key={item.name}>{`${item.name} ${item.count > 1 ? `(${item.count})` : ""}`}</Typography>
              ))}
            </Grid>
          )})}
      </Grid>
    </Stack>
  );
}
