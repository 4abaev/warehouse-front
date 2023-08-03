import { Dispatch, SetStateAction } from "react";
declare global {
    type AppRouter = {
        path: string;
        element: JSX.Element;
        isAuthenticated: boolean;
    };

    type CustomRoute = {
        title: string;
        path: string;
        element: JSX.Element;
    };

    type Setter<T> = Dispatch<SetStateAction<T>>;
}
