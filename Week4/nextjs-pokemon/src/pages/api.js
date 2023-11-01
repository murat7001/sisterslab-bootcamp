import axios from 'axios';


const baseURL = 'https://pokeapi.co/api/v2/pokemon';

const axiosInstance = axios.create({
  baseURL,
});

export const fetchCharacters = async () => {
  try {
    const response = await axios.get(`${baseURL}`);
    return response.data.results;
  } catch (error) {
    console.error('Pokemon getirilirken bir hata oluştu:', error);
    throw error;
  }
};


export const fetchCharacter = async (name) => {
  try {
    const response = await axiosInstance.get(`/${name}`);
    return response.data; // 
  } catch (error) {
    console.error('Pokemon detayları getirilirken bir hata oluştu:', error);
    throw error; 
  }
};