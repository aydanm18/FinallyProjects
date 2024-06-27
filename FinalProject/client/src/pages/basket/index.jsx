import React, { useContext, useEffect, useState } from 'react';
import { BasketContext } from '../../context/basketContext';
import { Table } from 'antd';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import './index.scss';
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from "react-icons/md";
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';

const Basket = () => {
  const { basket, setBasket } = useContext(BasketContext);
 

 

 
  const handleIncrement = (record) => {
    const currentBasket = basket.find((x) => x._id === record._id);
    currentBasket.count += 1;
    setBasket([...basket]);
    localStorage.setItem('basket', JSON.stringify([...basket]));
  };

  const handleDecrement = (record) => {
    const currentBasket = basket.find((x) => x._id === record._id);
    if (currentBasket.count > 1) {
      currentBasket.count -= 1;
      setBasket([...basket]);
      localStorage.setItem('basket', JSON.stringify([...basket]));
    }
  };

  const handleRemove = (record) => {
    const updatedBasket = basket.filter((x) => x._id !== record._id);
    setBasket(updatedBasket);
    localStorage.setItem('basket', JSON.stringify(updatedBasket));
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'title',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={record.image} alt="" width={100} style={{ marginRight: 10 }} />
          <span style={{ fontWeight: 800, marginLeft: '20px' }}>{record.title}</span>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price) => {
        const parsedPrice = parseFloat(price);
        return isNaN(parsedPrice) ? 'N/A' : `$${parsedPrice.toFixed(2)}`;
      },
    },
    {
      title: 'Quantity',
      render: (record) => (
        <div className="quantity-control">
          <p>
            <IoIosArrowBack className="arrow-icon" onClick={() => handleDecrement(record)} />
            {record.count}
            <IoIosArrowForward className="arrow-icon" onClick={() => handleIncrement(record)} />
          </p>
        </div>
      ),
    },
    {
      title: 'Total',
      render: (record) => {
        const total = parseFloat(record.price) * record.count;
        return isNaN(total) ? 'N/A' : `$${total.toFixed(2)}`;
      },
    },
    {
      render: (record) => (
        <button className='button' onClick={() => handleRemove(record)}>
          <MdDeleteOutline />
        </button>
      ),
    },
  ];

  const calculateSubtotal = () => {
    return basket.reduce((total, item) => {
      const itemTotal = parseFloat(item.price) * item.count;
      return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
  };

  const calculateOrderTotal = () => {
    return calculateSubtotal();
  };

  return (
 <>

    <div style={{ paddingTop: '50px' }} className="basket">
      <div className="container">
        <div className="row">
          <div className="col-8 col-md-12 col-sm-12 col-xs-12">
            <Table
              style={{ paddingTop: '100px' }}
              columns={columns}
              dataSource={basket}
              rowKey={(record) => record._id}
              pagination={false}
            />
          </div>
          <div style={{ marginTop: '120px', marginBottom: '50px' }} className="col-4 col-md-12 col-sm-12 col-xs-12 box">
            <h3>Cart Total</h3>
            <table>
              <tbody>
                <tr>
                  <td style={{ paddingTop: '30px', paddingRight: '35px' }}>Item(s) Subtotal</td>
                  <td style={{ paddingTop: '30px' }}>${calculateSubtotal().toFixed(2)}</td>
                </tr>
                <tr>
                  <td style={{ paddingTop: '20px', paddingRight: '35px' }}>Order Total</td>
                  <td style={{ paddingTop: '20px' }}>${calculateOrderTotal().toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <button><Link className='links' to={'/checkout'}>PROCEED TO CHECKOUT</Link></button>
          </div>
        </div>
      </div>
    </div>
 
 </>
  );
};

export default Basket;
