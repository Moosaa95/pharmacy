import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MdOutlineTrackChanges } from "react-icons/md";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const ProfileContent = ({ active }) => {
  const { user, updateProfile, fetchProfile, fetchOrder, changePassword } = useContext(AuthContext);
  const [order, setOrder] = useState([])
  const [users, setUsers] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone: "",
    state: "",
  });
 
  const [selectedImage, setSelectedImage] = useState(null);


  const fetchOrderData = async () => {
    const orders = await fetchOrder(user && user.user_id)
    if (orders){
      setOrder(orders)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await fetchProfile(user.user_id);
        console.log("this is profile", profile, "user", user.user_id);
        if (profile) {
          const {first_name, last_name, middle_name, image, phone, state, email} = profile;
          setUsers({
            first_name: first_name,
            last_name: last_name,
            middle_name: middle_name,
            email: email,
            phone: phone,
            state: state,
            image:image
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
    fetchOrderData()
  }, [fetchProfile, user.user_id]);

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);
  };
  console.log(users, "============HEY=======", user);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", users.first_name);
    formData.append("last_name", users.last_name);
    formData.append("middle_name", users.middle_name);
    formData.append("email", users.email);
    formData.append("phone", users.phone);
    formData.append("state", users.state);
    formData.append("user_id", user && user.user_id);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const updatedProfile = await updateProfile(formData);
      if (updatedProfile) {
        // Handle success
        toast.success(updateProfile.message);
        console.log("Profile updated successfully");
      } else {
        // Handle failure
        toast.error(updateProfile.message);
        console.log("Profile update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                />
              ) : (
                <img
                  src={users && users.image}
                  alt=""
                  className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                />
              )}
              <div>
                {/* Your other components */}
                <label>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                    <AiOutlineCamera size={20} />
                  </div>
                </label>
                {/* Display the selected image */}
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form action="" onSubmit={handleSubmit} aria-required={true}>
              <div className="block w-full pb-3 800px:flex">
                <div className="w-[100%] 800px:w-[50%]">
                  <label htmlFor="" className="block pb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={users.first_name}
                    onChange={(e) =>
                      setUsers({ ...users, first_name: e.target.value })
                    }
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <label htmlFor="" className="block pb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={users.last_name}
                    onChange={(e) =>
                      setUsers({ ...users, last_name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="block w-full pb-3 800px:flex">
                <div className="w-[100%] 800px:w-[50%]">
                  <label htmlFor="" className="block pb-2">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={users.phone}
                    onChange={(e) =>
                      setUsers({ ...users, phone: e.target.value })
                    }
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
                    value={users.email}
                    onChange={(e) =>
                      setUsers({ ...users, email: e.target.value })
                    }
                    disabled
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
              <AllOrder order={order} />
            </div>
          </div>
        </>
      )}
      {active === 3 && (
        <div>
          <ChangePassword changePassword={changePassword} user_id={user && user.user_id} />
        </div>
      )}
      
    </div>
  );
};
const AllOrder = ({order}) => {
  console.log('orrrder', order);
  const orders = [
    {
      id: "2",
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
        const cellClass =
          status === "Delivered" ? "text-green-600" : "text-red-600";
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
  console.log(typeof(order), order, typeof order);

  const rows = order.map((item) => ({
    id: item.id,
    itemsQty: item.cart.length,
    total: item.total_price,
    status: item.status,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
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


const ChangePassword = ({changePassword, user_id}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const {changePassword} = useContext(AuthContext)

  console.log('hey change passsword');

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      // Display an error message or perform any necessary action
      toast.error("New password and confirm password do not match");
      return;
    }
  
  

    try {
      const changePass = await changePassword({old_password:oldPassword, new_password:newPassword, user_id:user_id});
      if (changePass) {
        // Handle success
        toast.success(changePass.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        // Handle failure
        toast.error(changePass.message);
        console.log("password update failed");
      }
    } catch (error) {
      // toast.error(error)
      console.error("Error updating password:", error);
    }


    
  }
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProfileContent;
