import Alert from "@/models/alert";
import { Types } from "mongoose";

const newActivity = async (
  req: any,
  ownerId: Types.ObjectId,
  event: string
) => {
  const deviceInfo = req.headers["user-agent"] || "Unknown";
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress || "Unknown";
  const activityMessage = `${event} from ${deviceInfo} (IP: ${ipAddress})`;

  await new Alert({
    message: activityMessage,
    type: "activity",
    ownerId,
  }).save();
};

export default newActivity;
