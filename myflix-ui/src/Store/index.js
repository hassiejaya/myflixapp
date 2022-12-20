
import {
    configureStore,
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, TMDB_BASE_URL } from "../utils/constant";

  const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
    cloudContent: [],
    urlid: {},

  };
  
  export const getGens = createAsyncThunk("myflix/genres", async ()=> {
    const {data:{genres}} = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    return genres;
  })

  const createArrFromRawData = (arr,moviesArr,genres) => {
    
    arr.forEach((movie)=>{
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
          const name = genres.find(({ id }) => id === genre);
          if (name) movieGenres.push(name.name);
          
        });  
        if (movie.backdrop_path)
            moviesArr.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
      });
        });
  };

  const getRawData = async (api,genres,paging) => {
    const moviesArr = [];
    for(let i=1; moviesArr.length<60 && i<10;i++){
        const {
            data: { results },
          } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
          createArrFromRawData(results, moviesArr, genres);
    }
    return moviesArr;
  }
  export const fetchDataByGen = createAsyncThunk( "netflix/genre",
    async ({ gen, type }, thunkAPI) => { 
        const {Myflix: { genres },} = thunkAPI.getState();
        return getRawData( `https://api.themoviedb.org/3/discover/${type}?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&with_genres=${gen}`, genres);
        
    }
  );

  export const removeFavouriteMovies = createAsyncThunk("netflix/deleteLiked", async ({ movieId, email })=>{
    const {data:{movies},} = await axios.put(`http://localhost:5000/api/user/remove`,{email, movieId,});
    return movies;
  });

  export const getFavouriteMovies = createAsyncThunk("netflix/getLiked", async (email)=>{
    const {data:{movies},} = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
  });

  export const getContentUrl = createAsyncThunk("netflix/getContent", async (id)=>{
    const {data:{source},} = await axios.get(`http://localhost:5000/api/cloudcontent/geturl/${id}`); 
        console.log(source,"at store");
        return source;

    
  });

  export const fetchMovies = createAsyncThunk( "netflix/trending",
    async ({ type }, thunkAPI) => { 
        const {Myflix: { genres },} = thunkAPI.getState();
        return getRawData( `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
        
    }
  );

const MyflixSlice = createSlice(
    {
        name:"Myflix",
        initialState,
        extraReducers: (builder) => {
            builder.addCase(getGens.fulfilled,(state,action)=> {
                state.genres =action.payload;
                state.genresLoaded = true;

            });
            builder.addCase(fetchMovies.fulfilled,(state,action)=> {
                state.movies =action.payload;
            });
            builder.addCase(fetchDataByGen.fulfilled,(state,action)=> {
                state.movies =action.payload;
            });
            builder.addCase(getFavouriteMovies.fulfilled,(state,action)=> {
              state.movies =action.payload;
          });
          builder.addCase(removeFavouriteMovies.fulfilled,(state,action)=> {
            state.movies =action.payload;
        });
        builder.addCase(getContentUrl.fulfilled,(state,action)=> {
          state.cloudContent =action.payload;
      });
        },
    }
);

export const store = configureStore({
    reducer: {
        Myflix: MyflixSlice.reducer,
    },
});

