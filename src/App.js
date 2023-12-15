import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {connect} from "react-redux"
import auth from './redux/actions/auth'

import PrivateRoute from './components/PrivateRoute'

import Login from './pages/Login'
import Home from './pages/Home'
import Notif from './pages/Master/Notif'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

import VerifVendor from './pages/VerifVendor'

//Klaim
import NavKlaim from './pages/Klaim/NavKlaim'
import Klaim from './pages/Klaim/Klaim'
import CartKlaim from './pages/Klaim/CartKlaim'
import VerifFinanceKlaim from './pages/Klaim/VerifFinanceKlaim'
import RevisiKlaim from './pages/Klaim/RevisiKlaim'
import ReportKlaim from './pages/Klaim/ReportKlaim'
import AjuanBayarKlaim from './pages/Klaim/AjuanBayarKlaim'
import PayKlaim from './pages/Klaim/PayKlaim'
import NavAjuan from './pages/Klaim/NavAjuan'
import KlaimFaa from './components/Klaim/FAA'
import KlaimFpd from './components/Klaim/FPD'
import FormList from './components/Klaim/FormList'

//Operasional
import NavOps from './pages/Ops/NavOps'
import Operasional from './pages/Ops/Operasional'
import CartOps from './pages/Ops/CartOps'
import VerifFinanceTax from './pages/Ops/VerifFinanceTax'
import AjuanBayarOps from './pages/Ops/AjuanBayarOps'
import ReportOps from './pages/Ops/ReportOps'
import RevisiOps from './pages/Ops/RevisiOps'
import OpsFaa from './components/Ops/FAA'
import OpsFpd from './components/Ops/FPD'
import ReportTaxOps from './pages/Ops/ReportTax'
import NavAjuanOps from './pages/Ops/NavAjuanOps'
import PayOps from './pages/Ops/PayOps'
import FormListOps from './components/Ops/FormList'
import JurnalAreaOps from './components/Ops/JurnalArea'

//Ikk
import NavIkk from './pages/IKK/NavIkk'
import Ikk from './pages/IKK/Ikk'
import CartIkk from './pages/IKK/CartIkk'
import RevisiIkk from './pages/IKK/RevisiIkk'
import VerifFinanceIkk from './pages/IKK/VerifFinanceIkk'
import AjuanBayarIkk from './pages/IKK/AjuanBayarIkk'
import ReportIkk from './pages/IKK/ReportIkk'
import IkkFaa from './components/Ikk/formikk'
import IkkFpd from './components/Ikk/FPD'
import ReportTaxIkk from './pages/IKK/ReportTax'
import NavAjuanIkk from './pages/IKK/NavAjuanIkk'
import PayIkk from './pages/IKK/PayIkk'
import FormListIkk from './components/Ikk/FormList'
import JurnalAreaIkk from './components/Ikk/JurnalArea'

//Kasbon
import NavKasbon from './pages/Kasbon/NavKasbon'
import Kasbon from './pages/Kasbon/Kasbon'
import RealisasiKasbon from './pages/Kasbon/RealisasiKasbon'
import RevisiKasbon from './pages/Kasbon/RevisiKasbon'
import VerifTaxKasbon from './pages/Kasbon/VerifTaxKasbon'
import VerifRealKasbon from './pages/Kasbon/VerifRealKasbon'

//Master
import MasterDepo from './pages/Master/MasterDepo'
import MasterScylla from './pages/Master/MasterScylla'
import MasterDokumen from './pages/Master/MasterDokumen'
import MasterCoa from './pages/Master/MasterCoa'
import MasterBank from './pages/Master/MasterBank'
import MasterUser from './pages/Master/MasterUser'
import Approve from './pages/Master/Approve'
import MasterMenu from './pages/Master/MasterMenu'
import MasterReason from './pages/Master/MasterReason'
import MasterRekening from './pages/Master/MasterRekening'
import MasterTarif from './pages/Master/MasterTarif'
import MasterPagu from './pages/Master/MasterPagu'
import MasterEmail from './pages/Master/MasterEmail'
import MasterVendor from './pages/Master/MasterVendor'
import MasterKliring from './pages/Master/MasterKliring'
import MasterFaktur from './pages/Master/MasterFaktur'
import MasterKpp from './pages/Master/MasterKpp'
import MasterFinance from './pages/Master/MasterFinance'
import MasterPicklaim from './pages/Master/MasterPicklaim'
import MasterSpvklaim from './pages/Master/MasterSpvklaim'
import MasterRole from './pages/Master/MasterRole'
import MasterGlikk from './pages/Master/MasterGlikk'

