import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import '../styles/Admin.css'

function Table() {
  const [data, setData] = useState([]);

  const columns = [
    { title: "Full name", field: "full_name" },
    { title: "Age", field: "age" },
    { title: "Phone", field: "phone" },
    { title: "Email", field: "email" },
    { title: "IsValid", field: "isValid" },
  ];

  //validate a particiapnt acount
  const validatePArticipant = (id) => {
    const token = sessionStorage.getItem("data");
    axios
      .patch("http://localhost:5000/participant/valid/" + id,
        {
          isValid: true,
        },
        {
          headers: {
            "auth-token": `${token}`,
          },
        }
      )
      .then((response) =>{
        toast.configure();
        toast.success("Acount successfully updated");
        window.location.reload();
      })
      .catch((error) => {
        toast.configure();
        toast.error("something went wrong");
      });
  };

  //featch alla participant
  useEffect(() => {
    const token = sessionStorage.getItem("data");
    fetch("http://localhost:5000/participant", {
      headers: {
        "auth-token": `${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp);
      });
  }, []);

  return (
    <div className="App">
      <MaterialTable
        title="Parcticipants Table"
        columns={columns}
        data={data}
        options={{ 
            pageSize: 5,
            pageSizeOptions: [5,10],
          }}
        actions={[
          {
            icon: "edit",
            tooltip: "Validate User",
            onClick: (event, rowData) => {
              validatePArticipant(rowData._id);
            },
          },
        ]}
      />
    </div>
  );
}

export default Table;
