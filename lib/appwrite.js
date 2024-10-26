import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.expensify.aora",
  projectId: "670fedb80002fc8bc59b",
  databaseId: "670ff19d00067cd69050",
  usersCollectionId: "670ff20d003c605c348d",
  videoCollectionId: "670ff263002a95f511c6",
  storageId: "67110b4c0016f9e36514",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.usersCollectionId,
      ID.unique(),
      {
        accountid: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const logout = async () => {
  try {
    await account.deleteSessions();
  } catch (error) {
    console.log(error)
  }
}


export const getCurrentUser = async () => {
 try { 
  const currentAccount = await account.get();

  if(!currentAccount) throw Error;

  const currentUser = await databases.listDocuments(
    config.databaseId,
    config.usersCollectionId,
    [Query.equal('accountid', currentAccount.$id)]
  )

  if(!currentUser)  throw Error;
  return currentUser.documents[0];
 } catch (error) {
  console.log(error);
 }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt')]

    )
  return posts.documents;
  } catch (error) {
    throw new Error(error);
    
  }
}

export const getLetestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(2))]
    )
  return posts.documents;
  } catch (error) {
    throw new Error(error);
    
  }
}

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search('title', query)]
    )
  return posts.documents;
  } catch (error) {
    throw new Error(error);
    
  }
}

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal('creator', userId), Query.orderDesc('$createdAt')

      ]
    )
  return posts.documents;
  } catch (error) {
    throw new Error(error);
    
  }
}

export const getFilePreview = async(fileId, type) => {
  let fileUrl;

  try {
    if(type === 'video'){
      fileUrl = storage.getFileView(config.storageId, fileId)
    } else if(type === 'image') {
      fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100)
    } else {
      throw new Error('Invalid file type')
    }
    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error)
  }
}

export const uploadFile = async (file, type) => {
  if(!file) return;

  const asset = { 
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,

  }
  try {
   uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error) {
    throw new Error(error)
  }
}

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ]);

    if (!thumbnailUrl || !videoUrl) {
      throw new Error('File upload failed. Please try again.');
    }

    const newPost = await databases.createDocument(
      config.databaseId, 
      config.videoCollectionId, 
      ID.unique(), 
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    console.error('Error creating video:', error);
    throw new Error(error.message || 'Failed to create video post.');
  }
};