import Reservoir from './pages/Master/Reservoir'
import MasterTaxcode from './pages/Master/MasterTaxcode'

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
                <Route path='/login' exact component={Login} />
                <Route path='/tes' exact component={Tes} />
                <PrivateRoute path='/' exact>
                    <Home />
                </PrivateRoute>
                <PrivateRoute path='/dashboard'>
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute path='/profile'>
                    <Profile />
                </PrivateRoute>
                <PrivateRoute path='/notif'>
                    <Notif />
                </PrivateRoute>

                {/* Klaim */}
                <PrivateRoute path='/navklaim'>
                    <NavKlaim />
                </PrivateRoute>
                <PrivateRoute path='/klaim'>
                    <Klaim />
                </PrivateRoute>
                <PrivateRoute path='/cartklaim'>
                    <CartKlaim />
                </PrivateRoute>
                <PrivateRoute path='/veriffinklm'>
                    <VerifFinanceKlaim />
                </PrivateRoute>
                <PrivateRoute path='/revklm'>
                    <RevisiKlaim />
                </PrivateRoute>
                <PrivateRoute path='/repklm'>
                    <ReportKlaim />
                </PrivateRoute>
                <PrivateRoute path='/listklm'>
                    <AjuanBayarKlaim />
                </PrivateRoute>
                <PrivateRoute path='/klmfaa'>
                    <KlaimFaa/>
                </PrivateRoute>
                <PrivateRoute path='/klmfpd'>
                    <KlaimFpd/>
                </PrivateRoute>
                <PrivateRoute path='/navlistklm'>
                    <NavAjuan/>
                </PrivateRoute>
                <PrivateRoute path='/payklm'>
                    <PayKlaim/>
                </PrivateRoute>
                <PrivateRoute path='/formlistklm'>
                    <FormList/>
                </PrivateRoute>

                {/* Operasional */}
                <PrivateRoute path='/navops'>
                    <NavOps />
                </PrivateRoute>
                <PrivateRoute path='/ops'>
                    <Operasional />
                </PrivateRoute>
                <PrivateRoute path='/cartops'>
                    <CartOps />
                </PrivateRoute>
                <PrivateRoute path='/veriffintax'>
                    <VerifFinanceTax />
                </PrivateRoute>
                <PrivateRoute path='/listops'>
                    <AjuanBayarOps />
                </PrivateRoute>
                <PrivateRoute path='/revops'>
                    <RevisiOps/>
                </PrivateRoute>
                <PrivateRoute path='/repops'>
                    <ReportOps/>
                </PrivateRoute>
                <PrivateRoute path='/reptaxops'>
                    <ReportTaxOps/>
                </PrivateRoute>
                <PrivateRoute path='/opsfaa'>
                    <OpsFaa/>
                </PrivateRoute>
                <PrivateRoute path='/opsfpd'>
                    <OpsFpd/>
                </PrivateRoute>
                <PrivateRoute path='/navlistops'>
                    <NavAjuanOps/>
                </PrivateRoute>
                <PrivateRoute path='/payops'>
                    <PayOps />
                </PrivateRoute>
                <PrivateRoute path='/formlistops'>
                    <FormListOps/>
                </PrivateRoute>
                <PrivateRoute path='/jurnalops'>
                    <JurnalAreaOps/>
                </PrivateRoute>

                {/* Kasbon */}
                <PrivateRoute path='/navkasbon'>
                    <NavKasbon />
                </PrivateRoute>
                <PrivateRoute path='/kasbon'>
                    <Kasbon />
                </PrivateRoute>
                <PrivateRoute path='/realkasbon'>
                    <RealisasiKasbon />
                </PrivateRoute>
                <PrivateRoute path='/revkasbon'>
                    <RevisiOps />
                </PrivateRoute>
                <PrivateRoute path='/verifkasbon'>
                    <VerifTaxKasbon />
                </PrivateRoute>
                <PrivateRoute path='/verifrealkasbon'>
                    <VerifRealKasbon />
                </PrivateRoute>

                {/* IKK */}
                <PrivateRoute path='/navikk'>
                    <NavIkk />
                </PrivateRoute>
                <PrivateRoute path='/ikk'>
                    <Ikk />
                </PrivateRoute>
                <PrivateRoute path='/cartikk'>
                    <CartIkk />
                </PrivateRoute>
                <PrivateRoute path='/revikk'>
                    <RevisiIkk />
                </PrivateRoute>
                <PrivateRoute path='/veriffinikk'>
                    <VerifFinanceIkk />
                </PrivateRoute>
                <PrivateRoute path='/listikk'>
                    <AjuanBayarIkk />
                </PrivateRoute>
                <PrivateRoute path='/repikk'>
                    <ReportIkk/>
                </PrivateRoute>
                <PrivateRoute path='/reptaxikk'>
                    <ReportTaxIkk/>
                </PrivateRoute>
                <PrivateRoute path='/ikkfaa'>
                    <IkkFaa/>
                </PrivateRoute>
                <PrivateRoute path='/ikkfpd'>
                    <IkkFpd/>
                </PrivateRoute>
                <PrivateRoute path='/navlistikk'>
                    <NavAjuanIkk/>
                </PrivateRoute>
                <PrivateRoute path='/payikk'>
                    <PayIkk />
                </PrivateRoute>
                <PrivateRoute path='/formlistikk'>
                    <FormListIkk/>
                </PrivateRoute>
                <PrivateRoute path='/jurnalikk'>
                    <JurnalAreaIkk/>
                </PrivateRoute>
                <PrivateRoute path='/verifven'>
                    <VerifVendor />
                </PrivateRoute>

                {/* Master */}
                <PrivateRoute path='/approval'>
                    <Approve />
                </PrivateRoute>
                <PrivateRoute path='/depo'>
                    <MasterDepo />
                </PrivateRoute>
                <PrivateRoute path='/user'>
                    <MasterUser />
                </PrivateRoute>
                <PrivateRoute path='/coa'>
                    <MasterCoa />
                </PrivateRoute>
                <PrivateRoute path='/bank'>
                    <MasterBank />
                </PrivateRoute>
                <PrivateRoute path='/menu'>
                    <MasterMenu />
                </PrivateRoute>
                <PrivateRoute path='/reason'>
                    <MasterReason />
                </PrivateRoute>
                <PrivateRoute path='/dokumen'>
                    <MasterDokumen />
                </PrivateRoute>
                <PrivateRoute path='/rekening'>
                    <MasterRekening />
                </PrivateRoute>
                <PrivateRoute path='/tarif'>
                    <MasterTarif />
                </PrivateRoute>
                <PrivateRoute path='/pagu'>
                    <MasterPagu />
                </PrivateRoute>
                <PrivateRoute path='/email'>
                    <MasterEmail />
                </PrivateRoute>
                <PrivateRoute path='/vendor'>
                    <MasterVendor />
                </PrivateRoute>
                <PrivateRoute path='/faktur'>
                    <MasterFaktur />
                </PrivateRoute>
                <PrivateRoute path='/kpp'>
                    <MasterKpp />
                </PrivateRoute>
                <PrivateRoute path='/kliring'>
                    <MasterKliring />
                </PrivateRoute>
                <PrivateRoute path='/finance'>
                    <MasterFinance />
                </PrivateRoute>
                <PrivateRoute path='/picklaim'>
                    <MasterPicklaim />
                </PrivateRoute>
                <PrivateRoute path='/spvklaim'>
                    <MasterSpvklaim />
                </PrivateRoute>
                <PrivateRoute path='/role'>
                    <MasterRole />
                </PrivateRoute>
                <PrivateRoute path='/reservoir'>
                    <Reservoir />
                </PrivateRoute>
                <PrivateRoute path='/taxcode'>
                    <MasterTaxcode />
                </PrivateRoute>
                <PrivateRoute path='/glikk'>
                    <MasterGlikk />
                </PrivateRoute>
                <PrivateRoute path='/scylla'>
                    <MasterScylla />
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
