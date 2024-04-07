import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Book from './Book';
import { IconButton, Typography } from '@mui/material';
import Add from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { BooksStoreContext } from '../context/BooksStoreContext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
        gap: theme.spacing(2),
    },
    newBookButton: {
        marginBottom: theme.spacing(2),
    },

    bookItem: {
        marginBottom: theme.spacing(2),
    },
}));

const BookList = () => {
    const classes = useStyles();
    const history = useHistory();
    const { books } = useContext(BooksStoreContext);
    const handleCreateNewBook = () => {
        history.push('/new-book');
    };

    return (
        <div className={classes.root}>
            <div className={classes.newBookButton}>
                <IconButton size="small" variant="contained" color="primary" onClick={handleCreateNewBook}>
                    <Add />
                    <Typography variant="subtitle2">Add New Book</Typography>
                </IconButton>
            </div>
            <Grid container spacing={2}>
                {books.map((book) => (
                    <Grid item xs={6} sm={6} md={4} key={book.id} className={classes.bookItem}>
                        <Book onRemoveButtonClick={() => {}} {...book} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default BookList;
