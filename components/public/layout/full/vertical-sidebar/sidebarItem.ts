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
    {
        title: 'Dashboard',
        icon: LayoutDashboardIcon,
        to: '/public/dashboard'
    },

    // chidren1
    {
        title: 'Page',
        icon: NewSectionIcon,
        active: true,
        children: [
            {
                title: 'Render Page',
                to: '/public/ui-components/cardrender'
            },
            {
                title: 'Gallery',
                to: '/public/ui-components/gallery'
            },
            {
                title: 'About',
                children: [
                    {
                        title: 'Contact',
                        to: '/nested-child-1'
                    },
                    {
                        title: 'Marketing',
                        to: '/nested-child-2'
                    },
                ],
            },

        ],
    },
    // chidren2
    {
        title: 'News',
        icon: NewsIcon,
        active: true,
        children: [
            {
                title: 'Activity',
                to: '/public/ui-components/output'
            },
            {
                title: 'Gallery',
                to: '/public/ui-components/gallery'
            },


        ],
    },

];

export default sidebarItem;