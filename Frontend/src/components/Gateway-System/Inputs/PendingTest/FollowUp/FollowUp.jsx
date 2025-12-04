import PropTypes from "prop-types";
import { GiShadowFollower } from "react-icons/gi";
import Select from "../../Select";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFollowUp } from "@src/store/reducers/PendingTestList/PendingTestSlice";

const FollowUp = ({ defaultValue, required, setStateId }) => {
  const dispatch = useDispatch();
  const { followUp } = useSelector((state) => state.pendingTestList);

  useEffect(() => {
    dispatch(fetchFollowUp());
  }, [dispatch]);

  const Options = followUp?.users?.map((user) => ({
    id: user.id,
    label: user.full_name,
  }));

  return (
    <Select
      id="follow_up"
      label={`Who should Follow Up ${!required && "(Optional)"}`}
      options={Options || []}
      placeholder="Who should Follow up"
      Icon={<GiShadowFollower size={23} />}
      defaultValue={defaultValue}
      required={required}
      onChange={(e) => setStateId(e.target.dataset.value)}
    />
  );
};

FollowUp.propTypes = {
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
  setStateId: PropTypes.func,
};

export default FollowUp;
