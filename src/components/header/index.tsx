import { Box, Flex, Text, Link as ChakraLink, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { authRoutes } from "../../router";
import styles from './index.module.scss'


const Header: React.FC = () => {
    return (
        <Box as="header" className={styles.header} p={4}>
            <Flex alignItems="center" justifyContent="center">
                <Flex alignItems="center">
                    {authRoutes.map((route) => (
                        <NavLink key={route.path} to={route.path}>{route.title}</NavLink>
                    ))}
                </Flex>
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