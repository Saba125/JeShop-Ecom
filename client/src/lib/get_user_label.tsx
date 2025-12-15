import type { User } from "@/types";
import getAvatarUrl from "./get_avatar_url";
interface GetUserLabelForSelectProps {
    user: User
}
const GetUserLabelForSelect = ({user} : GetUserLabelForSelectProps) => {
    return (
        <div className="flex items-center gap-x-2">
            <img src={getAvatarUrl(user)} width={30} height={30} />
            <span>{user.email}</span>
        </div>
    );
};

export default GetUserLabelForSelect;
