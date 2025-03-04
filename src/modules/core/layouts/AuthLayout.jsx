import PropTypes from "prop-types";

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

const AuthLayout = ({ children }) => {
  return <div>{children}</div>;
};

export default AuthLayout;
