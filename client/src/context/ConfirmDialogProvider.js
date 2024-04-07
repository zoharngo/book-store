import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useRef } from 'react';

export const ConfirmDialogContext = React.createContext({
    open: false,
    handleClickOpen: () => {},
    handleClose: () => {},
});

export const ConfirmDialogProvider = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [displayMessage, setDisplayMessage] = React.useState('');
    const [header, setHeader] = React.useState('');
    const onAgree = useRef(() => {});

    const handleClickOpen = ({ title, message, onConfirm }) => {
        setDisplayMessage(message);
        setHeader(title);
        onAgree.current = onConfirm;
        setOpen(true);
    };

    const onAgreeClick = () => {
        onAgree.current();
        handleClose();
    };

    const handleClose = () => {
        setDisplayMessage('');
        setHeader('');
        onAgree.current = () => {};
        setOpen(false);
    };

    return (
        <ConfirmDialogContext.Provider
            value={{
                open,
                handleClickOpen,
                handleClose,
            }}
        >
            {children}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{displayMessage}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onAgreeClick} color="primary" autoFocus>
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>
        </ConfirmDialogContext.Provider>
    );
};
