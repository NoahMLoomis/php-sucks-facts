import axios from "axios";
import AddForm from "./components/AddForm";

function App() {
  axios.get("/requestsCount").then((d) => console.log(d.data));

  return (
    <div className="App">
      <AddForm />
    </div>
  );
}

export default App;
