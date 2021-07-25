import { Component, Types } from "ecsy";

class FollowedByCameraComponent extends Component {
  static schema = {
    camera: Types.Ref,
  }
}

export default FollowedByCameraComponent;
