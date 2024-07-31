import { useState } from "react";
import AddedItems from "./addedItems";
import { itemsByCategory } from "../../types/item";
import { Box, CircularProgress, Snackbar, Typography } from "@mui/material";
import TopActionBar from "./topActionBar";
import { category } from "../../types/categories";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { CATEGORIES_API, SERVER_URL, SHOPPING_LIST_API } from "../../config";
import { getAllCategoriesKey } from "../../consts/queryKeys";

export default function ShoppingList() {
   const [shoppingList, setShoppingList] = useState<itemsByCategory>({});

   const { isError: isGetCategoriesError, isLoading: isLoadingCategories, data } = useQuery<category[]>(({
      queryKey: [getAllCategoriesKey],
      queryFn: async () => {
         const res = await axios.get(`${SERVER_URL}/${CATEGORIES_API}`);

         return res.data;
      }
   }));

   const { mutate, isError: isSaveShoppingListError, isSuccess } = useMutation({
      mutationFn: async () => {
         await axios.post(`${SERVER_URL}/${SHOPPING_LIST_API}`, {
            data: shoppingList
         });
      }
   });

   const saveShoppingList = () => {
      mutate();
   }

   const addItem = (itemName: string, categoryId: string) => {
      setShoppingList(prev => {
         const categoryFromList = prev[categoryId];

         if (!categoryFromList) {
            const category = data!.find(category => category.id === categoryId);

            return category ?
               { ...prev, [categoryId]: { id: category.id, name: category.name, items: [{ name: itemName, count: 1 }] } } : prev
         } else {
            const itemFromCategory = categoryFromList.items.findIndex(item => item.name === itemName);
            const categoryItems = itemFromCategory === -1 ?
               [...categoryFromList.items].concat({ name: itemName, count: 1 }) : [...categoryFromList.items].map(item => item.name === itemName ? { ...item, count: item.count + 1 } : item);

            return {
               ...prev, [categoryId]: { id: categoryFromList.id, name: categoryFromList.name, items: categoryItems }
            }
         }
      });
   }

   if (isGetCategoriesError || isSaveShoppingListError) {
      return <Typography>Server Error</Typography>
   }

   if (isLoadingCategories) {
      return <CircularProgress />
   }

   return (
      <Box sx={{ overflow: "hidden" }}>
         {isSuccess && <Snackbar
            open
            message="נשמר בהצלחה"
         />}
         <TopActionBar addItem={addItem} categories={data} saveList={saveShoppingList} />
         <AddedItems shoppingList={shoppingList} />
      </Box>
   );
}
