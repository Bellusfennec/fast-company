/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import API from "../../../api";
import Qualities from "../../ui/qualities";
import CommentsList from "../../ui/CommentsList";

const UserPage = () => {
  const history = useHistory();
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    setLoading(true);
    API.users
      .getById(userId)
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <div className="row gutters-sm">
        {loading && <p>Loading...</p>}
        {!loading && user && (
          <>
            <div className="col-md-4 mb-3">
              <div className="card mb-3">
                <div className="card-body">
                  <button
                    onClick={() => history.push(`/users/${userId}/edit`)}
                    type="button"
                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                  >
                    <i className="bi bi-gear"></i>
                  </button>
                  <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                      src={`https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                      )
                        .toString(36)
                        .substring(7)}.svg`}
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{user.name}</h4>
                      <p className="text-secondary mb-1">
                        {user.profession.name}
                      </p>
                      <div className="text-muted">
                        <i
                          className="bi bi-caret-down-fill text-primary"
                          role="button"
                        ></i>
                        <i
                          className="bi bi-caret-up text-secondary"
                          role="button"
                        ></i>
                        <span className="ms-2">{user.rate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                  <h5 className="card-title">
                    <span>Qualities</span>
                  </h5>

                  <p className="card-text">
                    <Qualities qualities={user.qualities} />
                  </p>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                  <h5 className="card-title">
                    <span>Completed meetings</span>
                  </h5>

                  <h1 className="display-1">{user.completedMeetings}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <CommentsList />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;
