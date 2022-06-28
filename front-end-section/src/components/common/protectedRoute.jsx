import React from 'react'

import auth from '../../services/authService'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getUserData())
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }, // pass state obj to next in the redirect
              }}
            />
          )

        return Component ? <Component {...props} /> : render(props)
      }}
    />
  )
}

export default ProtectedRoute
