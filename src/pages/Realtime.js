import React, { Component } from "react";
import { db, collection, onSnapshot } from "../helpers/firebase";
import moment from "moment";

class RealTimeItems extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    // Menggunakan onSnapshot untuk mendengarkan perubahan data
    // this.unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
    //   const items = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    //   this.setState({ items });
    // });
    this.unsubscribe = onSnapshot(collection(db, "barcodes"), (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(items)
        this.setState({ items: items });
      });
  }

  componentWillUnmount() {
    // Hentikan pendengaran real-time saat komponen di-unmount
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { items } = this.state;

    return (
      <div>
        <h1>Real-Time Items</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.barcodeData} - {item.tgl_data}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RealTimeItems;