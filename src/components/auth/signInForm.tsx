import { Box, Button, Heading, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useActions, useAppSelector } from "../../state/store";

const SignInForm = () => {
    const { handleSubmit, register } = useForm({ mode: "onChange" })

    const { signIn } = useActions()

    const { isAuth } = useAppSelector((state) => state.core)
    
    const navigate = useNavigate()

    const handleSignIn = (data: any) => {
        signIn(data)
        isAuth && navigate("/profile")
    }
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    
    return (
        <form onSubmit={handleSubmit(handleSignIn)}>
            <Heading>Авторизация администратора</Heading>
            <Stack spacing={4}>
                <Input
                    size="md"
                    placeholder='Логин'
                    autoComplete="false"
                    {...register("login")}
                />
                <InputGroup size='md'>
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
                </InputGroup>
                <Box display="flex" justifyContent="space-between">
                    <Button type="submit" colorScheme="blue">Войти</Button>
                    <Button onClick={() => navigate("/auth/users")} colorScheme="facebook">Отмена</Button>
                </Box>
            </Stack>
        </form>
    );
}

export default SignInForm;