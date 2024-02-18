import FormContainer from '../../components/common/FormContainer';
import FormTitle from '../../components/common/FormTitle';
import SignupForm from '../../components/auth/SignupForm';

const SignupPage = () => {
  return (
    <FormContainer>
      <FormTitle title="Sign Up" />
      <SignupForm />
    </FormContainer>
  );
};
export default SignupPage;
