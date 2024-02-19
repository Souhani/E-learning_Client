import React, { FC } from 'react';
import { useTheme } from 'next-themes';
import { Box } from '@mui/material';

type Props = {
    children: React.ReactNode;
}

const Table:FC<Props> = ({ children}) => {
    const {theme, setTheme} = useTheme();
  return (
    <Box
         m="30px 0 0 0"
         height= "80vh"
         sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            outline: "none"
          },
          "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
            color: theme === "dark" ? "#fff" : "#000"
          },
          "& .MuiDataGrid-sortIcon": {
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-row": {
            color: theme === "dark" ? "#fff" : "#000",
            borderBottom:
            theme === "dark" ? 
            "1px solid #ffffff30 !important" :
             "1px solid #ccc !important"
          },
          "& .MuiTablePagination-root": {
            color: theme === "dark" ? "#fff" : "#000"
          },
          "& .MuiDataGrid-cell":  {
             borderBottom: "none"
          },
          "& .name-column-cell": {
            color: theme === "dark" ? "#fff" : "#000"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme === "dark" ? "#37a39a" : "#9F70FD",
            borderBottom: "none",
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme === "dark" ? "#1F2A40" : "#f2F0F0",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme === "dark" ? "#37a39a" : "#9F70FD",
            borderTop: "none",
            color: theme === "dark" ? "#fff" : "#000",
          },
          "& .MuiCheckbox-root": {
            color: theme === "dark" ? "#b7ebde !important" : "#000 !important",
          },
          "& .MuiDataGrid-toolbarContainer MuiButton-text": {
            color: "#fff !important"
          }
         }}
         >
           {
             children
           }
      </Box>
  )
}

export default Table