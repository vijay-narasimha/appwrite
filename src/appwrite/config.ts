import config from '@/conf/config';

//@ts-ignore
import { Client, Account, ID } from 'appwrite';

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

const appWriteClient = new Client();
console.log(config)
appWriteClient
  .setEndpoint(config.appWriteUrl)
  .setProject(config.appWriteProjectId);

export const account = new Account(appWriteClient);

export class AppWriteService {
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error: any) {
      
      console.log(error)
      throw error;
    }
  }
  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }
  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error: any) {}
    return false;
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (error: any) {
      console.log('getCurrent User', error);
    }
  }

  async logout() {
    try {
      return await account.deleteSession('current');
    } catch (error: any) {
      throw error;
    }
  }
}

const appWriteService = new AppWriteService();
export default appWriteService;
