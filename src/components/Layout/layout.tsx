import { Outlet } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import styles from "./index.module.scss"
import Header from "../header";

export function Layout() {
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
