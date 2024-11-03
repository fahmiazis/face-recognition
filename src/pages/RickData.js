import React, { Component } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Button, Modal, ModalBody, Table } from 'reactstrap'

export default class RickData extends Component {
    
    state = {
        data: [],
        url: 'https://rickandmortyapi.com/api/character',
        modalConfirm: false,
        detail: {},
        openDetail: false
    }
    
    componentDidMount() {
        this.getData()
    }

    getData = async (val) => {
        try {
            const { url } = this.state
            const option = {
                method: 'GET'
            }
            const getUrl = await fetch(url, option)
            if (getUrl) {
                const data = await getUrl.json()
                const dataRes = data.results
                const finalData = []
                for (let i = 0; i < dataRes.length; i++) {
                    const getEpisode = await fetch(dataRes[i].episode[0], { method: 'GET' })
                    if (getEpisode) {
                        const episode = await getEpisode.json()
                        finalData.push({...dataRes[i], firstSeen: episode.name})
                    }
                }
                console.log(data)
                console.log(finalData)
                if (finalData.length > 0) {
                    this.setState({data: finalData})
                } else {
                    this.setState({data: data})
                }
            } else {
                this.setState({confirm: 'failed'})
                this.openConfirm()
            } 
        } catch (error) {
            this.setState({confirm: 'failed'})
            this.openConfirm()
        }
        
    }

    openConfirm = () => {
        this.setState({modalConfirm: !this.state.modalConfirm})
    }

    prosesDetail = async (val) => {
        try {
            let data = val
            const getEpisode = await fetch(val.episode[0], { method: 'GET' })
            if (getEpisode) {
                const dataJson = await getEpisode.json()
                data = {...val, firstSeen: dataJson.name}
            }
            this.setState({detail: data})
            this.modalDetail()
        } catch (error) {
            console.log(error)
            this.setState({confirm: 'failed'})
            this.openConfirm()
        }
    }

    modalDetail = () => {
        this.setState({openDetail: !this.state.openDetail})
    }


  render() {
    const {data, detail} = this.state
    return (
      <>
        <div className='col'>
            <h3 className='col col-center mt-4 mb-4 text-center'>Rick And Morty</h3>
            {/* <Table striped responsive hover dark>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Species</th>
                        <th>Status</th>
                        <th>Opsi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.results !== undefined && data.results.map((item, index)=> {
                        return (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.species}</td>
                            <td>{item.status}</td>
                            <td>
                                <Button color='secondary' onClick={() => this.prosesDetail(item)}>Detail</Button>
                            </td>
                        </tr>
                        )
                    })}
                    
                </tbody>
            </Table> */}
            <div className='row contRick'>
                {data.length > 0 && data.map(item => {
                    return (
                        <div className='row divMod' onClick={() => this.prosesDetail(item)}>
                            <img className='imgRickyRad' src={item.image} alt='' />
                            <div className='col pt-4 pb-2 ml-4'>
                                <div className='mb-4'>
                                    <h3 className='white'>{item.name}</h3>
                                    <div className='white'>
                                        <span className={`dot mr-2 ${item.status === 'Alive' ? "backGreen" : item.status === 'Dead' ? 'backRed' : 'backGrey'}`} />
                                        {item.status} - {item.species}
                                    </div>
                                </div>
                                <div className='mb-4'>
                                    <div className='grey'>Last known location:</div>
                                    <h4 className='white'>{item.location === undefined ? '' : item.location.name}</h4>
                                </div>
                                <div className=''>
                                    <div className='grey'>First seen in:</div>
                                    <h4 className='white'>{item.firstSeen === undefined ? '' : item.firstSeen}</h4>
                                </div>
                            </div>
                    </div>
                    )
                })}
            </div>
            
            
        </div>
        <Modal isOpen={this.state.modalConfirm} toggle={this.openConfirm} size='sm'>
            <ModalBody>
                <div className='text-center mb-4 mt-4'>
                    <div className='mb-4'>
                        <AiFillCloseCircle size={40}/>
                    </div>
                    Failed Get Data
                </div>
            </ModalBody>
        </Modal>
        <Modal isOpen={this.state.openDetail} toggle={this.modalDetail} size='lg' >
            <div className='row padMod'>
                <img className='imgRicky' src={detail.image} alt='' />
                <div className='col pt-4 pb-2 ml-4'>
                    <div className='mb-4'>
                        <h3 className='white'>{detail.name}</h3>
                        <div className='white'>
                            <span className={`dot mr-2 ${detail.status === 'Alive' ? "backGreen" : detail.status === 'Dead' ? 'backRed' : 'backGrey'}`} />
                            {detail.status} - {detail.species}
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className='grey'>Last known location:</div>
                        <h4 className='white'>{detail.location === undefined ? '' : detail.location.name}</h4>
                    </div>
                    <div className=''>
                        <div className='grey'>First seen in:</div>
                        <h4 className='white'>{detail.firstSeen === undefined ? '' : detail.firstSeen}</h4>
                    </div>
                </div>
            </div>
            {/* <div className='col padMod'>
                {detail.episode !== undefined && detail.episode.length > 0 && detail.episode.map(item => {
                    return (
                        <div>{item}</div>
                    )
                })}
            </div> */}
                
        </Modal>
      </>
    )
  }
}
