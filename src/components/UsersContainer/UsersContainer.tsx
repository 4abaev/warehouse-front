import { Button, Container, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../state/core/type";
import { useActions, useAppSelector } from "../../state/store";
import { useEffect } from "react";

const UserContainer = ({ users }: { users: IUser[] }) => {
    const { signIn } = useActions()

    const navigate = useNavigate()

    const { isAuth } = useAppSelector((state) => state.core)

    useEffect(() => {
        isAuth && navigate("/profile");
    }, [isAuth, navigate]);


    const managerSignIn = (data: any) => {
        signIn(data)
        isAuth && navigate("/profile");
    }

    return (
        <Container display="flex" minWidth="100vw" flexWrap={"wrap"} gap={10} justifyContent={"center"}>
            {users.map((user) =>
                <Button key={user.id}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    colorScheme="blue"
                    height={100}
                    p={3}
                    minWidth="150px"
                    borderRadius='xl'
                    onClick={() => user.role === "ADMIN" ?
                        navigate("/auth/signin")
                        :
                        managerSignIn({ login: user.login })
                    }
                >
                    <Stack spacing={3}>
                        <h2>{user.role === "ADMIN" ? "Администратор" : "Менеджер"}</h2>
                        <h2>{user.username}</h2>
                    </Stack>
                </Button>
            )}
            <Button height={100} minWidth="150px" borderRadius='xl' onClick={() => navigate("/auth/signup")}>
                Создать
            </Button>
        </Container >
    );
}

export default UserContainer;