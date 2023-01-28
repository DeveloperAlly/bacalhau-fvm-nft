// export class Sync<T extends HasId> {
//   //where T is UserProps in this case....
//   //rootUrl = "http:/localhost:3000/users"
//   constructor(public rootUrl: string) {}

//   fetch(id: number): AxiosPromise {
//     return axios.get(`${this.rootUrl}/${id}`);
//     //.then((response: AxiosResponse): void => {
//     // this.set(response.data);
//     // });
//   }

//   save(data: T): AxiosPromise {
//     const { id } = data; // how do we know if T has an id prop?
//     //check if user id already exists
//     if (id) {
//       return axios.put(`${this.rootUrl}/${id}`, data);
//     }
//     //else it's a brand new user
//     else {
//       return axios.post(`${this.rootUrl}/`, data);
//     }
//   }
// }
export {};
