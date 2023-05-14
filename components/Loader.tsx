import { Suspense } from "react";

export function BigSpinner() {
  return <h2>🌀 Loading...</h2>;
}

export function Glimmer() {
  return (
    <div className="glimmer-panel">
      <div className="glimmer-line" />
      <div className="glimmer-line" />
      <div className="glimmer-line" />
    </div>
  );
}
