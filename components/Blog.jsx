import axios from 'axios';
import { useEffect, useState } from 'react';

const Blog = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios.get(`${apiUrl}/routerposts`)
      .then(res => {
        setPosts(res.data)
      })
      .catch(error => {
        console.error('Errore di caricamente dei post')
      })
  }

  useEffect(() => {
    fetchPosts()
  }, []);



  return (
    <div>

    </div>
  )
}

export default Blog