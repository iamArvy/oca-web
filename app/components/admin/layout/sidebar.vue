<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import {
  LayoutDashboard,
  FileText,
  Users,
  // Shield,
  // Settings,
  // BarChart3,
  Globe,
  FolderOpen,
  Layers,
  User,
  RefreshCcw,
  Megaphone,
  Video,
  Mail,
} from "lucide-vue-next";

import {
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { APP_ROUTES } from "~/constants";
const menuItems = [
  {
    group: "Overview",
    items: [
      {
        title: 'Dashboard',
        url: APP_ROUTES.admin.dashboard,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    group: "Content",
    items: [
      {
        title: 'Feeds',
        url: APP_ROUTES.admin.feeds,
        icon: RefreshCcw,
      },
      {
        title: 'Posts',
        url: APP_ROUTES.admin.posts,
        icon: FileText,
      },
      {
        title: 'Topics',
        url: APP_ROUTES.admin.topics,
        icon: FolderOpen,
      },
      {
        title: 'Ads',
        url: APP_ROUTES.admin.ads,
        icon: Megaphone,
      },
      {
        title: 'Live Sources',
        url: APP_ROUTES.admin.liveSources,
        icon: Video,
      },
    ],
  },
  {
    group: "Management",
    items: [
      { title: 'Users', url: APP_ROUTES.admin.users, icon: Users },
      {
        title: 'Seo Pages',
        url: APP_ROUTES.admin.staticPages,
        icon: FileText,
      },
      {
        title: 'Contact Messages',
        url: APP_ROUTES.admin.contactMessages,
        icon: Mail,
      },
    ],
  },
  {
    group: "System",
    items: [
      // {
      //   title: APP_ROUTES.settings.name,
      //   url: APP_ROUTES.settings.path,
      //   icon: Settings,
      // },
      {
        title: 'Profile',
        url: APP_ROUTES.admin.profile,
        icon: User,
      },
    ],
  },
];

// Get route info
const route = useRoute();
const { state } = useSidebar();
const collapsed = computed(() => state.value === "collapsed");

const isActive = (url: string) => {
  if (url === "/") return route.path === "/";
  return route.path.startsWith(url);
};
</script>

<template>
  <Sidebar collapsible="icon" class="border-r border-border">
    <SidebarHeader class="py-4">
      <div class="flex items-center gap-3">
        <AppLogo icon class="w-10 h-10 shrink-0" />
        <template v-if="!collapsed">
          <div class="flex flex-col">
            <span class="font-display font-bold text-foreground">OneClick Africa</span>
            <span class="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </template>
      </div>
    </SidebarHeader>

    <SidebarContent class="">
      <SidebarGroup v-for="group in menuItems" :key="group.group">
        <template v-if="!collapsed">
          <SidebarGroupLabel class="text-xs uppercase tracking-wider text-muted-foreground px-4 mb-2">
            {{ group.group }}
          </SidebarGroupLabel>
        </template>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in group.items" :key="item.title">
              <SidebarMenuButton :is-active="isActive(item.url)" :tooltip="collapsed ? item.title : undefined" as-child>
                <RouterLink :to="item.url" class="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all" :class="cn(
                  isActive(item.url)
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                )
                  ">
                  <component :is="item.icon" class="w-5 h-5 shrink-0" />
                  <template v-if="!collapsed">{{ item.title }}</template>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter class="py-4 border-t border-border">
      <NuxtLink to="/" as-child>
        <Button variant="ghost" class="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          :class="collapsed && 'justify-center px-2'">
          <Globe class="w-5 h-5 shrink-0" />
          <template v-if="!collapsed">View Site</template>
        </Button>
      </NuxtLink>
    </SidebarFooter>
  </Sidebar>
</template>
