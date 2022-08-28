import { MESSAGE_TYPE } from "src/helpers/constants";

export type Props = {
  className?: string;
  type: MESSAGE_TYPE;
  content: string;
  datetime: number;
};
