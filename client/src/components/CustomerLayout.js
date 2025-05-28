import Header from './CustomerHeader';
import CustomerFooter from './CustomerFooter';

function CustomerLayout({ user, setUser, children }) {
  return (
    <div>
      <Header user={user} setUser={setUser} />
      <main>{children}</main>
      <CustomerFooter/>
    </div>
  );
}

export default CustomerLayout;