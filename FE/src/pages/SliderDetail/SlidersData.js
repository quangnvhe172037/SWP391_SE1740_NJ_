import React from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../api/baseapi";
const SlidersData = ({
  sliderData,
  updatedTitle,
  updatedNote,
  updatedStatus,
  editing,
  setUpdatedTitle,
  setUpdatedNote,
  setUpdatedStatus,
  handleSaveDataClick,
  handleEditClick,
  updatedSubject,
}) => {
  return (
    <div className="col-md-9 personal-info">
      <form className="form-horizontal" role="form">
        <div className="form-group">
          <label className="col-lg-3 control-label">Slider ID</label>
          <div className="col-lg-8">
            <input
              type="text"
              value={sliderData.sliderID}
              readOnly
              className="inputData form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-lg-3 control-label">Subject Name</label>
          <div className="col-lg-8">
            <input
              type="text"
              value={updatedSubject}
              readOnly
              className="inputData form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-lg-3 control-label">Subject Title</label>
          <div className="col-lg-8">
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              readOnly={!editing}
              className="inputData form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-lg-3 control-label">Slider Note</label>
          <div className="col-lg-8">
            <input
              type="text"
              value={updatedNote}
              onChange={(e) => setUpdatedNote(e.target.value)}
              readOnly={!editing}
              className="inputData form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-lg-3 control-label">Slider status</label>
          <div className="col-lg-8">
            <div className="ui-select">
              <select
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
                disabled={!editing}
                className="inputData form-control"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="col-md-3 control-label"></label>
          <div class="col-md-8">
            {editing ? (
              <button className="btn sliderBtn" onClick={handleSaveDataClick}>
                Save
              </button>
            ) : (
              <button className="btn sliderBtn" onClick={handleEditClick}>
                Edit
              </button>
            )}

            <button className="btn sliderBtn btn-back">
              <Link to={"/sliders"}>Back to slider list</Link>
            </button>
          </div>
        </div>
      </form>
    </div>

    // <form>
    //   <div className="form-group">
    //     <label>Slider ID</label>
    //     <input
    //       type="text"
    //       value={sliderData.sliderID}
    //       readOnly
    //       className="inputData"
    //     />
    //   </div>

    //   <div className="form-group">
    //     <label>Subject Name</label>
    //     <input
    //       type="text"
    //       value={updatedSubject}
    //       readOnly
    //       className="inputData"
    //     />
    //   </div>

    //   <div className="form-group">
    //     <label>Slider title</label>
    //     <input
    //       type="text"
    //       value={updatedTitle}
    //       onChange={(e) => setUpdatedTitle(e.target.value)}
    //       readOnly={!editing}
    //       className="inputData"
    //     />
    //   </div>

    //   <div className="form-group">
    //     <label>Slider note</label>
    //     <input
    //       type="text"
    //       value={updatedNote}
    //       onChange={(e) => setUpdatedNote(e.target.value)}
    //       readOnly={!editing}
    //       className="inputData"
    //     />
    //   </div>

    //   <div className="form-group">
    //     <label>Slider status:</label>

    //     <select
    //       value={updatedStatus}
    //       onChange={(e) => setUpdatedStatus(e.target.value)}
    //       disabled={!editing}
    //       className="inputData"
    //     >
    //       <option value="true">Active</option>
    //       <option value="false">Inactive</option>
    //     </select>
    //   </div>

    //   <div>
    //     {editing ? (
    //       <button
    //         className="btn brn-dark sliderBtn"
    //         onClick={handleSaveDataClick}
    //       >
    //         Save
    //       </button>
    //     ) : (
    //       <button className="btn  btn-dark sliderBtn" onClick={handleEditClick}>
    //         Edit
    //       </button>
    //     )}
    //   </div>
    // </form>
  );
};

export default SlidersData;
