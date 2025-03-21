import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Header } from '../../components';
import './Products.css';

const Products = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async (isMounted) => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        // Only update state if the component is still mounted
        if (isMounted) {
          setList(response.data.data);
        }
      } else {
        toast.error('Error fetching list');
      }
    } catch (error) {
      toast.error('Error fetching data');
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh the list after removing an item
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error removing item');
    }
  };

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted
    fetchList(isMounted); // Pass isMounted to fetchList

    // Cleanup function to set isMounted to false on unmount
    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Products" />
      <div className="list flex-col">
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className="btn btn-danger btn-sm cursor" style={{ width: "50px" }} onClick={() => removeFood(item._id)}>
                X
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
