import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import {Button} from "@mui/material"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { MdOutlineTrackChanges } from "react-icons/md";


const ProfileContent = ({ active }) => {
  // const {user} = useSelector((state) => state.user)
  const user = {
    name: "musa",
    email: "abzmossa@gmail.com",
    phone: "213231212",
    zipCode: 4444,
    address: "plot 2",
  };
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phone);
  const [zipCode, setZipCode] = useState(user && user.zipCode);
  const [address, setAddress] = useState(user && user.address);
  console.log(user, "hey");

  const handleSubmit = () => {};
  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1688233599454-55e2ea1d8bfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2132&q=80"
                alt=""
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera size={20} />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form action="" onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block  pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label htmlFor="" className="block pb-2">
                    FullName
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label htmlFor="" className="block pb-2">
                    Email Address
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block  pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label htmlFor="" className="block pb-2">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label htmlFor="" className="block pb-2">
                    Zip code
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block  pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label htmlFor="" className="block pb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label htmlFor="" className="block pb-2">
                    Zip code
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
              <input
                type="submit"
                className={`w-[250px] h-[40px] border-[#3a244b] text-[#3a244b] border text-center rounded-[3px] mt-8 cursor-pointer`}
                value="Update"
              />
            </form>
          </div>
        </>
      )}
      {active === 2 && (
        <>
          <div>
            <div>
              <AllOrder />
            </div>
          </div>
        </>
      )}
      {active === 3 && (
        <>
          <div>
            <div>
              <AllRefundOrders />
            </div>
          </div>
        </>
      )}
      {active === 5 && (
        <>
          <div>
            <div>
              <TrackOrders />
            </div>
          </div>
        </>
      )}
      {active === 6 && (
        <>
          <div>
            <div>
              <PaymentMethod />
            </div>
          </div>
        </>
      )}
      {active === 7 && (
        <>
          <div>
            <div>
              <Address />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
const AllOrder = () => {
  const orders = [
    {
      id: "1",
      orderItems: [
        {
          name: "paracetamol",
        },
      ],
      itemsOty: 2,
      totalPrice: 120,
      orderStatus: "Delivered",
    },
    // Add more orders here if needed
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => {
        const status = params.value; // Get the value of the "status" field directly from params
        const cellClass = status === "Delivered" ? "text-green-600" : "text-red-600";
        return <p className={cellClass}>{status}</p>;
      },
    },
    {
      field: "itemsQty",
      headerName: "Item Qty",
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
      valueFormatter: (params) => `Ngr${params.value}`, // Format the "total" column value
    },
    {
      field: "",
      headerName: "",
      type: "number",
      minWidth: 130,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const rows = orders.map((item) => ({
    id: item.id,
    itemsQty: item.orderItems.length,
    total: item.totalPrice,
    status: item.orderStatus,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const refundOrders = [
    {
      id: "1",
      orderItems: [
        {
          name: "paracetamol",
        },
      ],
      itemsQty: 2,
      totalPrice: 120,
      refundStatus: "Refunded",
    },
    // Add more refund orders here if needed
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },
    {
      field: "refundStatus",
      headerName: "Refund Status",
      minWidth: 150,
      flex: 0.8,
      renderCell: (params) => {
        const status = params.value;
        const cellClass = status === "Refunded" ? "text-green-600" : "text-red-600";
        return <p className={cellClass}>{status}</p>;
      },
    },
    {
      field: "itemsQty",
      headerName: "Item Qty",
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
      valueFormatter: (params) => `Ngr${params.value}`, // Format the "total" column value
    },
    {
      field: "",
      headerName: "",
      type: "number",
      minWidth: 130,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/refundOrder/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const rows = refundOrders.map((item) => ({
    id: item.id,
    itemsQty: item.orderItems.length,
    total: item.totalPrice,
    refundStatus: item.refundStatus,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        slots={{
          toolbar: GridToolbar
        }}
        // components={{
        //   Toolbar: GridToolbar,
        // }}
      />
    </div>
  );
};

const TrackOrders = () => {
  const trackOrders = [
    {
      id: "1",
      orderItems: [
        {
          name: "paracetamol",
        },
      ],
      itemsQty: 2,
      totalPrice: 120,
      trackStatus: "process",
    },
    // Add more refund orders here if needed
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },
    {
      field: "trackStatus",
      headerName: "Track Status",
      minWidth: 150,
      flex: 0.8,
      renderCell: (params) => {
        const status = params.value;
        const cellClass = status === "Refunded" ? "text-green-600" : "text-red-600";
        return <p className={cellClass}>{status}</p>;
      },
    },
    {
      field: "itemsQty",
      headerName: "Item Qty",
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
      valueFormatter: (params) => `Ngr${params.value}`, // Format the "total" column value
    },
    {
      field: "",
      headerName: "",
      type: "number",
      minWidth: 130,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/trackOrder/${params.id}`}>
            <Button>
              <MdOutlineTrackChanges size={20} />
            </Button>
          </Link>
        );
      },
    },
  ];

  const rows = trackOrders.map((item) => ({
    id: item.id,
    itemsQty: item.orderItems.length,
    total: item.totalPrice,
    trackStatus: item.trackStatus,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        slots={{
          toolbar: GridToolbar
        }}
        // components={{
        //   Toolbar: GridToolbar,
        // }}
      />
    </div>
  );
};

// const TrackOrders = () => {
//   const [orderId, setOrderId] = useState('');
//   const [orderStatus, setOrderStatus] = useState(null);
//   const [orderDetails, setOrderDetails] = useState(null);

//   const handleTrackOrder = (event) => {
//     event.preventDefault();
//     // Here, you can add your logic to fetch the order details and status based on the orderId
//     // For example, you can use an API call to get the order details and status.

//     // Dummy data for demonstration purposes
//     const trackedOrder = {
//       id: "1",
//       orderItems: [
//         {
//           name: "paracetamol",
//         },
//         // Add more items if needed
//       ],
//       itemsQty: 2,
//       totalPrice: 120,
//       orderStatus: "Delivered",
//       // Add more order details as needed
//     };

//     if (trackedOrder) {
//       setOrderStatus(trackedOrder.orderStatus);
//       setOrderDetails(trackedOrder);
//     } else {
//       setOrderStatus('Not Found');
//       setOrderDetails(null);
//     }
//   };

//   return (
//     <div>
//       <h2>Track Orders</h2>
//       <form onSubmit={handleTrackOrder}>
//         <input
//           type="text"
//           value={orderId}
//           onChange={(e) => setOrderId(e.target.value)}
//           placeholder="Enter Order ID"
//         />
//         <button type="submit">Track</button>
//       </form>

//       {orderStatus && (
//         <div>
//           <h3>Order Status: {orderStatus}</h3>
//           {orderDetails && (
//             <div>
//               <p>Order ID: {orderDetails.id}</p>
//               <p>Total Items: {orderDetails.itemsQty}</p>
//               <p>Total Price: Ngr{orderDetails.totalPrice}</p>
//               {/* Add more order details here as needed */}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">

          Payment Method
        </h1>
        <div className={`${styles.button} rounded-md`}>
          <span className="text-[#fff]">Add New</span>

        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img src="" alt="visa image" />
          <h5 className="pl-5 font-[600]">
            Musa
          </h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 *** ****</h6>
          <h5 className="pl-6">09/24</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>

      </div>
    </div>
  )
}

const Address = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">

          Address
        </h1>
        <div className={`${styles.button} rounded-md`}>
          <span className="text-[#fff]">Add New</span>

        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600]">
            Default
          </h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1233 plot weewwerwef sdsddsdsd </h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6>(213) 860 97</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>

      </div>
    </div>
  )
}
export default ProfileContent;
