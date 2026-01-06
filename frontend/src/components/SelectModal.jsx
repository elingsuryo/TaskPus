import { useState } from "react";
import "./SelectModal.css";

function SelectModal({ label, value, options, onSelect }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = options.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <label>{label}*</label>

      <div className="select-box" onClick={() => setOpen(true)}>
        {value || "Pilih"}
      </div>

      {open && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{label.toUpperCase()}</h3>

            <input
              className="search-input"
              placeholder="Add or search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="option-list">
              {filtered.map((item, index) => (
                <label key={index} className="option-item">
                  <input
                    type="radio"
                    checked={value === item}
                    onChange={() => {
                      onSelect(item);
                      setOpen(false);
                    }}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>

            <button className="done-btn" onClick={() => setOpen(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SelectModal;
