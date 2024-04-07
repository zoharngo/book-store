import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import { StylesProvider } from '@material-ui/core/styles';
import { ConfirmDialogProvider } from './context/ConfirmDialogProvider';
import Progress from './common/Progress';
import { BooksStoreProvider } from './context/BooksStoreContext';

const LazyBookDetails = React.lazy(() => import('./components/BookDetails'));
const LazyNewBook = React.lazy(() => import('./components/NewBook'));
const LazyBookList = React.lazy(() => import('./components/BookList'));

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <ConfirmDialogProvider>
        <StylesProvider>
          <Header />
          <BooksStoreProvider>
            <Router>
              <Suspense fallback={<Progress />}>
                <Switch>
                  <Route path='/book/:id' component={LazyBookDetails} />
                  <Route path='/new-book' component={LazyNewBook} />
                  <Route path='/' component={LazyBookList} />
                </Switch>
              </Suspense>
            </Router>
          </BooksStoreProvider>
        </StylesProvider>
      </ConfirmDialogProvider>
    </React.Fragment>
  );
};

export default App;
