import React, { Component } from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import auth from '../redux/actions/auth'
import {connect} from 'react-redux'
import { Input, Container, Form, Alert, Modal, ModalBody, Spinner } from 'reactstrap'
import logo from '../assets/img/logo.png'
import style from '../assets/css/input.module.css'
import { AiFillCloseCircle } from "react-icons/ai"

const loginSchema = Yup.object().shape({
    username: Yup.string().required('must be filled'),
    password: Yup.string().required('must be filled')
});

class Login extends Component {

    state = {
        cost_center: '',
        data: [
            { username: 'rick', password: 'rick1234' },
            { username: 'morty', password: 'morty1234' },
            { username: 'king', password: 'king1234' },
            { username: 'queen', password: 'queen1234' },
            { username: 'galang', password: 'galang1234' },
            { username: 'adit', password: 'adit1234' },
            { username: 'dirge', password: 'dirge1234' }
        ],
        failLogin: false
    }
    // login = async (values) => {
    //     await this.props.login(values)
    //     const {isLogin} = this.props.auth
    //     if (isLogin) {
    //         this.props.history.push('/')
    //     }
    // }

    login = (val) => {
        const { data } = this.state
        const cek = data.find(item => item.username === val.username && item.password === val.password)
        if (cek !== undefined) {
            this.props.history.push('/fetch')
        } else {
            this.modalFailed()
        }
    }

    componentDidUpdate() {
        const {isLogin} = this.props.auth
        if (isLogin === true) {
            this.props.history.push('/')
            this.props.resetError()
        } else if (isLogin === false) {
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

    modalFailed = () => {
        this.setState({failLogin: !this.state.failLogin})
    }

    render() {
        const {isLogin} = this.props.auth
        return (
            <>
            { isLogin === false ? (
                <Alert color="danger" className={style.alertWrong}>
                    name invalid !
                </Alert>
            ): (
                <div></div>
            )}
            <Formik
                initialValues={{ username: '', password: ''}}
                validationSchema={loginSchema}
                onSubmit={(values, { resetForm }) => {this.login(values); resetForm({ values: '' })}}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched,}) => (
                <Form className={style.bodyLogin}>
                    <div className={style.imgLogin}>
                        {/* <img src={logo} alt='logo' className={style.imgBig} /> */}
                    </div>
                        <div className={style.form}>
                            <div className={style.textLogin}>Please login with your account</div>
                            <div>
                                <input 
                                className={style.input1}
                                placeholder='Username'
                                type='name' 
                                onChange= {handleChange('username')}
                                onBlur= {handleBlur('username')}
                                value={values.username}
                                />
                            </div>
                            {errors.username ? (
                                <text className={style.txtError}>{errors.username}</text>
                            ) : null}
                            <div>
                                <input 
                                className={style.input2}
                                placeholder='Password'
                                type='password' 
                                onChange= {handleChange('password')}
                                onBlur= {handleBlur('password')}
                                value={values.password}
                                />
                            </div>
                            {errors.password ? (
                                <text className={style.txtError}>{errors.password}</text>
                            ) : null}
                            <button onClick={handleSubmit} className={style.button}>LOGIN</button>
                        </div>
                        {/* <div className='icon mt-4' onClick={() => this.props.history.push('/register')}>Belum Punya Akun, Daftar Disini</div> */}
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
                <Modal isOpen={this.state.failLogin} toggle={this.modalFailed}>
                    <ModalBody>
                        <div className='text-center mb-4 mt-4 red'>
                            <div className='mb-4'>
                                <AiFillCloseCircle size={60} className='red' />
                            </div>
                            Username or Password Invalid
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
    setToken: auth.setToken,
    resetError: auth.resetError
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)