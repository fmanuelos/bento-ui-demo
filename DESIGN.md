---
version: alpha
name: Bento UI
description: A semantic design system for public sites, web applications, and dashboards using the Google Labs DESIGN.md format.
colors:
  primary: '#155EEF'

  brand-background: '#155EEF'
  brand-background-subtle: '#EFF4FF'
  brand-foreground: '#155EEF'
  brand-on-background: '#FFFFFF'
  brand-border: '#B2CCFF'

  background-primary: '#FFFFFF'
  background-secondary: '#F8FAFC'
  background-tertiary: '#F1F5F9'
  background-inverse: '#0F172A'
  background-accent: '#EFF4FF'
  background-disabled: '#E2E8F0'
  background-overlay: 'rgba(15, 23, 42, 0.64)'

  surface-primary: '#FFFFFF'
  surface-secondary: '#F8FAFC'
  surface-raised: '#FFFFFF'
  surface-sunken: '#F1F5F9'
  surface-inverse: '#0F172A'

  text-primary: '#0F172A'
  text-secondary: '#475569'
  text-tertiary: '#64748B'
  text-placeholder: '#64748B'
  text-inverse: '#FFFFFF'
  text-disabled: '#475569'
  text-accent: '#155EEF'
  text-link: '#155EEF'
  text-success: '#067647'
  text-warning: '#854A0E'
  text-danger: '#B42318'
  text-info: '#175CD3'

  border-primary: '#CBD5E1'
  border-secondary: '#E2E8F0'
  border-subtle: '#F1F5F9'
  border-strong: '#64748B'
  border-inverse: '#475569'
  border-disabled: '#E2E8F0'
  border-focus: '#84ADFF'
  border-accent: '#B2CCFF'
  border-success: '#75E0A7'
  border-warning: '#FEC84B'
  border-danger: '#FDA29B'

  action-primary-background-default: '#155EEF'
  action-primary-background-hover: '#004EEB'
  action-primary-background-active: '#0040C1'
  action-primary-background-disabled: '#E2E8F0'
  action-primary-foreground: '#FFFFFF'
  action-primary-foreground-disabled: '#98A2B3'
  action-primary-border: '#155EEF'
  action-primary-border-disabled: '#98A2B3'

  action-secondary-background-default: '#EFF4FF'
  action-secondary-background-hover: '#D1E0FF'
  action-secondary-background-active: '#B2CCFF'
  action-secondary-background-disabled: '#F8FAFC'
  action-secondary-foreground: '#0040C1'
  action-secondary-foreground-disabled: '#98A2B3'
  action-secondary-border: 'transparent'
  action-secondary-border-disabled: 'transparent'

  action-outline-background-default: 'transparent'
  action-outline-background-hover: '#F8FAFC'
  action-outline-background-active: '#F1F5F9'
  action-outline-background-disabled: 'transparent'
  action-outline-foreground: '#344054'
  action-outline-foreground-disabled: '#98A2B3'
  action-outline-border: '#64748B'
  action-outline-border-disabled: '#CBD5E1'

  action-ghost-background-default: 'transparent'
  action-ghost-background-hover: '#F1F5F9'
  action-ghost-background-active: '#E2E8F0'
  action-ghost-background-disabled: 'transparent'
  action-ghost-foreground: '#344054'
  action-ghost-foreground-disabled: '#98A2B3'

  action-destructive-background-default: '#D92D20'
  action-destructive-background-hover: '#B42318'
  action-destructive-background-active: '#912018'
  action-destructive-background-disabled: '#FEE4E2'
  action-destructive-foreground: '#FFFFFF'
  action-destructive-foreground-disabled: '#98A2B3'

  action-link-default: '#155EEF'
  action-link-hover: '#004EEB'
  action-link-active: '#0040C1'
  action-link-visited: '#6938EF'
  action-link-disabled: '#94A3B8'

  feedback-success-background: '#ECFDF3'
  feedback-success-foreground: '#067647'
  feedback-success-border: '#ABEFC6'
  feedback-warning-background: '#FFFAEB'
  feedback-warning-foreground: '#854A0E'
  feedback-warning-border: '#FEDF89'
  feedback-danger-background: '#FEF3F2'
  feedback-danger-foreground: '#B42318'
  feedback-danger-border: '#FECDCA'
  feedback-info-background: '#EFF8FF'
  feedback-info-foreground: '#175CD3'
  feedback-info-border: '#B2DDFF'

  status-positive-background: '#ECFDF3'
  status-positive-foreground: '#067647'
  status-positive-border: '#ABEFC6'
  status-warning-background: '#FFFAEB'
  status-warning-foreground: '#854A0E'
  status-warning-border: '#FEDF89'
  status-negative-background: '#FEF3F2'
  status-negative-foreground: '#B42318'
  status-negative-border: '#FECDCA'
  status-info-background: '#EFF8FF'
  status-info-foreground: '#175CD3'
  status-info-border: '#B2DDFF'
  status-neutral-background: '#F1F5F9'
  status-neutral-foreground: '#475569'
  status-neutral-border: '#CBD5E1'

  navigation-sidebar-background: '#0F172A'
  navigation-sidebar-foreground: '#CBD5E1'
  navigation-sidebar-foreground-strong: '#FFFFFF'
  navigation-sidebar-item-hover: '#1E293B'
  navigation-sidebar-item-selected: '#155EEF'
  navigation-sidebar-item-selected-foreground: '#FFFFFF'
  navigation-topbar-background: '#FFFFFF'
  navigation-topbar-border: '#E2E8F0'

  table-header-background: '#F8FAFC'
  table-row-background: '#FFFFFF'
  table-row-hover: '#F8FAFC'
  table-row-selected: '#EFF4FF'
  table-border: '#E2E8F0'

  selection-background: '#D1E0FF'
  selection-foreground: '#0F172A'
  focus-ring: '#84ADFF'
  focus-ring-offset: '#FFFFFF'

  chart-series-1: '#155EEF'
  chart-series-2: '#6938EF'
  chart-series-3: '#0E9384'
  chart-series-4: '#DC6803'
  chart-series-5: '#DD2590'
  chart-series-6: '#475467'
  chart-positive: '#079455'
  chart-negative: '#D92D20'
  chart-gridline: '#E2E8F0'
  chart-axis: '#64748B'

  # Dark-theme semantic aliases. The alpha DESIGN.md schema has no theme-mode
  # group, so the theme qualifier remains part of each flat token name.
  dark-brand-background: '#155EEF'
  dark-brand-background-subtle: '#172554'
  dark-brand-foreground: '#84ADFF'
  dark-brand-on-background: '#FFFFFF'
  dark-brand-border: '#528BFF'

  dark-background-primary: '#020617'
  dark-background-secondary: '#0F172A'
  dark-background-tertiary: '#1E293B'
  dark-background-inverse: '#020617'
  dark-background-accent: '#172554'
  dark-background-disabled: '#1E293B'
  dark-background-overlay: 'rgba(0, 0, 0, 0.72)'

  dark-surface-primary: '#0F172A'
  dark-surface-secondary: '#1E293B'
  dark-surface-raised: '#1E293B'
  dark-surface-sunken: '#020617'
  dark-surface-inverse: '#020617'

  dark-text-primary: '#F8FAFC'
  dark-text-secondary: '#CBD5E1'
  dark-text-tertiary: '#94A3B8'
  dark-text-placeholder: '#94A3B8'
  dark-text-inverse: '#FFFFFF'
  dark-text-disabled: '#94A3B8'
  dark-text-accent: '#84ADFF'
  dark-text-link: '#84ADFF'
  dark-text-success: '#75E0A7'
  dark-text-warning: '#FEC84B'
  dark-text-danger: '#FDA29B'
  dark-text-info: '#84CAFF'

  dark-border-primary: '#64748B'
  dark-border-secondary: '#475569'
  dark-border-subtle: '#334155'
  dark-border-strong: '#94A3B8'
  dark-border-inverse: '#475569'
  dark-border-disabled: '#334155'
  dark-border-focus: '#84ADFF'
  dark-border-accent: '#528BFF'
  dark-border-success: '#17B26A'
  dark-border-warning: '#DC6803'
  dark-border-danger: '#F04438'

  dark-action-primary-background-default: '#155EEF'
  dark-action-primary-background-hover: '#2563EB'
  dark-action-primary-background-active: '#004EEB'
  dark-action-primary-background-disabled: '#1E293B'
  dark-action-primary-foreground: '#FFFFFF'
  dark-action-primary-foreground-disabled: '#94A3B8'
  dark-action-primary-border: '#155EEF'
  dark-action-primary-border-disabled: '#334155'

  dark-action-secondary-background-default: '#172554'
  dark-action-secondary-background-hover: '#1E3A8A'
  dark-action-secondary-background-active: '#1E40AF'
  dark-action-secondary-background-disabled: '#1E293B'
  dark-action-secondary-foreground: '#B2CCFF'
  dark-action-secondary-foreground-disabled: '#94A3B8'
  dark-action-secondary-border: 'transparent'
  dark-action-secondary-border-disabled: 'transparent'

  dark-action-outline-background-default: 'transparent'
  dark-action-outline-background-hover: '#1E293B'
  dark-action-outline-background-active: '#334155'
  dark-action-outline-background-disabled: 'transparent'
  dark-action-outline-foreground: '#CBD5E1'
  dark-action-outline-foreground-disabled: '#94A3B8'
  dark-action-outline-border: '#64748B'
  dark-action-outline-border-disabled: '#334155'

  dark-action-ghost-background-default: 'transparent'
  dark-action-ghost-background-hover: '#1E293B'
  dark-action-ghost-background-active: '#334155'
  dark-action-ghost-background-disabled: 'transparent'
  dark-action-ghost-foreground: '#CBD5E1'
  dark-action-ghost-foreground-disabled: '#94A3B8'

  dark-action-destructive-background-default: '#D92D20'
  dark-action-destructive-background-hover: '#B42318'
  dark-action-destructive-background-active: '#912018'
  dark-action-destructive-background-disabled: '#3F1D1B'
  dark-action-destructive-foreground: '#FFFFFF'
  dark-action-destructive-foreground-disabled: '#94A3B8'

  dark-action-link-default: '#84ADFF'
  dark-action-link-hover: '#B2CCFF'
  dark-action-link-active: '#C7D7FE'
  dark-action-link-visited: '#BDB4FE'
  dark-action-link-disabled: '#94A3B8'

  dark-feedback-success-background: '#052E16'
  dark-feedback-success-foreground: '#75E0A7'
  dark-feedback-success-border: '#17B26A'
  dark-feedback-warning-background: '#422006'
  dark-feedback-warning-foreground: '#FEC84B'
  dark-feedback-warning-border: '#DC6803'
  dark-feedback-danger-background: '#450A0A'
  dark-feedback-danger-foreground: '#FDA29B'
  dark-feedback-danger-border: '#F04438'
  dark-feedback-info-background: '#082F49'
  dark-feedback-info-foreground: '#84CAFF'
  dark-feedback-info-border: '#2E90FA'

  dark-status-positive-background: '#052E16'
  dark-status-positive-foreground: '#75E0A7'
  dark-status-positive-border: '#17B26A'
  dark-status-warning-background: '#422006'
  dark-status-warning-foreground: '#FEC84B'
  dark-status-warning-border: '#DC6803'
  dark-status-negative-background: '#450A0A'
  dark-status-negative-foreground: '#FDA29B'
  dark-status-negative-border: '#F04438'
  dark-status-info-background: '#082F49'
  dark-status-info-foreground: '#84CAFF'
  dark-status-info-border: '#2E90FA'
  dark-status-neutral-background: '#1E293B'
  dark-status-neutral-foreground: '#CBD5E1'
  dark-status-neutral-border: '#64748B'

  dark-navigation-sidebar-background: '#020617'
  dark-navigation-sidebar-foreground: '#CBD5E1'
  dark-navigation-sidebar-foreground-strong: '#F8FAFC'
  dark-navigation-sidebar-item-hover: '#1E293B'
  dark-navigation-sidebar-item-selected: '#155EEF'
  dark-navigation-sidebar-item-selected-foreground: '#FFFFFF'
  dark-navigation-topbar-background: '#0F172A'
  dark-navigation-topbar-border: '#334155'

  dark-table-header-background: '#1E293B'
  dark-table-row-background: '#0F172A'
  dark-table-row-hover: '#1E293B'
  dark-table-row-selected: '#172554'
  dark-table-border: '#334155'

  dark-selection-background: '#1E40AF'
  dark-selection-foreground: '#F8FAFC'
  dark-focus-ring: '#84ADFF'
  dark-focus-ring-offset: '#020617'

  dark-chart-series-1: '#528BFF'
  dark-chart-series-2: '#9B8AFB'
  dark-chart-series-3: '#2ED3B7'
  dark-chart-series-4: '#F79009'
  dark-chart-series-5: '#EE46BC'
  dark-chart-series-6: '#94A3B8'
  dark-chart-positive: '#32D583'
  dark-chart-negative: '#F97066'
  dark-chart-gridline: '#334155'
  dark-chart-axis: '#94A3B8'

