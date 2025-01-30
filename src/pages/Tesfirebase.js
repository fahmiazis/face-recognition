import React, { Component } from 'react';
import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from '../helpers/firebase';
import { Modal, ModalBody, ModalFooter, Table, Button } from 'reactstrap'

class CrudApp extends Component {
  state = {
    items: [],
    name: '',
    nim: '',
    jurusan: '',
    photo: '',
    editId: null,
    addModal: false,
    editModal: false,
  };

  // Fungsi untuk mengambil data dari Firestore
  fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.setState({ items });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Fungsi untuk menambahkan item baru ke Firestore
  handleAddItem = async () => {
    const { name, nim, jurusan, photo } = this.state;
    if (!name || !nim || !jurusan) {
      return alert("Please fill in all fields");
    }
    try {
      await addDoc(collection(db, "items"), { name, nim, jurusan })
      this.setState({ name: '', nim: '', jurusan: '' })
      this.fetchItems()
      this.openModalAdd()
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Fungsi untuk mengupdate item di Firestore
  handleUpdateItem = async () => {
    const { name, nim, editId, jurusan } = this.state;
    if (!name || !nim || !editId || !jurusan) {
      return alert("Please fill in all fields and select an item to edit");
    }
    try {
      await updateDoc(doc(db, "items", editId), { name, nim, jurusan });
      this.setState({ name: '', nim: '', jurusan: '', editId: null });
      this.fetchItems();
      this.openModalEdit()
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Fungsi untuk menghapus item dari Firestore
  handleDeleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "items", id));
      this.fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Fungsi untuk memilih item yang akan diedit
  handleEditItem = (item) => {
    this.setState({ 
      name: item.name, 
      nim: item.nim, 
      editId: item.id, 
      jurusan: item.jurusan 
    });
    this.openModalEdit()
  };

  openModalEdit = () => {
    this.setState({editModal: !this.state.editModal})
  }

  componentDidMount() {
    this.fetchItems();
  }

  openModalAdd = (val) => {
    this.setState({addModal: !this.state.addModal})
  }

  render() {
    const { items, name, nim, editId, jurusan } = this.state;

    return (
      <>
        <div className='pr-2 pl-2'>
          <div className='d-flex justify-content-center mb-2 mt-2'>
            <h1>Data User</h1>
          </div>
          {/* <ul>
            {items.map((item) => (
              <li key={item.id}>
                <span>{item.name} - ${item.nim}</span>
                <button onClick={() => this.handleEditItem(item)}>Edit</button>
                <button onClick={() => this.handleDeleteItem(item.id)}>Delete</button>
              </li>
            ))}
          </ul> */}
          <div className='col-row mb-2'>
            <Button color='primary' onClick={this.openModalAdd}>Add</Button>
            <Button color='warning' className='ml-2'>Upload</Button>
          </div>
          
          <Table responsive striped className='mt-2'>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>NIM</th>
                <th>Jurusan</th>
                <th>Photo</th>
                <th>Opsi</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 && items.map((item, index) => {
                return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.nim}</td>
                  <td>{item.jurusan}</td>
                  <td></td>
                  <td>
                    <Button onClick={() => this.handleEditItem(item)} color='success'>
                      Edit
                    </Button>
                    <Button className='ml-2' onClick={() => this.handleDeleteItem(item.id)} color='danger'>
                      Delete
                    </Button>
                  </td>
                </tr>
                )
              })}
              
            </tbody>
          </Table>
        </div>
        <Modal isOpen={this.state.addModal} toggle={this.openModalAdd}>
            <ModalBody>
              <div className='col-row mb-3'>Add Data User</div>
              <div className='d-flex col-row mb-3'>
                <text className='col-md-3'>Nama :</text>
                :<input
                  className='col-md-9 ml-1'
                  type="text"
                  placeholder="Nama"
                  value={name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
                {/* {editId ? (
                  <button onClick={this.handleUpdateItem}>Update Item</button>
                ) : (
                  <button onClick={this.handleAddItem}>Add Item</button>
                )} */}
              </div>
              <div className='d-flex col-row mb-3'>
                <text className='col-md-3'>NIM :</text>
                : <input
                  className='col-md-9 ml-1'
                  type="text"
                  placeholder="NIM"
                  value={nim}
                  onChange={(e) => this.setState({ nim: e.target.value })}
                />
              </div>
              <div className='d-flex col-row mb-3'>
                <text className='col-md-3'>Jurusan</text>
                : <input
                  className='col-md-9 ml-1'
                  type="text"
                  placeholder="Jurusan"
                  value={jurusan}
                  onChange={(e) => this.setState({ jurusan: e.target.value })}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button outline color='success' onClick={this.handleAddItem}>Add</Button>
              <Button outline color='danger' onClick={this.openModalAdd}>Close</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.editModal} toggle={this.openModalEdit}>
          <ModalBody>
              <div className='col-row mb-3'>Update Data User</div>
              <div className='d-flex col-row mb-3'>
                <text className='col-md-3'>Nama :</text>
                :<input
                  className='col-md-9 ml-1'
                  type="text"
                  placeholder="Nama"
                  value={name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
                {/* {editId ? (
                  <button onClick={this.handleUpdateItem}>Update Item</button>
                ) : (
                  <button onClick={this.handleAddItem}>Add Item</button>
                )} */}
              </div>
              <div className='d-flex col-row mb-3'>
                <text className='col-md-3'>NIM :</text>
                : <input
                  className='col-md-9 ml-1'
                  type="text"
                  placeholder="NIM"
                  value={nim}
                  onChange={(e) => this.setState({ nim: e.target.value })}
                />
              </div>
              <div className='d-flex col-row mb-3'>
                <text className='col-md-3'>Jurusan</text>
                : <input
                  className='col-md-9 ml-1'
                  type="text"
                  placeholder="Jurusan"
                  value={jurusan}
                  onChange={(e) => this.setState({ jurusan: e.target.value })}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button outline color='success' onClick={this.handleUpdateItem}>Edit</Button>
              <Button outline color='danger' onClick={this.openModalEdit}>Close</Button>
            </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default CrudApp;