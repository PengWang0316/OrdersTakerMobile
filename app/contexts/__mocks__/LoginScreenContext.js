import context from '../LoginScreenContextHelp';

const Context = ({
  Consumer: props => props.children(context),
});
export default Context;
