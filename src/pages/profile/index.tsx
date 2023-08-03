import { useEffect } from "react"
import { useActions, useAppSelector } from "../../state/store"
import { Heading } from "@chakra-ui/react"

const ProfilePage = () => {
    const { user } = useAppSelector((state) => state.core)
    const { getMe } = useActions()
    useEffect(() => {
      if (!user) {
        getMe()
      }
    }, [user, getMe])
    return (
        user && <div>
        <Heading>{user.username}</Heading>
        <Heading>{user.login}</Heading>
        <Heading>{user.post}</Heading>
        <Heading>{user.role}</Heading>
    </div>
    );
}

export default ProfilePage;