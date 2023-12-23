import React, { Component } from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import auth from '../redux/actions/auth'
import {connect} from 'react-redux'
import { Container, Collapse, Nav, Navbar,
    NavbarToggler, NavbarBrand, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, Dropdown,
    DropdownItem, Table, ButtonDropdown, Input, Button, Col,
    Alert, Spinner, Row, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap'
import logo from '../assets/img/logo.png'
import style from '../assets/css/input.module.css'
import { AiOutlineCopyrightCircle } from "react-icons/ai"

const loginSchema = Yup.object().shape({
    username: Yup.string().required('must be filled'),
    password: Yup.string().required('must be filled')
});

class Login extends Component {

    login = async (values) => {
        await this.props.login(values)
        const {isLogin} = this.props.auth
        if (isLogin) {
            this.props.history.push('/')
        }
    }

    state = {
        cost_center: '',
        modalConf: false,
        user: {}
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

    componentDidMount(){
        this.getDataBracket()
    }

    getDataBracket = async () => {
        const token = localStorage.getItem('token')
        await this.props.getBracket(token)
        const {dataBracket, allBracket } = this.props.auth
        console.log(allBracket)
    }

    generateDataBracket = async () => {
        const token = localStorage.getItem('token')
        const data = {
            name: "Fahmi Aziz"
        }
        await this.props.generateBracket(token, data)
        this.getDataBracket()
    }

    deleteDataBracket = async () => {
        const token = localStorage.getItem('token')
        await this.props.deleteBracket(token)
        this.getDataBracket()
    }

    deleteIdBracket = async (val) => {
        const token = localStorage.getItem('token')
        const data = {
            id: val.id
        }
        await this.props.deleteId(token, data)
        this.getDataBracket()
    }

    updateWinBracket = async (val) => {
        const token = localStorage.getItem('token')
        const data = {
            id: val.id,
            order: val.order
        }
        await this.props.winBracket(token, data)
        this.openConf()
        this.getDataBracket()
    }

    openConf = () => {
        const name = localStorage.getItem('fullname')
        name === 'Fahmi Aziz' ? 
        this.setState({modalConf: !this.state.modalConf})
        : console.log('tak boleh')
    }

    render() {
        const {dataBracket, allBracket } = this.props.auth
        const name = localStorage.getItem('fullname')
        // console.log(dataBracket[0] !== undefined && )
        // console.log(dataBracket[0].history.split(';')[dataBracket[0].history.split(';').length - 2].split(',')[1].split(' ')[dataBracket[0].history.split(';')[dataBracket[0].history.split(';').length - 2].split(',')[1].split(' ').length - 1])
        return (
            <> 
                <div className={style.bodyDashboard}>
                    <div className={style.headMaster}>
                        <div className={style.titleDashboard}>Bracket Tournament Battle Lapu-Lapu 1 vs 1</div>
                    </div>
                    <div className={style.secHeadDashboard}>
                        <div>
                        </div>
                    </div>
                    <div className='secEmail pl-4 pr-4'>
                        {name === 'Fahmi Aziz' ? (
                            <div className={style.headEmail}>
                                <Button className='' onClick={this.generateDataBracket} color="warning" size="lg">Generate Bracket</Button>
                                <Button className='ml-2' color="success" size="lg" onClick={this.deleteDataBracket}>Delete Bracket</Button>
                            </div>
                        ) : (
                            <div></div>
                        )}
                        <div className={style.searchEmail}>
                        </div>
                    </div>
                    <Row className='mt-4 mb-2 pl-4 pr-4'>
                        <Col md={3} xl={3} sm={12} className='secBracket'>
                            <div className='titBracket mb-4'>
                                All Participant
                            </div>
                            {allBracket.length > 0 && allBracket.map(item => {
                                return (
                                    <div className='itemBracket mb-2'>{item.name}{item.name === 'Fahmi Aziz' ? ' ~ Panitia' : ''}</div>
                                )
                            })}
                        </Col>
                        <Col md={3} xl={3} sm={12} className='secBracket'>
                            <div className='titBracket mb-4'>
                                Phase 1
                            </div>
                            {dataBracket.length > 0 && dataBracket.map((item, index) => {
                                return (
                                    item.bracket === 1 ? (
                                        index % 2 === 1 ? (
                                            <>
                                                {item.status === 0 ? (
                                                    <div className='finBracket'>
                                                        <div className='itemBracket1 mb-2'>{item.name}{item.status === 0 ? ' (Kalah)' : ''}</div>
                                                        <div className='vsBracket mb-2 white'>VS</div>
                                                        <div className='itemBracket1 mb-4'>
                                                            {dataBracket.find(x => x.id === parseInt(item.history !== undefined && item.history.split(';')[item.history.split(';').length - 2].split(',')[1].split(' ')[item.history.split(';')[item.history.split(';').length - 2].split(',')[1].split(' ').length - 1])).name}{' (Menang)'}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div onClick={() => {this.setState({user: item}); this.openConf()}} className='itemBracket1 mb-1'>{item.name}{item.status === 0 ? ' (Kalah)' : ''}</div>
                                                        {/* <div className='mb-4'>{''}</div>
                                                        <div className='mt-4'>{''}</div> */}
                                                    </>
                                                )}
                                                {item.status !== 0 && (
                                                    <div className='vsBracket mb-1'>VS</div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {item.status === 0 ? (
                                                    <div className='finBracket'>
                                                        <div className='itemBracket1 mb-2'>{item.name}{item.status === 0 ? ' (Kalah)' : ''}</div>
                                                        <div className='vsBracket mb-2 white'>VS</div>
                                                        <div className='itemBracket1 mb-4'>
                                                            {dataBracket.find(x => x.id === parseInt(item.history !== undefined && item.history.split(';')[item.history.split(';').length - 2].split(',')[1].split(' ')[item.history.split(';')[item.history.split(';').length - 2].split(',')[1].split(' ').length - 1])).name}{' (Menang)'}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div onClick={() => {this.setState({user: item}); this.openConf()}} className='itemBracket1 mb-4'>{item.name}{item.status === 0 ? ' (Kalah)' : ''}</div>
                                                    </>
                                                )}
                                            </>
                                        )
                                    ) : null
                                )
                            })}
                        </Col>
                        <Col md={3} xl={3} sm={12} className='secBracket'>
                            <div className='titBracket mb-4'>
                                Phase 2
                            </div>
                            {dataBracket.length > 0 && dataBracket.map((item, index) => {
                                return (
                                    item.bracket === 2 ? (
                                        index % 2  === 1 ? (
                                            <>
                                                {item.status === 0 ? (
                                                    <div className='finBracket'>
                                                        <div className='itemBracket2 mb-2'>{item.name}{item.status === 0 ? ' (Kalah)' : ''}</div>
                                                        <div className='vsBracket mb-2 white'>VS</div>
                                                        <div className='itemBracket2 mb-4'>
                                                            {dataBracket.find(x => x.id === parseInt(item.history !== undefined && item.history.split(';')[item.history.split(';').length - 2].split(',')[1].split(' ')[item.history.split(';')[item.history.split(';').length - 2].split(',')[1].split(' ').length - 1])).name}{' (Menang)'}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div onClick={() => {this.setState({user: item}); this.openConf()}} className='itemBracket2 mb-1'>{item.name}{item.status === 0 ? ' (Kalah)' : ''}</div>
                                                )}
                                                {item.status !== 0 && (
                                                    <div className='vsBracket mb-1'>VS</div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {item.status === 0 ? (
                                                    <div className='finBracket'>
                                                        <div className='itemBracket2 mb-2'>{item.name}{item.status === 0 ? ' (Kalah)' : ''}</div>
                                                        <div className='vsBracket mb-2 white'>VS</div>
                                                        <div className='itemBracket2 mb-4'>
                                                            {dataBracket.find(x => x.id === parseInt(item.history !== undefined && item.history.split(';')[item.history.split(';').length - 2].split(',')[1].split(' ')[item.history.split(';')[item.history.split(';').length - 2].split(',')[1].split(' ').length - 1])).name}{' (Menang)'}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div onClick={() => {this.setState({user: item}); this.openConf()}} className='itemBracket2 mb-4'>{item.name}{item.status === 0 ? ' (Kalah)' : ''}</div>
                                                )}
                                            </>
                                        )
                                    ) : null
                                )
                            })}
                        </Col>
                        <Col md={3} xl={3} sm={12} className='secBracket'>
                            <div className='titBracket mb-4'>
                                Phase 3
                            </div>
                            {dataBracket.length > 0 && dataBracket.map((item, index)=> {
                                return (
                                    item.bracket === 3 ? (
                                        index % 2  === 1 ? (
                                            <>
                                                {item.status === 0 ? (
                                                    <div className='finBracket'>
                                                        <div className='itemBracket3 mb-2'>{item.name}{item.status === 0 ? ' (Kalah)' : ''}</div>
                                                        <div className='vsBracket mb-2 white'>VS</div>
                                                        <div className='itemBracket3 mb-4'>
                                                            {dataBracket.find(x => x.id === parseInt(item.history !== undefined && item.history.split(';')[item.history.split(';').length - 2].split(',')[1].split(' ')[item.history.split(';')[item.history.split(';').length - 2].split(',')[1].split(' ').length - 1])).name}{' (Champion)'}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div onClick={() => {this.setState({user: item}); this.openConf()}} className='itemBracket3 mb-4'>{item.name}{item.status === 0 ? ' (Kalah)' : ''}</div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {item.status === 0 ? (
                                                    <div className='finBracket'>
                                                        <div className='itemBracket3 mb-2'>{item.name}{item.status === 0 ? ' (Kalah)' : ''}</div>
                                                        <div className='vsBracket mb-2 white'>VS</div>
                                                        <div className='itemBracket3 mb-4'>
                                                            {dataBracket.find(x => x.id === parseInt(item.history !== undefined && item.history.split(';')[item.history.split(';').length - 2].split(',')[1].split(' ')[item.history.split(';')[item.history.split(';').length - 2].split(',')[1].split(' ').length - 1])).name}{' (Champion)'}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div onClick={() => {this.setState({user: item}); this.openConf()}} className='itemBracket3 mb-1'>{item.name}{item.status === 0 ? ' (Kalah)' : ''}</div>
                                                )}
                                                {item.status !== 0 && (
                                                    <div className='vsBracket mb-1'>VS</div>
                                                )}
                                            </>
                                        )
                                    ) : null
                                )
                            })}
                        </Col>
                    </Row>
                </div>
                <Modal isOpen={this.props.auth.isLoading} size="sm">
                    <ModalBody>
                        <div>
                            <div className={style.cekUpdate}>
                                <Spinner />
                                <div sucUpdate>Waiting....</div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modalConf} size="md" toggle={this.openConf}>
                    <ModalBody>
                        <div className='mb-4 txtTrans rowCenter widthFull'>
                            <text>{this.state.user.name} Memenangkan Pertandingan ?</text>
                        </div>
                        <div className='rowCenter widthFull'>
                            <Button color='primary' onClick={() => this.updateWinBracket(this.state.user)}>Ya</Button>
                            <Button className='ml-3' onClick={this.openConf}>Tidak</Button>
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
    resetError: auth.resetError,
    getBracket: auth.getBracket,
    generateBracket: auth.generateBracket,
    deleteId: auth.deleteId,
    deleteBracket: auth.deleteBracket,
    winBracket: auth.winBracket
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)