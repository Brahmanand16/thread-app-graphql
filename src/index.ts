import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init(){
const app = express();
const PORT = Number(process.env.port)|| 8000;

app.use(express.json());

//Create graphql server

const gqlServer = new ApolloServer({
    typeDefs: `
    type Query {
        hello: String
        say(name: String) : String
    }
    `,
    resolvers: {
        Query: {
            hello:() => `Hey there, I am graphql server`,
            say: (_, { name }: { name:string}) => `Hey ${name} Bro. How are you?`,
        }
    }
})

//start the gql server
await gqlServer.start();

app.get('/', (req, res) => {
    res.json({message: 'server is up and running'});
})

app.use("/graphql", expressMiddleware(gqlServer));

app.listen(PORT, () => {
    return console.log(`server is running on ${PORT} port`);
    
})
}

init();