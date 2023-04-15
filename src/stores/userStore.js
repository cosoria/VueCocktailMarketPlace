import { defineStore } from 'pinia';

// const defaultUser = {
//     id:"",
//     name: "",
//     email: "",
//     roles: [],
//     photo: "",
//     cell: "",
//     isAdmin: false,
// };

export const useUserStore =  defineStore('user', {
    state() {
        return {
            user: {
                id:"",
                name: "",
                email: "",
                roles: [],
                photo: "",
                cell: "",
                isAdmin: false,
            }
        };
    },
    getters: {
        getUser() {
            return this.user;
        },
        isAuthenticated() {
            return !(this.user.id === "");
        },
        isAdmin() {
            return this.isAuthenticated && this.user.email == "carlos.osoria@gmail.com";
        }
    },
    actions: {
        login(id, email, name) {
            this.user.id = id;
            this.user.email = email;
            this.user.name = name; 
        },
        logout() {
            this.user.id = "";
            this.user.email = "";
            this.user.name = "";
        }
    }
});