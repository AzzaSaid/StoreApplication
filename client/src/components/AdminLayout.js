import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

function AdminLayout({ admin, setAdmin, children }) {
  return (
    <div>
      <AdminHeader admin={admin} setAdmin={setAdmin} />
      <main>{children}</main>
      <AdminFooter/>
    </div>
  );
}
export default AdminLayout;