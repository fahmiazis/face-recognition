import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {connect} from "react-redux"
import auth from './redux/actions/auth'

import PrivateRoute from './components/PrivateRoute'

import Login from './pages/Login'

//For Tes
import Tes from './pages/Tes'

class App extends Component {

    componentDidMount(){
        if (localStorage.getItem('token')) {
            this.props.setToken(localStorage.getItem('token'))  
        }
    }

    render() {
        return (
        <BrowserRouter>
            <Switch>
                {/* Tanpa login */}
                <Route path='/login' exact component={Login} /> 
                <Route path='/tes' exact component={Tes} />
                
                {/* Harus login */}
                <PrivateRoute path='/' exact>
                    <Tes />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})
  
const mapDispatchToProps = {
    setToken: auth.setToken
}
  
export default connect(mapStateToProps, mapDispatchToProps)(App)
