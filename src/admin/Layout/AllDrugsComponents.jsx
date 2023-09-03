import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AiOutlineArrowRight, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import AuthContext from "../../context/AuthContext";

const AllDrugsComponents = () => {
  //   const { orders, isLoading } = useSelector((state) => state.order);
  //   const { seller } = useSelector((state) => state.seller);
  const [isLoading, setIsLoading] = useState(false);
  const [drugs, setDrugs] = useState([]);

  const { fetchDrugs } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allDrugs = await fetchDrugs();
        setDrugs(allDrugs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    
  };

  console.log("order page", drugs);
    const columns = [
        { field: "id", headerName: "Drug Id", minWidth: 150, flex: 0.7 },
        {
          field: "name",
          headerName: "Name",
          minWidth: 180,
          flex: 1.4,
        },
        {
          field: "price",
          headerName: "Price",
          minWidth: 100,
          flex: 0.6,
        },
        {
          field: "Stock",
          headerName: "Stock",
          type: "number",
          minWidth: 80,
          flex: 0.5,
        },
    
        {
          field: "sold",
          headerName: "Sold out",
          type: "number",
          minWidth: 130,
          flex: 0.6,
        },
        {
          field: "Preview",
          flex: 0.8,
          minWidth: 100,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/product/${params.id}`}>
                  <Button>
                    <AiOutlineEye size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
        {
          field: "Delete",
          flex: 0.8,
          minWidth: 120,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Button onClick={() => handleDelete(params.id)}>
                  <AiOutlineDelete size={20} />
                </Button>
              </>
            );
          },
        },
      ];
    
      const row = [];
    
      drugs &&
        drugs.forEach((item) => {
          row.push({
            id: item.id,
            name: item.name,
            price: "N " + item.discount_price,
            Stock: item.stock,
            sold: item?.sold_out,
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

export default AllDrugsComponents;
