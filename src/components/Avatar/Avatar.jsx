import { getAvatarColor } from "../../utils/avatarColor";

function Avatar({ username, size = 40 }) {
  return (
    <div
      className={`${getAvatarColor(username)} rounded-full flex items-center justify-center text-white font-bold shrink-0`}
      style={{
        width: size,
        height: size,
      }}
    >
      {username?.charAt(0).toUpperCase()}
    </div>
  );
}

export default Avatar;