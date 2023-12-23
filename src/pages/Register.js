import React, { Component } from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import auth from '../redux/actions/auth'
import {connect} from 'react-redux'
import { Input, Container, Form, Alert, Modal, ModalBody, Spinner } from 'reactstrap'
import logo from '../assets/img/logo.png'
import style from '../assets/css/input.module.css'
import { AiOutlineCopyrightCircle } from "react-icons/ai"

const loginSchema = Yup.object().shape({
    name: Yup.string().required('must be filled')
});

class Login extends Component {

    login = async (values) => {
        await this.props.login(values)
        const {isLogin} = this.props.auth
        if (isLogin) {
            this.props.history.push('/')
        }
    }

    register = async (values) => {
        await this.props.register(values)
        this.login(values)
    }

    state = {
        cost_center: ''
    }

    componentDidUpdate() {
        const {isLogin, isRegister} = this.props.auth
        if (isLogin === true) {
            this.props.history.push('/')
            this.props.resetError()
        } else if (isLogin === false) {
            setTimeout(() => {
                this.props.resetError()
             }, 2000)
        } else if (isRegister === false) {
            setTimeout(() => {
                this.props.resetError()
             }, 2000)
        }
    }

    // componentDidMount(){
    //     if (localStorage.getItem('token')) {
    //         this.props.setToken(localStorage.getItem('token'))
    //         this.props.history.push('/')  
    //     }
    // }

    render() {
        const {isRegister} = this.props.auth
        return (
            <>
            { isRegister === false ? (
                <Alert color="danger" className={style.alertWrong}>
                    nama sudah terdaftar !
                </Alert>
            ): (
                <div></div>
            )}
            <Formik
                initialValues={{ name: ''}}
                validationSchema={loginSchema}
                onSubmit={(values, { resetForm }) => {this.register(values); resetForm({ values: '' })}}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched,}) => (
                <Form className={style.bodyLogin}>
                    <div className={style.imgLogin}>
                        <img src={logo} alt='logo' className={style.imgBig} />
                    </div>
                        <div className={style.form}>
                            <div className={style.textLogin}>Please filled with your name</div>
                            <div>
                                <input 
                                className={style.input1}
                                placeholder='Username'
                                type='name' 
                                onChange= {handleChange('name')}
                                onBlur= {handleBlur('name')}
                                value={values.name}
                                />
                            </div>
                            {errors.name ? (
                                <text className={style.txtError}>{errors.name}</text>
                            ) : null}
                            <button onClick={handleSubmit} className={style.button}>LOGIN</button>
                        </div>
                        <div className='icon mt-4' onClick={() => this.props.history.push('/login')}>Sudah Punya Akun, Login Disini</div>
                </Form>
                )}
                </Formik>
                <Modal isOpen={this.props.auth.isLoading ? true: false} size="sm">
                    <ModalBody>
                        <div>
                            <div className={style.cekUpdate}>
                                <Spinner />
                                <div sucUpdate>Waiting....</div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = {
    login: auth.login,
    register: auth.register,
    setToken: auth.setToken,
    resetError: auth.resetError
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)