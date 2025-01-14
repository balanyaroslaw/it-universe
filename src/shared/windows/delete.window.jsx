import React from 'react'

const DeleteModalWindow = ({ isOpen, onClose }) => {
    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title="Delete"
        className={Classes.DIALOG}
      >
        <div className={Classes.DIALOG_BODY}>
          <p>Are you sure?</p>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button intent="danger" onClick={()=>{}}>Delete</Button>
            <Button intent="primary" onClick={onClose}>Close</Button>
          </div>
        </div>
      </Dialog>
    );
  };
  
  export default DeleteModalWindow;