typography:
  display-xl:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: 700
    lineHeight: '1.05'
    letterSpacing: -0.025em
  display-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: 700
    lineHeight: '1.08'
    letterSpacing: -0.02em
  display-md:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: 700
    lineHeight: '1.1'
    letterSpacing: -0.02em
  heading-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: 700
    lineHeight: '1.15'
    letterSpacing: -0.02em
  heading-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: 700
    lineHeight: '1.2'
    letterSpacing: -0.01em
  heading-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 600
    lineHeight: '1.3'
    letterSpacing: 0em
  heading-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
    lineHeight: '1.4'
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: '1.5'
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: '1.5'
    letterSpacing: 0em
  body-xs:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: '1.5'
    letterSpacing: 0em
  label-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 600
    lineHeight: '1.4'
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 600
    lineHeight: '1.4'
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 600
    lineHeight: '1.35'
    letterSpacing: 0em
  label-overline:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 600
    lineHeight: '1.35'
    letterSpacing: 0.08em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: '1.4'
    letterSpacing: 0em
  data-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 700
    lineHeight: '1.2'
    letterSpacing: -0.01em
  data-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
    lineHeight: '1.3'
    letterSpacing: 0em
  data-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 600
    lineHeight: '1.4'
    letterSpacing: 0em

rounded:
  shape-none: 0px
  shape-xs: 2px
  shape-sm: 4px
  shape-md: 8px
  shape-lg: 12px
  shape-xl: 16px
  shape-full: 9999px

spacing:
  space-0: 0px
  space-0-5: 2px
  space-1: 4px
  space-1-5: 6px
  space-2: 8px
  space-2-5: 10px
  space-3: 12px
  space-3-5: 14px
  space-4: 16px
  space-5: 20px
  space-6: 24px
  space-8: 32px
  space-10: 40px
  space-12: 48px
  space-16: 64px
  space-20: 80px
  space-24: 96px
  space-32: 128px

  # Mobile is the default range and therefore has no breakpoint token.
  breakpoint-tablet: 640px
  breakpoint-desktop: 1024px
  breakpoint-wide: 1280px

  section-mobile: 48px
  section-tablet: 64px
  section-desktop: 96px

  page-padding-mobile: 16px
  page-padding-tablet: 24px
  page-padding-desktop: 32px
  dashboard-padding-mobile: 16px
  dashboard-padding-tablet: 20px
  dashboard-padding-desktop: 24px

  grid-gutter-mobile: 16px
  grid-gutter-tablet: 20px
  grid-gutter-desktop: 24px

  # Focus indicator geometry is semantic, not general-purpose spacing.
  focus-ring-width: 3px
  focus-ring-offset-width: 2px

  control-height-tiny: 32px
  control-height-small: 40px
  control-height-medium: 44px
  control-height-large: 48px
  control-height-extra-large: 56px

  touch-target-min: 44px

  sidebar-expanded: 256px
  sidebar-collapsed: 72px
  topbar-height: 64px

  container-narrow: 480px
  container-readable: 720px
  container-page: 1200px
  container-dashboard: 1600px

