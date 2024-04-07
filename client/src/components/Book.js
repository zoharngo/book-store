import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import { ConfirmDialogContext } from '../context/ConfirmDialogProvider';
import { BooksStoreContext } from '../context/BooksStoreContext';

const useStyles = makeStyles((theme) => ({
    removeButton: {
        display: 'inline-flex',
        width: '100%',
        justifyContent: 'flex-end',
    },
}));

const Book = ({ id, title, author, description }) => {
    const history = useHistory();
    const classes = useStyles();
    const { handleClickOpen } = useContext(ConfirmDialogContext);
    const { removeBookById } = useContext(BooksStoreContext);

    const handleClick = () => {
        history.push(`book/${id}`);
    };
    const handleRemove = () => {
        console.log('book removed');
        handleClickOpen({
            title: 'Remove Book',
            message: 'Are you sure you want to remove this book?',
            onConfirm: () => {
                removeBookById(id);
            },
        });
    };

    return (
        <Card
            sx={{
                backgroundColor: 'lightblue',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': {
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
            }}
        >
            <CardContent>
                <div className={classes.removeButton}>
                    <Button color="error" size="small" onClick={handleRemove}>
                        Remove
                    </Button>
                </div>
                <Typography color="text.primary" variant="h5" component="div">
                    {title}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary">
                    {author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Button size="medium" onClick={handleClick}>
                    View Details
                </Button>
            </CardContent>
        </Card>
    );
};

export default Book;
