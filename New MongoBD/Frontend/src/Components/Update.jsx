import { useLoaderData } from 'react-router-dom';

const Update = () => {
  const updateUser = useLoaderData();
  return (
    <div>
      <h1>Update users : {updateUser.name}</h1>
    </div>
  );
};

export default Update;
