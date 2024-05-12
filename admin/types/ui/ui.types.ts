export interface AccordionItem {
  label: string;
  slot?: string;
  disabled?: boolean;
  content?: any;
  defaultOpen?: boolean;
  closeOthers?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  link?: string;
  isActive?: boolean;
}
