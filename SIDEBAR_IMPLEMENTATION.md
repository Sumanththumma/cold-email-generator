# Premium Collapsible Sidebar System

A production-ready collapsible sidebar implementation for Next.js 15 with glassmorphism effects, smooth animations, and professional UI patterns inspired by Linear, Notion, Cursor, and Vercel.

## 🎯 Features

- **Smooth Animations**: 300ms slide transitions using Framer Motion
- **Glassmorphism Design**: Frosted glass effects with blur and transparency
- **Responsive Toggle**: Floating circular button with icon animation
- **Zero Layout Shift**: Smooth content expansion without jumping
- **Dark Theme**: CONVERGE dark theme with zinc borders and white text
- **Production Ready**: Full TypeScript support with proper typing
- **Accessibility**: Semantic HTML and keyboard-friendly interactions

## 📁 Component Structure

```
src/components/shared/
├── WorkspaceLayout.tsx    # Main layout container (state management)
├── Sidebar.tsx            # Animated sidebar with content
├── SidebarToggle.tsx      # Floating toggle button
```

## 🚀 Quick Start

### 1. Wrap Your Page Content

In your workspace page (`app/workspace/page.tsx`):

```tsx
import WorkspaceLayout from "@/components/shared/WorkspaceLayout";

export default function WorkspacePage() {
  return (
    <WorkspaceLayout>
      <div className="flex flex-col p-6 h-full overflow-y-auto">
        {/* Your content here */}
      </div>
    </WorkspaceLayout>
  );
}
```

### 2. Use Elsewhere

For any page that needs the sidebar layout:

```tsx
import WorkspaceLayout from "@/components/shared/WorkspaceLayout";

export default function YourPage() {
  return (
    <WorkspaceLayout>
      {/* Page content */}
    </WorkspaceLayout>
  );
}
```

## 📐 Layout Behavior

### Open State
- **Sidebar Width**: 280px
- **Main Content Width**: `calc(100% - 280px)`
- **Animation**: Slides in from left (300ms)
- **Toggle Button Position**: 256px from left edge

### Closed State
- **Sidebar Width**: 0px (hidden)
- **Main Content Width**: 100%
- **Animation**: Slides out left (300ms)
- **Toggle Button Position**: 24px from left edge

## 🎨 Design Details

### Sidebar Styling
- **Background**: Black with subtle gradient (`from-black via-black to-black`)
- **Border**: Zinc-800 with 50% opacity
- **Glass Effect**: `bg-white/[0.02]` with `backdrop-blur-sm`
- **Border Glow**: Gradient border on right edge for depth

### Toggle Button
- **Size**: 48px × 48px circular
- **Background**: `from-zinc-800 to-black` gradient
- **Border**: `border-zinc-700/50` with hover effects
- **Glass Layer**: `bg-white/5` with `backdrop-blur-md`
- **Hover Glow**: `from-white/20 to-transparent` blur effect
- **Icons**: ChevronLeft (open) / ChevronRight (closed) from lucide-react

## ⚙️ Component APIs

### WorkspaceLayout

```tsx
interface WorkspaceLayoutProps {
  children: React.ReactNode;
}
```

**Props:**
- `children` - Page content to render in main area

**Features:**
- Manages sidebar open/close state internally
- Handles all animations via Framer Motion
- Renders sidebar, toggle button, and main content

### Sidebar

```tsx
export default function Sidebar()
```

**Features:**
- Auto-animates in/out with 300ms slide
- Contains SearchInput, CompanyTree components
- Scrollable content area
- Glassmorphism styling

### SidebarToggle

```tsx
interface SidebarToggleProps {
  isOpen: boolean;
  onClick: () => void;
}
```

**Props:**
- `isOpen` - Current sidebar state
- `onClick` - Toggle handler

**Features:**
- Icon animation based on state
- Follows sidebar edge position
- Hover and tap animations
- Glow effects

## 🎬 Animation Timings

| Animation | Duration | Easing |
|-----------|----------|--------|
| Sidebar slide | 300ms | easeInOut |
| Toggle position | 300ms | easeInOut |
| Icon rotation | 200ms | default |
| Content fade | 300ms | easeOut |
| Hover scale | instant | - |

