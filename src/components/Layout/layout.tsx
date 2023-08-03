import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { Heading } from "@chakra-ui/react";
import styles from "./index.module.scss"

export function Layout() {
    return (
        <Fragment>
            {/* <header className={styles.header}>
                <Heading>Авторизация</Heading>
            </header> */}

            <main className={styles.main}>
                <Outlet />
            </main>
            
            <footer className={styles.footer}>
                <Heading size={"md"}>{'Веб-приложение - "Склад"'}</Heading>
            </footer>
        </Fragment>
    );
}