components:
  button-primary:
    backgroundColor: '{colors.action-primary-background-default}'
    textColor: '{colors.action-primary-foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-3}'
    height: '{spacing.control-height-medium}'
  button-primary-hover:
    backgroundColor: '{colors.action-primary-background-hover}'
    textColor: '{colors.action-primary-foreground}'
  button-primary-active:
    backgroundColor: '{colors.action-primary-background-active}'
    textColor: '{colors.action-primary-foreground}'
  button-primary-disabled:
    backgroundColor: '{colors.action-primary-background-disabled}'
    textColor: '{colors.action-primary-foreground-disabled}'

  button-size-tiny:
    typography: '{typography.label-sm}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-2}'
    height: '{spacing.control-height-tiny}'
  button-size-small:
    typography: '{typography.label-md}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-3}'
    height: '{spacing.control-height-small}'
  button-size-medium:
    typography: '{typography.label-md}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-3}'
    height: '{spacing.control-height-medium}'
  button-size-large:
    typography: '{typography.label-lg}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-4}'
    height: '{spacing.control-height-large}'
  button-size-extra-large:
    typography: '{typography.label-lg}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-6}'
    height: '{spacing.control-height-extra-large}'

  button-secondary:
    backgroundColor: '{colors.action-secondary-background-default}'
    textColor: '{colors.action-secondary-foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-3}'
    height: '{spacing.control-height-medium}'
  button-secondary-hover:
    backgroundColor: '{colors.action-secondary-background-hover}'
    textColor: '{colors.action-secondary-foreground}'
  button-secondary-active:
    backgroundColor: '{colors.action-secondary-background-active}'
    textColor: '{colors.action-secondary-foreground}'
  button-secondary-disabled:
    backgroundColor: '{colors.action-secondary-background-disabled}'
    textColor: '{colors.action-secondary-foreground-disabled}'

  button-outline:
    backgroundColor: '{colors.action-outline-background-default}'
    textColor: '{colors.action-outline-foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-3}'
    height: '{spacing.control-height-medium}'
  button-outline-hover:
    backgroundColor: '{colors.action-outline-background-hover}'
    textColor: '{colors.action-outline-foreground}'
  button-outline-active:
    backgroundColor: '{colors.action-outline-background-active}'
    textColor: '{colors.action-outline-foreground}'
  button-outline-disabled:
    backgroundColor: '{colors.action-outline-background-disabled}'
    textColor: '{colors.action-outline-foreground-disabled}'

  button-ghost:
    backgroundColor: '{colors.action-ghost-background-default}'
    textColor: '{colors.action-ghost-foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-3}'
    height: '{spacing.control-height-medium}'
  button-ghost-hover:
    backgroundColor: '{colors.action-ghost-background-hover}'
    textColor: '{colors.action-ghost-foreground}'
  button-ghost-active:
    backgroundColor: '{colors.action-ghost-background-active}'
    textColor: '{colors.action-ghost-foreground}'
  button-ghost-disabled:
    backgroundColor: '{colors.action-ghost-background-disabled}'
    textColor: '{colors.action-ghost-foreground-disabled}'

  button-destructive:
    backgroundColor: '{colors.action-destructive-background-default}'
    textColor: '{colors.action-destructive-foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-3}'
    height: '{spacing.control-height-medium}'
  button-destructive-hover:
    backgroundColor: '{colors.action-destructive-background-hover}'
    textColor: '{colors.action-destructive-foreground}'
  button-destructive-active:
    backgroundColor: '{colors.action-destructive-background-active}'
    textColor: '{colors.action-destructive-foreground}'
  button-destructive-disabled:
    backgroundColor: '{colors.action-destructive-background-disabled}'
    textColor: '{colors.action-destructive-foreground-disabled}'

  input:
    backgroundColor: '{colors.surface-primary}'
    textColor: '{colors.text-primary}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-3}'
    height: '{spacing.control-height-medium}'
  input-small:
    backgroundColor: '{colors.surface-primary}'
    textColor: '{colors.text-primary}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-2}'
    height: '{spacing.control-height-small}'
  input-focus:
    backgroundColor: '{colors.surface-primary}'
    textColor: '{colors.text-primary}'
  input-placeholder:
    backgroundColor: '{colors.surface-primary}'
    textColor: '{colors.text-placeholder}'
  input-disabled:
    backgroundColor: '{colors.background-disabled}'
    textColor: '{colors.text-disabled}'

  search-field:
    backgroundColor: '{colors.surface-secondary}'
    textColor: '{colors.text-primary}'
    typography: '{typography.body-sm}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-3}'
    height: '{spacing.control-height-small}'

  card:
    backgroundColor: '{colors.surface-primary}'
    textColor: '{colors.text-primary}'
    rounded: '{rounded.shape-lg}'
    padding: '{spacing.space-6}'
  card-compact:
    backgroundColor: '{colors.surface-primary}'
    textColor: '{colors.text-primary}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-4}'
  stat-card:
    backgroundColor: '{colors.surface-primary}'
    textColor: '{colors.text-primary}'
    rounded: '{rounded.shape-lg}'
    padding: '{spacing.space-4}'

  avatar-fallback:
    backgroundColor: '{colors.brand-background-subtle}'
    textColor: '{colors.brand-foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.shape-full}'
  avatar-size-small:
    typography: '{typography.label-sm}'
    rounded: '{rounded.shape-full}'
    size: '{spacing.control-height-tiny}'
  avatar-size-medium:
    typography: '{typography.label-md}'
    rounded: '{rounded.shape-full}'
    size: '{spacing.control-height-small}'
  avatar-size-large:
    typography: '{typography.label-lg}'
    rounded: '{rounded.shape-full}'
    size: '{spacing.control-height-large}'

  sidebar:
    backgroundColor: '{colors.navigation-sidebar-background}'
    textColor: '{colors.navigation-sidebar-foreground}'
    width: '{spacing.sidebar-expanded}'
  sidebar-collapsed:
    backgroundColor: '{colors.navigation-sidebar-background}'
    textColor: '{colors.navigation-sidebar-foreground}'
    width: '{spacing.sidebar-collapsed}'
  sidebar-item:
    backgroundColor: 'transparent'
    textColor: '{colors.navigation-sidebar-foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-3}'
    height: '{spacing.control-height-small}'
  sidebar-item-hover:
    backgroundColor: '{colors.navigation-sidebar-item-hover}'
    textColor: '{colors.navigation-sidebar-foreground-strong}'
  sidebar-item-selected:
    backgroundColor: '{colors.navigation-sidebar-item-selected}'
    textColor: '{colors.navigation-sidebar-item-selected-foreground}'

  topbar:
    backgroundColor: '{colors.navigation-topbar-background}'
    textColor: '{colors.text-primary}'
    height: '{spacing.topbar-height}'

  tab:
    backgroundColor: 'transparent'
    textColor: '{colors.text-secondary}'
    typography: '{typography.label-md}'
    rounded: '{rounded.shape-sm}'
    padding: '{spacing.space-3}'
    height: '{spacing.control-height-small}'
  tab-hover:
    backgroundColor: '{colors.action-ghost-background-hover}'
    textColor: '{colors.text-primary}'
  tab-selected:
    backgroundColor: '{colors.background-accent}'
    textColor: '{colors.text-accent}'

  table-header:
    backgroundColor: '{colors.table-header-background}'
    textColor: '{colors.text-secondary}'
    typography: '{typography.label-sm}'
    padding: '{spacing.space-3}'
    height: '{spacing.control-height-small}'
  table-row:
    backgroundColor: '{colors.table-row-background}'
    textColor: '{colors.text-primary}'
    typography: '{typography.body-sm}'
    padding: '{spacing.space-3}'
  table-row-hover:
    backgroundColor: '{colors.table-row-hover}'
    textColor: '{colors.text-primary}'
  table-row-selected:
    backgroundColor: '{colors.table-row-selected}'
    textColor: '{colors.text-primary}'

  badge-positive:
    backgroundColor: '{colors.status-positive-background}'
    textColor: '{colors.status-positive-foreground}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.shape-full}'
    padding: '{spacing.space-2}'
  badge-warning:
    backgroundColor: '{colors.status-warning-background}'
    textColor: '{colors.status-warning-foreground}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.shape-full}'
    padding: '{spacing.space-2}'
  badge-negative:
    backgroundColor: '{colors.status-negative-background}'
    textColor: '{colors.status-negative-foreground}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.shape-full}'
    padding: '{spacing.space-2}'
  badge-info:
    backgroundColor: '{colors.status-info-background}'
    textColor: '{colors.status-info-foreground}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.shape-full}'
    padding: '{spacing.space-2}'
  badge-neutral:
    backgroundColor: '{colors.status-neutral-background}'
    textColor: '{colors.status-neutral-foreground}'
    typography: '{typography.label-sm}'
    rounded: '{rounded.shape-full}'
    padding: '{spacing.space-2}'

  alert-success:
    backgroundColor: '{colors.feedback-success-background}'
    textColor: '{colors.feedback-success-foreground}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-4}'
  alert-warning:
    backgroundColor: '{colors.feedback-warning-background}'
    textColor: '{colors.feedback-warning-foreground}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-4}'
  alert-danger:
    backgroundColor: '{colors.feedback-danger-background}'
    textColor: '{colors.feedback-danger-foreground}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-4}'
  alert-info:
    backgroundColor: '{colors.feedback-info-background}'
    textColor: '{colors.feedback-info-foreground}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-4}'

  dropdown:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.text-primary}'
    rounded: '{rounded.shape-md}'
    padding: '{spacing.space-2}'
  modal:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.text-primary}'
    rounded: '{rounded.shape-xl}'
    padding: '{spacing.space-6}'

  # Dark entries override the color properties of the matching unqualified
  # component or state. Typography, shape, size, and spacing remain shared.
  button-primary-dark:
    backgroundColor: '{colors.dark-action-primary-background-default}'
    textColor: '{colors.dark-action-primary-foreground}'
  button-primary-hover-dark:
    backgroundColor: '{colors.dark-action-primary-background-hover}'
    textColor: '{colors.dark-action-primary-foreground}'
  button-primary-active-dark:
    backgroundColor: '{colors.dark-action-primary-background-active}'
    textColor: '{colors.dark-action-primary-foreground}'
  button-primary-disabled-dark:
    backgroundColor: '{colors.dark-action-primary-background-disabled}'
    textColor: '{colors.dark-action-primary-foreground-disabled}'
  button-secondary-dark:
    backgroundColor: '{colors.dark-action-secondary-background-default}'
    textColor: '{colors.dark-action-secondary-foreground}'
  button-secondary-hover-dark:
    backgroundColor: '{colors.dark-action-secondary-background-hover}'
    textColor: '{colors.dark-action-secondary-foreground}'
  button-secondary-active-dark:
    backgroundColor: '{colors.dark-action-secondary-background-active}'
    textColor: '{colors.dark-action-secondary-foreground}'
  button-secondary-disabled-dark:
    backgroundColor: '{colors.dark-action-secondary-background-disabled}'
    textColor: '{colors.dark-action-secondary-foreground-disabled}'

  button-outline-dark:
    backgroundColor: '{colors.dark-action-outline-background-default}'
    textColor: '{colors.dark-action-outline-foreground}'
  button-outline-hover-dark:
    backgroundColor: '{colors.dark-action-outline-background-hover}'
    textColor: '{colors.dark-action-outline-foreground}'
  button-outline-active-dark:
    backgroundColor: '{colors.dark-action-outline-background-active}'
    textColor: '{colors.dark-action-outline-foreground}'
  button-outline-disabled-dark:
    backgroundColor: '{colors.dark-action-outline-background-disabled}'
    textColor: '{colors.dark-action-outline-foreground-disabled}'

  button-ghost-dark:
    backgroundColor: '{colors.dark-action-ghost-background-default}'
    textColor: '{colors.dark-action-ghost-foreground}'
  button-ghost-hover-dark:
    backgroundColor: '{colors.dark-action-ghost-background-hover}'
    textColor: '{colors.dark-action-ghost-foreground}'
  button-ghost-active-dark:
    backgroundColor: '{colors.dark-action-ghost-background-active}'
    textColor: '{colors.dark-action-ghost-foreground}'
  button-ghost-disabled-dark:
    backgroundColor: '{colors.dark-action-ghost-background-disabled}'
    textColor: '{colors.dark-action-ghost-foreground-disabled}'

  button-destructive-dark:
    backgroundColor: '{colors.dark-action-destructive-background-default}'
    textColor: '{colors.dark-action-destructive-foreground}'
  button-destructive-hover-dark:
    backgroundColor: '{colors.dark-action-destructive-background-hover}'
    textColor: '{colors.dark-action-destructive-foreground}'
  button-destructive-active-dark:
    backgroundColor: '{colors.dark-action-destructive-background-active}'
    textColor: '{colors.dark-action-destructive-foreground}'
  button-destructive-disabled-dark:
    backgroundColor: '{colors.dark-action-destructive-background-disabled}'
    textColor: '{colors.dark-action-destructive-foreground-disabled}'

  input-dark:
    backgroundColor: '{colors.dark-surface-primary}'
    textColor: '{colors.dark-text-primary}'
  input-small-dark:
    backgroundColor: '{colors.dark-surface-primary}'
    textColor: '{colors.dark-text-primary}'
  input-focus-dark:
    backgroundColor: '{colors.dark-surface-primary}'
    textColor: '{colors.dark-text-primary}'
  input-placeholder-dark:
    backgroundColor: '{colors.dark-surface-primary}'
    textColor: '{colors.dark-text-placeholder}'
  input-disabled-dark:
    backgroundColor: '{colors.dark-background-disabled}'
    textColor: '{colors.dark-text-disabled}'

  search-field-dark:
    backgroundColor: '{colors.dark-surface-secondary}'
    textColor: '{colors.dark-text-primary}'

  card-dark:
    backgroundColor: '{colors.dark-surface-primary}'
    textColor: '{colors.dark-text-primary}'
  card-compact-dark:
    backgroundColor: '{colors.dark-surface-primary}'
    textColor: '{colors.dark-text-primary}'
  stat-card-dark:
    backgroundColor: '{colors.dark-surface-primary}'
    textColor: '{colors.dark-text-primary}'

  avatar-fallback-dark:
    backgroundColor: '{colors.dark-brand-background-subtle}'
    textColor: '{colors.dark-brand-foreground}'

  sidebar-dark:
    backgroundColor: '{colors.dark-navigation-sidebar-background}'
    textColor: '{colors.dark-navigation-sidebar-foreground}'
  sidebar-collapsed-dark:
    backgroundColor: '{colors.dark-navigation-sidebar-background}'
    textColor: '{colors.dark-navigation-sidebar-foreground}'
  sidebar-item-dark:
    backgroundColor: 'transparent'
    textColor: '{colors.dark-navigation-sidebar-foreground}'
  sidebar-item-hover-dark:
    backgroundColor: '{colors.dark-navigation-sidebar-item-hover}'
    textColor: '{colors.dark-navigation-sidebar-foreground-strong}'
  sidebar-item-selected-dark:
    backgroundColor: '{colors.dark-navigation-sidebar-item-selected}'
    textColor: '{colors.dark-navigation-sidebar-item-selected-foreground}'

  topbar-dark:
    backgroundColor: '{colors.dark-navigation-topbar-background}'
    textColor: '{colors.dark-text-primary}'

  tab-dark:
    backgroundColor: 'transparent'
    textColor: '{colors.dark-text-secondary}'
  tab-hover-dark:
    backgroundColor: '{colors.dark-action-ghost-background-hover}'
    textColor: '{colors.dark-text-primary}'
  tab-selected-dark:
    backgroundColor: '{colors.dark-background-accent}'
    textColor: '{colors.dark-text-accent}'

  table-header-dark:
    backgroundColor: '{colors.dark-table-header-background}'
    textColor: '{colors.dark-text-secondary}'
  table-row-dark:
    backgroundColor: '{colors.dark-table-row-background}'
    textColor: '{colors.dark-text-primary}'
  table-row-hover-dark:
    backgroundColor: '{colors.dark-table-row-hover}'
    textColor: '{colors.dark-text-primary}'
  table-row-selected-dark:
    backgroundColor: '{colors.dark-table-row-selected}'
    textColor: '{colors.dark-text-primary}'

  badge-positive-dark:
    backgroundColor: '{colors.dark-status-positive-background}'
    textColor: '{colors.dark-status-positive-foreground}'
  badge-warning-dark:
    backgroundColor: '{colors.dark-status-warning-background}'
    textColor: '{colors.dark-status-warning-foreground}'
  badge-negative-dark:
    backgroundColor: '{colors.dark-status-negative-background}'
    textColor: '{colors.dark-status-negative-foreground}'
  badge-info-dark:
    backgroundColor: '{colors.dark-status-info-background}'
    textColor: '{colors.dark-status-info-foreground}'
  badge-neutral-dark:
    backgroundColor: '{colors.dark-status-neutral-background}'
    textColor: '{colors.dark-status-neutral-foreground}'

  alert-success-dark:
    backgroundColor: '{colors.dark-feedback-success-background}'
    textColor: '{colors.dark-feedback-success-foreground}'
  alert-warning-dark:
    backgroundColor: '{colors.dark-feedback-warning-background}'
    textColor: '{colors.dark-feedback-warning-foreground}'
  alert-danger-dark:
    backgroundColor: '{colors.dark-feedback-danger-background}'
    textColor: '{colors.dark-feedback-danger-foreground}'
  alert-info-dark:
    backgroundColor: '{colors.dark-feedback-info-background}'
    textColor: '{colors.dark-feedback-info-foreground}'

  dropdown-dark:
    backgroundColor: '{colors.dark-surface-raised}'
    textColor: '{colors.dark-text-primary}'
  modal-dark:
    backgroundColor: '{colors.dark-surface-raised}'
    textColor: '{colors.dark-text-primary}'
