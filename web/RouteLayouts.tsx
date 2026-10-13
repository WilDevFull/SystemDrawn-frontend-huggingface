import { useAuthStore } from '@/store/authstore';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

export function CustomerLayout() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const firstName = user?.nomeCompleto?.split(' ')[0] || 'Usuário';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <>
      <header className="route-header">
        <div className="route-branding">
          <span className="route-greeting">Olá, {firstName}</span>
          <button type="button" className="route-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
        <nav className="route-links" aria-label="Navegação principal">
          <NavLink to="/home">Tatuagens</NavLink>
          <NavLink to="/piercings">Piercings</NavLink>
          <NavLink to="/joias">Joias</NavLink>
          <NavLink to="/artes">Artes</NavLink>
          <NavLink to="/historico">Histórico</NavLink>
        </nav>
        <nav className="route-account-links" aria-label="Conta">
          <Link to="/notificacoes">Notificações</Link>
          <Link to="/admin-login">Admin</Link>
          <Link to="/perfil">Perfil</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export function AdminLayout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin-login', { replace: true });
  };

  return (
    <>
      <header className="route-header admin-route-header">
        <div className="route-branding">
          <span className="route-greeting">Administração</span>
          <button type="button" className="route-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
        <nav className="route-links" aria-label="Navegação administrativa">
          <NavLink to="/admin" end>Aprovações</NavLink>
          <NavLink to="/admin/agenda">Agenda</NavLink>
        </nav>
        <Link to="/home">Voltar à loja</Link>
      </header>
      <Outlet />
    </>
  );
}