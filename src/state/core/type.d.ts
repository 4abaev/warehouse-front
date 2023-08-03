export interface IUser {
    id: string;
    login: string;
    username: string;
    password?: string;
    role: string;
    post: string;
}
  

type CoreState = {
    user: User | null;
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    isAuth: boolean;
};

type signData = {
    token: string
};


namespace UserAPI {
    type SignupForm = {
        login: string;
        password: string;
        username: string;
        post: number;
    };
    type SigninForm = {
        password: string;
    };
}

