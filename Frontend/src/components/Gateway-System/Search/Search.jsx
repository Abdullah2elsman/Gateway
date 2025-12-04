import { useState } from "react";
import { fetchSearchTrainees } from "@src/store/reducers/Trainees/TraineesSlice";
import styles from "./Search.module.css";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomizedMenus from "../CustomizedMenus/CustomizedMenus";
import checkPermission from "@src/util/CheckPermission";

const Search = () => {
  const [details_search, setDetilasSearch] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Search } = useSelector((state) => state.Trainees);

  const onSearch = (e) => {
    e.preventDefault();

    if (e.target.search.value) {
      dispatch(fetchSearchTrainees(e.target.search.value))
        .unwrap()
        .then(() => {
          setDetilasSearch(e.target);
        });
    }
  };

  return (
    <div className={styles.Search}>
      <form onSubmit={onSearch}>
        <input
          type="search"
          name="search"
          placeholder="Search"
          disabled={
            !checkPermission({
              name: "trainees",
              children: ["view_trainees", "view_trainees_by_branch"],
            })
          }
        />
      </form>

      <CustomizedMenus
        isOpen={details_search}
        handlerClose={() => setDetilasSearch(null)}
        width={400}
      >
        <div className={styles.search_info}>
          {Search?.message && (
            <p style={{ textAlign: "center" }}>{Search.message}</p>
          )}

          <div className={styles.info_wapper}>
            {Search?.length > 0 &&
              Search?.map((search) => (
                <div key={search.id} className={styles.details}>
                  <div className={styles.details_title}>
                    <h4>{search.full_name}</h4>
                    <p>{search.phone_number_0}</p>
                    <p>{search.attend_type}</p>
                    <p>{search.level}</p>
                    <p>{search.status}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate(`/trainess/${search.id}/details`, {
                        state: { trainee_id: search.id },
                      });
                      setDetilasSearch(null);
                    }}
                  >
                    View Details
                  </button>
                </div>
              ))}
          </div>
        </div>
      </CustomizedMenus>
    </div>
  );
};

Search.propTypes = {
  placeholder: propTypes.string,
};

export default Search;
