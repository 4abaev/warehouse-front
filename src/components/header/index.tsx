import { Box, Flex, Text, Link as ChakraLink, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { authRoutes } from "../../router";
import styles from './index.module.scss'
import { useAppDispatch, useAppSelector } from "../../state/store";
import { clearstate } from "../../state/core/slice";


const Header: React.FC = () => {
    const navigate = useNavigate()
    const { isAuth } = useAppSelector((state) => state.core)
    const dispatch = useAppDispatch()
    function handleSignOut() {
        dispatch(clearstate())
        !isAuth && navigate("/auth/users")
    }

    return (
        <Box as="header" className={styles.header} p={4}>
            <Flex alignItems="center" justifyContent="space-between">
                <Flex alignItems="center">
                    {authRoutes.map((route) => (
                        <NavLink key={route.path} to={route.path}>{route.title}</NavLink>
                    ))}
                </Flex>
                <Button
                    p={2}
                    colorScheme="facebook"
                    color="white"
                    fontWeight="bold"
                    _hover={{ color: "black" }}
                    onClick={handleSignOut}
                    background={"none"}
                >
                    Выход
                </Button>
            </Flex>
        </Box>
    );
};

interface NavLinkProps {
    to: string;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
    return (
        <ChakraLink
            as={Link}
            to={to}
            p={2}
            color="white"
            fontWeight="bold"
            _hover={{ textDecoration: "none", color: "black" }}
        >
            {children}
        </ChakraLink>
    );
};

export default Header;