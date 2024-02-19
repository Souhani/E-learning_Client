import { Box } from '@mui/material';
import { Modal as MuiModal } from '@mui/material';
import React, { FC } from 'react';

type CustomModelProps = {
  open:boolean;
  setOpen: (open:boolean) => void;
  route: string;
  setRoute: (route:string) => void;
  component:any;
}

const CustomModel: FC<CustomModelProps> = ({ open, setOpen, route, setRoute, component:Component }) => {
  return (
    <Modal
      open={open}
      setOpen={setOpen}
    >
      <Component setRoute={setRoute} setOpen={setOpen}/>
    </Modal>
  )
};

type ModelProps = {
  open:boolean;
  setOpen: (open:boolean) => void;
  children: React.ReactNode;
};

export const Modal:FC<ModelProps> = ({ open, setOpen, children }) => {
  return (
    <MuiModal
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className="text-black dark:text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 800px:w-[450px] w-[90%] bg-white dark:bg-[#0f172a] outline-none rounded-md p-5">
      { children }
    </Box>
  </MuiModal>
  )
}

export default  CustomModel;