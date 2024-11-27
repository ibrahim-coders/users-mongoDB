import './App.css';

function App() {
  const handleAddUser = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    console.log({ name, email });
    const user = { name, email };
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  return (
    <>
      <h1>Simple CROD</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" />
        <br />
        <br />
        <input type="email" name="email" /> <br /> <br />
        <input type="submit" />
      </form>
    </>
  );
}

export default App;
