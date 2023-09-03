
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AiOutlineArrowRight } from "react-icons/ai";
import AuthContext from "../../context/AuthContext";



const AllOrderComponents = () => {
//   const { orders, isLoading } = useSelector((state) => state.order);
//   const { seller } = useSelector((state) => state.seller);
const [isLoading, setIsLoading] = useState(false)
const [orders, setOrders] = useState([])

  const {fetchOrders} = useContext(AuthContext)

  useEffect(() => {
      const fetchData = async () => {
          try{ 
              const allOrders = await fetchOrders()
              setOrders(allOrders)
            }
            catch(err) {
                console.log(err);
            }
    }
    fetchData()
  }, []);

  console.log('order page', orders); 


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => {
        const status = params.value; // Get the value of the "status" field directly from params
        const cellClass =
          status === "Delivered" ? "text-green-600" : "text-red-600";
        return <p className={cellClass}>{status}</p>;
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item.id,
        itemsQty: item.cart.length,
        total: "N " + item.total_price,
        status: item.status,
      });
    });

  return (
    <>
    
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
    </>
  );
};

export default AllOrderComponents