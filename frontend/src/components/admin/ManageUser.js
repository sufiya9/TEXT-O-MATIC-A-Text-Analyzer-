import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const ManageUser = () => {
  const [userList, setUserList] = useState([]);

  // this will fetch user data from backend
  const getDataFromBackend = async () => {
    const response = await fetch("http://localhost:5000/user/getall");
    // jo bhi data ayega backend se wo data name k variable m store ho jayega
    const data = await response.json();
    console.log(data);
    setUserList(data);
  };
  // effect hooks
  useEffect(() => {
    getDataFromBackend();
  }, []);

  const deleteUser = async (id) => {
    console.log(id);
    const response = await fetch("http://localhost:5000/user/delete/" + id, {
      method: "DELETE",
    });
    if (response.status === 200) {
      console.log("user deleted");
      toast.success("User Deleted 😎");
      getDataFromBackend();
    }
  };

  const displayUsers = () => {
    return (
      <table className="table bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    deleteUser(user._id);
                  }}
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>

              <td>
                <button className="btn btn-outline-primary">
                  <i class="fas fa-pen"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1 className="text-center">User Manager</h1>
      {displayUsers()}
    </div>
  );
};
export default ManageUser;
