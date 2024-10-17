import SignIn from '@/app/(auth)/Sign-in';
import { ID, Account, Client, Avatars, Databases } from 'react-native-appwrite';
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.expensify.aora',
    projectId: '670fedb80002fc8bc59b',
    databaseId: '670ff19d00067cd69050',
    usersCollectionId: '670ff20d003c605c348d',
    videoCollectionId: '670ff263002a95f511c6',
    storageId: '67110b4c0016f9e36514'
}


const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)  
    .setPlatform(config.platform)  

const account = new Account(client);  
const avatars = new Avatars(client);  
const databases = new Databases(client);   

export const createUser = async (email, password, username) => {  
  try {  
    const newAccount = await account.create(  
        ID.unique(),  
        email, 
        password,
        username 
    )  

    if(!newAccount) throw Error;

  const avatarUrl = avatars.getInitials(username)

   await signIn(email, password)

   const newUser = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    Id.unique(),
    {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
    }     
 )

 return newUser;
  }catch (error){
   console.log(error);
   throw new Error(error);
  } 
}

export async function signIn(email, password) {
    try {
        const session = await account.createSession('email', email, password);


        return session;
    } catch (error) {
        throw new Error(error)
        
    }
}