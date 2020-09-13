import { Response, Status } from "../../deps.ts";

export default ({ response }: { response: Response }) => {
  response.status = Status.NotFound;
  response.body = {
    success: false,
    message: "404 - Not found",
  };
};
