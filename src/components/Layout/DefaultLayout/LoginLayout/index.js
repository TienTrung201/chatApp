import { Helmet } from "react-helmet";
function LayoutLogin({ children }) {
  return (
    <div className="wrapper">
      <Helmet>
        <title>Đăng nhập vào Earth</title>
        <meta name="description" content="Đăng nhập vào Earth" />
        <meta name="keywords" content="Earth chat" />
      </Helmet>
      {children}
    </div>
  );
}

export default LayoutLogin;
