import axios from 'axios';
import { useEffect, useState } from 'react';

const Blog = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPosts((prevPosts) => ({
      ...prevPosts,
      [name]: value
    }))
  }

  const fetchPosts = () => {
    axios.get(`${apiUrl}/routerposts`)
      .then(res => {
        setPosts(res.data)
      })
      .catch(error => {
        console.error('Errore di caricamente dei post')
      })
  }

  const handleDeletePosts = (id) => {
    axios.delete(`${apiUrl}/routerposts/${id}`)
      .then(res => {
        fetchPosts()
      })
      .catch(error => {
        console.error('Errore', error)
      })
  }

  useEffect(() => {
    fetchPosts()
  }, []);



  return (
    <div className="container">
      <h1 className='text-center'>I MIGLIORI POST</h1>
      <div className="card">
        <div className="card-body">
          <div className="card-title mb-4">
            <h2>Aggungi un nuovo post</h2>
          </div>
          <form>
            <div className="mb-3">
              <label htmlFor="name">Titolo post</label>
              <input id='name' type="text" name='name' className='form-control' placeholder='Titolo del post...' onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="image">URL immagine</label>
              <input id='image' type="text" name='image' className='form-control' placeholder='Inserisci URL immagine' onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Descrizione del post</label>
              <textarea className="form-control" id="content" rows="3" placeholder='Descrivi il tuo post...' onChange={handleInputChange}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="tags">Tags post</label>
              <input id='tags' type="text" name='tags' className='form-control' placeholder='Tags del post' onChange={handleInputChange} />
            </div>
            <div className="mb-3 mt-4">
              <button className="btn btn-primary" type='submit'>Aggiungi post</button>
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        {posts.map(post => (
          <div className="card my-5 col-6 mx-4" key={post.id}>
            <img src={post.image} alt="" />
            <div className="card-body">
              <h4 className='card-title'>{post.title}</h4>
              <p className="card-text">{post.content}</p>
              <span className='card-text'>{post.tags}</span>
            </div>
            <div className="btn btn-danger d-block mb-4 mx-3 col-3" onClick={() => handleDeletePosts(post.id)}><i className="fa-solid fa-trash-can"></i> Elimina</div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Blog