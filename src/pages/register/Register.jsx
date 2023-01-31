import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [city, setCity] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  const [file, setFile] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        " https://api.cloudinary.com/v1_1/anas99/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...credentials,
        img: url,
        city: city,
        country: city,
      };

      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      let bodyContent = JSON.stringify(newUser);
      console.log(bodyContent + "ssssssssss");
      let reqOptions = {
        url: "/auth/register",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };
      let response = await axios.request(reqOptions);
      console.log(response.data);
      navigate('/login')
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {}, [city]);


  return (
    <div className="register">
      <form className="RContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="RInput"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="RInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="RInput"
        />
        <input
          type="number"
          placeholder="Phone"
          id="phone"
          onChange={handleChange}
          className="RInput"
        />

        <select className="RSelect" onChange={(e) => setCity(e.target.value)}>
          <option>Select Your City</option>
          <option value="amman">Amman</option>
          <option value="zarqa">Zarqa</option>
          <option value="irbid">Irbid</option>
          <option value="aqaba">Aqaba</option>
        </select>
        <input
          className="RInput"
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ background: "white" }}
        />

        <p className="Rpargrah">
          {" "}
          Already hava an Acount ?{" "}
          <Link className="Rlink" to="/login">
            Login here
          </Link>
        </p>
        <button onClick={handleClick} className="lButton">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
