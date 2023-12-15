import React, { Component } from 'react'
import {Table} from 'reactstrap'
import style from '../assets/css/input.module.css'
import {connect} from 'react-redux'
import moment from 'moment'
import ReactHtmlToExcel from "react-html-table-to-excel"

class tableRincian extends Component {
  render() {
    const {detailKlaim} = this.props.klaim
    return (
        <>
        <Table className={style.tableDashboard} id="table-to-xls">
            <Table bordered responsive hover className={style.tab}>
                <thead>
                    <tr className='tbklaim'>
                        <th>NO</th>
                        <th>COST CENTRE</th>
                        <th>NO COA</th>
                        <th>NAMA COA</th>
                        <th>KETERANGAN TAMBAHAN</th>
                        <th>PERIODE</th>
                        <th>NILAI YANG DIAJUKAN</th>
                        <th>BANK</th>
                        <th>NOMOR REKENING</th>
                        <th>ATAS NAMA</th>
                        <th>MEMILIKI NPWP</th>
                        <th>NAMA SESUAI NPWP</th>
                        <th>NOMOR NPWP</th>
                        <th>PPU</th>
                        <th>PA</th>
                        <th>NOMINAL</th>
                        <th>NILAI YANG DIBAYARKAN</th>
                        <th>TANGGAL TRANSFER</th>
                    </tr>
                </thead>
                <tbody>
                    {detailKlaim.length !== 0 && detailKlaim.map(item => {
                        return (
                            <tr>
                                <th scope="row">{detailKlaim.indexOf(item) + 1}</th>
                                <th>{item.cost_center}</th>
                                <th>{item.no_coa}</th>
                                <th>{item.nama_coa}</th>
                                <th>{item.keterangan}</th>
                                <th>{moment(item.periode_awal).format('DD/MMMM/YYYY')} - {moment(item.periode_akhir).format('DD/MMMM/YYYY')}</th>
                                <th>{item.nilai_ajuan === null || item.nilai_ajuan === undefined ? 0 : item.nilai_ajuan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</th>
                                <th>{item.bank_tujuan}</th>
                                <th>{item.norek_ajuan}</th>
                                <th>{item.nama_tujuan}</th>
                                <th>{item.status_npwp === 0 ? '' : 'Ya'}</th>
                                <th>{item.status_npwp === 0 ? '' : item.nama_npwp}</th>
                                <th>{item.status_npwp === 0 ? '' : item.no_npwp}</th>
                                <th>{item.ppu}</th>
                                <th>{item.pa}</th>
                                <th>{item.nominal}</th>
                                <th>{item.nilai_bayar}</th>
                                <th>{item.tanggal_transfer}</th>
                            </tr>
                            )
                        })}
                </tbody>
            </Table>
        </Table>
        <ReactHtmlToExcel
            id="test-table-xls-button"
            className="btn btn-success mr-2 warning"
            table="table-to-xls"
            filename={`Data Klaim ${moment().format('DD MMMM YYYY')}`}
            sheet="Dokumentasi"
            buttonText="Download"
        />
        </>
    )
  }
}

const mapStateToProps = state => ({
    approve: state.approve,
    depo: state.depo,
    user: state.user,
    notif: state.notif,
    klaim: state.klaim,
    menu: state.menu,
    reason: state.reason
})

export default connect(mapStateToProps)(tableRincian)
