
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const client = new ApolloClient({
    link: new HttpLink({ uri: API_URL }),
    cache: new InMemoryCache(),
});

export default client;
