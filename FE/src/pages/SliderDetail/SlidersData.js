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
}) => {
  return (
    <form>
      <div>
        Slider ID:
        <input type="text" value={sliderData.sliderID} readOnly />
      </div>

      <div>
        Slider title
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          readOnly={!editing}
        />
      </div>

      <div>
        Slider note
        <input
          type="text"
          value={updatedNote}
          onChange={(e) => setUpdatedNote(e.target.value)}
          readOnly={!editing}
        />
      </div>

      <div>
        Slider status:
        <select
          value={updatedStatus}
          onChange={(e) => setUpdatedStatus(e.target.value)}
          disabled={!editing}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <div>
        {editing ? (
          <button onClick={handleSaveDataClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
    </form>
  );
};

export default SlidersData;
