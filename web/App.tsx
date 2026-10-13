import { useAuthStore } from '@/store/authstore';
import { lazy, Suspense, type ComponentType } from 'react';
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom';
import { RouterBridge } from './expo-router-compat';
import { AdminLayout, CustomerLayout } from './RouteLayouts';

type ViteImportMeta = ImportMeta & {
  glob<T>(patterns: string[]): Record<string, () => Promise<T>>;
};

const screenModules = (import.meta as ViteImportMeta).glob<{ default: ComponentType }>([
  '../app/**/*.tsx',
  '!../app/**/_layout.tsx',
  '!../app/index.tsx',
]);

function routeScreen(path: string) {
  const loadScreen = screenModules[path];

  if (!loadScreen) {
    throw new Error(`Rota sem tela correspondente: ${path}`);
  }

  return lazy(
    loadScreen as () => Promise<{ default: ComponentType }>,
  );
}

const SplashScreen = routeScreen('../app/splash.tsx');
const LoginScreen = routeScreen('../app/login.tsx');
const CadastroScreen = routeScreen('../app/cadastro.tsx');
const AdminLoginScreen = routeScreen('../app/admin-login.tsx');
const HomeScreen = routeScreen('../app/(tabs)/index.tsx');
const PiercingsScreen = routeScreen('../app/(tabs)/piercings.tsx');
const HistoricoScreen = routeScreen('../app/(tabs)/historico.tsx');
const MeusAgendamentosScreen = routeScreen('../app/meus-agendamentos.tsx');
const NotificacoesScreen = routeScreen('../app/notificacoes.tsx');
const PerfilScreen = routeScreen('../app/perfil.tsx');
const ConfiguracoesScreen = routeScreen('../app/configuracoes.tsx');
const JoiasScreen = routeScreen('../app/joias.tsx');
const ArtesScreen = routeScreen('../app/artes.tsx');
const NovoAgendamentoScreen = routeScreen('../app/novo-agendamento.tsx');
const PiercingIndexScreen = routeScreen('../app/agendamento-piercing/index.tsx');
const PiercingLocalScreen = routeScreen('../app/agendamento-piercing/local.tsx');
const PiercingJoiaScreen = routeScreen('../app/agendamento-piercing/joia.tsx');
const PiercingDataScreen = routeScreen('../app/agendamento-piercing/data.tsx');
const PiercingHorarioScreen = routeScreen('../app/agendamento-piercing/horario.tsx');
const PiercingResumoScreen = routeScreen('../app/agendamento-piercing/resumo.tsx');
const PiercingLoadingScreen = routeScreen('../app/agendamento-piercing/loading.tsx');
const PiercingSucessoScreen = routeScreen('../app/agendamento-piercing/sucesso.tsx');
const TattooIndexScreen = routeScreen('../app/agendamento-tatuagem/index.tsx');
const TattooLocalScreen = routeScreen('../app/agendamento-tatuagem/local.tsx');
const TattooTamanhoScreen = routeScreen('../app/agendamento-tatuagem/tamanho.tsx');
const TattooEstiloScreen = routeScreen('../app/agendamento-tatuagem/estilo.tsx');
const TattooDataScreen = routeScreen('../app/agendamento-tatuagem/data.tsx');
const TattooHorarioScreen = routeScreen('../app/agendamento-tatuagem/horario.tsx');
const TattooResumoScreen = routeScreen('../app/agendamento-tatuagem/resumo.tsx');
const TattooSucessoScreen = routeScreen('../app/agendamento-tatuagem/sucesso.tsx');
const AdminApprovalsScreen = routeScreen('../app/(admin)/index.tsx');
const AdminAgendaScreen = routeScreen('../app/(admin)/agenda.tsx');

function RequireAuth() {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

function RequireAdmin() {
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const location = useLocation();

  if (!token || role !== 'admin') {
    return <Navigate to="/admin-login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

function MissingScreen({ name }: { name: string }) {
  return (
    <main className="web-message">
      <h1>{name}</h1>
      <p>Esta rota existe na navegação, mas ainda não possui uma tela no projeto.</p>
    </main>
  );
}

function RouteFallback() {
  return <main className="web-message" aria-live="polite">Carregando...</main>;
}

export default function App() {
  return (
    <BrowserRouter>
      <RouterBridge />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/splash" replace />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/cadastro" element={<CadastroScreen />} />
          <Route path="/admin-login" element={<AdminLoginScreen />} />

          <Route element={<RequireAuth />}>
            <Route element={<CustomerLayout />}>
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/piercings" element={<PiercingsScreen />} />
              <Route path="/historico" element={<HistoricoScreen />} />
              <Route path="/joias" element={<JoiasScreen />} />
              <Route path="/artes" element={<ArtesScreen />} />
            </Route>

            <Route path="/meus-agendamentos" element={<MeusAgendamentosScreen />} />
            <Route path="/notificacoes" element={<NotificacoesScreen />} />
            <Route path="/perfil" element={<PerfilScreen />} />
            <Route path="/configuracoes" element={<ConfiguracoesScreen />} />
            <Route path="/novo-agendamento" element={<NovoAgendamentoScreen />} />

            <Route path="/agendamento-piercing">
              <Route index element={<PiercingIndexScreen />} />
              <Route path="local" element={<PiercingLocalScreen />} />
              <Route path="joia" element={<PiercingJoiaScreen />} />
              <Route path="data" element={<PiercingDataScreen />} />
              <Route path="horario" element={<PiercingHorarioScreen />} />
              <Route path="resumo" element={<PiercingResumoScreen />} />
              <Route path="loading" element={<PiercingLoadingScreen />} />
              <Route path="sucesso" element={<PiercingSucessoScreen />} />
            </Route>

            <Route path="/agendamento-tatuagem">
              <Route index element={<TattooIndexScreen />} />
              <Route path="local" element={<TattooLocalScreen />} />
              <Route path="tamanho" element={<TattooTamanhoScreen />} />
              <Route path="estilo" element={<TattooEstiloScreen />} />
              <Route path="data" element={<TattooDataScreen />} />
              <Route path="horario" element={<TattooHorarioScreen />} />
              <Route path="resumo" element={<TattooResumoScreen />} />
              <Route path="sucesso" element={<TattooSucessoScreen />} />
            </Route>
          </Route>

          <Route element={<RequireAdmin />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminApprovalsScreen />} />
              <Route path="agenda" element={<AdminAgendaScreen />} />
            </Route>
          </Route>

          <Route path="*" element={<MissingScreen name="Página não encontrada" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}