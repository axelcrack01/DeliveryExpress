import { useState, useEffect } from "react";
import {
  MapPin, Star, Clock, ShoppingCart, User, Settings, Bell, Search,
  Menu, X, Home, Truck, Package, BarChart2, Users, DollarSign, Store,
  Phone, MessageCircle, CheckCircle, Plus, Minus, Trash2, CreditCard,
  Smartphone, Banknote, ArrowRight, ArrowLeft, LogOut, Heart,
  TrendingUp, Activity, Zap, Sun, Moon, Globe, Lock, HelpCircle,
  ChevronDown, ChevronRight, ChevronUp, Eye, EyeOff, Mail,
  Edit, Camera, Navigation, Headphones, FileText,
  Shield, Check, MoreHorizontal, Filter, List,
  UtensilsCrossed, Bike, ThumbsUp, Calendar,
  Wallet, Award, LayoutDashboard, Percent, Share2,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

type Screen =
  | "landing" | "login" | "register" | "dashboard"
  | "restaurants" | "restaurant-detail" | "cart" | "checkout"
  | "tracking" | "admin" | "restaurant-panel" | "driver-panel"
  | "profile" | "settings" | "help" | "not-found";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

const cn = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(" ");

// ── DATA ─────────────────────────────────────────────────────────────────────

const restaurants = [
  { id: 1, name: "Sushi Nomo", category: "Japonesa", rating: 4.9, time: "20-30", delivery: "Gratis", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=280&fit=crop&auto=format", offer: "20% OFF", badge: "Más pedido", emoji: "🍣", desc: "El mejor sushi de la ciudad.", price: "$$" },
  { id: 2, name: "Burgers & Co", category: "Hamburguesas", rating: 4.7, time: "15-25", delivery: "S/ 2.00", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=280&fit=crop&auto=format", offer: null, badge: "Nuevo", emoji: "🍔", desc: "Hamburguesas artesanales con ingredientes locales.", price: "$" },
  { id: 3, name: "La Pizzeria", category: "Pizza", rating: 4.8, time: "25-35", delivery: "Gratis", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=280&fit=crop&auto=format", offer: "2x1", badge: "Popular", emoji: "🍕", desc: "Pizza al horno de leña importada de Italia.", price: "$$" },
  { id: 4, name: "Green Bowl", category: "Saludable", rating: 4.6, time: "10-20", delivery: "S/ 1.50", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=280&fit=crop&auto=format", offer: null, badge: "Saludable", emoji: "🥗", desc: "Bowls nutritivos, ensaladas frescas y jugos.", price: "$" },
  { id: 5, name: "Tacos El Rey", category: "Mexicana", rating: 4.5, time: "20-30", delivery: "Gratis", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=280&fit=crop&auto=format", offer: "15% OFF", badge: null, emoji: "🌮", desc: "Tacos auténticos con salsas artesanales.", price: "$" },
  { id: 6, name: "Café Bloom", category: "Café", rating: 4.9, time: "5-15", delivery: "S/ 1.00", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=280&fit=crop&auto=format", offer: null, badge: "Rápido", emoji: "☕", desc: "Specialty coffee y pasteles artesanales.", price: "$" },
];

const menuItems: Record<string, { id: number; name: string; desc: string; price: number; emoji: string }[]> = {
  "Rolls Especiales": [
    { id: 1, name: "Dragon Roll", desc: "Langostino, aguacate, pepino y salsa unagi", price: 38, emoji: "🍣" },
    { id: 2, name: "Rainbow Roll", desc: "8 piezas con variedad de mariscos frescos", price: 42, emoji: "🌈" },
    { id: 3, name: "Spicy Tuna Roll", desc: "Atún picante, pepino y sriracha", price: 35, emoji: "🔥" },
  ],
  Sashimi: [
    { id: 4, name: "Sashimi Mixto", desc: "12 piezas de salmón, atún y lenguado", price: 55, emoji: "🐟" },
    { id: 5, name: "Salmón Premium", desc: "8 piezas de salmón noruego importado", price: 45, emoji: "🍱" },
  ],
  Bebidas: [
    { id: 6, name: "Sake Frío", desc: "Sake japonés premium 180ml", price: 25, emoji: "🍶" },
    { id: 7, name: "Té Verde Matcha", desc: "Matcha orgánico japonés", price: 12, emoji: "🍵" },
  ],
};

const revenueData = [
  { month: "Ene", revenue: 42000, orders: 380 },
  { month: "Feb", revenue: 51000, orders: 420 },
  { month: "Mar", revenue: 48000, orders: 395 },
  { month: "Abr", revenue: 67000, orders: 540 },
  { month: "May", revenue: 73000, orders: 610 },
  { month: "Jun", revenue: 89000, orders: 720 },
  { month: "Jul", revenue: 95000, orders: 780 },
];

const hourlyData = [
  { hour: "8am", orders: 12 }, { hour: "10am", orders: 28 },
  { hour: "12pm", orders: 87 }, { hour: "2pm", orders: 65 },
  { hour: "4pm", orders: 42 }, { hour: "6pm", orders: 93 },
  { hour: "8pm", orders: 76 }, { hour: "10pm", orders: 38 },
];

const topRestaurants = [
  { name: "Sushi Nomo", orders: 1240, revenue: "S/ 52,400", trend: "+12%" },
  { name: "La Pizzeria", orders: 980, revenue: "S/ 38,200", trend: "+8%" },
  { name: "Burgers & Co", orders: 870, revenue: "S/ 26,100", trend: "+15%" },
  { name: "Green Bowl", orders: 650, revenue: "S/ 19,500", trend: "+5%" },
  { name: "Café Bloom", orders: 540, revenue: "S/ 16,200", trend: "+22%" },
];

const recentOrders = [
  { id: "#DE-4821", customer: "María García", restaurant: "Sushi Nomo", amount: "S/ 95.00", status: "Entregado", time: "hace 5 min" },
  { id: "#DE-4820", customer: "Carlos López", restaurant: "Burgers & Co", amount: "S/ 42.50", status: "En camino", time: "hace 12 min" },
  { id: "#DE-4819", customer: "Ana Martínez", restaurant: "La Pizzeria", amount: "S/ 67.00", status: "Preparando", time: "hace 18 min" },
  { id: "#DE-4818", customer: "Luis Rodríguez", restaurant: "Green Bowl", amount: "S/ 35.00", status: "Entregado", time: "hace 25 min" },
  { id: "#DE-4817", customer: "Sofia Chen", restaurant: "Tacos El Rey", amount: "S/ 28.00", status: "Cancelado", time: "hace 31 min" },
];

const pieData = [
  { name: "Completados", value: 78 },
  { name: "En camino", value: 12 },
  { name: "Preparando", value: 7 },
  { name: "Cancelados", value: 3 },
];

const PIE_COLORS = ["#22C55E", "#2563EB", "#F97316", "#EF4444"];

// ── SHARED COMPONENTS ────────────────────────────────────────────────────────

function Badge({ children, color = "blue" }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
    red: "bg-red-100 text-red-700",
    slate: "bg-slate-100 text-slate-600",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold", colors[color] ?? colors.slate)}>
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string }> = {
    Entregado: { color: "green" },
    "En camino": { color: "blue" },
    Preparando: { color: "orange" },
    Cancelado: { color: "red" },
  };
  const cfg = map[status] ?? { color: "slate" };
  return <Badge color={cfg.color}>{status}</Badge>;
}

function Btn({
  children, onClick, variant = "primary", size = "md", className = "", disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}) {
  const variants = {
    primary: "bg-[#2563EB] hover:bg-blue-700 text-white shadow-lg shadow-blue-200/60",
    secondary: "bg-[#0F172A] hover:bg-slate-800 text-white shadow-lg shadow-slate-200/60",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
    outline: "bg-transparent border border-slate-200 hover:bg-slate-50 text-slate-700",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold rounded-[12px] transition-all duration-200 cursor-pointer",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {children}
    </button>
  );
}

function Input({ label, type = "text", placeholder, icon, value, onChange }: {
  label?: string; type?: string; placeholder?: string; icon?: React.ReactNode; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-slate-700">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn(
            "w-full bg-slate-50 border border-slate-200 rounded-[12px] py-3 text-slate-800 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all",
            "placeholder:text-slate-400",
            icon ? "pl-10 pr-4" : "px-4",
          )}
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change, color = "blue" }: {
  icon: React.ReactNode; label: string; value: string; change?: string; color?: string;
}) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  };
  return (
    <div className="bg-white rounded-[18px] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2.5 rounded-[12px]", colors[color] ?? colors.blue)}>{icon}</div>
        {change && (
          <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
            <TrendingUp size={10} /> {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}

function RestaurantCard({ r, onClick }: { r: typeof restaurants[0]; onClick: () => void }) {
  const [liked, setLiked] = useState(false);
  return (
    <div
      className="bg-white rounded-[18px] overflow-hidden shadow-sm border border-slate-100 cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {r.offer && (
          <span className="absolute top-3 left-3 bg-[#2563EB] text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {r.offer}
          </span>
        )}
        {r.badge && (
          <span className="absolute top-3 right-10 bg-white/90 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {r.badge}
          </span>
        )}
        <button
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all"
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
        >
          <Heart size={14} className={liked ? "fill-red-500 text-red-500" : "text-slate-500"} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-bold text-slate-900 text-base">{r.emoji} {r.name}</h3>
          <div className="flex items-center gap-1 text-sm font-semibold text-amber-500">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            {r.rating}
          </div>
        </div>
        <p className="text-slate-500 text-xs mb-3">{r.category} · {r.price}</p>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Clock size={11} /> {r.time} min</span>
          <span className="flex items-center gap-1"><Truck size={11} /> {r.delivery}</span>
        </div>
      </div>
    </div>
  );
}

// ── NAVBAR ────────────────────────────────────────────────────────────────────

function Navbar({ navigate, darkMode, toggleDark, cart, transparent = false }: {
  navigate: (s: string) => void; darkMode: boolean; toggleDark: () => void; cart: CartItem[]; transparent?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const bg = transparent && !scrolled ? "bg-transparent" : "bg-[#0F172A] shadow-lg";

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", bg)}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => navigate("landing")} className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <Truck size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Delivery<span className="text-[#2563EB]">Express</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {[
            { label: "Inicio", screen: "landing" },
            { label: "Restaurantes", screen: "restaurants" },
            { label: "Cómo funciona", screen: "landing" },
            { label: "Empresas", screen: "landing" },
            { label: "Contacto", screen: "help" },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.screen)}
              className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button onClick={toggleDark} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all">
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button onClick={() => navigate("cart")} className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all">
            <ShoppingCart size={17} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2563EB] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
          <Btn onClick={() => navigate("login")} variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/10">
            Iniciar sesión
          </Btn>
          <Btn onClick={() => navigate("register")} size="sm">Registrarse</Btn>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-1">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0F172A] border-t border-white/10 px-6 py-4 flex flex-col gap-3">
          {["Restaurantes", "Cómo funciona", "Empresas"].map((link) => (
            <button key={link} className="text-slate-300 text-sm py-1 text-left">{link}</button>
          ))}
          <div className="flex gap-2 mt-2">
            <Btn onClick={() => navigate("login")} variant="outline" size="sm" className="flex-1 border-white/20 text-slate-200">Iniciar sesión</Btn>
            <Btn onClick={() => navigate("register")} size="sm" className="flex-1">Registrarse</Btn>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────

function Sidebar({ navigate, active, type = "admin" }: { navigate: (s: string) => void; active: string; type?: string }) {
  const adminLinks = [
    { id: "admin", label: "Dashboard", icon: <LayoutDashboard size={17} /> },
    { id: "restaurants", label: "Restaurantes", icon: <Store size={17} /> },
    { id: "tracking", label: "Pedidos", icon: <Package size={17} /> },
    { id: "driver-panel", label: "Repartidores", icon: <Bike size={17} /> },
    { id: "profile", label: "Clientes", icon: <Users size={17} /> },
    { id: "settings", label: "Configuración", icon: <Settings size={17} /> },
    { id: "help", label: "Ayuda", icon: <HelpCircle size={17} /> },
  ];
  const restaurantLinks = [
    { id: "restaurant-panel", label: "Dashboard", icon: <LayoutDashboard size={17} /> },
    { id: "tracking", label: "Pedidos activos", icon: <Package size={17} /> },
    { id: "restaurants", label: "Menú", icon: <UtensilsCrossed size={17} /> },
    { id: "profile", label: "Clientes", icon: <Users size={17} /> },
    { id: "settings", label: "Configuración", icon: <Settings size={17} /> },
  ];
  const driverLinks = [
    { id: "driver-panel", label: "Dashboard", icon: <LayoutDashboard size={17} /> },
    { id: "tracking", label: "Pedidos", icon: <Package size={17} /> },
    { id: "profile", label: "Mi perfil", icon: <User size={17} /> },
    { id: "settings", label: "Configuración", icon: <Settings size={17} /> },
  ];

  const links = type === "admin" ? adminLinks : type === "restaurant" ? restaurantLinks : driverLinks;
  const title = type === "admin" ? "Admin Panel" : type === "restaurant" ? "Mi Restaurante" : "Panel Repartidor";

  return (
    <aside className="w-64 bg-[#0F172A] min-h-screen flex flex-col flex-shrink-0">
      <div className="p-6 border-b border-white/10">
        <button onClick={() => navigate("landing")} className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <Truck size={15} className="text-white" />
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-sm leading-none">DeliveryExpress</p>
            <p className="text-slate-500 text-xs mt-0.5">{title}</p>
          </div>
        </button>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => navigate(link.id)}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-[11px] text-sm font-medium transition-all w-full text-left",
              active === link.id
                ? "bg-[#2563EB] text-white shadow-lg shadow-blue-900/30"
                : "text-slate-400 hover:text-white hover:bg-white/10",
            )}
          >
            {link.icon}
            {link.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => navigate("landing")}
          className="flex items-center gap-3 px-3 py-2.5 rounded-[11px] text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 transition-all w-full"
        >
          <LogOut size={17} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

// ── LANDING ───────────────────────────────────────────────────────────────────

function LandingScreen({ navigate }: { navigate: (s: string) => void }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-[#0F172A] min-h-screen flex items-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">Disponible en 15 ciudades</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
              Tu comida<br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">favorita</span>
              <br />en minutos.
            </h1>
            <p className="text-slate-400 text-lg mb-10 max-w-lg leading-relaxed">
              Conectamos clientes, restaurantes y repartidores mediante una plataforma inteligente de última generación.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Btn onClick={() => navigate("restaurants")} size="lg" className="shadow-2xl shadow-blue-500/30">
                Pedir ahora <ArrowRight size={18} />
              </Btn>
              <button
                onClick={() => navigate("dashboard")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-[12px] border border-white/20 text-white font-semibold text-base hover:bg-white/10 transition-all"
              >
                Conocer más
              </button>
            </div>
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                placeholder="Buscar restaurante o platillo..."
                className="w-full bg-white/10 border border-white/20 rounded-2xl pl-12 pr-24 py-4 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500/50 backdrop-blur-sm transition-all"
              />
              <button
                onClick={() => navigate("restaurants")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Right — floating UI illustration */}
          <div className="relative h-[520px] hidden lg:block">
            {/* Restaurant card */}
            <div className="absolute top-0 right-0 w-72 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[24px] p-5 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=48&h=48&fit=crop&auto=format"
                  alt="Sushi Nomo"
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <p className="text-white font-bold text-sm">Sushi Nomo</p>
                  <div className="flex items-center gap-1">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span className="text-amber-400 text-xs font-semibold">4.9</span>
                    <span className="text-slate-400 text-xs">· 20-30 min</span>
                  </div>
                </div>
                <span className="ml-auto bg-blue-500/20 text-blue-300 text-xs px-2.5 py-1 rounded-full font-semibold">20% OFF</span>
              </div>
              <div className="flex gap-2">
                {["🍣", "🌈", "🔥"].map((e, i) => (
                  <div key={i} className="flex-1 bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-2xl mb-1">{e}</div>
                    <div className="text-white text-xs font-medium">Roll {i + 1}</div>
                    <div className="text-slate-400 text-xs">S/ {[38, 42, 35][i]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order tracking card */}
            <div className="absolute top-52 left-0 w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] p-4 shadow-2xl">
              <p className="text-white font-bold text-sm mb-3">📦 Pedido #DE-4821</p>
              {[
                { label: "Pedido confirmado", done: true },
                { label: "Preparando tu pedido", done: true },
                { label: "Repartidor en camino", done: true },
                { label: "Entrega en 8 min", done: false },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2.5 mb-2">
                  <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                    step.done ? "bg-green-400" : "bg-white/20")}>
                    {step.done
                      ? <Check size={11} className="text-white" />
                      : <div className="w-2 h-2 bg-white/50 rounded-full" />
                    }
                  </div>
                  <span className={cn("text-xs", step.done ? "text-white" : "text-slate-500")}>{step.label}</span>
                </div>
              ))}
            </div>

            {/* Driver card */}
            <div className="absolute bottom-16 right-4 w-56 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] p-4 shadow-2xl">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format"
                  alt="Carlos Ramos"
                  className="w-10 h-10 rounded-full object-cover border-2 border-green-400"
                />
                <div>
                  <p className="text-white font-semibold text-xs">Carlos Ramos</p>
                  <div className="flex items-center gap-1">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <span className="text-amber-400 text-xs">4.8</span>
                  </div>
                </div>
                <Bike size={18} className="ml-auto text-blue-400" />
              </div>
              <div className="bg-green-400/20 rounded-xl p-2.5 text-center">
                <p className="text-green-400 text-xs font-bold">🚀 Llega en 8 minutos</p>
              </div>
            </div>

            {/* Mini stats */}
            <div className="absolute top-60 right-0 flex gap-2">
              {[{ v: "50K+", l: "Pedidos" }, { v: "4.8★", l: "Rating" }].map((s) => (
                <div key={s.l} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[16px] p-3 text-center">
                  <p className="text-white font-black text-lg">{s.v}</p>
                  <p className="text-slate-400 text-xs">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs">Desplázate</span>
          <ChevronDown size={18} className="animate-bounce" />
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "+50,000", label: "Pedidos realizados", icon: "📦" },
            { value: "150+", label: "Restaurantes asociados", icon: "🍽️" },
            { value: "95%", label: "Satisfacción del cliente", icon: "⭐" },
            { value: "15", label: "Ciudades activas", icon: "🌎" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-3xl font-black text-[#0F172A] mb-1">{stat.value}</p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">¿Cómo funciona?</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-3 mb-4">Simple, rápido y confiable</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Pide tu comida favorita en 3 pasos y recíbela en la puerta de tu hogar.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: "🔍", title: "Escoge tu restaurante", desc: "Explora más de 150 restaurantes en tu ciudad. Filtra por categoría, rating o tiempo de entrega." },
              { step: "02", icon: "🛒", title: "Realiza tu pedido", desc: "Selecciona tus platillos favoritos, personaliza tu pedido y elige tu método de pago preferido." },
              { step: "03", icon: "🚀", title: "Recibe tu comida", desc: "Sigue en tiempo real el estado de tu pedido y recíbelo en la puerta de tu casa en minutos." },
            ].map((s) => (
              <div key={s.step} className="relative bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="absolute top-6 right-6 text-7xl font-black text-slate-100 group-hover:text-blue-50 transition-colors select-none">
                  {s.step}
                </div>
                <div className="text-5xl mb-5">{s.icon}</div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Restaurantes</span>
              <h2 className="text-4xl font-black text-[#0F172A] mt-2">Los más populares</h2>
            </div>
            <Btn onClick={() => navigate("restaurants")} variant="outline">
              Ver todos <ArrowRight size={16} />
            </Btn>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((r) => (
              <RestaurantCard key={r.id} r={r} onClick={() => navigate("restaurant-detail")} />
            ))}
          </div>
        </div>
      </section>

      {/* App CTA */}
      <section className="bg-[#0F172A] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.07)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
              Descarga la app y<br />
              <span className="text-[#2563EB]">obtén 20% OFF</span><br />
              en tu primer pedido.
            </h2>
            <p className="text-slate-400 text-lg mb-8">Disponible para iOS y Android. Más de 50,000 usuarios ya confían en nosotros.</p>
            <div className="flex gap-4 flex-wrap">
              {[{ icon: "🍎", store: "App Store" }, { icon: "🤖", store: "Google Play" }].map((p) => (
                <button key={p.store} className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-5 py-3.5 rounded-[14px] hover:bg-white/20 transition-all backdrop-blur-sm">
                  <span className="text-2xl">{p.icon}</span>
                  <div className="text-left">
                    <p className="text-xs text-slate-400">Disponible en</p>
                    <p className="font-bold text-sm">{p.store}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="hidden lg:flex justify-center gap-4 flex-wrap">
            {[
              { icon: "⚡", v: "28 min", l: "Tiempo promedio" },
              { icon: "⭐", v: "4.9/5", l: "Calificación" },
              { icon: "👥", v: "50K+", l: "Usuarios activos" },
              { icon: "🌎", v: "15", l: "Ciudades" },
            ].map((s) => (
              <div key={s.l} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-[20px] p-5 text-center w-32">
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="text-white font-black text-xl">{s.v}</p>
                <p className="text-slate-400 text-xs mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center"><Truck size={15} className="text-white" /></div>
              <span className="text-white font-bold">DeliveryExpress</span>
            </div>
            <p className="text-slate-500 text-sm">La plataforma de delivery más rápida y confiable de Latinoamérica.</p>
          </div>
          {[
            { title: "Producto", links: ["Restaurantes", "Cómo funciona", "Precios", "API"] },
            { title: "Empresa", links: ["Nosotros", "Blog", "Carreras", "Prensa"] },
            { title: "Legal", links: ["Privacidad", "Términos", "Cookies", "Seguridad"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-white font-semibold mb-4 text-sm">{col.title}</p>
              {col.links.map((link) => (
                <button key={link} className="block text-slate-500 text-sm mb-2 hover:text-slate-300 transition-colors">{link}</button>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-600 text-sm">© 2024 Delivery Express. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {["🐦", "📸", "💼", "📺"].map((icon, i) => (
              <button key={i} className="text-slate-500 hover:text-white text-lg transition-colors">{icon}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────

function LoginScreen({ navigate }: { navigate: (s: string) => void }) {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col bg-[#0F172A] p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.07)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none" />
        <button onClick={() => navigate("landing")} className="flex items-center gap-2.5 relative">
          <div className="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center"><Truck size={17} className="text-white" /></div>
          <span className="text-white font-bold text-xl">Delivery<span className="text-[#2563EB]">Express</span></span>
        </button>
        <div className="flex-1 flex flex-col justify-center relative">
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Tu comida favorita<br />a un clic de distancia.
          </h2>
          <p className="text-slate-400 text-base mb-8">Únete a más de 50,000 usuarios que confían en nosotros cada día.</p>
          <div className="grid grid-cols-2 gap-4">
            {[{ v: "150+", l: "Restaurantes" }, { v: "28 min", l: "Tiempo promedio" }, { v: "4.9★", l: "Calificación" }, { v: "15", l: "Ciudades" }].map((s) => (
              <div key={s.l} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-white font-black text-xl">{s.v}</p>
                <p className="text-slate-500 text-sm">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-slate-600 text-xs relative">© 2024 Delivery Express.</p>
      </div>

      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-[#0F172A] mb-2">Bienvenido de vuelta</h1>
            <p className="text-slate-500 text-sm">Ingresa tus credenciales para continuar</p>
          </div>
          <div className="flex flex-col gap-4 mb-6">
            <Input label="Correo electrónico" type="email" placeholder="tu@email.com" icon={<Mail size={16} />} />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-[12px] py-3 pl-10 pr-10 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
                />
                <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded" />
              Recordarme
            </label>
            <button className="text-sm text-blue-600 font-semibold hover:underline">¿Olvidaste tu contraseña?</button>
          </div>
          <Btn onClick={() => navigate("dashboard")} size="lg" className="w-full mb-4">Iniciar sesión</Btn>
          <div className="relative flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-xs">o continúa con</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[{ icon: "🍎", label: "Apple" }, { icon: "🔵", label: "Google" }].map((p) => (
              <button key={p.label} className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-[12px] text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                <span>{p.icon}</span> {p.label}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mb-8">
            ¿No tienes cuenta?{" "}
            <button onClick={() => navigate("register")} className="text-blue-600 font-bold hover:underline">Regístrate gratis</button>
          </p>
          <div className="pt-4 border-t border-slate-100">
            <p className="text-slate-400 text-xs text-center mb-3">Acceso rápido — Demo:</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "👤 Admin", screen: "admin" },
                { label: "🍽️ Restaurante", screen: "restaurant-panel" },
                { label: "🚴 Repartidor", screen: "driver-panel" },
              ].map((r) => (
                <button
                  key={r.label}
                  onClick={() => navigate(r.screen)}
                  className="text-xs py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all font-medium"
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── REGISTER ──────────────────────────────────────────────────────────────────

function RegisterScreen({ navigate }: { navigate: (s: string) => void }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col bg-[#0F172A] p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.07)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <button onClick={() => navigate("landing")} className="flex items-center gap-2.5 relative">
          <div className="w-9 h-9 bg-[#2563EB] rounded-xl flex items-center justify-center"><Truck size={17} className="text-white" /></div>
          <span className="text-white font-bold text-xl">Delivery<span className="text-[#2563EB]">Express</span></span>
        </button>
        <div className="flex-1 flex flex-col justify-center relative">
          <h2 className="text-4xl font-black text-white mb-4">Regístrate y obtén<br /><span className="text-[#2563EB]">S/ 15 de crédito</span><br />gratis.</h2>
          <p className="text-slate-400 mb-8">Crea tu cuenta en segundos y comienza a pedir tu comida favorita.</p>
          {["✅ Sin cargo de activación", "✅ Cancela cuando quieras", "✅ Soporte 24/7", "✅ Más de 150 restaurantes"].map((f) => (
            <p key={f} className="text-slate-300 text-sm mb-2">{f}</p>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-[#0F172A] mb-2">Crea tu cuenta</h1>
            <p className="text-slate-500 text-sm">Es gratis y toma menos de 2 minutos</p>
          </div>
          <div className="flex flex-col gap-4 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <Input label="Nombre" placeholder="Juan" />
              <Input label="Apellido" placeholder="Pérez" />
            </div>
            <Input label="Correo electrónico" type="email" placeholder="tu@email.com" icon={<Mail size={16} />} />
            <Input label="Teléfono" type="tel" placeholder="+51 999 999 999" icon={<Phone size={16} />} />
            <Input label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" icon={<Lock size={16} />} />
          </div>
          <label className="flex items-start gap-2 text-sm text-slate-600 mb-6 cursor-pointer">
            <input type="checkbox" className="mt-0.5 rounded" />
            <span>Acepto los <button className="text-blue-600 font-semibold">Términos de servicio</button> y la <button className="text-blue-600 font-semibold">Política de privacidad</button></span>
          </label>
          <Btn onClick={() => navigate("dashboard")} size="lg" className="w-full mb-4">Crear cuenta gratuita</Btn>
          <p className="text-center text-sm text-slate-500">
            ¿Ya tienes cuenta?{" "}
            <button onClick={() => navigate("login")} className="text-blue-600 font-bold hover:underline">Inicia sesión</button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────

function DashboardScreen({ navigate, cart }: { navigate: (s: string) => void; cart: CartItem[] }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-[#0F172A] pt-16 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&auto=format" alt="María" className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover" />
              <div>
                <p className="text-slate-400 text-sm">Buenos días,</p>
                <p className="text-white font-bold text-lg">María García 👋</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <Bell size={20} /><span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
              </button>
              <button onClick={() => navigate("cart")} className="relative p-2 text-slate-400 hover:text-white transition-colors">
                <ShoppingCart size={20} />
                {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
              </button>
              <button onClick={() => navigate("profile")} className="p-1">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&auto=format" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
              </button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              placeholder="¿Qué quieres comer hoy?"
              className="w-full bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500/50 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-12">
        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Mis pedidos", icon: "📦", screen: "tracking" },
            { label: "Favoritos", icon: "❤️", screen: "restaurants" },
            { label: "Ofertas", icon: "🔥", screen: "restaurants" },
            { label: "Mi perfil", icon: "👤", screen: "profile" },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => navigate(a.screen)}
              className="bg-white rounded-[18px] p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all text-center"
            >
              <div className="text-3xl mb-2">{a.icon}</div>
              <p className="text-slate-700 font-semibold text-sm">{a.label}</p>
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#0F172A] mb-4">Categorías</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              { label: "Todo", emoji: "🍽️", active: true },
              { label: "Sushi", emoji: "🍣" }, { label: "Pizza", emoji: "🍕" },
              { label: "Burgers", emoji: "🍔" }, { label: "Saludable", emoji: "🥗" },
              { label: "Tacos", emoji: "🌮" }, { label: "Café", emoji: "☕" },
              { label: "Postres", emoji: "🍰" },
            ].map((c) => (
              <button
                key={c.label}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all",
                  c.active ? "bg-[#0F172A] text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
                )}
              >
                <span>{c.emoji}</span> {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurants grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#0F172A]">Restaurantes populares</h2>
            <button onClick={() => navigate("restaurants")} className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
              Ver todos <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {restaurants.slice(0, 6).map((r) => (
              <RestaurantCard key={r.id} r={r} onClick={() => navigate("restaurant-detail")} />
            ))}
          </div>
        </div>

        {/* Recent order */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-[#0F172A] mb-4">Pedido reciente</h2>
          <div className="bg-white rounded-[18px] p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Sushi Nomo · #DE-4821</p>
                  <p className="text-slate-500 text-sm">Hace 2 horas · S/ 95.00</p>
                </div>
              </div>
              <Badge color="green">Entregado</Badge>
            </div>
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {["Dragon Roll", "Rainbow Roll", "Sake Frío"].map((item) => (
                <span key={item} className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-full font-medium">{item}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <Btn variant="outline" size="sm" className="flex-1">Ver detalles</Btn>
              <Btn size="sm" className="flex-1" onClick={() => navigate("restaurant-detail")}>Pedir de nuevo</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── RESTAURANTS ───────────────────────────────────────────────────────────────

function RestaurantsScreen({ navigate }: { navigate: (s: string) => void }) {
  const [activeFilter, setActiveFilter] = useState("Todo");
  const categories = ["Todo", "Japonesa", "Pizza", "Hamburguesas", "Saludable", "Mexicana", "Café"];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16">
      <div className="bg-white border-b border-slate-100 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-black text-[#0F172A] mb-4">Restaurantes</h1>
          <div className="flex gap-3 items-center mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input placeholder="Buscar restaurante..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Filter size={15} /> Filtros
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveFilter(c)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all",
                  activeFilter === c ? "bg-[#0F172A] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-slate-500 text-sm mb-6">{restaurants.length} restaurantes disponibles cerca de ti</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} r={r} onClick={() => navigate("restaurant-detail")} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── RESTAURANT DETAIL ─────────────────────────────────────────────────────────

function RestaurantDetailScreen({ navigate, cart, addToCart }: {
  navigate: (s: string) => void; cart: CartItem[]; addToCart: (item: CartItem) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("Rolls Especiales");
  const categories = Object.keys(menuItems);
  const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16">
      <div className="relative h-64 bg-slate-800 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1200&h=400&fit=crop&auto=format" alt="Sushi Nomo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button onClick={() => navigate("restaurants")} className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-xl hover:bg-white/30 transition-all">
          <ArrowLeft size={20} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 rounded-[16px] border-4 border-white bg-white overflow-hidden shadow-xl flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=80&h=80&fit=crop&auto=format" alt="Sushi Nomo" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 pb-1">
              <h1 className="text-white text-2xl font-black">🍣 Sushi Nomo</h1>
              <div className="flex items-center gap-3 text-sm text-white/80 flex-wrap">
                <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" /> 4.9 (1.2k reseñas)</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock size={12} /> 20-30 min</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Truck size={12} /> Gratis</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-xl hover:bg-white/30 transition-all"><Heart size={17} /></button>
              <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-xl hover:bg-white/30 transition-all"><Share2 size={17} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-8 items-start">
        <div className="flex-1 min-w-0">
          <div className="flex gap-1 mb-6 border-b border-slate-200 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={cn(
                  "px-4 py-2.5 text-sm font-semibold transition-all border-b-2 -mb-px whitespace-nowrap",
                  activeCategory === c ? "border-[#2563EB] text-[#2563EB]" : "border-transparent text-slate-500 hover:text-slate-800",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {menuItems[activeCategory].map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[18px] p-4 shadow-sm border border-slate-100 flex gap-4 group hover:shadow-md transition-all"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-[12px] flex items-center justify-center text-4xl flex-shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 mb-0.5">{item.name}</h3>
                  <p className="text-slate-500 text-sm mb-3 truncate">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#0F172A] font-black text-lg">S/ {item.price}.00</span>
                    <button
                      onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1, emoji: item.emoji })}
                      className="flex items-center gap-1.5 bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-blue-200"
                    >
                      <Plus size={15} /> Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 sticky top-24">
            <h3 className="font-black text-[#0F172A] text-lg mb-4">Tu pedido</h3>
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-3">🛒</div>
                <p className="text-slate-500 text-sm">Tu carrito está vacío.<br />Agrega productos para continuar.</p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3 mb-5">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <span className="text-xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                        <p className="text-slate-400 text-xs">S/ {item.price}.00</p>
                      </div>
                      <span className="text-sm font-bold text-slate-700 flex-shrink-0">×{item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 pt-4 mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="font-semibold">S/ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Delivery</span>
                    <span className="font-semibold text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between font-black text-[#0F172A] mt-3 pt-3 border-t border-slate-100">
                    <span>Total</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </div>
                </div>
                <Btn onClick={() => navigate("cart")} size="md" className="w-full">
                  Ver carrito <ChevronRight size={16} />
                </Btn>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CART ──────────────────────────────────────────────────────────────────────

function CartScreen({ navigate, cart, addToCart, removeFromCart }: {
  navigate: (s: string) => void; cart: CartItem[]; addToCart: (i: CartItem) => void; removeFromCart: (id: number) => void;
}) {
  const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate("restaurant-detail")} className="p-2 hover:bg-slate-200 rounded-xl transition-all"><ArrowLeft size={20} /></button>
          <h1 className="text-2xl font-black text-[#0F172A]">Mi carrito</h1>
          <Badge color="blue">{cart.length} {cart.length === 1 ? "producto" : "productos"}</Badge>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[24px] p-12 text-center shadow-sm border border-slate-100">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Tu carrito está vacío</h3>
            <p className="text-slate-500 mb-6">Explora nuestros restaurantes y agrega productos deliciosos.</p>
            <Btn onClick={() => navigate("restaurants")} size="lg">Explorar restaurantes</Btn>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 mb-5 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=36&h=36&fit=crop&auto=format" alt="Sushi Nomo" className="w-9 h-9 rounded-xl object-cover" />
                <div>
                  <p className="font-bold text-slate-900 text-sm">🍣 Sushi Nomo</p>
                  <p className="text-slate-400 text-xs">Entrega en 20-30 min · Gratis</p>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={item.id} className="p-4 flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-[12px] flex items-center justify-center text-2xl flex-shrink-0">{item.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{item.name}</p>
                      <p className="text-slate-400 text-sm">S/ {item.price}.00 c/u</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-all">
                        <Minus size={13} />
                      </button>
                      <span className="w-6 text-center font-bold text-slate-900 text-sm">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center hover:bg-blue-700 transition-all">
                        <Plus size={13} />
                      </button>
                    </div>
                    <p className="font-bold text-slate-900 w-16 text-right text-sm flex-shrink-0">S/ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-[18px] p-4 flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center flex-shrink-0">
                <Percent size={17} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 text-sm">¿Tienes un código de descuento?</p>
                <p className="text-slate-500 text-xs">Aplica tu cupón antes de continuar</p>
              </div>
              <button className="text-blue-600 font-bold text-sm">Aplicar</button>
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 mb-6">
              <h3 className="font-bold text-slate-900 mb-4">Resumen del pedido</h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span className="font-semibold">S/ {total.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Envío</span><span className="font-semibold text-green-600">Gratis</span></div>
                <div className="flex justify-between"><span className="text-slate-500">IGV (18%)</span><span className="font-semibold">S/ {(total * 0.18).toFixed(2)}</span></div>
                <div className="border-t border-slate-100 pt-3 mt-1 flex justify-between font-black text-[#0F172A] text-base">
                  <span>Total</span><span>S/ {(total * 1.18).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Btn onClick={() => navigate("checkout")} size="lg" className="w-full shadow-xl shadow-blue-100">
              Continuar al checkout <ArrowRight size={18} />
            </Btn>
          </>
        )}
      </div>
    </div>
  );
}

// ── CHECKOUT ──────────────────────────────────────────────────────────────────

function CheckoutScreen({ navigate, cart }: { navigate: (s: string) => void; cart: CartItem[] }) {
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("visa");
  const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate("cart")} className="p-2 hover:bg-slate-200 rounded-xl transition-all"><ArrowLeft size={20} /></button>
          <h1 className="text-2xl font-black text-[#0F172A]">Checkout</h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center mb-10">
          {["Dirección", "Pago", "Confirmar"].map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                  step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-[#2563EB] text-white shadow-lg shadow-blue-200" : "bg-slate-200 text-slate-400")}>
                  {step > i + 1 ? <Check size={16} /> : i + 1}
                </div>
                <span className={cn("text-xs mt-1.5 font-medium", step === i + 1 ? "text-[#2563EB]" : "text-slate-400")}>{s}</span>
              </div>
              {i < 2 && <div className={cn("flex-1 h-0.5 mx-3 -mt-4", step > i + 1 ? "bg-green-400" : "bg-slate-200")} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            {step === 1 && (
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-5">Dirección de entrega</h3>
                <div className="flex flex-col gap-4 mb-5">
                  <Input label="Dirección completa" placeholder="Av. Javier Prado Este 123" icon={<MapPin size={16} />} />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Distrito" placeholder="San Isidro" />
                    <Input label="Referencia" placeholder="Piso 3, oficina 301" />
                  </div>
                  <Input label="Instrucciones adicionales" placeholder="Dejar en recepción..." />
                </div>
                <div className="w-full h-40 bg-gradient-to-br from-blue-50 to-slate-100 rounded-[14px] relative overflow-hidden border border-slate-200 mb-5">
                  <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(37,99,235,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 bg-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-blue-200">
                        <MapPin size={18} className="text-white" />
                      </div>
                      <p className="text-slate-600 text-xs font-medium">Av. Javier Prado Este 123, San Isidro</p>
                    </div>
                  </div>
                </div>
                <Btn onClick={() => setStep(2)} size="lg" className="w-full">Continuar al pago <ArrowRight size={18} /></Btn>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-5">Método de pago</h3>
                <div className="flex flex-col gap-3 mb-6">
                  {[
                    { id: "visa", label: "Visa terminada en 4242", icon: "💳", sub: "Débito · Vence 12/26" },
                    { id: "mastercard", label: "Mastercard terminada en 8888", icon: "💳", sub: "Crédito · Vence 08/27" },
                    { id: "yape", label: "Yape", icon: "📱", sub: "+51 999 123 456" },
                    { id: "plin", label: "Plin", icon: "💜", sub: "+51 999 789 012" },
                    { id: "cash", label: "Efectivo", icon: "💵", sub: "Paga al repartidor" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPayment(m.id)}
                      className={cn("flex items-center gap-4 p-4 rounded-[14px] border-2 transition-all text-left",
                        payment === m.id ? "border-[#2563EB] bg-blue-50" : "border-slate-200 hover:border-slate-300")}
                    >
                      <span className="text-2xl">{m.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 text-sm">{m.label}</p>
                        <p className="text-slate-400 text-xs">{m.sub}</p>
                      </div>
                      <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        payment === m.id ? "border-[#2563EB] bg-[#2563EB]" : "border-slate-300")}>
                        {payment === m.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </button>
                  ))}
                </div>
                <Btn onClick={() => setStep(3)} size="lg" className="w-full">Continuar <ArrowRight size={18} /></Btn>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-5">Confirmar pedido</h3>
                <div className="flex flex-col gap-3 mb-6">
                  {[
                    { icon: <MapPin size={18} className="text-slate-400" />, label: "Entrega en", value: "Av. Javier Prado Este 123, San Isidro" },
                    { icon: <CreditCard size={18} className="text-slate-400" />, label: "Método de pago", value: payment === "visa" ? "Visa •••• 4242" : payment === "mastercard" ? "Mastercard •••• 8888" : payment },
                    { icon: <Clock size={18} className="text-slate-400" />, label: "Tiempo estimado", value: "20-30 minutos" },
                  ].map((d) => (
                    <div key={d.label} className="flex items-start gap-3 p-4 bg-slate-50 rounded-[14px]">
                      <div className="mt-0.5 flex-shrink-0">{d.icon}</div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{d.label}</p>
                        <p className="text-slate-500 text-sm capitalize">{d.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Btn onClick={() => navigate("tracking")} size="lg" className="w-full shadow-xl shadow-blue-100">
                  Confirmar pedido · S/ {(total * 1.18).toFixed(2)}
                </Btn>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4 text-sm">Resumen</h3>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-400">×{item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">S/ {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-slate-100 pt-3 mt-3 flex flex-col gap-1.5 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><span>S/ {total.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Envío</span><span className="text-green-600">Gratis</span></div>
                <div className="flex justify-between"><span className="text-slate-500">IGV (18%)</span><span>S/ {(total * 0.18).toFixed(2)}</span></div>
                <div className="flex justify-between font-black text-[#0F172A] text-base mt-2 pt-2 border-t border-slate-100">
                  <span>Total</span><span>S/ {(total * 1.18).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TRACKING ──────────────────────────────────────────────────────────────────

function TrackingScreen({ navigate }: { navigate: (s: string) => void }) {
  const steps = [
    { label: "Pedido recibido", time: "12:34 PM", done: true },
    { label: "Restaurante preparando", time: "12:36 PM", done: true },
    { label: "Repartidor recogió el pedido", time: "12:52 PM", done: true },
    { label: "En camino a tu dirección", time: "12:54 PM", done: true },
    { label: "Entregado", time: "", done: false },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16">
      {/* Map simulation */}
      <div className="relative h-64 bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.06)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 256" preserveAspectRatio="none">
          <path d="M 150,200 Q 300,150 400,120 Q 500,90 620,75" stroke="#2563EB" strokeWidth="3" strokeDasharray="10,6" fill="none" />
        </svg>
        {[
          { left: "18%", top: "72%", bg: "bg-[#2563EB]", icon: <Store size={15} className="text-white" />, label: "🍣 Sushi Nomo" },
          { left: "50%", top: "45%", bg: "bg-orange-400", icon: <Bike size={15} className="text-white" />, label: "Carlos R.", bounce: true },
          { left: "76%", top: "28%", bg: "bg-green-500", icon: <Home size={15} className="text-white" />, label: "Tu dirección" },
        ].map((m, i) => (
          <div key={i} className="absolute" style={{ left: m.left, top: m.top }}>
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-lg", m.bg, m.bounce && "animate-bounce")}>{m.icon}</div>
            <div className="absolute top-6 left-2 bg-white rounded-lg px-2 py-1 shadow text-xs font-semibold whitespace-nowrap">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto px-6 py-6">
        {/* ETA */}
        <div className="bg-[#0F172A] rounded-[24px] p-5 mb-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-slate-400 text-sm">Tiempo estimado de llegada</p>
              <p className="text-4xl font-black">8 minutos</p>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Truck size={28} className="text-[#2563EB]" />
            </div>
          </div>
          <div className="bg-white/10 rounded-xl px-4 py-2.5 text-sm">
            📦 Pedido #DE-4821 · Sushi Nomo · S/ 95.00
          </div>
        </div>

        {/* Driver */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 mb-5">
          <p className="font-bold text-slate-900 mb-4">Tu repartidor</p>
          <div className="flex items-center gap-4">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop&auto=format" alt="Carlos" className="w-14 h-14 rounded-full object-cover border-2 border-green-400" />
            <div className="flex-1">
              <p className="font-bold text-slate-900">Carlos Ramos</p>
              <div className="flex items-center gap-1 mb-1">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span className="text-amber-500 font-semibold text-sm">4.9</span>
                <span className="text-slate-400 text-xs">(238 entregas)</span>
              </div>
              <p className="text-slate-500 text-xs">🏍️ Moto · Placa: ABC-123</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-[#0F172A] text-white rounded-xl flex items-center justify-center hover:bg-slate-800 transition-all">
                <Phone size={16} />
              </button>
              <button className="w-10 h-10 bg-[#2563EB] text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all">
                <MessageCircle size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100">
          <p className="font-bold text-slate-900 mb-5">Estado del pedido</p>
          {steps.map((s, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                  s.done ? "bg-green-500" : i === steps.findIndex((x) => !x.done) ? "bg-[#2563EB] ring-4 ring-blue-100" : "bg-slate-200")}>
                  {s.done ? <Check size={14} className="text-white" /> : <div className="w-3 h-3 bg-white rounded-full" />}
                </div>
                {i < steps.length - 1 && <div className={cn("w-0.5 h-8 my-1", s.done ? "bg-green-300" : "bg-slate-200")} />}
              </div>
              <div className="pb-5">
                <p className={cn("font-semibold text-sm",
                  s.done ? "text-slate-900" : i === steps.findIndex((x) => !x.done) ? "text-[#2563EB]" : "text-slate-400")}>
                  {s.label}
                </p>
                {s.time && <p className="text-slate-400 text-xs">{s.time}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────────────────────────

function AdminScreen({ navigate }: { navigate: (s: string) => void }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar navigate={navigate} active="admin" type="admin" />
      <div className="flex-1 bg-[#F8FAFC] overflow-auto min-w-0">
        <div className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-[#0F172A]">Dashboard</h1>
            <p className="text-slate-500 text-xs mt-0.5">Junio 2024 · Todas las ciudades</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input placeholder="Buscar..." className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <button className="relative p-2 text-slate-500 hover:text-slate-800">
              <Bell size={18} /><span className="absolute top-1 right-1 w-2 h-2 bg-[#2563EB] rounded-full" />
            </button>
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=36&h=36&fit=crop&auto=format" alt="Admin" className="w-9 h-9 rounded-full object-cover" />
          </div>
        </div>

        <div className="p-6 lg:p-8">
          {/* KPI */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            <StatCard icon={<DollarSign size={20} />} label="Ingresos del mes" value="S/ 89,240" change="+18.5%" color="blue" />
            <StatCard icon={<Package size={20} />} label="Pedidos totales" value="3,842" change="+12.3%" color="green" />
            <StatCard icon={<Users size={20} />} label="Clientes activos" value="12,480" change="+8.7%" color="orange" />
            <StatCard icon={<Store size={20} />} label="Restaurantes" value="152" change="+4.2%" color="purple" />
          </div>

          {/* Charts row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
            <div className="lg:col-span-2 bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-slate-900">Ingresos mensuales</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Últimos 7 meses</p>
                </div>
                <Badge color="green">+18.5%</Badge>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `S/${v / 1000}k`} />
                  <Tooltip formatter={(v: number) => [`S/ ${v.toLocaleString()}`, "Ingresos"]} contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
                  <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1">Estado de pedidos</h3>
              <p className="text-slate-400 text-xs mb-4">Distribución actual</p>
              <ResponsiveContainer width="100%" height={165}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={52} outerRadius={75} paddingAngle={3} dataKey="value">
                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                    <span className="text-xs text-slate-600 truncate">{d.name} ({d.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Charts row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
            <div className="lg:col-span-2 bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1">Pedidos por hora</h3>
              <p className="text-slate-400 text-xs mb-5">Hoy · Hora pico: 6pm (93 pedidos)</p>
              <ResponsiveContainer width="100%" height={175}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 12 }} />
                  <Bar dataKey="orders" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-5">Top restaurantes</h3>
              <div className="flex flex-col gap-4">
                {topRestaurants.map((r, i) => (
                  <div key={r.name} className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-300 w-4">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">{r.name}</p>
                      <p className="text-slate-400 text-xs">{r.orders} pedidos</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-slate-900">{r.revenue}</p>
                      <span className="text-xs text-green-600 font-semibold">{r.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders table */}
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Últimos pedidos</h3>
              <Btn variant="outline" size="sm">Ver todos</Btn>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    {["ID", "Cliente", "Restaurante", "Total", "Estado", "Hora"].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono font-semibold text-[#2563EB]">{order.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{order.restaurant}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 whitespace-nowrap">{order.amount}</td>
                      <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                      <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── RESTAURANT PANEL ──────────────────────────────────────────────────────────

function RestaurantPanelScreen({ navigate }: { navigate: (s: string) => void }) {
  const activeOrders = [
    { id: "#DE-4825", items: "Dragon Roll ×2, Sake ×1", time: "hace 3 min", status: "Nuevo" },
    { id: "#DE-4824", items: "Rainbow Roll ×1, Té Verde ×2", time: "hace 8 min", status: "Preparando" },
    { id: "#DE-4823", items: "Spicy Tuna Roll ×3", time: "hace 15 min", status: "Listo" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar navigate={navigate} active="restaurant-panel" type="restaurant" />
      <div className="flex-1 bg-[#F8FAFC] overflow-auto min-w-0">
        <div className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-[#0F172A]">🍣 Sushi Nomo</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs text-green-600 font-medium">Abierto · Cierra a las 10pm</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Btn variant="outline" size="sm"><Settings size={13} /> Configuración</Btn>
            <img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=36&h=36&fit=crop&auto=format" alt="Sushi" className="w-9 h-9 rounded-xl object-cover" />
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            <StatCard icon={<DollarSign size={20} />} label="Ventas hoy" value="S/ 2,340" change="+23%" color="green" />
            <StatCard icon={<Package size={20} />} label="Pedidos hoy" value="38" change="+15%" color="blue" />
            <StatCard icon={<Star size={20} />} label="Calificación" value="4.9 ★" color="orange" />
            <StatCard icon={<TrendingUp size={20} />} label="Ticket promedio" value="S/ 61.6" change="+7%" color="purple" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">Pedidos activos</h3>
                  <Badge color="blue">{activeOrders.length} nuevos</Badge>
                </div>
                <div className="divide-y divide-slate-100">
                  {activeOrders.map((order) => (
                    <div key={order.id} className="p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                      <div className={cn("w-3 h-3 rounded-full flex-shrink-0",
                        order.status === "Nuevo" ? "bg-[#2563EB]" : order.status === "Preparando" ? "bg-orange-400" : "bg-green-500")} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-900 text-sm font-mono">{order.id}</span>
                          <Badge color={order.status === "Nuevo" ? "blue" : order.status === "Preparando" ? "orange" : "green"}>{order.status}</Badge>
                        </div>
                        <p className="text-slate-500 text-xs">{order.items}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{order.time}</p>
                      </div>
                      {order.status === "Nuevo" && <Btn size="sm">Aceptar</Btn>}
                      {order.status === "Preparando" && <Btn size="sm" variant="secondary">Marcar listo</Btn>}
                      {order.status === "Listo" && <Btn size="sm" variant="ghost">Entregado ✓</Btn>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-5">Ventas de la semana</h3>
                <ResponsiveContainer width="100%" height={175}>
                  <BarChart data={[
                    { day: "Lun", v: 1200 }, { day: "Mar", v: 1850 }, { day: "Mié", v: 1100 },
                    { day: "Jue", v: 2200 }, { day: "Vie", v: 2800 }, { day: "Sáb", v: 3400 }, { day: "Dom", v: 2340 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `S/${v}`} />
                    <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                    <Bar dataKey="v" fill="#2563EB" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Productos populares</h3>
                {[
                  { name: "Dragon Roll", orders: 48, revenue: "S/ 1,824" },
                  { name: "Rainbow Roll", orders: 35, revenue: "S/ 1,470" },
                  { name: "Spicy Tuna Roll", orders: 29, revenue: "S/ 1,015" },
                ].map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3 mb-3 last:mb-0">
                    <span className="text-xs font-black text-slate-300 w-4">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.orders} pedidos</p>
                    </div>
                    <span className="text-sm font-bold text-green-600 flex-shrink-0">{p.revenue}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Últimas reseñas</h3>
                {[
                  { user: "María G.", rating: 5, comment: "Excelente calidad y rapidísimo. El Dragon Roll estaba impresionante." },
                  { user: "Carlos L.", rating: 4, comment: "Muy bueno, el sushi estaba fresco. Recomendado." },
                ].map((r) => (
                  <div key={r.user} className="mb-4 pb-4 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900 text-sm">{r.user}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DRIVER PANEL ──────────────────────────────────────────────────────────────

function DriverPanelScreen({ navigate }: { navigate: (s: string) => void }) {
  const [online, setOnline] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar navigate={navigate} active="driver-panel" type="driver" />
      <div className="flex-1 bg-[#F8FAFC] overflow-auto min-w-0">
        <div className="bg-[#0F172A] px-8 py-7">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&auto=format" alt="Carlos" className="w-12 h-12 rounded-full object-cover border-2 border-blue-500" />
              <div>
                <p className="text-slate-400 text-sm">Hola,</p>
                <p className="text-white font-bold text-lg">Carlos Ramos 👋</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={cn("text-sm font-bold", online ? "text-green-400" : "text-slate-400")}>
                {online ? "EN LÍNEA" : "FUERA DE LÍNEA"}
              </span>
              <button
                onClick={() => setOnline(!online)}
                className={cn("w-14 h-7 rounded-full transition-all duration-300 relative", online ? "bg-green-400" : "bg-slate-600")}
              >
                <div className={cn("w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300", online ? "left-8" : "left-1")} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Ganancias hoy", value: "S/ 87.50", icon: "💰" },
              { label: "Entregas hoy", value: "12", icon: "📦" },
              { label: "Calificación", value: "4.9 ★", icon: "⭐" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <p className="text-white font-black text-xl">{s.value}</p>
                <p className="text-slate-400 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 lg:p-8">
          {/* Map */}
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden mb-6">
            <div className="relative h-52 bg-gradient-to-br from-blue-50 to-slate-100">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.06)_1px,transparent_1px)] bg-[size:25px_25px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center shadow-xl shadow-orange-200 animate-bounce">
                  <Bike size={22} className="text-white" />
                </div>
                <div className="w-24 h-24 bg-orange-400/15 rounded-full absolute -inset-6 animate-ping" />
              </div>
              <div className="absolute bottom-3 left-4 bg-white rounded-xl px-3 py-2 shadow text-xs font-semibold text-slate-700">
                📍 Miraflores, Lima
              </div>
              <button className="absolute bottom-3 right-4 bg-[#2563EB] text-white p-2 rounded-xl hover:bg-blue-700 transition-all">
                <Navigation size={16} />
              </button>
            </div>
          </div>

          {/* Available orders */}
          <div className="mb-6">
            <h3 className="font-bold text-[#0F172A] mb-4 flex items-center gap-2">
              Pedidos disponibles <Badge color="blue">3</Badge>
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { id: "#DE-4826", from: "Sushi Nomo", to: "Miraflores", dist: "2.3 km", earn: "S/ 8.50" },
                { id: "#DE-4827", from: "Burgers & Co", to: "San Isidro", dist: "1.8 km", earn: "S/ 7.00" },
                { id: "#DE-4828", from: "La Pizzeria", to: "Surco", dist: "3.1 km", earn: "S/ 10.00" },
              ].map((order) => (
                <div key={order.id} className="bg-white rounded-[18px] p-5 shadow-sm border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package size={20} className="text-[#2563EB]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-900 text-sm">{order.from}</span>
                      <ArrowRight size={12} className="text-slate-400 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{order.to}</span>
                    </div>
                    <p className="text-slate-400 text-xs">{order.id} · {order.dist}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-black text-green-600 text-lg">{order.earn}</p>
                    <Btn size="sm" className="mt-1">Aceptar</Btn>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Earnings chart */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-5">Ganancias esta semana · <span className="text-green-600">S/ 624.50</span></h3>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={[
                { day: "Lun", earn: 65 }, { day: "Mar", earn: 82 }, { day: "Mié", earn: 54 },
                { day: "Jue", earn: 91 }, { day: "Vie", earn: 110 }, { day: "Sáb", earn: 135 }, { day: "Dom", earn: 87.5 },
              ]}>
                <defs>
                  <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `S/${v}`} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="earn" stroke="#22C55E" strokeWidth={2.5} fill="url(#earnGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PROFILE ───────────────────────────────────────────────────────────────────

function ProfileScreen({ navigate }: { navigate: (s: string) => void }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16">
      <div className="bg-[#0F172A] pb-24 pt-8 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative inline-block mb-4">
            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=96&h=96&fit=crop&auto=format" alt="María" className="w-24 h-24 rounded-full object-cover border-4 border-white" />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all">
              <Camera size={14} className="text-white" />
            </button>
          </div>
          <h1 className="text-white text-2xl font-black">María García</h1>
          <p className="text-slate-400 text-sm mt-1">maria.garcia@email.com · +51 999 123 456</p>
          <div className="flex justify-center gap-8 mt-5">
            {[{ v: "42", l: "Pedidos" }, { v: "S/ 1,284", l: "Gastado" }, { v: "8", l: "Favoritos" }].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-white font-black text-xl">{s.v}</p>
                <p className="text-slate-500 text-xs">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-12">
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden mb-5">
          {[
            { icon: <MapPin size={18} />, label: "Mis direcciones", sub: "3 direcciones guardadas" },
            { icon: <CreditCard size={18} />, label: "Métodos de pago", sub: "Visa •••• 4242, Yape" },
            { icon: <Package size={18} />, label: "Historial de pedidos", sub: "42 pedidos realizados" },
            { icon: <Heart size={18} />, label: "Favoritos", sub: "8 restaurantes guardados" },
            { icon: <Bell size={18} />, label: "Notificaciones", sub: "Activadas" },
            { icon: <Shield size={18} />, label: "Seguridad", sub: "2FA activado" },
            { icon: <Settings size={18} />, label: "Configuración", sub: "Tema, idioma y más", screen: "settings" },
          ].map((item, i, arr) => (
            <button
              key={item.label}
              onClick={() => item.screen && navigate(item.screen)}
              className={cn("w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-all text-left", i < arr.length - 1 && "border-b border-slate-100")}
            >
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 flex-shrink-0">{item.icon}</div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 text-sm">{item.label}</p>
                <p className="text-slate-400 text-xs">{item.sub}</p>
              </div>
              <ChevronRight size={16} className="text-slate-300 flex-shrink-0" />
            </button>
          ))}
        </div>

        <button onClick={() => navigate("landing")} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-50 text-red-600 rounded-[18px] font-semibold hover:bg-red-100 transition-all mb-10">
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>
    </div>
  );
}

// ── SETTINGS ──────────────────────────────────────────────────────────────────

function SettingsScreen({ navigate, darkMode, toggleDark }: {
  navigate: (s: string) => void; darkMode: boolean; toggleDark: () => void;
}) {
  const [lang, setLang] = useState("es");
  const [notifs, setNotifs] = useState({ orders: true, promos: true, news: false });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate("profile")} className="p-2 hover:bg-slate-200 rounded-xl transition-all"><ArrowLeft size={20} /></button>
          <h1 className="text-2xl font-black text-[#0F172A]">Configuración</h1>
        </div>

        <div className="flex flex-col gap-5">
          {/* Appearance */}
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Apariencia</h3>
            </div>
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                  {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Tema {darkMode ? "oscuro" : "claro"}</p>
                  <p className="text-slate-400 text-xs">Cambiar la apariencia de la app</p>
                </div>
              </div>
              <button onClick={toggleDark} className={cn("w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0", darkMode ? "bg-[#2563EB]" : "bg-slate-300")}>
                <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300", darkMode ? "left-7" : "left-1")} />
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-900">Idioma</h3></div>
            <div className="px-6 py-4 flex flex-col gap-2">
              {[{ id: "es", label: "Español", flag: "🇵🇪" }, { id: "en", label: "English", flag: "🇺🇸" }, { id: "pt", label: "Português", flag: "🇧🇷" }].map((l) => (
                <button key={l.id} onClick={() => setLang(l.id)} className={cn("flex items-center gap-3 p-3 rounded-xl transition-all text-left", lang === l.id ? "bg-blue-50 border border-blue-200" : "hover:bg-slate-50")}>
                  <span className="text-xl">{l.flag}</span>
                  <span className="font-medium text-slate-900 text-sm flex-1">{l.label}</span>
                  {lang === l.id && <Check size={16} className="text-[#2563EB] flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-900">Notificaciones</h3></div>
            {(Object.keys(notifs) as Array<keyof typeof notifs>).map((key, i, arr) => {
              const labels: Record<keyof typeof notifs, { label: string; sub: string }> = {
                orders: { label: "Estado de pedidos", sub: "Actualizaciones en tiempo real" },
                promos: { label: "Promociones y ofertas", sub: "Descuentos exclusivos" },
                news: { label: "Novedades", sub: "Nuevos restaurantes y funciones" },
              };
              return (
                <div key={key} className={cn("flex items-center justify-between px-6 py-4", i < arr.length - 1 && "border-b border-slate-100")}>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{labels[key].label}</p>
                    <p className="text-slate-400 text-xs">{labels[key].sub}</p>
                  </div>
                  <button
                    onClick={() => setNotifs((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className={cn("w-12 h-6 rounded-full transition-all duration-300 relative flex-shrink-0", notifs[key] ? "bg-[#2563EB]" : "bg-slate-300")}
                  >
                    <div className={cn("w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300", notifs[key] ? "left-7" : "left-1")} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Security */}
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-900">Seguridad</h3></div>
            {[
              { icon: <Lock size={18} />, label: "Cambiar contraseña", sub: "Última actualización hace 30 días" },
              { icon: <Shield size={18} />, label: "Autenticación en 2 pasos", sub: "Activada · Google Authenticator" },
              { icon: <FileText size={18} />, label: "Sesiones activas", sub: "2 dispositivos conectados" },
            ].map((item, i, arr) => (
              <button key={item.label} className={cn("w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 text-left transition-all", i < arr.length - 1 && "border-b border-slate-100")}>
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 flex-shrink-0">{item.icon}</div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{item.label}</p>
                  <p className="text-slate-400 text-xs">{item.sub}</p>
                </div>
                <ChevronRight size={16} className="text-slate-300 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── HELP ──────────────────────────────────────────────────────────────────────

function HelpScreen({ navigate }: { navigate: (s: string) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "¿Cómo realizo un pedido?", a: "Explora los restaurantes disponibles, agrega productos al carrito, elige tu método de pago y confirma tu pedido. Recibirás actualizaciones en tiempo real." },
    { q: "¿Cuánto tiempo tarda la entrega?", a: "El tiempo de entrega varía según el restaurante y tu ubicación, pero generalmente es de 20 a 40 minutos. El tiempo estimado lo verás en cada restaurante." },
    { q: "¿Puedo cancelar mi pedido?", a: "Puedes cancelar tu pedido en los primeros 2 minutos después de realizarlo, antes de que el restaurante comience a prepararlo." },
    { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos tarjetas Visa, Mastercard, Yape, Plin y pago en efectivo. Todos los pagos digitales son procesados de forma segura." },
    { q: "¿Cómo contacto al repartidor?", a: "Una vez que tu pedido esté en camino, puedes chatear o llamar directamente al repartidor desde la pantalla de seguimiento." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16">
      <div className="bg-[#0F172A] py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.07)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative">
          <h1 className="text-3xl font-black text-white mb-3">¿Cómo podemos ayudarte?</h1>
          <p className="text-slate-400 mb-6">Encuentra respuestas rápidas o contáctanos directamente</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
            <input placeholder="Buscar en el centro de ayuda..." className="w-full bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-blue-500/50 backdrop-blur-sm" />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: <Package size={20} />, label: "Mis pedidos", color: "blue" },
            { icon: <CreditCard size={20} />, label: "Pagos", color: "green" },
            { icon: <Headphones size={20} />, label: "Contactar", color: "orange" },
          ].map((item) => (
            <button key={item.label} className="bg-white rounded-[18px] p-5 shadow-sm border border-slate-100 text-center hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3",
                item.color === "blue" ? "bg-blue-50 text-blue-600" : item.color === "green" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600")}>
                {item.icon}
              </div>
              <p className="text-slate-700 font-semibold text-sm">{item.label}</p>
            </button>
          ))}
        </div>

        <h2 className="text-xl font-black text-[#0F172A] mb-5">Preguntas frecuentes</h2>
        <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden mb-6">
          {faqs.map((faq, i) => (
            <div key={i} className={cn(i < faqs.length - 1 && "border-b border-slate-100")}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-all">
                <span className="flex-1 font-semibold text-slate-900 text-sm">{faq.q}</span>
                <ChevronDown size={16} className={cn("text-slate-400 transition-transform flex-shrink-0 duration-200", open === i && "rotate-180")} />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#0F172A] rounded-[24px] p-8 text-center">
          <div className="text-4xl mb-3">💬</div>
          <h3 className="text-white font-bold text-lg mb-2">¿No encontraste tu respuesta?</h3>
          <p className="text-slate-400 text-sm mb-6">Nuestro equipo de soporte está disponible 24/7 para ayudarte.</p>
          <div className="flex gap-3 justify-center">
            <Btn size="md"><MessageCircle size={16} /> Chat en vivo</Btn>
            <button className="flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white text-sm font-semibold rounded-[12px] hover:bg-white/10 transition-all">
              <Mail size={16} /> Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 404 ───────────────────────────────────────────────────────────────────────

function NotFoundScreen({ navigate }: { navigate: (s: string) => void }) {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="text-center relative">
        <p className="text-[120px] md:text-[160px] font-black text-white/5 leading-none select-none">404</p>
        <div className="-mt-12 mb-8">
          <div className="text-7xl mb-5">🚀</div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">Página no encontrada</h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
            Parece que esta página se fue de delivery y no regresó.<br />Volvamos a donde estábamos.
          </p>
        </div>
        <div className="flex gap-4 justify-center flex-wrap">
          <Btn onClick={() => navigate("landing")} size="lg" className="shadow-2xl shadow-blue-500/20">
            <Home size={18} /> Ir al inicio
          </Btn>
          <button onClick={() => navigate("restaurants")} className="flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-semibold rounded-[12px] hover:bg-white/10 transition-all">
            Ver restaurantes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "Dragon Roll", price: 38, quantity: 2, emoji: "🍣" },
    { id: 7, name: "Té Verde Matcha", price: 12, quantity: 1, emoji: "🍵" },
  ]);

  const navigate = (s: string) => {
    setScreen(s as Screen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing && existing.quantity > 1) return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      return prev.filter((i) => i.id !== id);
    });
  };

  const showNav = !["login", "register", "admin", "restaurant-panel", "driver-panel", "not-found"].includes(screen);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className={darkMode ? "dark" : ""}>
      {showNav && (
        <Navbar
          navigate={navigate}
          darkMode={darkMode}
          toggleDark={() => setDarkMode((d) => !d)}
          cart={cart}
          transparent={screen === "landing"}
        />
      )}
      {screen === "landing" && <LandingScreen navigate={navigate} />}
      {screen === "login" && <LoginScreen navigate={navigate} />}
      {screen === "register" && <RegisterScreen navigate={navigate} />}
      {screen === "dashboard" && <DashboardScreen navigate={navigate} cart={cart} />}
      {screen === "restaurants" && <RestaurantsScreen navigate={navigate} />}
      {screen === "restaurant-detail" && <RestaurantDetailScreen navigate={navigate} cart={cart} addToCart={addToCart} />}
      {screen === "cart" && <CartScreen navigate={navigate} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} />}
      {screen === "checkout" && <CheckoutScreen navigate={navigate} cart={cart} />}
      {screen === "tracking" && <TrackingScreen navigate={navigate} />}
      {screen === "admin" && <AdminScreen navigate={navigate} />}
      {screen === "restaurant-panel" && <RestaurantPanelScreen navigate={navigate} />}
      {screen === "driver-panel" && <DriverPanelScreen navigate={navigate} />}
      {screen === "profile" && <ProfileScreen navigate={navigate} />}
      {screen === "settings" && <SettingsScreen navigate={navigate} darkMode={darkMode} toggleDark={() => setDarkMode((d) => !d)} />}
      {screen === "help" && <HelpScreen navigate={navigate} />}
      {screen === "not-found" && <NotFoundScreen navigate={navigate} />}
    </div>
  );
}
