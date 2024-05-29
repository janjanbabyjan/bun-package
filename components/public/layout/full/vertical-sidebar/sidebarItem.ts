import {
    ApertureIcon,
    CopyIcon,
    LayoutDashboardIcon,
    LoginIcon,
    MoodHappyIcon,
    TypographyIcon,
    UserPlusIcon,
    PhotoIcon,
    AdIcon,
    PageBreakIcon,
    PackageIcon,
    NewsIcon,
    NewSectionIcon,
    FilesIcon,
  } from 'vue-tabler-icons';
  
  export interface Menu {
    header?: string;
    title?: string;
    icon?: any; // Change any to specific type (e.g., typeof ApertureIcon)
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: Menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
    active?: boolean; // Add this line
  }
  
  // Define the icons for each item
  const sidebarItem: Menu[] = [
    {
      title: 'Dashboard',
      icon: LayoutDashboardIcon,
      to: '/public/dashboard'
    },
    // Other items...
  ];
  
  export default sidebarItem;
  