import { FoundedUser, SearchUsersResponse } from "src/types/backendResponses";

export type Props = {
  className?: string;
  items: null | SearchUsersResponse;
  onUserClick: (user: FoundedUser) => void;
};
