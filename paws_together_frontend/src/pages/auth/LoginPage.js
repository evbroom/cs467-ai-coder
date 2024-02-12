import FormContainer from '../../components/common/FormContainer';
import FormTitle from '../../components/common/FormTitle';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <FormContainer>
      <FormTitle title="Login" />
      <LoginForm />
    </FormContainer>
  );
};
export default LoginPage;
