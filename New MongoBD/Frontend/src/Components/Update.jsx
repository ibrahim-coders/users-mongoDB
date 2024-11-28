import { useLoaderData } from 'react-router-dom';

const Update = () => {
  const users = useLoaderData();

  console.log(users);
  const handleUpdate = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const updateusers = { name, email };
    console.log(name, email);
    fetch(`http://localhost:5000/users/${users._id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'aplication/json',
      },
      body: JSON.stringify(updateusers),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };
  return (
    <div>
      <h1>Update users : {users.name}</h1>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" defaultValue={users?.name} id="" />
        <br /> <br />
        <input
          type="email"
          name="email"
          defaultValue={users?.email}
          id=""
        />{' '}
        <br />
        <br />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Update;
