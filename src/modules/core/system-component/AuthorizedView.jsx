import {useAuth} from "../../hooks/useAuth.jsx";

const AuthorizedView = ({children, ROLE}) => {

    const {user} = useAuth();

    if (ROLE && user.roles.include(ROLE))

    return (
        <div>
            {children}
        </div>
    );
};

export default AuthorizedView;