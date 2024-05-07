import {
    ApertureIcon,
    CopyIcon,
    LayoutDashboardIcon,
    LoginIcon,
    MoodHappyIcon,
    TypographyIcon,
    UserPlusIcon,
    PhotoIcon,
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
    active?: boolean; // Add this line
}

const sidebarItem: menu[] = [
    { header: 'Home' },
    { title: 'Dashboard', icon: LayoutDashboardIcon, to: '/public/dashboard' },
    { header: 'utilities' },
    {
        title: 'Block',
        icon: PhotoIcon,
        to: '/public/ui-components/gallery',
        active: true, // กำหนดให้แสดงเมนูย่อยเริ่มต้น
        children: [
            { title: 'Child Item 1', to: '/child-1' },
            { title: 'Child Item 2', to: '/child-2' },
            {
                title: 'Nested Child',
                children: [
                    { title: 'Nested Child Item 1', to: '/nested-child-1' },
                    { title: 'Nested Child Item 2', to: '/nested-child-2' },
                ],
            },
        ],
    },
];

export default sidebarItem;