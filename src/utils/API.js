// business network 통신 logic,
// class 에 필요한 것들을 component 안에 주입 (dependency injection)
class userAPi {
   constructor(httpUser) {
      this.users = httpUser;
   }

   async getData(dataname, param = null) {
      const response = await this.users.get(dataname, {
         params: {
            id: param,
         },
      });
      return response.data;
   }

   async getExactData(dataname, param) {
      const respose = await this.users.get(dataname + `/${param}`);
      return respose.data;
   }
}

export default userAPi;
