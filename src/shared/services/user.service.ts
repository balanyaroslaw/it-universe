import httpService from "./http.service";
import treeService from "./tree.service";

class UserService{
    async signUp(userData) {
        try {
          const response = await httpService.post("/auth/register", {
            first_name:userData.firstName,
            last_name:userData.lastName,
            password:userData.password,
            email:userData.email,
            gender:userData.gender
          });

          const { access_token, refresh_token } = response.data;
          this.setTokens(
            access_token,
            refresh_token
          )
          
          return { access_token, refresh_token };
        } 
        catch (error) {
          console.error("Error signing up:", error);
          throw error;
        }
    }

    async logIn(userData) {
      try {
        const response = await httpService.post("/auth/login", {
          password:userData.password,
          email:userData.email
        });
        const { access_token, refresh_token } = response.data;
        
        this.setTokens(
          access_token,
          refresh_token
        )

        if(access_token && refresh_token){
          const response = await httpService.get('/tree');
          const tree = response.data;
          const treeId = tree[0].id;
          console.log(treeId)
          if(treeId && !localStorage.getItem('TREE_ID')){
            treeService.setTree(treeId)
          }
        }

        return { access_token, refresh_token };
      } 
      catch (error) {
        console.error("Error logging in:", error);
        throw error;
      }
    }

    async uploadImage(file){
      await httpService.patch('/user',null,{
        'Content-Type': 'multipart/form-data'
      }, file)
    }

    async removeImage(){
      await httpService.delete('/user/image')
    }

    async LogOut(){
      this.logout();
    }

    setTokens(accessToken, refreshToken) {
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      localStorage.setItem("REFRESH_TOKEN", refreshToken);
    }

    getAccessToken() {
        return localStorage.getItem("ACCESS_TOKEN");
    }

    getRefreshToken() {
        return localStorage.getItem("REFRESH_TOKEN");
    }

    logout() {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        localStorage.removeItem("TREE_ID")
    }

    isAuthenticated() {
        return !!this.getAccessToken();
    }
}

const userService = new UserService();
export default userService;