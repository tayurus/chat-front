export type Props = {
  className?: string;
  sendMessage: (content: string) => Promise<string>;
  dialogId?: string;
};
