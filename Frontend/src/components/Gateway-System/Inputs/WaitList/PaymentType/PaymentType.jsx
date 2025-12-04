import {
  createPaymentType,
  deletePaymentType,
  fetchPaymentType
} from "@src/store/reducers/WaitList/View/ViewSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { MdPayment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Select";

const PaymentType = ({ defaultValue, onChange }) => {
  const dispatch = useDispatch();
  const { pymentType, loading } = useSelector((state) => state.viewWaitList);

  useEffect(() => {
    dispatch(fetchPaymentType());
  }, [dispatch]);

  // create a new Payment Type
  const createNewPaymentType = (payment_type) => {
    dispatch(createPaymentType({ payment_type }))
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
        pymentType?.map((payment) => ({
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
      onSubmitNew={createNewPaymentType}
      onDelete={deletePaymentTypeHandler}
      isLoading={loading}
      onChange={onChange}
    />
  );
};

PaymentType.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default PaymentType;
