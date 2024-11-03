import React, { Component } from 'react'
import {Button, Modal, Input} from 'reactstrap'

export default class getData extends Component {

    state = {
        arr: [1, 2, 3, 4],
        open: false,
        openErr: false,
        detail: {}
    }

    componentDidMount() {
        const getUser = [
            { name: 'evos ragil', gender: 'idk', age: 12 },
            { name: 'rrq ragil', gender: 'idk', age: 14 },
            { name: 'onic ragil', gender: 'idk', age: 13 }
        ]
        this.setState({arr: getUser})

    }

    inisiasiData = () => {
        const getUser = [
            { name: 'evos ragil', gender: 'idk', age: 12 },
            { name: 'rrq ragil', gender: 'idk', age: 14 },
            { name: 'onic ragil', gender: 'idk', age: 13 }
        ]
        this.setState({arr: getUser})
    }

    openModal = (val) => {
        this.setState({open: !this.state.open})
    }

    setData = (val) => {
        const {arr} = this.state
        const select = arr.find(item => item.name === val.name)
        this.setState({detail: select})
        this.openModal()
    }

    componentDidUpdate() {
        const {detail} = this.state
        if (detail.name === 'evos ragil') {
            console.log('masuk error')
            this.setState({openErr: true, detail: {}, open: false})
        }
    }

  render() {
    const { arr, open, detail } = this.state
    return (
        <>
            <div className='col col-center 100vw mb-4'>Data User</div>
            <Button color='warning' onClick={this.inisiasiData}>Get Data</Button>
            {arr.map(item => {
                return (
                    <div className='mb-4 col col-center'>
                        <div>{item.name === undefined ? 'component did mount ridak bekerja' : item.name}</div>
                        <div>{item.gender === undefined ? 'component did mount ridak bekerja' : item.gender}</div>
                        <div>{item.age === undefined ? 'component did mount ridak bekerja' : item.age}</div>
                        <Button onClick={() => this.setData(item)} color='danger'>Klik Me</Button>
                    </div>
                )
            })}

            <Modal isOpen={open} toggle={() => this.setState({open: false})}>
                <div className='mb-4 col col-center'>
                    <div>{detail.name === undefined ? 'component did mount ridak bekerja' : detail.name}</div>
                    <div>{detail.gender === undefined ? 'component did mount ridak bekerja' : detail.gender}</div>
                    <div>{detail.age === undefined ? 'component did mount ridak bekerja' : detail.age}</div>
                    <Button onClick={this.openModal} color='danger'>Cancel</Button>
                </div>
            </Modal>

            <Modal isOpen={this.state.openErr} toggle={() => this.setState({openErr: false})}>
                <h4>Error Tidak bisa menampilkan Evos Ragil</h4>
            </Modal>
        </>
    )
  }
}
