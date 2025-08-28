import { useState } from "react";

export default function ApplyDialog({ onConfirm }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="px-3 py-2 rounded-xl border">
        Apply
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">
            <h4 className="text-lg font-semibold">Confirm Application</h4>
            <p className="text-sm mt-2">Submit your application to this job?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-3 py-2" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                className="px-3 py-2 rounded-xl border"
                disabled={busy}
                onClick={async () => {
                  setBusy(true);
                  await onConfirm();
                  setBusy(false);
                  setOpen(false);
                }}
              >
                {busy ? "Submitting…" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
