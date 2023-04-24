import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './routes/App';
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import store from "./store";
import { Provider } from 'react-redux';
import HabitList, {loader as habitListLoader} from './routes/HabitList';
import AddHabit from './components/AddHabit';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App />}
      errorElement= {<h1>Oops... something went wrong</h1>}
    >
      <Route
        path="habit-list/:user_id/"
        element={<HabitList/>}
        loader = {habitListLoader}
      >
        <Route
          path="edit/"
        />
        <Route
        loader={habitListLoader}
          path="create/"
          element={<AddHabit/>}
        />
      </Route>
      <Route
        path="login/"
      />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

