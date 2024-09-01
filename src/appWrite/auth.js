//A SERVICE FOR AUTHENTICATION, IT'LL BE WRITTEN IN A WAY THAT EVEN IF WE NEED TO CLEAR OUT THE AUTHENTICATION FROM OUR APP, OUR APP STILL RUNS SMOOTHLY AND REMAINS INTACT.
//THIS IS AUTHENTICATION SERVICE- CONSULT TO APPWRITE DOCS FOR MORE INFO
//WE CAN USE THIS AUTHENTICATION SERVICE FOR OTHER PROJECTS TOO WHERE WE NEED TO IMPLEMENT APPWRITE FOR BACKEND.
import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite"

//now in the authentication section of appwrite documentation you can find the sammple code for authentication to start but we won't do thhat cuz that requires us to manually add user accounts n stuff, so we'll write quality code:

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.appWriteUrl);
        this.client.setProject(conf.appWriteProjectId);
        this.account = new Account(this.client)
    }

    //We wanna create an account now, but we dont want appwrite dependency, we could use firebase etc instead of appwrite under the hood, so what we do is make this new service/function as a wrapper for all appwrite services. It is async function cuz in the documentation it is shown that it is a promise, we're using async cuyz we want it to not go foward until this account creation isn't done. Now whoever uses this service authService(this file) doesn't know what's used whether appwrite or smthn else he just knows there's this service and there's a method inside it createAccount in which he passes credentials and account is created.
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                //call another method. if user account exists, he should be logged in.
                return this.login(email,password)
            }else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
async login (email, password){
    try {
      return await this.account.createEmailSession(email,password)
    } catch (error) {
        throw error
    }
}

    async getCurrentUser(){
        try {
           return await this.account.get()
        } catch (error) {
            throw error
        }
        return null //if no current user 
    }

async logout() { 
    try {
        await this.account.deleteSessions()
    } catch (error) {
     throw error   
    }
   }

}

const authService = new AuthService();

export default authService //we could import AuthService class directly but then whenever we'd need to access it or its classes we'd make objects of it and then access its methods so for our ease, what we do is, create an object of AuthService class and export the object directly, now others will use this object directly to access its methods.

