import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {
  const useres = useLoaderData();
  const [users, setUser] = useState(useres);
  const handleDeleteUser = _id => {
    console.log('delete ');
    console.log(_id);
    fetch(`http://localhost:5000/users/${_id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert('delete succesusfull');
          const remaing = users.filter(user => user._id !== _id);
          setUser(remaing);
        }
      });
  };

  return (
    <div>
      <h1>All users: {users.length} </h1>
      <div>
        {users.map(user => (
          <div key={user._id}>
            <p>
              ID:{user._id}
              <br />
              name: {user.name}
              <br />
              email: {user.email}
              <br /> <br />
              <Link to={`/update/${user._id}`}>Update</Link>
              <br />
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
