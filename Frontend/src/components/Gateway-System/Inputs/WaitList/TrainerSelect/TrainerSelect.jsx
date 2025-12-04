import {
    fetchTrainerForWaitList,
    searchTrainersForWaitList
} from "@src/store/reducers/WaitList/WaitListSlice";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../Select";

const TrainerSelect = ({ defaultValue, onChange, required = true }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const dispatch = useDispatch();
    const { trainers, allTrainers, trainersLoading } = useSelector((state) => state.waitList);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Initial fetch
    useEffect(() => {
        dispatch(fetchTrainerForWaitList());
    }, [dispatch]);

    // Search when debounced term changes
    useEffect(() => {
        if (debouncedSearchTerm.trim()) {
            dispatch(searchTrainersForWaitList(debouncedSearchTerm));
        } else if (debouncedSearchTerm === "") {
            // Reset to all trainers when search is cleared
            dispatch(fetchTrainerForWaitList());
        }
    }, [debouncedSearchTerm, dispatch]);

    // Memoized trainer options
    const trainerOptions = useMemo(() => {
        const trainersData = trainers?.users || allTrainers || [];
        return trainersData.map((trainer) => ({
            id: trainer.id,
            label: trainer.full_name,
            email: trainer.email,
        }));
    }, [trainers, allTrainers]);

    // Custom render option to show email
    const renderOption = (props, option) => (
        <li {...props} key={option.id}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 'bold' }}>{option.label}</span>
                {option.email && (
                    <span style={{ fontSize: '12px', color: '#666' }}>{option.email}</span>
                )}
            </div>
        </li>
    );

    return (
        <div>
            {/* Search Input */}
            <div style={{ marginBottom: '8px' }}>
                <input
                    type="text"
                    placeholder="Search trainers by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px',
                        backgroundColor: 'var(--bg-input)',
                    }}
                />
            </div>

            {/* Trainer Select */}
            <Select
                id="trainer"
                label="Trainer"
                options={trainerOptions}
                placeholder={trainersLoading ? "Loading trainers..." : "Select Trainer"}
                Icon={<FaUserTie size={25} />}
                defaultValue={defaultValue}
                required={required}
                loading={trainersLoading}
                onChange={onChange}
                renderOption={renderOption}
            />

            {/* Results info */}
            {searchTerm && (
                <div style={{
                    fontSize: '12px',
                    color: '#666',
                    marginTop: '4px',
                    textAlign: 'right'
                }}>
                    {trainersLoading ? 'Searching...' : `${trainerOptions.length} trainer(s) found`}
                </div>
            )}
        </div>
    );
};

TrainerSelect.propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
};

export default TrainerSelect;