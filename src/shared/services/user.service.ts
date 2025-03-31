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
        const treeId = await httpService.get('/tree');
        if(treeId && !localStorage.getItem('TREE_ID')){
          treeService.setTree(treeId)
        }
        this.setTokens(
          access_token,
          refresh_token
        )
        return { access_token, refresh_token };
      } 
      catch (error) {
        console.error("Error logging in:", error);
        throw error;
      }
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