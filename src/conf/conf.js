//we made this file so that we wouldn't write "import.meta.env.VITE_SMTHN" to access environment variables, instead we'll access them now through this file.

const conf={
    appWriteUrl:String(import.meta.env.VITE_APPWRITE_URL), //String() ensures that the env variable is always string
    appWriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

}
export default conf