## 🎨 Customization Guide

### Change Sidebar Width

Edit [Sidebar.tsx](src/components/shared/Sidebar.tsx) width class:
```tsx
// Change from w-[280px] to w-[320px]
className="... w-[320px] ..."
```

Update [SidebarToggle.tsx](src/components/shared/SidebarToggle.tsx) position:
```tsx
animate={{
  left: isOpen ? 'calc(320px - 24px)' : '24px',  // 320px instead of 280px
}}
```

### Adjust Animation Speed

In [WorkspaceLayout.tsx](src/components/shared/WorkspaceLayout.tsx) and [Sidebar.tsx](src/components/shared/Sidebar.tsx):
```tsx
transition={{
  duration: 0.5,  // Change from 0.3 to 0.5 for slower animations
  ease: 'easeInOut',
}}
```

### Change Colors

**Sidebar Background:**
```tsx
// In Sidebar.tsx
className="... bg-gradient-to-b from-slate-900 via-slate-900 to-slate-900 ..."
```

**Toggle Button:**
```tsx
// In SidebarToggle.tsx
className="... bg-gradient-to-br from-blue-800 to-blue-900 ..."
```

### Modify Icons

In [SidebarToggle.tsx](src/components/shared/SidebarToggle.tsx):
```tsx
// Replace ChevronLeft/ChevronRight with other icons from lucide-react
import { Menu, X } from 'lucide-react';

// Then use in the component
{isOpen ? <X className="..." /> : <Menu className="..." />}
```

## 🔌 Dependencies

- **Framer Motion**: 12.40.0+ (for animations)
- **Lucide React**: 1.17.0+ (for icons)
- **Tailwind CSS**: 4.0+ (for styling)
- **Next.js**: 16.2.7+ (framework)
- **React**: 19.2.4+ (UI library)

All dependencies are already installed in your project.

## 📱 Responsive Considerations

The sidebar system is designed for desktop-first layouts. For mobile responsiveness:

```tsx
// Option 1: Hide sidebar on mobile
{/* Add to WorkspaceLayout */}
<div className="hidden md:block">
  {sidebarOpen && <Sidebar key="sidebar" />}
</div>
```

```tsx
// Option 2: Full-screen modal sidebar on mobile
const isMobile = useMediaQuery('(max-width: 768px)');
// Implement drawer/modal variant
```

## 🐛 Troubleshooting

### Sidebar not animating
- Ensure `framer-motion` is installed: `npm list framer-motion`
- Check browser DevTools for console errors
- Verify AnimatePresence wraps the sidebar in WorkspaceLayout

### Toggle button not following sidebar
- Check that `left` property animates correctly in SidebarToggle
- Verify `position: absolute` and `z-index: 50` are applied

### Content overlap issues
- Ensure `flex-1` is on the main element in WorkspaceLayout
- Check that `overflow-hidden` prevents content from overflowing

### Flickering animations
- Use `mode="wait"` in AnimatePresence to prevent simultaneous renders
- Ensure no competing CSS transitions

## 🎯 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## 📦 Production Checklist

- [x] TypeScript types defined
- [x] Framer Motion animations optimized
- [x] Accessibility attributes added
- [x] Dark theme support
- [x] Zero layout shift
- [x] No console errors
- [x] Mobile considerations documented

## 🔮 Future Enhancements

Potential additions for advanced features:

1. **Persistent State**: Save sidebar state to localStorage
```tsx
const [sidebarOpen, setSidebarOpen] = useState(() => {
  return typeof window !== 'undefined' 
    ? localStorage.getItem('sidebarOpen') !== 'false'
    : true;
});
```

2. **Keyboard Shortcuts**: Toggle with Cmd/Ctrl + B
```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
      e.preventDefault();
      setSidebarOpen(!sidebarOpen);
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [sidebarOpen]);
```

3. **Mobile Drawer**: Slide-out drawer for mobile devices
4. **Collapse Indicator**: Show current state in UI
5. **Animation Preferences**: Respect `prefers-reduced-motion`

---

**Created**: June 2026  
**Framework**: Next.js 15 + TypeScript + Tailwind CSS v4  
**Animation Library**: Framer Motion v12+  
**Theme**: CONVERGE Dark Theme
