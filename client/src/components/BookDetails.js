import React, { useEffect, useState, useContext } from 'react';
import { Typography, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { BooksStoreContext } from '../context/BooksStoreContext';

const BookDetails = () => {
    const classes = useStyles();
    const { id } = useParams();
    const { getBookById } = useContext(BooksStoreContext);
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            const book = await getBookById(id);
            setBook(book);
        };
        fetchBook();
    }, [id]);

    return !book ? null : (
        <div className={classes.root}>
            <div className={classes.backButton}>
                <Link to="/">
                    <Button variant="outlined" color="primary">
                        Back
                    </Button>
                </Link>
            </div>
            <Typography variant="h4" className={classes.title}>
                {book.title}
            </Typography>
            <Typography variant="body1" className={classes.description}>
                {book.genre}
            </Typography>
            <Typography variant="body2" className={classes.description}>
                {book.description}
            </Typography>
            <Typography variant="h6">Price: ${book.price}</Typography>
            <Typography variant="caption">
                Publication Date: {new Date(book.publicationDate).toLocaleDateString()}
            </Typography>
            <Typography variant="caption">{book.author}</Typography>

            <Button variant="contained" color="primary" className={classes.button}>
                Add to Cart
            </Button>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        gap: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    description: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
    backButton: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
}));

export default BookDetails;
