import axios from "axios";

const clientId = import.meta.env.VITE_APP_API_KEY;
axios.defaults.baseURL = "https://api.unsplash.com/";


const fetchImages = async (query: string, page: number) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get("/search/photos", {
      params: {
        client_id: clientId,
        query: query,
        page: page,
        per_page: 12,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchImages;


// interface UnsplashImage {
//   id: string;
//   alt_description: string;
//   urls: {
//     regular: string;
//     small: string;
//     thumb: string;
//   };
//   user: {
//     name: string;
//   };
//   likes: number;
// }

// interface FetchImagesResponse {
//   results: UnsplashImage[];
//   total: number;
//   total_pages: number;
// }

// const fetchImages = async (query: string, page: number): Promise<FetchImagesResponse> => {
//   try {
//     const response = await axios.get<FetchImagesResponse>("/search/photos", {
//       params: {
//         client_id: clientId,
//         query: query,
//         page: page,
//         per_page: 12,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     // Обработка ошибки или перекидывание её на следующий уровень
//     throw error;
//   }
// };

// export default fetchImages;
