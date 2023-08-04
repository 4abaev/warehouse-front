import { Outlet, useNavigate } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import styles from "./index.module.scss"
import { useActions, useAppSelector } from "../../../state/store";

export function AuthLayout() {
    const { signIn } = useActions()

    const { isAuth } = useAppSelector((state) => state.core)
    
    const navigate = useNavigate()

    useEffect(() => {
        isAuth && navigate("/profile");
    }, [isAuth, navigate]);

    return (
        <Fragment>
            <header className={styles.header}>
                <Heading>Авторизация</Heading>
            </header>

            <main className={styles.main}>
                <Outlet />
            </main>
            
            <footer className={styles.footer}>
                <Heading size={"md"}>{'Веб-приложение - "Склад"'}</Heading>
            </footer>
        </Fragment>
    );
}
