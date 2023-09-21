// ModalComponent.js
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: '#414141',
  border: '2px solid #979797',
  boxShadow: 24,
  p: 4,
  color: 'white',
  fontSize: 18,
};

function CustomModal({ open, handleClose, selectedRowData }) {
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Booking Number : {selectedRowData && selectedRowData.bookingNumber}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      <div>
        <div className='inline-block' style={{ width: '150px' }}>Name:</div>
          <div className='inline-block'>
            {selectedRowData && selectedRowData.name}
          </div>
        </div>
        <div>
        <div className='inline-block' style={{ width: '150px' }}>E-Mail:</div>
          <div className='inline-block'>
            {selectedRowData && selectedRowData.mail}
          </div>
        </div>
        <div>
        <div className='inline-block' style={{ width: '150px' }}>TG Handle:</div>
          <div className='inline-block'>
            {selectedRowData && selectedRowData.tg}
          </div>
        </div>
        <div className="mt-3">
        <div className='inline-block' style={{ width: '150px' }}>ItemName:</div>
          <div className='inline-block'>
            {selectedRowData && selectedRowData.itemName}
          </div>
        </div>
        <div>
          <div className='inline-block' style={{ width: '150px' }}>StoreName:</div>
          <div className='inline-block'>
            {selectedRowData && selectedRowData.storeName}
        </div>
      </div>
      </Typography>
    </Box>
  </Modal>
  );
}

export default CustomModal;
