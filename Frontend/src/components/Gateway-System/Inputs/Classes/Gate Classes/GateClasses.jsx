import {
    clearError,
    createGateClass,
    deleteGateClass,
    fetchGateClasses,
} from "@src/store/reducers/Batches/Classes/Gates/GatesSlice";
import { ToastError, ToastSuccess } from "@src/util/Toast";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Select";

const GateClasses = ({
  setStateId,
  defaultValue,     // القديم
  valueId,          // ✅ الجديد (المفضل)
  selectedId,       // ✅ alias لو تحب
  Button,
  label,
  required,
  showRemoveButton = false, // ✅ NEW: configurable remove button
}) => {
  const dispatch = useDispatch();
  const { gate_classes, error, loading } = useSelector(
    (state) => state.gatesClassesSlice
  );

  // ✅ options جاهزة بالشكل اللي Select بيستخدمه
  const options = useMemo(() => {
    return (
      gate_classes?.map((gate) => ({
        id: gate.id,
        label: gate.gate_name,
      })) || []
    );
  }, [gate_classes]);

  // ✅ controlled id القادم من برا
  const controlledId = valueId ?? selectedId ?? "";

  // ✅ نخزن الـ selected option object عشان الدروب داون يعرضه
  const [selectedOption, setSelectedOption] = useState(defaultValue ?? null);

  useEffect(() => {
    dispatch(fetchGateClasses());
  }, [dispatch]);

  // ✅ Sync: بعد ما الـ options تتحمل أو controlledId يتغير → ظبط المعروض
  useEffect(() => {
    // لو فيه controlledId من برا
    if (controlledId !== "" && controlledId !== null && controlledId !== undefined) {
      const found = options.find((o) => String(o.id) === String(controlledId));
      setSelectedOption(found || null);
      return;
    }

    // لو مفيش controlledId لكن فيه defaultValue قديم
    if (defaultValue) {
      // لو defaultValue object
      if (typeof defaultValue === "object" && defaultValue?.id) {
        const found = options.find((o) => String(o.id) === String(defaultValue.id));
        setSelectedOption(found || defaultValue);
      } else {
        // لو defaultValue id
        const found = options.find((o) => String(o.id) === String(defaultValue));
        setSelectedOption(found || null);
      }
    }
  }, [controlledId, options, defaultValue]);

  const AddNewGatetoClasses = (data) => {
    dispatch(createGateClass({ gate: data }))
      .unwrap()
      .then(({ message }) => {
        ToastSuccess(message);
        dispatch(fetchGateClasses());
      });
  };

  const deleteGateHandler = (gateId) => {
    if (!gateId) {
      ToastError("No gate ID provided");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this gate? This will remove it from the system permanently."
    );

    if (confirmed) {
      dispatch(deleteGateClass(gateId))
        .unwrap()
        .then((response) => {
          ToastSuccess(response.message || "Gate deleted successfully");
          dispatch(fetchGateClasses());
        })
        .catch((err) => {
          ToastError(err?.message || "Failed to delete gate");
        });
    }
  };

  useEffect(() => {
    if (error) {
      ToastError(error);
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  // ✅ onChange يدعم الشكلين (Autocomplete / Native)
  const handleChange = (e, v) => {
    // لو Select بيرجع (event, valueObject)
    if (v && typeof v === "object") {
      setSelectedOption(v);
      setStateId?.(Number(v.id));
      return;
    }

    // لو بيرجع event فقط وفيه dataset.value
    const raw = e?.target?.dataset?.value ?? e?.target?.value;
    const id = raw !== undefined && raw !== null && raw !== "" ? Number(raw) : "";

    const found = options.find((o) => String(o.id) === String(id));
    setSelectedOption(found || null);

    setStateId?.(id === "" ? "" : id);
  };

  return (
    <Select
      id="gate_id"
      name="gate"
      label={label}
      options={options}
      placeholder="Gate"
      Button={Button}
      showRemoveButton={showRemoveButton}
      onSubmitNew={AddNewGatetoClasses}
      onDelete={deleteGateHandler}
      loading={loading}
      required={required}

      // ✅ أهم سطرين: خليه controlled عشان يعرض الفلتر
      value={selectedOption}
      onChange={handleChange}

      // ✅ Backward compatibility (لو Select بيستخدم defaultValue)
      defaultValue={selectedOption}
    />
  );
};

GateClasses.propTypes = {
  setStateId: PropTypes.func.isRequired,
  defaultValue: PropTypes.any,

  // ✅ NEW
  valueId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  Button: PropTypes.bool,
  label: PropTypes.string,
  required: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
};

export default GateClasses;
