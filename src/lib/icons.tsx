import type { LucideIcon } from 'lucide-react-native';
import { ChevronLeft, ChevronRight, MoonStar, Sun, User } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
iconWithClassName(Sun);
iconWithClassName(MoonStar);
iconWithClassName(User);
iconWithClassName(ChevronLeft);
iconWithClassName(ChevronRight);
export { ChevronLeft, ChevronRight, MoonStar, Sun, User };

export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}