---

# Bento UI

> Document status: Draft. The YAML frontmatter contains normative token values;
> this body and the linked component contracts define their intended use.
> `version: alpha` identifies the DESIGN.md file format, not a Bento UI
> release.

[Overview](#overview) · [Colors](#colors) · [Typography](#typography) ·
[Layout](#layout) · [Elevation](#elevation--depth) · [Shapes](#shapes) ·
[Components](#components) · [Usage rules](#dos-and-donts)

## Overview

Bento UI is a semantic design system for public sites, web applications, and
dashboards.

Two experience terms are used consistently throughout this document:

- **Public Site** describes public-facing commercial, marketing, and
  informational pages.
- **Dashboard** describes authenticated, task-oriented, administrative, and
  data-heavy experiences.

In code and identifiers, use `public-site` and `dashboard` for these experience
types.

The visual direction is calm, professional, highly legible, and operational.
Primary action tokens establish interactive hierarchy, brand tokens express
identity, slate neutrals establish visual hierarchy, and semantic feedback and
status tokens communicate meaning.

Public Sites are spacious and content-led. Dashboard experiences are compact,
structured, and information-led. Density should change through spacing,
grouping, control size, and layout—not indiscriminate reductions in text size.

### Design principles

1. Use semantic tokens rather than raw visual values in product code.
2. Keep action, feedback, status, navigation, and selection meanings distinct.
3. Prefer tonal surfaces and borders over unnecessary elevation.
4. Preserve visible focus and non-color cues in every interaction.
5. Adapt components to available space while retaining one coherent system.
6. Prefer explicit, accessible behavior over purely visual consistency.

### System contract

This repository separates the design contract from the technologies that
implement it:

1. The YAML frontmatter is the canonical Google DESIGN.md interchange
   representation. Its token values are normative.
2. This Markdown body defines technology-neutral rationale, usage rules, and
   cross-component requirements.
3. The specifications in [`design/components/`](design/components/) define
   normative behavior and accessibility that the frontmatter cannot express.
4. The patterns in [`design/patterns/`](design/patterns/) define reusable
   experience-level behavior.
5. The files in [`design/adapters/`](design/adapters/) explain non-normative
   mappings to particular platforms, frameworks, and tools.

Within the supported frontmatter groups, semantic color tokens describe purpose,
such as `text-primary`, `action-primary-background-hover`, and
`status-warning-background`. Component entries map the visual properties that
the format supports to common UI concepts. A missing exporter field does not
remove a requirement stated in this body or a linked contract.

Raw palette foundations are not separately represented. Repeated literals are
intentional aliases of the same visual value, not permission for consumers to
substitute one semantic role for another.

### Source of truth

| Concern                              | Authoritative source                       | Update rule                                                              |
| ------------------------------------ | ------------------------------------------ | ------------------------------------------------------------------------ |
| Exact light- and dark-theme values   | This file's frontmatter                    | Edit here first.                                                         |
| System-wide rationale and usage      | This document body                         | Avoid repeating exact values.                                            |
| Component behavior and accessibility | [`design/components/`](design/components/) | Update with contract changes.                                            |
| Cross-component experience patterns  | [`design/patterns/`](design/patterns/)     | Keep outcomes independent of implementation technology.                  |
| Platform and tool mappings           | [`design/adapters/`](design/adapters/)     | Treat as non-normative translations of this contract.                    |
| Repository workflow                  | [`design/README.md`](design/README.md)     | Keep commands, generated-file policy, and implementation inventory here. |

The external file-format contract is the
[Google Labs DESIGN.md specification](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md).

Runtime code is implementation evidence, not design authority. When runtime
behavior conflicts with this contract, treat the difference as a conformance
issue; do not silently redefine either source.

### Accessibility target

Supported web experiences target WCAG 2.2 Level AA. Component contracts may set
stronger requirements, including the `touch-target-min` target size. Equivalent
implementations on other platforms must preserve the same outcomes: perceivable
state, complete non-pointer operation, programmatically determinable semantics,
predictable focus, and compatibility with user accessibility preferences.

Conformance is evaluated in rendered context. Token presence alone is not proof
of sufficient contrast, focus visibility, keyboard support, announcement
behavior, reflow, or target size.

### Compatibility and deprecation

Classify changes as guidance-only, additive, or breaking. Additive tokens and
contracts must not change the meaning of existing names. For breaking changes,
add the replacement, migrate consumers, and remove the old token or contract only
after the agreed deprecation window.

While this document is Draft and the package is `0.0.0`, breaking changes are
allowed only when migration happens in the same change. Establish a published
deprecation window before the first stable release.

### Current repository adapters — non-normative

The current repository includes web, Tailwind, and DTCG integrations.
Their packages, commands, generated files, workarounds, and support limitations
are documented in [`design/README.md`](design/README.md) and
[`design/adapters/`](design/adapters/). They may translate this contract but must
not redefine token meaning or component behavior.

### Open decisions — unverified

The following decisions are not established by repository documentation:

- Supported browser and platform versions beyond the modern output produced by
  the current web adapter.
- Supported locales and writing systems, translation-expansion budgets, and any
  exceptions beyond the baseline bidirectional and locale-aware behavior below.
- The design-system owner and required approver for breaking changes.

Record each decision before relying on it in implementation.

## Colors

### Semantic model

Color tokens follow `category-role-property-state`. Segments may be omitted when
they do not add meaning.

The default light theme uses unqualified semantic names. Because the alpha
DESIGN.md schema has no theme-mode group, dark-theme aliases add the flat
`dark-` qualifier before the same semantic name, such as
`dark-text-primary` and `dark-action-primary-background-hover`. The qualifier
changes the theme mapping, not the token's purpose.

Use semantic token names in product code. The `primary` token is required for
DESIGN.md compatibility and stores the Bento brand color, but it should not be
used directly. Instead, choose tokens based on purpose: use action tokens for
interactive elements, brand tokens for visual identity, and the appropriate
semantic tokens for text, surfaces, borders, feedback, status, navigation,
selection, and charts.

### Token families

- `background-*` defines page and workspace canvases; `surface-*` defines local
  containers placed on them.
- `brand-*` defines non-interactive identity and branded presentation, including
  marks, decorative graphics, and branded content surfaces.
- `text-*` defines neutral hierarchy and semantic messaging.
- `border-*` defines structural, focus, disabled, and semantic boundaries.
- `action-*` defines interactive hierarchy and state.
- `feedback-*` defines messages about events or outcomes.
- `status-*` defines persistent entity or workflow state.
- `navigation-*`, `table-*`, and `selection-*` define location and selection.
- `chart-*` defines categorical and quantitative data colors.

`surface-inverse` is the local-container equivalent of `background-inverse`.
Standalone semantic text or icons use `text-success`, `text-warning`,
`text-danger`, or `text-info`. Control validation uses `border-success`,
`border-warning`, or `border-danger`; contained messages and statuses use their
more specific `feedback-*` or `status-*` families.

Use `brand-background` with `brand-on-background` and use
`brand-background-subtle` with `brand-foreground`. `brand-border` separates
branded decoration from adjacent content. Brand roles do not express
interactivity: buttons, links, and other controls continue to use `action-*`
roles even when a brand and action token currently share the same value.

### Theme scope

Unqualified frontmatter values define the default light theme. The flat `dark-*`
values define the supported dark theme by remapping the same roles rather than
inverting literals mechanically. Components use unqualified entries in light
mode and the corresponding `*-dark` entries in dark mode. Dark component entries
override color properties only; typography, shape, size, and spacing remain
shared with the unqualified component.

Adapters activate one complete theme at a time. They may translate the flat
theme qualifier into a platform mode or selector, but exact dark values must
continue to originate in this frontmatter. Product code must not combine light
and dark values ad hoc or treat the dark aliases as a general color palette.

Inverse tokens describe a stable deep-ink emphasis surface rather than the
opposite luminance of the active theme. They remain dark in both themes and
deepen in dark mode to preserve local separation. Pair inverse background or
surface roles only with the matching inverse foreground and border roles; do not
use inverse tokens as substitutes for the complete dark theme.

Every supported foreground, surface, border, focus, feedback, status, and chart
combination must be checked in both themes. Platform high-contrast or
forced-color modes may replace authored colors, borders, and focus treatments as
needed while preserving meaning and operability.

### Actions, feedback, and status

Primary, secondary, outline, ghost, destructive, and link tokens express action
hierarchy or treatment. They must not be used to communicate system status.

Feedback describes an event or result:

- Success: an operation completed.
- Warning: an issue may need attention.
- Danger: an operation failed or input is invalid.
- Info: contextual information.

Status describes a persistent state:

- Positive: Active, Approved, Completed, Healthy.
- Warning: Pending, Paused, At risk, Needs review.
- Negative: Failed, Blocked, Rejected, Overdue.
- Info: In review, Processing, Scheduled.
- Neutral: Draft, Inactive, Archived, Unknown.

Always pair semantic color with a text label, icon, position, or other non-color
cue.

For example, “Changes saved” uses feedback success, while an “Active” badge uses
positive status.

### Icons

Icons inherit the semantic foreground of their context unless they communicate a
distinct semantic meaning.

- Icons beside text inherit that text color.
- Standalone neutral icons use `text-primary`, `text-secondary`, or
  `text-tertiary` according to emphasis.
- Icons on inverse surfaces use the active theme's matching inverse foreground
  unless their component specifies a more precise role. Ordinary dark-theme
  surfaces use the corresponding `dark-text-*` mapping rather than an inverse
  role.
- Disabled icons inherit their component's disabled foreground.
- Semantic icon colors are used only when the icon communicates that meaning.
- Icons inside actions, feedback, status, navigation, or selection inherit the
  corresponding component foreground.

Give an icon a distinct semantic foreground only when it needs different emphasis
from adjacent text. Decorative icons are excluded from the accessibility tree;
informative icons have a text alternative, and icon-only controls have a
programmatically determinable name.

Use 16px icons in tiny and small controls, 20px in medium and large controls, and
24px in extra-large controls. Interface icons use a consistent 1.8px stroke.
Filled icons are reserved for brand marks, simple status shapes, and decorative
emphasis.

The web adapter documents SVG inheritance and accessible-name techniques. Other
platform adapters must preserve the same foreground and semantic outcomes.

### Contrast and focus

Every supported foreground/background pair must meet the accessibility target in
its real context. Transparent components must declare the surfaces on which they
may appear. Text, essential icons, component boundaries, selection indicators,
and state changes are evaluated separately.

Transparent outline and ghost actions and tabs are supported on the default light
page and surface backgrounds. In other themes or on inverse surfaces, use an
explicit theme mapping rather than assuming transparent tokens remain legible.

The default authored focus indicator is a solid outer ring using `focus-ring-width`
with `focus-ring-offset-width` of separation from the component boundary. Use
`focus-ring` for the outer indicator and `focus-ring-offset` as the contrasting
separation color when the surrounding surface alone does not provide sufficient
contrast. Focus must not rely only on an internal color change. Its rendered area
must be at least equivalent to a two CSS-pixel perimeter and maintain at least 3:1
contrast against adjacent colors on every supported surface.

Web implementations use `:focus-visible`. Do not suppress the user-agent outline
unless a complete replacement is applied in the same focused state. Inset
indicators are permitted only where an outer indicator would be clipped, such as
inside a data grid or tightly contained scroll region, and must preserve equivalent
area and contrast. Focus must not be fully obscured or clipped by sticky, overlay,
or scrolling content.

In dark mode, use `dark-focus-ring` with `dark-focus-ring-offset`. Preserve the
offset as a contrasting inner separation when the ring is adjacent to a primary
action, selected, semantic, or inverse surface; do not remove it merely because
the outer ring is visible on the page canvas.

Disabled controls may use reduced contrast, but must remain identifiable through
more than color and must not respond to activation. High-contrast adapters must
preserve disabled, focused, selected, and invalid distinctions.

### Data visualization

Use `chart-series-1` through `chart-series-6` consistently within an analytical
context. Reserve `chart-positive` and `chart-negative` for genuine quantitative
meaning.

Do not rely on color alone. Use labels, direct annotation, shapes, line styles,
or patterns for essential distinctions.

## Typography

Inter is the interface family for supported weights 400–700. An adapter that
cannot provide Inter must choose a highly legible fallback with compatible
metrics and preserve hierarchy, weight distinction, and text reflow.
Negative letter spacing is tuned for Inter. Adapters must reset it to `0em` when
a fallback family or writing system makes tighter tracking less legible.

- `display-*` is for major public-facing statements.
- `heading-*` defines visual page and section hierarchy independently of the
  document's semantic heading levels.
- `body-*` defines reading and information-density levels.
- `label-lg`, `label-md`, and `label-sm` are for controls, navigation, filters,
  headers, and badges.
- `label-overline` is for brief contextual or eyebrow text placed above or beside
  a title. It is not for paragraphs, controls, navigation items, or status badges.
- `caption` is for timestamps and supporting metadata.
- `data-*` is for metrics and quantitative values.

Use `body-md` by default on public surfaces. `body-sm` may be used for dashboard
content and tables when readability is preserved. Do not use `body-xs` as a
general body style.

Use tabular numerals for aligned numeric columns and metrics.

Choose display and heading roles according to content and available space, not
the HTML element name. A public-site hero may use `heading-xl` in mobile space,
`display-md` in tablet space, and `display-lg` or `display-xl` in desktop and wide
space without changing its semantic heading level.

### Text resilience and localization

Text must remain readable and operable when enlarged to 200%, when user text
spacing is increased, and when page content reflows at high zoom. Components must
not clip labels, values, instructions, validation messages, or controls. Truncate
only nonessential content and provide access to the complete value.

Allow for longer translations and writing systems with different glyph metrics.
Adapters may render `label-overline` in uppercase when that transformation is
appropriate for the language and the authored text is short. Because casing is
not a typography token property, adapters must omit uppercase transformation and
may reset its letter spacing to `0em` for writing systems where either treatment
reduces legibility.
Choose the platform's semantic heading structure from the document outline; a
visual `display-*` or `heading-*` role never replaces that structure.

## Layout

The primary spacing scale uses a 4px rhythm. Whole-number numeric suffixes express
multiples of 4px. The `space-*-5` tokens provide controlled 2px half-step
refinements for compact internal component spacing and optical adjustment; do not
use them for page padding, grid gutters, section spacing, or general layout.
Intentionally missing suffixes are not available spacing steps. Use named tokens
instead of arbitrary values.

`space-0` is available for responsive and state-based resets. `space-0-5` is a
general spacing token, while focus indicator geometry uses semantic dimension
tokens such as `focus-ring-width` and `focus-ring-offset-width`. Use `space-1`
through `space-10` for component composition and the larger steps for generic
layout spacing. When spacing has a defined layout role, prefer its semantic token,
such as `section-desktop`, over an equivalent `space-*` value.

The DESIGN.md schema has no general dimension group, so the `spacing` map also
contains breakpoints, semantic heights, widths, gutters, padding, and content
limits. Treat `space-*` as the base spacing scale and the remaining entries as
layout dimensions, not interchangeable spacing steps.

- `breakpoint-*` defines page-layout thresholds; mobile is the default and has no
  breakpoint token.
- `section-*`, `*-padding-*`, and `grid-gutter-*` define composition spacing.
- `control-height-*` and `touch-target-min` define component and target
  dimensions.
- `sidebar-*` and `topbar-height` define navigation-shell dimensions.
- `container-*` defines content-width limits.

Use automatic inline margins to center bounded containers. Apply page padding
outside the container limit so full-width backgrounds can extend to the viewport
while their content remains aligned. A section owns one block separation, applied
as a gap or padding but not duplicated with an additional section margin.

Treat `topbar-height` as the normal minimum height. Preserve brand and primary
utilities, move secondary utilities into an accessible overflow control when
needed, and never clip enlarged or translated labels to enforce a fixed bar.

Use `grid-gutter-mobile` by default, `grid-gutter-tablet` from the tablet range,
and `grid-gutter-desktop` from the desktop range upward. A public-site grid should
normally use intrinsic columns with a useful minimum item width. A 12-column grid
is reserved for complex desktop and wide dashboard composition; it is not
required for ordinary card groups.

The canonical control-height vocabulary is `tiny`, `small`, `medium`, `large`,
and `extra-large`. The abbreviated `sm`, `md`, `lg`, and `xl` height names are
deprecated compatibility aliases and must not be used by new work.

### Public Site mode

Use page padding, readable content widths, and section-spacing tokens. Full-width
backgrounds may extend to the viewport while content stays aligned to its
container. Public-site navigation follows the
[`Public-site Navigation contract`](design/components/site-navigation.md), keeps
the brand and primary action visible, and uses an accessible disclosure whenever
the destination links do not fit; never remove primary destinations without an
equivalent control.

- `container-narrow` supports authentication and focused tasks.
- `container-readable` supports prose, guidance, and form-heavy pages.
- `container-page` supports general website and application content.
- `container-dashboard` supports data-heavy dashboards; tables and visualizations
  may exceed it when the task benefits.

Public Sites use `page-padding-mobile`, `page-padding-tablet`, and
`page-padding-desktop` with the matching system ranges. Section separation uses
`section-mobile`, `section-tablet`, and `section-desktop`; wide pages retain the
desktop section and page-padding values.

### Dashboard mode

Use dashboard padding, efficient grouping, compact controls, tables, filters, and
a fluid dashboard. Major groups generally use `space-6`–`space-8` separation;
content within groups generally uses `space-4`–`space-6`.

Mobile dashboards use `dashboard-padding-mobile`, tablet dashboards use
`dashboard-padding-tablet`, and both use temporary navigation. Desktop and wide
dashboards use `dashboard-padding-desktop` and may use the persistent sidebar and
top-bar dimensions in frontmatter. When navigation and content cannot coexist
comfortably, replace the persistent sidebar with temporary navigation even if the
viewport is in a larger range.

A 12-column desktop or wide grid is a composition aid for complex dashboards,
not a fixed device contract. Give tables and primary analysis surfaces width
before secondary panels. Wide layouts may retain a secondary inspector or expose
additional essential data columns when the task benefits; adding another card
column alone does not justify wide-only behavior.

### Responsive behavior

Components respond to available space rather than rigid device classes. Tables
may use contained horizontal scrolling, prioritized columns, stacked records,
or mobile detail views.

Page composition uses these system ranges:

- Mobile: below 40rem / 640px.
- Tablet: 40rem through below 64rem / 640–1023px.
- Desktop: 64rem through below 80rem / 1024–1279px.
- Wide: 80rem / 1280px and above.

These names describe page-layout ranges, not device detection. Prefer
container-aware component behavior and transform a component when its content no
longer fits, not merely when a named range begins. Global breakpoints govern page
padding, navigation shells, and major composition; component fit governs cards,
forms, toolbars, tables, and feature grids. Adapters may map the ranges to
framework-specific breakpoint names.

Public Site defaults:

- Mobile heroes, content sections, forms, card groups, calls to action, and footer
  groups use a single-column flow. Place hero copy before media.
- Tablet layouts may introduce two columns when each region retains a useful
  minimum width. Inline navigation appears only when its labels fit.
- Desktop and wide layouts may use split heroes and richer composition while
  keeping prose within `container-readable` and general content within
  `container-page`.
- Feature and card grids use intrinsic columns or container queries. Do not wait
  for the wide range merely to add another card column.
- Calls to action wrap before they overflow. Full-width mobile actions are
  optional rather than automatic.

Dashboard defaults:

- Mobile and tablet layouts use temporary sidebar navigation. Toolbars, filters,
  forms, and panels stack or wrap while keeping the primary action visible.
- Desktop and wide layouts may use persistent navigation and the 12-column
  composition grid. Sidebar collapse remains a user or task state rather than a
  separate breakpoint.
- Prefer table and data-grid column prioritization, then contained horizontal
  scrolling, then stacked records or a detail view. Preserve information,
  actions, focus, and selection through every transformation.
- Forms use one column by default and add a column when the form container, field
  labels, and validation content fit. Panels give primary data surfaces width
  before secondary summaries.
- Modals retain at least `space-4` viewport clearance and stack actions when
  needed. Use a page or side panel for long or multi-step work.
- Density responds to task and input capability rather than viewport width.
  Small and tiny controls remain limited to appropriate pointer-oriented or
  keyboard-heavy interfaces.

### Reading order and bidirectionality

Visual reordering must not create a reading or focus order that differs from the
meaningful sequence. Layouts support left-to-right and right-to-left direction;
directional icons mirror only when their meaning depends on direction. Numbers,
dates, times, currency, and sorting behavior use locale-aware presentation.

### Back to top

Back to top is an optional floating in-page navigation aid for long vertical
pages. Omit it when the top destination remains readily reachable, and provide no
more than one control per page. It supplements rather than replaces the initial
bypass route, landmarks, headings, or platform navigation.

Mount it after the primary content so its reading and navigation order remains
meaningful despite its fixed visual placement. It appears only as the remaining
scroll distance approaches the bottom and remains unavailable near the top and
middle of the page. It stays in the same viewport corner as the footer enters;
page layouts reserve that corner from important content and persistent actions.
The control respects system safe areas.

Activation returns the page to a named top destination and moves navigation
focus to that destination rather than only changing the visible position. Use
the visible label "Back to top". An upward-direction icon may supplement but does
not replace the visible label.

Back to top is navigation rather than a primary action. It has no disabled state
and supports default, hover when available, focus, and active states. Web
movement is smooth and becomes immediate when reduced motion is requested.

The presentation composes `surface-raised`, `border-secondary`, `text-link`,
`label-md`, `shape-md`, and the minimum interactive target. Reuse these semantic
roles rather than adding a dedicated token family.

### Controls and touch targets

- Tiny controls are for dense, pointer-oriented tables and inline utilities.
- Small controls are for toolbars, filters, compact fields, menus, and tabs.
- Medium controls are the application, form, dialog, and touch-oriented default.
- Large controls are for important standalone and onboarding actions.
- Extra-large controls are optional and reserved for a single major call to action
  in a public-site hero or comparable public conversion area.
- Touch layouts must preserve the minimum interactive target in frontmatter.

Tiny and small visual controls may use a larger invisible hit area where
appropriate, but adjacent target areas must not overlap. Otherwise promote them
to medium when touch is expected.
All functionality remains available through keyboard and pointer input. Complete
an action on the pointer release event so it can be cancelled before completion,
unless immediate activation is essential. Any drag interaction provides a
non-drag alternative.

## Elevation & Depth

Use this hierarchy:

1. Page or workspace background.
2. Standard surface with a quiet border or tonal separation.
3. Raised menu, dropdown, or popover.
4. Modal above the overlay.

Reserve shadows for content that genuinely floats. Exact shadow values are not
yet tokenized. Borders and tonal separation are the stable alternative until an
elevation scale is adopted.

In dark mode, a raised popup uses `dark-surface-raised`, its documented quiet
border, and `0 8px 24px rgba(0, 0, 0, 0.40)`. A modal uses the same raised
surface above `dark-background-overlay` with
`0 24px 48px rgba(0, 0, 0, 0.56)`. These shadow values are normative visual
guidance in prose until the DESIGN.md schema supports an elevation token group;
the visible edge and tonal step remain necessary because shadow alone can
disappear on a dark canvas.

Layer content in this order: page, sticky navigation, popover, blocking overlay
and dialog, then tooltip. Numeric z-index values remain application-local; do not
invent new layers when an existing semantic layer fits.

### Motion

Interactive feedback completes in 200ms or less and uses restrained easing with
no bounce. Functional UI motion must not exceed 300ms or be required to
understand state. Implementations honor the user's platform-level reduced-motion
preference: nonessential transitions and smooth movement become effectively
immediate while state changes remain perceivable. Platform mechanisms are
documented in the relevant adapter.

## Shapes

- `rounded.shape-md` is the default for controls.
- `rounded.shape-lg` is the default for cards and grouped containers.
- `rounded.shape-xl` is reserved for dialogs and feature surfaces.
- `rounded.shape-full` is reserved for pills, badges, avatars, and circular controls.

Use a container radius for tables rather than rounding individual rows or cells.

## Components

Frontmatter component entries express design intent using properties supported
by the current DESIGN.md schema. They are not an implementation inventory, and
export support does not determine whether a contract is valid. Borders, focus
treatment, elevation, behavior, and accessibility belong in the component
specifications when the frontmatter cannot express them.

An unqualified component entry defines the default light-theme colors. Its
related `*-dark` entry defines the dark-theme `backgroundColor` and `textColor`
override and inherits every non-color property from the unqualified entry. State
and theme qualifiers stay explicit, for example `button-primary-hover-dark`.
This flat convention keeps both themes machine-readable without adding an
unsupported nested theme group.

Button color variants and sizes are independent. `button-size-*` entries define
dimensions, typography, shape, and spacing for every button color variant;
variant and state entries define semantic color. Medium is the default button
size.

Avatar fallback color and size are independent. `avatar-size-*` component entries
map the supported sizes directly to `control-height-*` dimensions and define their
typography and circular shape; `avatar-fallback` and `avatar-fallback-dark` define
fallback color without prescribing image content.

### Component contract

Every component specification contains:

1. Status and intent.
2. Anatomy.
3. Variants and sizes, where relevant.
4. Supported, unsupported, and non-applicable states.
5. Semantic token mapping.
6. Behavior, events, and state transitions.
7. Responsive, overflow, and localization behavior.
8. Keyboard, screen-reader, touch, high-contrast, and reduced-motion outcomes.
9. A web-adapter mapping when web-specific semantics are required.
10. One representative usage example.

An implementation may use any CSS methodology, framework, component library, or
build system if it satisfies the same contract.

### Contract lifecycle and extension rules

Component contracts use four maturity states:

- **Proposed:** The system has identified a need and scope, but normative behavior
  is not yet defined.
- **Draft:** The contract is being defined and may contain unresolved decisions or
  incomplete required sections.
- **Complete:** Every required section is normative, internally consistent, and
  ready for implementation and conformance review.
- **Deprecated:** A replacement is documented and consumers are within an agreed
  migration window.

Contract maturity does not describe runtime availability or conformance. Track
implementation and test status outside this technology-neutral design contract.

Create a dedicated component contract when a concept has its own semantic role,
state model, interaction model, accessibility behavior, or composition rules.
Keep a variant in an existing contract when it changes presentation or narrows
behavior without introducing a new semantic role. Put requirements shared by
several components in a foundation contract or system-wide rule and make each
dependent contract reference it.

Add a frontmatter component entry only when the component has an approved visual
mapping that can be represented honestly with the DESIGN.md component properties.
Reuse existing semantic tokens and component mappings when a new component is a
composition or behavioral specialization. Do not add tokens or component entries
only to create an inventory, mirror every state, or silence orphaned-token
warnings.

### Shared state model

Use these state names consistently where they apply: default, hover, focus,
active or pressed, selected or current, checked, indeterminate, expanded,
collapsed, read-only, invalid, warning, success, loading or busy, and disabled.
Each component contract marks a state as supported, unsupported, or not
applicable.

State precedence is consistent:

1. Disabled suppresses activation and hover behavior.
2. Loading or busy prevents repeated activation while preserving status.
3. Focus remains visible when combined with selected, current, invalid, checked,
   or pressed.
4. Read-only remains focusable and distinguishable from disabled when its content
   can be reviewed or copied.
5. Hover is enhancement only and never the sole way to discover information or
   an action.

Add a related flat frontmatter entry only when a state changes a component
property supported by the DESIGN.md schema. Document other state requirements in
the component contract rather than inventing unsupported properties.

### Shared collection model

Listboxes, comboboxes, action menus, tabs, and data grids are collections with
component-specific semantics. They share interaction terms but do not share one
role or selection model.

- **Focus** identifies the element receiving keyboard input. **Active item**
  identifies the option or cell managed by a composite control. **Selection**
  identifies a committed value or chosen record. Keep these states distinct
  unless a component contract explicitly couples them.
- Use one managed focus strategy within a collection: roving focus or an active
  descendant. Do not mix strategies during ordinary navigation.
- Directional commands, Home, End, and type-ahead apply only when the component's
  contract defines them. Navigation skips unavailable items while preserving
  their understandable presentation when they remain visible.
- Insertion, removal, filtering, sorting, and asynchronous replacement preserve
  focus, active item, and selection when their targets remain available. If a
  target disappears, move to the nearest logical continuation and announce a
  material context change once.
- Loading does not expose placeholder rows or messages as selectable items. Empty
  and error content remains reachable without joining the collection's managed
  navigation unless it contains a defined recovery control.
- Type-ahead uses locale-aware comparison, has a predictable reset interval, and
  does not replace native text editing in a combobox.
- Disabled items cannot be activated. A component may keep them discoverable when
  an explanation is useful, but managed navigation normally skips them.

### Accessibility baseline

Every interactive component has a programmatically determinable name, role,
value, and state; supports complete keyboard operation without a trap; preserves
visible focus; and works with touch and pointer input. Dynamic feedback exposes
its urgency and status without moving focus unless the task requires it.

Components preserve meaningful reading and focus order, survive text enlargement
and increased text spacing, and expose the same information in high-contrast and
reduced-motion modes. Platform-specific semantics belong in adapters.

Page compositions that place repeated regions before primary task content provide
a bypass route before those regions. Activating the route moves navigation focus
to the primary content rather than only changing its visible position. Additional
bypass routes to named regions are optional when they materially shorten
navigation. Do not expose a route when its target is hidden, inert, or otherwise
unavailable in the current presentation.

Reusable bypass controls follow the
[`Skip link`](design/components/skip-link.md) contract.

### Component taxonomy

- `overlay` defines shared anchored-layer behavior such as placement, viewport
  fit, dismissal, and focus restoration. `dropdown` is the compatible
  popup-surface styling term. Tooltip, popover, action menu, listbox, combobox,
  and disclosure remain distinct semantic and behavioral patterns.
- A data table presents tabular information. An interactive data grid manages
  focus and selection as a composite control; do not use the terms interchangeably.
- A dialog is a focused task surface. A modal dialog is its blocking variant;
  alert dialogs, drawers, sheets, and temporary navigation reuse dialog behavior
  only when their semantics and modality match.
- An avatar is a visual reference to a person, while an avatar group is a compact
  preview of several people. Neither pattern creates presence, selection, or an
  action without a separate semantic control or status.
- A disclosure controls one revealed region. An accordion coordinates a group of
  disclosures and adds a stable group policy and heading structure.
- Sidebar and topbar tokens support the navigation-shell pattern; they do not
  prescribe a reusable component architecture.

### Shared rules

- Use `primary`, `secondary`, `outline`, `ghost`, and `destructive` consistently.
  Outline describes a bordered alternative; ghost is the canonical transparent,
  low-emphasis treatment. Do not reintroduce `tertiary` as an alias.
- Form controls follow the shared
  [`form-field contract`](design/components/form-field.md) for labels,
  descriptions, requirements, messages, and validation. Placeholders are
  examples, not labels.
- Validation includes a text description and, when useful, an icon in addition
  to color.
- Anchored popup components follow the shared
  [`overlay contract`](design/components/overlay.md) without adopting another
  component's role or keyboard model.
- Measurable and indeterminate operations use the
  [`progress-indicator contract`](design/components/progress.md); motion is never
  the only busy cue.
- Collections distinguish loading, failure, no data, no results, and filtered
  empty states through the [`empty-state contract`](design/components/empty-state.md)
  and applicable experience pattern.
- Tooltips follow the [`tooltip contract`](design/components/tooltip.md), contain
  no interactive content, and never replace a control's accessible name.
- Decisions requiring immediate acknowledgement follow the
  [`alert-dialog contract`](design/components/alert-dialog.md) and use the safe
  initial-focus and dismissal policies appropriate to their risk.
- Paginated data follows the shared
  [`Pagination`](design/components/pagination.md) contract and preserves
  filtering, sorting, selection, focus, and result context across page changes.
- Interactive supplemental popup content follows the shared
  [`Popover`](design/components/popover.md) contract and does not adopt menu or
  dialog semantics solely because it appears in a floating surface.
- Transient asynchronous outcomes follow the shared
  [`Toast and notification region`](design/components/toast.md) contract;
  validation and actionable recovery remain near the affected context.
- Edge-attached task surfaces follow the shared
  [`Drawer and sheet`](design/components/drawer.md) contract and preserve task
  values and focus when transforming between inspector, drawer, sheet, or page
  presentations.
- Public navigation follows the shared
  [`Public-site Navigation`](design/components/site-navigation.md) contract;
  authenticated workspace navigation continues to follow the application
  navigation shell.
- Person imagery and fallbacks follow the shared
  [`Avatar`](design/components/avatar.md) contract. Compact identity collections
  follow [`Avatar Group`](design/components/avatar-group.md) without replacing a
  complete participant list.
- Coordinated expandable sections follow the shared
  [`Accordion`](design/components/accordion.md) contract and inherit individual
  section behavior from Disclosure.
- Selected navigation represents location, not a primary action.
- Selected tabs include a non-color indicator.
- Table rows use hover styling only when hover has meaning.
- Row actions remain available to keyboard and touch users.
- Status badges always include text.
- Dialogs manage initial focus, contain focus when modal, support an appropriate
  dismissal action, restore focus, and prevent background interaction while
  modal.
- Essential chart information has a text summary or accessible alternative.

### Experience patterns

The [`pattern index`](design/patterns/README.md) defines forms and validation,
asynchronous feedback, destructive actions, navigation shells, data display, and
responsive density. Component implementations must follow applicable patterns.

### Component contract index

The [`component index`](design/components/README.md) records contract maturity,
dependencies, and frontmatter coverage. It does not track runtime
implementation.

## Do's and Don'ts

### Design guardrails

- Do use semantic tokens and consistent component terminology.
- Do preserve visible focus, readable type, and comfortable touch targets.
- Do keep feedback separate from persistent status.
- Do use borders and tonal surfaces before adding shadows.
- Do keep numeric data aligned and tables scannable.
- Don't use raw hex colors when an appropriate semantic token exists.
- Don't use disabled colors as general muted colors.
- Don't use danger or feedback colors decoratively.
- Don't use color as the only indicator of meaning.
- Don't shrink text merely to fit more content.
- Don't force desktop tables into unreadable mobile layouts.
- Don't repurpose an existing semantic token; add, migrate, and deprecate.

### Adapter boundaries

- Do translate system concepts into the target platform's native semantics.
- Do document any adapter limitation or unsupported contract.
- Don't make framework props, CSS classes, package names, or build commands part
  of the normative design vocabulary.
- Don't change a token's meaning to satisfy an exporter limitation.
- Don't treat a generated artifact or demo implementation as design authority.

### Contributor checklist

- Would the rule still make sense without the current framework or utility system?
- Is the statement design intent, a component contract, a pattern, or adapter guidance?
- Does every supported component state have behavior and accessibility outcomes?
- Are responsive rules based on available space and content rather than device names?
- Are non-pointer input, focus, reflow, localization, high contrast, and reduced motion covered?
- Are tool versions, commands, paths, and serialization workarounds kept in non-normative documentation?
