import axios from 'axios';

const clientId = import.meta.env.VITE_APP_API_KEY;
axios.defaults.baseURL = 'https://api.unsplash.com/';

export interface Image {
  id: string;
  alt_description: string;
  likes: number;
  user: {
    name: string; 
  };
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
}

export interface FetchImagesResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

const fetchImages = async (
  query: string,
  page: number
): Promise<FetchImagesResponse> => {
  try {
    const response = await axios.get<FetchImagesResponse>('/search/photos', {
      params: {
        client_id: clientId,
        query: query,
        page: page,
        per_page: 12,
      },
    });
// console.log(response);
// console.log(response.data);

    return response.data;
  } catch (error) {
     console.error('Error fetching images:', error);
     throw new Error(error.response?.data?.message || 'Failed to fetch images');
  }
};

export default fetchImages;
