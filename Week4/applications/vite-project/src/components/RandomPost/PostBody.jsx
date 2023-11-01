import { useEffect, useState } from 'react';
import axios from 'axios'

const PostBody = ({ id }) => {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');

  useEffect(() => {
      fetch(`https://dummyjson.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setText(data.body);
      }).catch((error) => {
        setText('Something went wrong: ' + error.message);
      });
    
  }, [id]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/posts/${id}`);
        setText2(response.data.body);
      } catch (error) {
        setText2('Something went wrong: ' + error.message);
      }
    };

    fetchData(); 

  }, [id]);


  return <div>
    <div>{text}</div>
    <div style={{marginTop: '20px'}}>{text2}</div>
  </div>;
};

export default PostBody;
