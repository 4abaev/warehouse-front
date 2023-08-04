import { Outlet, useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import styles from "./index.module.scss"
import Header from "../header";
import { useAppSelector } from "../../state/store";
import { useEffect } from "react";

export function Layout() {
    const { isAuth } = useAppSelector((state) => state.core)
    
    const navigate = useNavigate()

    useEffect(() => {
        !isAuth && navigate("/auth/users");
    }, [isAuth, navigate]);

    return (
        <>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <footer className={styles.footer}>
                <Heading size={"md"}>{'Веб-приложение - "Склад"'}</Heading>
            </footer>
        </>
    );
}
