export interface AccordionItem {
  label: string;
  slot?: string;
  disabled?: boolean;
  content?: any;
  defaultOpen?: boolean;
  closeOthers?: boolean;
}
