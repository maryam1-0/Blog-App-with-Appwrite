import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite"

//File upload sequence: we'll upload a file, it'll return the filId, then we'll pass that fileId to the featuredImage when creating post, and that post will be created with that particular image.Also when deletiing we'll pass fileId and that image will be deleted.

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appWriteUrl);
        this.client.setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    //the parameters are the attributes I created in the appwrite db and we need to pass all these to this function if we wanna create a blog post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            //consult to documentation for every step, so here in this createDocument function we need to pass database id, collection id, document id and then the content/object we need to save. So we got db and collection ids from conf and we considered slug as the document id (we could also generate it using Id.unique()). 
            return await this.databases.createDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {
                title, content, featuredImage, status, userId

            })
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    //we need to have a document id as well for the document we need to update and we mentioned that our document id will be slug, so getting slug inside the document can bve difficult cuz we need slug first to update that particular document, so we're getting slug separately, and then we're getting other things in the object form.userId isn't necessary as we'll let the user edit who ask for it, so we wont update it.
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            //consult to documentation for every step, so here in this updateDocument function we need to pass database id, collection id, document id and then the content/object we need to update. So we got db and collection ids from conf and we considered slug as the document id (we could also generate it using Id.unique()). 
            return await this.databases.updateDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug, {
                title, content, featuredImage, status

            })
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error)
        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appWriteDatabaseId, conf.appWriteCollectionId, slug)
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error)
            return false
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId, queries) //we could write that queries in here directly too 
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error)
            return false
        }
    }

    //now we need to get all the posts, but if we use listDocuments method of databases then we'll get all thew documents even the ones with their status as inactive. We only want the active ones, So here we;ll apply queries to fetch relevant data.
    //for queries,we must have indexes in our db section in appwrite   
    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try {

        } catch (error) {
            console.log("Appwrite service :: getAllPosts :: error", error)


        }
    }

    //OR
    // async getAllPosts() {
    //     try {
    //         const query = new Query()
    //         query.limit(100) //this will limit the number of posts we get
    //         query.offset(0) //this will start the getting from the first post
    //         query.where('status', '=', 'active') //this will filter the posts to only active ones
    //         return await this.databases.listDocuments(conf.appWriteDatabaseId, conf.appWriteCollectionId, query)
    //     } catch (error) {
    //         console.log("Appwrite service :: getAllPosts :: error", error)
    //         return []
    //     }
    // }


    async uploadFile(file) {
        //file upload service
        //we need to give whole file content, not just its name
        //this will return a fild id 
        try {
            return await this.bucket.createFile(conf.appWriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error)
            return false
        }
    }

    //when a file is uploaded it returns a file id, so if we wanna delete a file we'd have to pass file id as parameter
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appWriteBucketId, fileId)
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error)
            return false
        }
    }

    //service to get the image preview
    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appWriteBucketId,fileId)
    }
}

const service = new Service
export default service