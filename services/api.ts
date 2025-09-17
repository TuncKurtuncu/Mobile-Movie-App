export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_KEY}`,
    }
}

export const fetchMovies = async ({ query }: { query: string }) => {
    const endponit = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endponit,
        {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        }
    );
    if (!response.ok) {
        // @ts-ignore
        throw new Error('Failde to Fetch Movies', response.statusText);
    }
    const data = await response.json();

    return data.result;
}
