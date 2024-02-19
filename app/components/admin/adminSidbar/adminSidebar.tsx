'use client'
import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from 'next-themes';
import "react-pro-sidebar/dist/css/styles.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Link from "next/link";
import Image from "next/image";
import defaultAvatar from "../../../../public/assets/avatar.png"
import { useSelector } from "react-redux";
import { signOut, useSession } from "next-auth/react";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { IoAnalyticsOutline, IoLogOutOutline } from "react-icons/io5";
import { PiUsers } from "react-icons/pi";
import { SlHome } from "react-icons/sl";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdOutlineBallot, MdOutlineCreateNewFolder } from "react-icons/md";
import { RiBarChart2Line, RiImageEditLine } from "react-icons/ri";
import { BsQuestionCircle } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { DefaultProfilePic } from "@/app/utils/defaultProfilePic";


type Props = {
    title:string;
    to?:string;
    icon:any;
    selected:string;
    setSelected: (selected:string) => void;
    isLogOut?:boolean;
}
const Item:FC<Props> = ({ title, to, icon, selected, setSelected, isLogOut }) => {
const { theme } = useTheme();
const { data: session } = useSession();
const [logout, setLogout] = useState(true);
const { isSuccess, refetch } = useLogoutQuery(undefined, {
  skip: logout,
  refetchOnMountOrArgChange: true
});
const handleLogout = async () => {
  setLogout(false);
};
useEffect(() => {
  if(isSuccess) {
    setLogout(true);
    if (session) {
      signOut();
    }
  }
}, [isSuccess]);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: theme==="dark" ? "white": "black",
      }}
      onClick={async () => { 
        setSelected(title)
        if(isLogOut) {
          await handleLogout()  
        }
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      {!isLogOut && <Link href={to || "/"} />}
    </MenuItem>
  );
};

type PropsSidebar= {
  selected:string;
  setSelected: (selected:string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed:boolean) => void;
}
const AdminSidebar:FC<PropsSidebar> = ({selected, setSelected, isCollapsed, setIsCollapsed}) => {
  const {data:session} = useSession();
  const { user } = useSelector((state:any) => state.auth)
  const { theme } = useTheme();
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background:  theme==="dark" ? "#161A30": "#F5F5F5",
          boxShadow: theme==="light" ? "1px 1px 5px #B2BEB5":"none",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: theme ==="dark" ? "#37a39a !important" : "#9F70FD !important",
        },
        "& .pro-menu-item.active": {
          color: theme ==="dark" ? "#37a39a !important" : "#7F27FF !important",
        },
        height: "100vh"
      }}
    >
      <ProSidebar collapsed={isCollapsed} >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
         <div className="hidden sm:block">
         <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: theme=="dark" ? "white": "black" ,
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >

                <IconButton sx={theme==="dark" ? { color: "white", width:"110%", display:"flex", justifyContent:"end" }: { color: "black", width:"100%", display:"flex", justifyContent:"end"}} onClick={() => setIsCollapsed(!isCollapsed)}>
                  <span className="mx-5">E-learning</span> <ArrowBackIosIcon /><ArrowBackIosIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
         </div>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
              <div className="w-[100px] h-[100px] text-[50px]">

                { !(user?.avatar?.url)? 
                                            <DefaultProfilePic name={user?.name as string} /> :
                      <Image src={user?.avatar?.url || session?.user?.image || defaultAvatar} 
                              alt={user.name||"Admin dashboard"} 
                              width={100} height={100}
                              className= {`w-[100px] h-[100px] object-cover rounded-full border-[2px] dark:border-[#37a39a] border-[#9F70FD]`}/>
                }
                                                           </div>

              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  color= {theme=="dark" ? "white": "black"} 
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                 { user.name }
                </Typography>
                <Typography  color={theme=="dark" ? "white-smoke": "#36454F"} >
                { user.role.charAt(0).toUpperCase()+user.role.slice(1) }
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<SlHome size={25}/>}
              selected={selected}
              setSelected={setSelected}
            />

         {
          !isCollapsed && (
            <Typography
            variant="h6"
            color={theme=="dark" ? "white-smoke": "#36454F"}
            sx={{ m: "15px 0 5px 20px",
                  fontSize:"15px",
                  fontWeight:"bold" }}
          >
            Data
          </Typography>
          )
         }
            <Item
              title="Users"
              to="/admin/users"
              icon={<PiUsers size={25}/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<LiaFileInvoiceDollarSolid size={25} />}
              selected={selected}
              setSelected={setSelected}
            />

{!isCollapsed && (            <Typography
              variant="h6"
              color={theme=="dark" ? "white-smoke": "#36454F"}
              sx={{ m: "15px 0 5px 20px",
                    fontSize:"15px",
                    fontWeight:"bold" }}
            >
              Content
            </Typography>)}
            <Item
              title="Create course"
              to="/admin/create-course"
              icon={<MdOutlineCreateNewFolder size={25} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live courses"
              to="/admin/courses"
              icon={<MdOutlineBallot size={25} />}
              selected={selected}
              setSelected={setSelected}
            />
         {!isCollapsed && (   <Typography
              variant="h6"
              color={theme=="dark" ? "white-smoke": "#36454F"}
              sx={{ m: "15px 0 5px 20px",
                    fontSize:"15px",
                    fontWeight:"bold" }}            >
              Customization
            </Typography>)}
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<RiImageEditLine size={25} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<BsQuestionCircle size={25} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<BiCategoryAlt size={25} />}
              selected={selected}
              setSelected={setSelected}
            />
{!isCollapsed && (             <Typography
              variant="h6"
              color={theme=="dark" ? "white-smoke": "#36454F"}
              sx={{ m: "15px 0 5px 20px",
                    fontSize:"15px",
                    fontWeight:"bold" }}            >
              Controllers
            </Typography>)}
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<GrUserAdmin size={25} />}
              selected={selected}
              setSelected={setSelected}
            />
           {!isCollapsed && ( <Typography
              variant="h6"
              color={theme=="dark" ? "white-smoke": "#36454F"}
              sx={{ m: "15px 0 5px 20px",
                    fontSize:"15px",
                    fontWeight:"bold" }}            >
              Analytics
            </Typography>)}
            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={<ShowChartIcon className="w-[25px] h-[25px]" />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<IoAnalyticsOutline size={25} />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders Analytics"
              to="/admin/orders-analytics"
              icon={<RiBarChart2Line size={25} />}
              selected={selected}
              setSelected={setSelected}
            />
                        {!isCollapsed &&  (<Typography
              variant="h6"
              color={theme=="dark" ? "white-smoke": "#36454F"}
              sx={{ m: "15px 0 5px 20px",
                    fontSize:"15px",
                    fontWeight:"bold" }}            >
                      <div className="h-[1px] w-full bg-gray-500 opacity-40"></div>
            </Typography>)}
              <Item
              title="Log Out"
              isLogOut={true}
              icon={<IoLogOutOutline size={25} />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
