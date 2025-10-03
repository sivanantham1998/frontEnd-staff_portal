import React from "react";

export default function Aside() {
  return (
    <div style={{}}>
      <h3>Main Content</h3>
      <p>Resize the window to see desktop vs mobile behavior.</p>
      <ul>
        <li>Desktop: Click ☰ to collapse/expand (80px / 250px).</li>
        <li>
          Mobile: Click ☰ to open overlay; use the × button or backdrop to
          close.
        </li>
      </ul>
    </div>
  );
}
