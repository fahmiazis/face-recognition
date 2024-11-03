import React, { Component } from 'react'
import WheelComponent from 'react-wheel-of-prizes'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import style from '../assets/css/input.module.css'
// import 'react-wheel-of-prizes/dist/index.css'

export default class Home extends Component {
    state = {
        // segments: [
        //     'Andi Jutawan',
        //     'Andika Pranata',
        //     'Haldian',
        //     'Ainul Yaqin'
        //   ],
        segments: [
            'x50',
            'Try again',
            'x10',
            'Try again',
            'x3',
            'Try again',
            'x2',
            'gacooor x500'
        ],
        segColors: [
            '#EE4040',
            '#F0CF50',
            '#815CD1',
            '#3DA5E0',
            '#34A24F',
            '#F9AA1F',
            '#EC3F3F',
            '#FF9000'
          ],
        winSegments: [
            'better luck next time',
            'won 70',
            'won 10',
        ],
        temp: [],
        confirm: '',
        modalConfirm: false,
        userWin: 0
    }

    componentDidMount () {
        const userWin = isNaN(localStorage.getItem('parwin')) === true ? 0 : parseInt(localStorage.getItem('parwin'))
        this.setState({userWin: userWin})
    }


    onFinished = (val) => {
        const { segments } = this.state
        const userWin = isNaN(localStorage.getItem('parwin')) === true ? 0 : parseInt(localStorage.getItem('parwin'))
        let win = userWin === segments.length - 1 ? 0 : userWin + 1
        localStorage.setItem('parwin', win)
        console.log(userWin)
        console.log(win)
        this.setState({userWin: win, confirm: val})
        this.openModal()
    }

    openModal = () => {
        this.setState({modalConfirm: !this.state.modalConfirm})
    }

    closeModal = () => {
        this.setState({modalConfirm: !this.state.modalConfirm})
        window.location.reload()
    }


  render() {
    const {segments, segColors} = this.state
    const userWin = isNaN(localStorage.getItem('parwin')) === true ? 0 : parseInt(localStorage.getItem('parwin'))

    return (
        <>
        <div className='bodyLogin'>
            <WheelComponent
                segments={segments}
                segColors={segColors}
                // winningSegment='Try again'
                onFinished={(winner) => this.onFinished(winner)}
                primaryColor='black'
                contrastColor='white'
                buttonText='Spin'
                isOnlyOnce={false}
                size={290}
                upDuration={100}
                downDuration={1000}
                fontFamily='Arial'
            />
        </div>
            
            <Modal isOpen={this.state.modalConfirm} toggle={this.closeModal} size='sm'>
                <ModalBody>
                    <div className='colCenter'>
                        <Button color='danger' size='lg' onClick={this.closeModal}>{this.state.confirm}</Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
  }
}
