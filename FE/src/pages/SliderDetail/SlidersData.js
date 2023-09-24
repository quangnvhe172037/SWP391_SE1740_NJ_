import React from "react";

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
  updatedSubject
}) => {
  return (
    <form>
      <div className="form-group">
        <label>Slider ID</label>
        <input
          type="text"
          value={sliderData.sliderID}
          readOnly
          className="inputData"
        />
      </div>

      <div className="form-group">
        <label>Subject Name</label>
        <input
          type="text"
          value={updatedSubject}
          readOnly
          className="inputData"
        />
      </div>

      <div className="form-group">
        <label>Slider title</label>
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          readOnly={!editing}
          className="inputData"
        />
      </div>

      <div className="form-group">
        <label>Slider note</label>
        <input
          type="text"
          value={updatedNote}
          onChange={(e) => setUpdatedNote(e.target.value)}
          readOnly={!editing}
          className="inputData"
        />
      </div>

      <div className="form-group">
        <label>Slider status:</label>

        <select
          value={updatedStatus}
          onChange={(e) => setUpdatedStatus(e.target.value)}
          disabled={!editing}
          className="inputData"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <div>
        {editing ? (
          <button className="btn" onClick={handleSaveDataClick}>
            Save
          </button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
    </form>
  );
};

export default SlidersData;
