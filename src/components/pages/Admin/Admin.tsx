import { useEffect } from "react"
import axios from 'axios';

const Admin = () => {


  useEffect(() => {
    axios.get('http://localhost:3030/api/movies/list').then((response) => {
      console.log(response.data);
    })
  }, [])
  return (
    <div>Admin</div>
  )
}

export default Admin