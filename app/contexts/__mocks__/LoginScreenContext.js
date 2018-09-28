import context from '../LoginScreenContextTestHelper';

const Context = ({
  Consumer: props => props.children(context),
});
export default Context;
