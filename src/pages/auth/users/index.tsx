import { useEffect } from "react";
import { useActions, useAppSelector } from "../../../state/store";
import UsersContainer from "../../../components/UsersContainer/UsersContainer";

const AuthPage =  () => {
    const { getUsers } = useActions()
    const { users } = useAppSelector((state) => state.users)
    useEffect(() => {
        if(!users.length) {
            getUsers()
        }
    }, [getUsers, users])

    return (
        <>
            <h1 style={{margin: "10px 0", fontSize: "30px"}}>Пользователи: </h1>
            <UsersContainer users={users}/>
        </>
    );
}

export default AuthPage;