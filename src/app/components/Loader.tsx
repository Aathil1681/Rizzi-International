"use client";
const LordIcon = "lord-icon" as any;
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center">
        {/* Lordicon Truck Animation - Dark Blue Theme */}
        <LordIcon
          src="https://cdn.lordicon.com/byupthur.json"
          trigger="loop"
          colors="primary:#1e3a8a,secondary:#1e40af"
          style={{ width: "150px", height: "150px" }}
        ></LordIcon>
      </div>

      <style jsx>{`
        .road-move {
          animation: roadMove 1s linear infinite;
        }

        .dot-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes roadMove {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
