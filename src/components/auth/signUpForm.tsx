import { Box, Button, Heading, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useActions, useAppSelector } from "../../state/store";

const SignUpForm = () => {
    const { handleSubmit, register } = useForm({ mode: "onChange" })

    const { getUsers } = useActions()
    const { users } = useAppSelector((state) => state.users)
    useEffect(() => {
        if(!users.length) {
            getUsers()
        }
    }, [getUsers, users])

    const { signUp } = useActions()

    const { isAuth } = useAppSelector((state) => state.core)

    const navigate = useNavigate()

    useEffect(() => {
        isAuth && navigate("/profile");
    }, [isAuth, navigate]);

    const handleSignUp = (data: any) => {
        signUp(data)
        isAuth && navigate("/profile")
    }

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    return (
        <form onSubmit={handleSubmit(handleSignUp)}>
            <Heading>{users.length ? "Регистрация менеджера" : "Регистрация администратора"}</Heading>
            <Stack spacing={4}>
                <Input
                    size="md"
                    placeholder='Логин'
                    autoComplete="false"
                    {...register("login")}
                />
                {!users.length && <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Пароль'
                        autoComplete="false"
                        {...register("password")}

                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>}
                <Input
                    size="md"
                    placeholder='ФИО'
                    autoComplete="false"
                    {...register("username")}

                />
                <Input
                    size="md"
                    placeholder='Должность'
                    autoComplete="false"
                    {...register("post")}

                />
                <Box display="flex" justifyContent="space-between">
                    <Button type="submit" colorScheme="blue">Создать</Button>
                    <Button onClick={() => navigate("/auth/users")} colorScheme="facebook">Отмена</Button>
                </Box>
            </Stack>
        </form>
    );
}

export default SignUpForm;