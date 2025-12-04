import {
  createPaymentType,
  fetchPaymentType
} from "@src/store/reducers/PendingTestList/PendingTestSlice";
import { ToastSuccess } from "@src/util/Toast";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { MdPayment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Select";

const PaymentType = ({ onChange, defaultValue }) => {
  const dispatch = useDispatch();
  const { payments, isLoading } = useSelector((state) => state.pendingTestList);

  useEffect(() => {
    dispatch(fetchPaymentType());
  }, [dispatch]);

  const createNewPayment = (data) => {
    dispatch(createPaymentType({ payment_type: data }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchPaymentType());
      })
      .catch((error) => {
        ToastError(error.message || error || "Failed to add payment type");
      });
  };

  // delete a payment type
  const deletePaymentTypeHandler = (paymentId) => {
    if (window.confirm("Are you sure you want to delete this payment type?")) {
      dispatch(deletePaymentType(paymentId))
        .unwrap()
        .then(({ message }) => {
          ToastSuccess(message);
          dispatch(fetchPaymentType());
        })
        .catch((error) => {
          ToastError(error.message || "Failed to delete payment type");
        });
    }
  };

  return (
    <Select
      id="payment_type"
      name="Payment Type"
      label="Payment Type (Optional)"
      options={
        payments?.map((payment) => ({
          id: payment.id,
          label: payment.payment_title,
        })) || []
      }
      placeholder="Payment Type"
      Icon={<MdPayment size={23} />}
      Button={true}
      showRemoveButton={true}
      defaultValue={defaultValue}
      required={false}
      onChange={onChange}
      onSubmitNew={createNewPayment}
      onDelete={deletePaymentTypeHandler}
      isLoading={isLoading}
    />
  );
};

PaymentType.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default PaymentType;
