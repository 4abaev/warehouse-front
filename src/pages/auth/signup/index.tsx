import { useEffect } from "react";
import SignUpForm from "../../../components/auth/signUpForm";
import { useActions, useAppSelector } from "../../../state/store";

const SignUpPage = () => {
    const { getUsers } = useActions()
    const { users } = useAppSelector((state) => state.users)
    useEffect(() => {
        if(!users) {
            getUsers()
        }
    }, [getUsers, users])
    return (
        <div>
            <SignUpForm />
        </div>
    );
}

export default SignUpPage;