import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Select, InputLabel, Box } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { BooksStoreContext } from '../context/BooksStoreContext';
import { useHistory } from 'react-router-dom';

const NewBook = () => {
    const classes = useStyles();
    const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { addBook } = useContext(BooksStoreContext);

    const onSubmit = async (data, e) => {
        // Handle form submission logic here
        console.log(data, e);
        await addBook(data);
        history.push('/');
    };

    return (
        <div className={classes.root}>
            <div className={classes.backButton}>
                <Link to="/">
                    <Button variant="outlined" color="primary">
                        Back
                    </Button>
                </Link>
            </div>
            <h1 className={classes.header}>New Book</h1>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth required>
                    <TextField
                        id="title"
                        name="title"
                        size="small"
                        label="Title"
                        {...register('title', { required: true })}
                        error={errors.title}
                        helperText={errors.title && 'Title is required'}
                    />
                </FormControl>
                <FormControl fullWidth required>
                    <TextField
                        id="description"
                        name="description"
                        size="small"
                        multiline
                        rows={4}
                        label="Description"
                        {...register('description', { required: true })}
                        error={errors.description}
                        helperText={errors.description && 'Description is required'}
                    />
                </FormControl>

                <FormControl fullWidth required>
                    <TextField
                        id="author"
                        name="author"
                        size="small"
                        label="Author"
                        {...register('author', { required: true })}
                        error={errors.author}
                        helperText={errors.author && 'Author is required'}
                    />
                </FormControl>

                <FormControl fullWidth required>
                    <TextField
                        id="publicationDate"
                        name="publicationDate"
                        type="date"
                        size="small"
                        defaultValue={new Date().toISOString().slice(0, 10)}
                        label="Publication Date"
                        {...register('publicationDate', { required: true })}
                        error={errors.publicationDate}
                        helperText={errors.publicationDate && 'Publication Date is required'}
                    />
                </FormControl>

                <Box width="100%" display="flex" p={1}>
                    <FormControl fullWidth required>
                        <InputLabel id="genre">Genre</InputLabel>
                        <Select
                            native
                            label="Genre"
                            inputProps={{
                                name: 'genre',
                                id: 'genre',
                            }}
                            labelId="genre"
                            size="small"
                            {...register('genre', { required: true })}
                        >
                            <option value="Science fiction">Science fiction</option>
                            <option value="Satire">Satire</option>
                            <option value="Drama">Drama</option>
                            <option value="Action">Action</option>
                            <option value="Romance">Romance</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Horror">Horror</option>
                        </Select>
                    </FormControl>
                </Box>
                <FormControl fullWidth required>
                    <TextField
                        id="price"
                        name="price"
                        type="number"
                        size="small"
                        label="Price"
                        {...register('price', { required: true })}
                        error={errors.price}
                        helperText={errors.price && 'Price is required'}
                    />
                </FormControl>

                <FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </FormControl>
            </form>
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
    header: {
        marginBottom: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        padding: theme.spacing(2),
        gap: theme.spacing(2),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '45ch',
        },
    },
    backButton: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
}));

export default NewBook;
