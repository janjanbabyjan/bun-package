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
    { title: 'Dashboard', icon: LayoutDashboardIcon, to: '/public/dashboard' },
    {
        title: 'Block',
        icon: PhotoIcon,
        active: true,
        children: [
            {
                title: 'Child Item 1',
                to: '/public/ui-components/output'
            },
            {
                title: 'Child Item 2',
                to: '/public/ui-components/gallery'
            },
            {
                title: 'Nested Child',
                children: [
                    {
                        title: 'Nested Child Item 1',
                        to: '/nested-child-1'
                    },
                    {
                        title: 'Nested Child Item 2',
                        to: '/nested-child-2'
                    },
                ],
            },

        ],
    },
    {
        title: 'New',
        icon: UserPlusIcon,
        active: true,
        children: [
            {
                title: 'Child Item 1',
                to: '/public/ui-components/output'
            },
            {
                title: 'Child Item 2',
                to: '/public/ui-components/gallery'
            },
            {
                title: 'Nested Child',
                children: [
                    {
                        title: 'Nested Child Item 1',
                        to: '/nested-child-1'
                    },
                    {
                        title: 'Nested Child Item 2',
                        to: '/nested-child-2'
                    },
                ],
            },

        ],
    },

];

export default sidebarItem;