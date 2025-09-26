

function App() {

  return (
    <>
    <div className="container">
      <h1>primero</h1>
      <p>párrafo</p>
      <p>Otro párrafo</p>
      <button type="button" className="btn btn-danger">Primary</button>
      
      <form class="row g-3">
        <div class="col-auto">
          <label for="staticEmail2" class="visually-hidden">Email</label>
          <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="email@example.com"/>
        </div>
        <div class="col-auto">
          <label for="inputPassword2" class="visually-hidden">Password</label>
          <input type="password" class="form-control" id="inputPassword2" placeholder="Password"/>
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-3">Confirm identity</button>
        </div>
      </form>
      </div>
    </>
  )
}

export default App
